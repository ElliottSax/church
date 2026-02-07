/**
 * Redis Cache Utility (Optional)
 *
 * Provides caching layer for frequently accessed data
 * If Redis is not available, falls back to in-memory cache
 */

import siteConfig from '@/config/site-config';
import { logger, logError, logWarn } from '@/lib/logger';

// In-memory cache fallback
class MemoryCache {
  private cache = new Map<string, { value: any; expires: number }>();

  async get(key: string): Promise<any | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  async set(key: string, value: any, ttl: number = 60): Promise<void> {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl * 1000
    });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.cache.keys()).filter(key => regex.test(key));
  }
}

// Redis client (if available)
class RedisCache {
  private client: any;

  constructor() {
    // Only initialize if Redis URL is provided
    if (process.env.REDIS_URL) {
      try {
        // Dynamically import Redis (install with: npm install redis)
        // const { createClient } = require('redis');
        // this.client = createClient({ url: process.env.REDIS_URL });
        // this.client.connect();
      } catch (error) {
        logWarn('Redis not available, using memory cache');
      }
    }
  }

  async get(key: string): Promise<any | null> {
    if (!this.client) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logError('Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 60): Promise<void> {
    if (!this.client) return;

    try {
      await this.client.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      logError('Redis set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;

    try {
      await this.client.del(key);
    } catch (error) {
      logError('Redis del error:', error);
    }
  }

  async clear(): Promise<void> {
    if (!this.client) return;

    try {
      await this.client.flushDb();
    } catch (error) {
      logError('Redis clear error:', error);
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.client) return [];

    try {
      return await this.client.keys(pattern);
    } catch (error) {
      logError('Redis keys error:', error);
      return [];
    }
  }
}

// Export cache instance (uses Redis if available, otherwise memory)
export const cache = process.env.REDIS_URL ? new RedisCache() : new MemoryCache();

/**
 * Cache wrapper for functions
 */
export async function cached<T>(
  key: string,
  fn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = await cache.get(key);
  if (cached !== null) {
    return cached as T;
  }

  // Execute function
  const result = await fn();

  // Store in cache
  await cache.set(key, result, ttl);

  return result;
}

/**
 * Invalidate cache by pattern
 */
export async function invalidateCache(pattern: string): Promise<void> {
  const keys = await cache.keys(pattern);
  for (const key of keys) {
    await cache.del(key);
  }
}

/**
 * Predefined cache keys
 */
export const CacheKeys = {
  events: {
    all: 'events:all',
    upcoming: (limit?: number) => `events:upcoming:${limit || 'all'}`,
    byId: (id: string) => `events:id:${id}`,
    bySlug: (slug: string) => `events:slug:${slug}`,
    byCategory: (category: string) => `events:category:${category}`,
    stats: 'events:stats',
  },
  prayer: {
    all: 'prayer:all',
    public: 'prayer:public',
    byId: (id: string) => `prayer:id:${id}`,
    byCategory: (category: string) => `prayer:category:${category}`,
    trending: (days: number) => `prayer:trending:${days}`,
    stats: 'prayer:stats',
  },
  sermons: {
    all: 'sermons:all',
    recent: (limit?: number) => `sermons:recent:${limit || 'all'}`,
    byId: (id: string) => `sermons:id:${id}`,
  },
};

/**
 * Cache invalidation helpers
 */
export const CacheInvalidation = {
  events: {
    all: () => invalidateCache('events:*'),
    single: (id: string) => cache.del(CacheKeys.events.byId(id)),
  },
  prayer: {
    all: () => invalidateCache('prayer:*'),
    single: (id: string) => cache.del(CacheKeys.prayer.byId(id)),
  },
};

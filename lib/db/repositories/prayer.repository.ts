/**
 * Prayer Wall Repository
 *
 * Centralized data access layer for prayer requests
 */

import { prisma } from '../client';
import type { PrayerRequest, PrayerInteraction, Prisma } from '@prisma/client';

export class PrayerRepository {
  /**
   * Get all public approved prayer requests
   */
  async findPublic(filters?: {
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.PrayerRequestWhereInput = {
      isPublic: true,
      approved: true
    };

    if (filters?.category) {
      where.category = filters.category;
    }

    return await prisma.prayerRequest.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: filters?.limit,
      skip: filters?.offset,
      include: {
        _count: {
          select: { interactions: true }
        }
      }
    });
  }

  /**
   * Get all prayer requests (admin)
   */
  async findAll(filters?: {
    approved?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.PrayerRequestWhereInput = {};

    if (filters?.approved !== undefined) where.approved = filters.approved;
    if (filters?.category) where.category = filters.category;

    return await prisma.prayerRequest.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: filters?.limit,
      skip: filters?.offset
    });
  }

  /**
   * Get prayer request by ID
   */
  async findById(id: string) {
    return await prisma.prayerRequest.findUnique({
      where: { id },
      include: {
        interactions: true
      }
    });
  }

  /**
   * Create prayer request
   */
  async create(data: Prisma.PrayerRequestCreateInput) {
    return await prisma.prayerRequest.create({
      data
    });
  }

  /**
   * Update prayer request
   */
  async update(id: string, data: Prisma.PrayerRequestUpdateInput) {
    return await prisma.prayerRequest.update({
      where: { id },
      data
    });
  }

  /**
   * Approve prayer request
   */
  async approve(id: string) {
    return await prisma.prayerRequest.update({
      where: { id },
      data: {
        approved: true,
        updatedAt: new Date()
      }
    });
  }

  /**
   * Increment prayer count
   */
  async incrementPrayerCount(id: string, userId: string) {
    // Check if user already prayed
    const existingInteraction = await prisma.prayerInteraction.findUnique({
      where: {
        requestId_userId_type: {
          requestId: id,
          userId,
          type: 'prayed'
        }
      }
    });

    if (existingInteraction) {
      // User already prayed, return current count
      const request = await this.findById(id);
      return request?.prayerCount || 0;
    }

    // Create interaction and increment count
    const [interaction, updated] = await prisma.$transaction([
      prisma.prayerInteraction.create({
        data: {
          requestId: id,
          userId,
          type: 'prayed'
        }
      }),
      prisma.prayerRequest.update({
        where: { id },
        data: {
          prayerCount: { increment: 1 },
          updatedAt: new Date()
        }
      })
    ]);

    return updated.prayerCount;
  }

  /**
   * Search prayer requests
   */
  async search(query: string) {
    return await prisma.prayerRequest.findMany({
      where: {
        isPublic: true,
        approved: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { request: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy: { submittedAt: 'desc' }
    });
  }

  /**
   * Get trending prayer requests
   */
  async findTrending(days: number = 7, limit: number = 5) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await prisma.prayerRequest.findMany({
      where: {
        isPublic: true,
        approved: true,
        submittedAt: { gte: cutoffDate }
      },
      orderBy: { prayerCount: 'desc' },
      take: limit
    });
  }

  /**
   * Get prayer statistics
   */
  async getStats() {
    const [totalRequests, categoryStats, recentRequests] = await Promise.all([
      prisma.prayerRequest.count({
        where: {
          isPublic: true,
          approved: true
        }
      }),
      prisma.prayerRequest.groupBy({
        by: ['category'],
        where: {
          isPublic: true,
          approved: true
        },
        _count: true,
        _sum: {
          prayerCount: true
        }
      }),
      prisma.prayerRequest.findMany({
        where: {
          isPublic: true,
          approved: true
        },
        orderBy: { submittedAt: 'desc' },
        take: 5
      })
    ]);

    const totalPrayers = categoryStats.reduce(
      (sum, stat) => sum + (stat._sum.prayerCount || 0),
      0
    );

    const categoryCounts = categoryStats.reduce((acc, stat) => {
      acc[stat.category] = stat._count;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRequests,
      totalPrayers,
      categoryCounts,
      recentRequests
    };
  }

  /**
   * Delete prayer request
   */
  async delete(id: string) {
    return await prisma.prayerRequest.delete({
      where: { id }
    });
  }
}

// Export singleton instance
export const prayerRepository = new PrayerRepository();

// Streaming service integration utilities
import { cache } from 'react';
import { logger, logError, logWarn } from '@/lib/logger';

export interface StreamStatus {
  isLive: boolean;
  title?: string;
  viewerCount?: number;
  thumbnailUrl?: string;
  streamUrl?: string;
  scheduledStartTime?: Date;
  platform: 'youtube' | 'vimeo' | 'none';
}

export interface ScheduledStream {
  id: string;
  title: string;
  description: string;
  scheduledTime: Date;
  thumbnailUrl?: string;
  platform: 'youtube' | 'vimeo';
}

// YouTube Live Stream Integration
export const checkYouTubeLiveStatus = cache(async (channelId: string): Promise<StreamStatus> => {
  if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
    return { isLive: false, platform: 'none' };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    );

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube live status');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const liveStream = data.items[0];

      // Get viewer count
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,statistics&id=${liveStream.id.videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        { next: { revalidate: 60 } }
      );

      const statsData = await statsResponse.json();
      const viewerCount = statsData.items?.[0]?.liveStreamingDetails?.concurrentViewers || 0;

      return {
        isLive: true,
        title: liveStream.snippet.title,
        viewerCount: parseInt(viewerCount),
        thumbnailUrl: liveStream.snippet.thumbnails.high.url,
        streamUrl: `https://www.youtube.com/watch?v=${liveStream.id.videoId}`,
        platform: 'youtube'
      };
    }

    return { isLive: false, platform: 'youtube' };
  } catch (error) {
    logError('Error checking YouTube live status:', error);
    return { isLive: false, platform: 'youtube' };
  }
});

// Get upcoming YouTube streams
export const getUpcomingYouTubeStreams = cache(async (channelId: string): Promise<ScheduledStream[]> => {
  if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=upcoming&order=date&maxResults=5&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming streams');
    }

    const data = await response.json();

    return data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      scheduledTime: new Date(item.snippet.publishedAt),
      thumbnailUrl: item.snippet.thumbnails.high.url,
      platform: 'youtube' as const
    })) || [];
  } catch (error) {
    logError('Error fetching upcoming streams:', error);
    return [];
  }
});

// Vimeo Live Stream Integration
export const checkVimeoLiveStatus = cache(async (userId: string): Promise<StreamStatus> => {
  if (!process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN) {
    return { isLive: false, platform: 'none' };
  }

  try {
    const response = await fetch(
      `https://api.vimeo.com/users/${userId}/live_events`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Vimeo live status');
    }

    const data = await response.json();
    const liveEvent = data.data?.find((event: any) => event.status === 'streaming');

    if (liveEvent) {
      return {
        isLive: true,
        title: liveEvent.name,
        viewerCount: liveEvent.viewers_count || 0,
        thumbnailUrl: liveEvent.pictures?.sizes?.[0]?.link,
        streamUrl: liveEvent.link,
        platform: 'vimeo'
      };
    }

    return { isLive: false, platform: 'vimeo' };
  } catch (error) {
    logError('Error checking Vimeo live status:', error);
    return { isLive: false, platform: 'vimeo' };
  }
});

// Get upcoming Vimeo events
export const getUpcomingVimeoEvents = cache(async (userId: string): Promise<ScheduledStream[]> => {
  if (!process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.vimeo.com/users/${userId}/live_events?filter=scheduled`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
          'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming Vimeo events');
    }

    const data = await response.json();

    return data.data?.map((event: any) => ({
      id: event.uri.split('/').pop(),
      title: event.name,
      description: event.description || '',
      scheduledTime: new Date(event.scheduled_start_time),
      thumbnailUrl: event.pictures?.sizes?.[0]?.link,
      platform: 'vimeo' as const
    })) || [];
  } catch (error) {
    logError('Error fetching upcoming Vimeo events:', error);
    return [];
  }
});

// Combined stream checker
export const checkStreamStatus = cache(async (): Promise<StreamStatus> => {
  const youtubeChannelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  const vimeoUserId = process.env.NEXT_PUBLIC_VIMEO_USER_ID;

  // Check YouTube first
  if (youtubeChannelId) {
    const youtubeStatus = await checkYouTubeLiveStatus(youtubeChannelId);
    if (youtubeStatus.isLive) {
      return youtubeStatus;
    }
  }

  // Then check Vimeo
  if (vimeoUserId) {
    const vimeoStatus = await checkVimeoLiveStatus(vimeoUserId);
    if (vimeoStatus.isLive) {
      return vimeoStatus;
    }
  }

  // Return the first configured platform as not live
  if (youtubeChannelId) {
    return { isLive: false, platform: 'youtube' };
  } else if (vimeoUserId) {
    return { isLive: false, platform: 'vimeo' };
  }

  return { isLive: false, platform: 'none' };
});

// Get all upcoming streams
export const getUpcomingStreams = cache(async (): Promise<ScheduledStream[]> => {
  const streams: ScheduledStream[] = [];

  const youtubeChannelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  const vimeoUserId = process.env.NEXT_PUBLIC_VIMEO_USER_ID;

  if (youtubeChannelId) {
    const youtubeStreams = await getUpcomingYouTubeStreams(youtubeChannelId);
    streams.push(...youtubeStreams);
  }

  if (vimeoUserId) {
    const vimeoEvents = await getUpcomingVimeoEvents(vimeoUserId);
    streams.push(...vimeoEvents);
  }

  // Sort by scheduled time
  return streams.sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
});

// Embed URL generators
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
}

export function getVimeoEmbedUrl(videoId: string): string {
  return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
}

// Format viewer count
export function formatViewerCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
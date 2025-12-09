// Prayer Wall utilities with real-time support
import { EventEmitter } from 'events';

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  category: 'healing' | 'guidance' | 'thanksgiving' | 'salvation' | 'provision' | 'other';
  isAnonymous: boolean;
  isPublic: boolean;
  approved: boolean;
  prayerCount: number;
  submittedAt: Date;
  updatedAt: Date;
  userId?: string;
  userEmail?: string;
}

export interface PrayerInteraction {
  requestId: string;
  userId: string;
  type: 'prayed' | 'commented';
  timestamp: Date;
}

export interface PrayerComment {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: Date;
  approved: boolean;
}

// Event emitter for real-time updates
class PrayerWallEvents extends EventEmitter {
  private static instance: PrayerWallEvents;

  private constructor() {
    super();
    this.setMaxListeners(100); // Allow many listeners for real-time updates
  }

  static getInstance(): PrayerWallEvents {
    if (!PrayerWallEvents.instance) {
      PrayerWallEvents.instance = new PrayerWallEvents();
    }
    return PrayerWallEvents.instance;
  }

  // Emit new prayer request
  emitNewRequest(request: PrayerRequest) {
    this.emit('new-request', request);
  }

  // Emit prayer count update
  emitPrayerCountUpdate(requestId: string, newCount: number) {
    this.emit('prayer-count-update', { requestId, newCount });
  }

  // Emit new comment
  emitNewComment(comment: PrayerComment) {
    this.emit('new-comment', comment);
  }

  // Emit request approval
  emitRequestApproval(requestId: string) {
    this.emit('request-approved', requestId);
  }
}

export const prayerEvents = PrayerWallEvents.getInstance();

// Mock database for prayer requests (would use real DB in production)
let mockPrayerRequests: PrayerRequest[] = [
  {
    id: '1',
    name: 'Sarah M.',
    request: 'Please pray for my mother who is going through cancer treatment. We believe in God\'s healing power.',
    category: 'healing',
    isAnonymous: false,
    isPublic: true,
    approved: true,
    prayerCount: 42,
    submittedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Anonymous',
    request: 'Seeking God\'s guidance for an important career decision. I want to follow His will for my life.',
    category: 'guidance',
    isAnonymous: true,
    isPublic: true,
    approved: true,
    prayerCount: 28,
    submittedAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'John D.',
    request: 'Thank you Lord for answering our prayers! My son got accepted into college with a full scholarship.',
    category: 'thanksgiving',
    isAnonymous: false,
    isPublic: true,
    approved: true,
    prayerCount: 65,
    submittedAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  }
];

// Get all approved public prayer requests
export async function getPublicPrayerRequests(): Promise<PrayerRequest[]> {
  // In production, this would fetch from database
  return mockPrayerRequests.filter(r => r.isPublic && r.approved);
}

// Get prayer requests by category
export async function getPrayerRequestsByCategory(category: PrayerRequest['category']): Promise<PrayerRequest[]> {
  return mockPrayerRequests.filter(r => r.category === category && r.isPublic && r.approved);
}

// Submit a new prayer request
export async function submitPrayerRequest(
  request: Omit<PrayerRequest, 'id' | 'prayerCount' | 'submittedAt' | 'updatedAt'>
): Promise<PrayerRequest> {
  const newRequest: PrayerRequest = {
    ...request,
    id: Date.now().toString(),
    prayerCount: 0,
    submittedAt: new Date(),
    updatedAt: new Date()
  };

  // Add to mock database
  mockPrayerRequests.push(newRequest);

  // Emit real-time event if approved
  if (newRequest.approved && newRequest.isPublic) {
    prayerEvents.emitNewRequest(newRequest);
  }

  return newRequest;
}

// Increment prayer count
export async function incrementPrayerCount(requestId: string, userId: string): Promise<number> {
  const request = mockPrayerRequests.find(r => r.id === requestId);
  if (!request) {
    throw new Error('Prayer request not found');
  }

  // Check if user already prayed (would use session/database in production)
  const hasAlreadyPrayed = await checkUserPrayed(requestId, userId);
  if (hasAlreadyPrayed) {
    return request.prayerCount;
  }

  // Increment count
  request.prayerCount++;
  request.updatedAt = new Date();

  // Emit real-time update
  prayerEvents.emitPrayerCountUpdate(requestId, request.prayerCount);

  // Record interaction (would save to database)
  await recordPrayerInteraction(requestId, userId);

  return request.prayerCount;
}

// Check if user has already prayed for a request
async function checkUserPrayed(requestId: string, userId: string): Promise<boolean> {
  // In production, check database for existing interaction
  // For now, return false to allow multiple prayers
  return false;
}

// Record prayer interaction
async function recordPrayerInteraction(requestId: string, userId: string): Promise<void> {
  // In production, save to database
  const interaction: PrayerInteraction = {
    requestId,
    userId,
    type: 'prayed',
    timestamp: new Date()
  };
  // Save interaction
}

// Approve a prayer request (admin function)
export async function approvePrayerRequest(requestId: string): Promise<void> {
  const request = mockPrayerRequests.find(r => r.id === requestId);
  if (!request) {
    throw new Error('Prayer request not found');
  }

  request.approved = true;
  request.updatedAt = new Date();

  // Emit approval event
  if (request.isPublic) {
    prayerEvents.emitRequestApproval(requestId);
    prayerEvents.emitNewRequest(request);
  }
}

// Get prayer request statistics
export async function getPrayerWallStats() {
  const publicRequests = await getPublicPrayerRequests();

  return {
    totalRequests: publicRequests.length,
    totalPrayers: publicRequests.reduce((sum, r) => sum + r.prayerCount, 0),
    categoryCounts: publicRequests.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    recentRequests: publicRequests
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
      .slice(0, 5)
  };
}

// Search prayer requests
export async function searchPrayerRequests(query: string): Promise<PrayerRequest[]> {
  const lowerQuery = query.toLowerCase();
  return mockPrayerRequests.filter(r =>
    r.isPublic &&
    r.approved &&
    (r.request.toLowerCase().includes(lowerQuery) ||
     r.name.toLowerCase().includes(lowerQuery))
  );
}

// Get trending prayer requests (most prayed for in last 7 days)
export async function getTrendingPrayerRequests(): Promise<PrayerRequest[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return mockPrayerRequests
    .filter(r =>
      r.isPublic &&
      r.approved &&
      r.submittedAt >= sevenDaysAgo
    )
    .sort((a, b) => b.prayerCount - a.prayerCount)
    .slice(0, 5);
}

// Category information
export const prayerCategories = {
  healing: {
    name: 'Healing',
    icon: '🏥',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  guidance: {
    name: 'Guidance',
    icon: '🧭',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  thanksgiving: {
    name: 'Thanksgiving',
    icon: '🙏',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  salvation: {
    name: 'Salvation',
    icon: '✝️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  provision: {
    name: 'Provision',
    icon: '🍞',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  other: {
    name: 'Other',
    icon: '📿',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
};
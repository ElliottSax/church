// API Client with mock support for static deployment

const IS_STATIC = process.env.NEXT_PUBLIC_API_MOCK === 'true';

// Mock data for static deployment
const MOCK_DATA = {
  '/api/events/register': {
    success: true,
    registration: {
      id: 'mock-reg-001',
      confirmationCode: 'MOCK-12345',
      status: 'confirmed',
    },
    message: 'This is a demo registration. In production, this would connect to a real backend.',
  },
  '/api/calendar/bible-study': {
    groups: [
      {
        id: 'bs-demo',
        name: 'Demo Bible Study Group',
        leader: 'Demo Leader',
        schedule: 'Fridays, 7:00 PM',
        location: 'Room 101',
        spotsAvailable: 10,
        maxCapacity: 20,
        fillPercentage: 50,
        currentMembers: 10,
      },
    ],
    total: 1,
  },
  '/api/calendar/events': {
    events: [],
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    total: 0,
  },
  '/api/admin/stats': {
    members: { total: 250, newThisMonth: 12, active: 185 },
    events: { upcoming: 8, totalRsvps: 145, thisWeek: 3 },
    donations: { monthTotal: 12500, yearTotal: 145000, averageDonation: 125 },
  },
};

// API wrapper that returns mock data for static deployment
export async function apiRequest<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  // For static deployment, return mock data
  if (IS_STATIC) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get base path from URL
    const basePath = url.split('?')[0];

    // Return mock data if available
    if (MOCK_DATA[basePath as keyof typeof MOCK_DATA]) {
      return MOCK_DATA[basePath as keyof typeof MOCK_DATA] as T;
    }

    // Default mock response
    return {
      success: true,
      message: 'This is a demo. In production, this would connect to a real backend.',
      data: null
    } as T;
  }

  // For development/production with real backend
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);

    // Fallback to mock data in case of error
    const basePath = url.split('?')[0];
    if (MOCK_DATA[basePath as keyof typeof MOCK_DATA]) {
      return MOCK_DATA[basePath as keyof typeof MOCK_DATA] as T;
    }

    throw error;
  }
}

// Helper to check if we're in static mode
export function isStaticMode(): boolean {
  return IS_STATIC;
}
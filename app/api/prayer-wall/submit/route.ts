import { NextResponse } from 'next/server';
import { submitPrayerRequest } from '@/lib/prayer-wall';
import { logger, logError, logWarn } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.request || data.request.trim().length < 10) {
      return NextResponse.json(
        { error: 'Prayer request must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Submit the prayer request
    const newRequest = await submitPrayerRequest({
      name: data.isAnonymous ? 'Anonymous' : (data.name || 'Anonymous'),
      request: data.request,
      category: data.category || 'other',
      isAnonymous: data.isAnonymous || false,
      isPublic: data.isPublic !== false, // Default to true
      approved: false, // Require moderation
      userEmail: data.email
    });

    return NextResponse.json(newRequest);
  } catch (error) {
    logError('Error submitting prayer request:', error);
    return NextResponse.json(
      { error: 'Failed to submit prayer request' },
      { status: 500 }
    );
  }
}
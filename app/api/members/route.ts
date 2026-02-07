import { NextResponse } from 'next/server';
import { getAllMembers, getPublicMembers, searchMembers } from '@/lib/members';
import { logger, logError, logWarn } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isPublic = searchParams.get('public') === 'true';
  const query = searchParams.get('q');

  try {
    // Note: Auth is disabled for static deployment
    // In production, implement proper authentication

    let members;
    if (query) {
      members = await searchMembers(query);
    } else if (isPublic) {
      members = await getPublicMembers();
    } else {
      members = await getAllMembers();
    }

    // Filter sensitive information for public access
    if (isPublic) {
      members = members.map(member => ({
        id: member.id,
        displayName: member.displayName,
        email: member.email,
        membershipStatus: member.membershipStatus,
        skills: member.skills,
        interests: member.interests,
        ministries: member.ministries,
        photo: member.photo,
      }));
    }

    return NextResponse.json(members);
  } catch (error) {
    logError('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
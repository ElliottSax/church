import { NextResponse } from 'next/server';
import { checkEventCapacity } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const capacity = await checkEventCapacity(params.id);
    return NextResponse.json(capacity);
  } catch (error) {
    console.error('Error checking event capacity:', error);
    return NextResponse.json(
      { error: 'Failed to check event capacity' },
      { status: 500 }
    );
  }
}
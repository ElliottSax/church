import { NextRequest, NextResponse } from 'next/server';
import { logger, logError, logWarn } from '@/lib/logger';

// Type definitions
interface BibleStudyGroup {
  id: string;
  name: string;
  leader: string;
  schedule: string;
  location: string;
  description: string;
  currentBook: string;
  spotsAvailable: number;
  maxCapacity: number;
  startDate?: string;
  endDate?: string;
  materials?: string[];
  prerequisites?: string;
  ageGroup?: string;
  isOnline?: boolean;
  zoomLink?: string;
  registeredMembers?: string[];
}

interface Registration {
  groupId: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  registrationDate: string;
}

// Available Bible Study Groups
const bibleStudyGroups: BibleStudyGroup[] = [
  {
    id: "bs-new-testament",
    name: "New Testament Survey",
    leader: "Dr. James Wilson",
    schedule: "Mondays, 7:00 PM - 8:30 PM",
    location: "Room 204",
    description: "A comprehensive journey through all 27 books of the New Testament",
    currentBook: "Gospel of John",
    spotsAvailable: 5,
    maxCapacity: 20,
    startDate: "2024-01-08",
    endDate: "2024-06-24",
    materials: ["Study Bible", "Notebook", "Course workbook ($15)"],
    prerequisites: "None - all welcome!",
    ageGroup: "Adults",
  },
  {
    id: "bs-womens-heart",
    name: "Women's Heart to Heart",
    leader: "Sarah Miller",
    schedule: "Tuesdays, 10:00 AM - 11:30 AM",
    location: "Room 201",
    description: "Women gathering for fellowship, prayer, and studying God's Word together",
    currentBook: "Proverbs 31 - The Virtuous Woman",
    spotsAvailable: 8,
    maxCapacity: 15,
    materials: ["Study guide ($10)", "Journal"],
    prerequisites: "Women only",
    ageGroup: "Women",
    isOnline: true,
    zoomLink: "Available upon registration",
  },
  {
    id: "bs-marriage",
    name: "Marriage & Family",
    leader: "Tom & Lisa Anderson",
    schedule: "Fridays, 7:00 PM - 8:30 PM",
    location: "Conference Room",
    description: "Biblical principles for strong marriages and godly families",
    currentBook: "Love & Respect by Dr. Emerson Eggerichs",
    spotsAvailable: 3,
    maxCapacity: 12,
    materials: ["Book - Love & Respect ($15)", "Workbook ($10)"],
    prerequisites: "Married couples or engaged",
    ageGroup: "Couples",
  },
  {
    id: "bs-foundations",
    name: "Foundations of Faith",
    leader: "Pastor John Smith",
    schedule: "Thursdays, 6:30 PM - 8:00 PM",
    location: "Chapel",
    description: "Essential Christian doctrines for new believers and those wanting to deepen their faith",
    currentBook: "Basic Christianity by John Stott",
    spotsAvailable: 10,
    maxCapacity: 25,
    materials: ["Bible", "Basic Christianity book ($12)"],
    prerequisites: "Perfect for new believers",
    ageGroup: "Adults",
  },
  {
    id: "bs-senior-saints",
    name: "Senior Saints",
    leader: "Bob Thompson",
    schedule: "Thursdays, 10:00 AM - 11:30 AM",
    location: "Library",
    description: "Bible study tailored for our senior members with fellowship time",
    currentBook: "Psalms - Songs of Comfort and Joy",
    spotsAvailable: 6,
    maxCapacity: 15,
    materials: ["Large print Bible available"],
    prerequisites: "Ages 60+",
    ageGroup: "Seniors",
  },
  {
    id: "bs-young-adults",
    name: "Young Adults Study",
    leader: "Pastor Mike Davis",
    schedule: "Fridays, 7:00 PM - 9:00 PM",
    location: "Coffee House",
    description: "Relevant Bible study for young adults navigating faith, career, and relationships",
    currentBook: "The Purpose Driven Life by Rick Warren",
    spotsAvailable: 8,
    maxCapacity: 25,
    materials: ["The Purpose Driven Life book ($15)"],
    prerequisites: "Ages 18-30",
    ageGroup: "Young Adults",
    isOnline: true,
    zoomLink: "Hybrid - join in person or online",
  },
  {
    id: "bs-mens-armor",
    name: "Men's Armor Bearer",
    leader: "David Brown",
    schedule: "Tuesdays, 6:00 AM - 7:00 AM",
    location: "Room 103",
    description: "Early morning men's study on spiritual warfare and leadership",
    currentBook: "The Armor of God by Priscilla Shirer",
    spotsAvailable: 7,
    maxCapacity: 25,
    materials: ["Study book ($18)", "Coffee provided!"],
    prerequisites: "Men only",
    ageGroup: "Men",
  },
  {
    id: "bs-grief-share",
    name: "GriefShare Support Group",
    leader: "Pastor Sarah Johnson",
    schedule: "Mondays, 6:30 PM - 8:00 PM",
    location: "Room 105",
    description: "Biblical support group for those grieving the loss of a loved one",
    currentBook: "GriefShare curriculum",
    spotsAvailable: 12,
    maxCapacity: 15,
    materials: ["GriefShare workbook ($20)"],
    prerequisites: "Open to anyone experiencing grief",
    ageGroup: "Adults",
  },
  {
    id: "bs-parenting",
    name: "Parenting with Purpose",
    leader: "Mark & Jennifer Lee",
    schedule: "Sundays, 5:00 PM - 6:30 PM",
    location: "Room 202",
    description: "Biblical parenting strategies for raising godly children",
    currentBook: "Parenting by Paul David Tripp",
    spotsAvailable: 5,
    maxCapacity: 20,
    materials: ["Parenting book ($16)", "Childcare provided"],
    prerequisites: "Parents with children at home",
    ageGroup: "Parents",
  },
  {
    id: "bs-revelation",
    name: "Understanding Revelation",
    leader: "Dr. Robert King",
    schedule: "Wednesdays, 6:00 PM - 7:00 PM",
    location: "Room 301",
    description: "In-depth study of the book of Revelation",
    currentBook: "Revelation",
    spotsAvailable: 2,
    maxCapacity: 15,
    materials: ["Study Bible", "Commentary provided"],
    prerequisites: "Some Bible knowledge helpful",
    ageGroup: "Adults",
  },
];

// GET endpoint to fetch all bible study groups or filter by criteria
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ageGroup = searchParams.get('ageGroup');
    const day = searchParams.get('day');
    const hasSpace = searchParams.get('hasSpace');
    const isOnline = searchParams.get('isOnline');

    let groups = [...bibleStudyGroups];

    // Filter by age group
    if (ageGroup && ageGroup !== 'all') {
      groups = groups.filter(group =>
        group.ageGroup?.toLowerCase() === ageGroup.toLowerCase()
      );
    }

    // Filter by day of week
    if (day) {
      groups = groups.filter(group =>
        group.schedule.toLowerCase().includes(day.toLowerCase())
      );
    }

    // Filter by availability
    if (hasSpace === 'true') {
      groups = groups.filter(group => group.spotsAvailable > 0);
    }

    // Filter by online availability
    if (isOnline === 'true') {
      groups = groups.filter(group => group.isOnline === true);
    }

    // Calculate fill percentage for each group
    const groupsWithStats = groups.map(group => ({
      ...group,
      fillPercentage: Math.round(
        ((group.maxCapacity - group.spotsAvailable) / group.maxCapacity) * 100
      ),
      currentMembers: group.maxCapacity - group.spotsAvailable,
    }));

    return NextResponse.json({
      groups: groupsWithStats,
      total: groupsWithStats.length,
      totalSpots: groupsWithStats.reduce((sum, g) => sum + g.spotsAvailable, 0),
      categories: {
        adults: groupsWithStats.filter(g => g.ageGroup === 'Adults').length,
        women: groupsWithStats.filter(g => g.ageGroup === 'Women').length,
        men: groupsWithStats.filter(g => g.ageGroup === 'Men').length,
        couples: groupsWithStats.filter(g => g.ageGroup === 'Couples').length,
        youngAdults: groupsWithStats.filter(g => g.ageGroup === 'Young Adults').length,
        seniors: groupsWithStats.filter(g => g.ageGroup === 'Seniors').length,
        parents: groupsWithStats.filter(g => g.ageGroup === 'Parents').length,
      },
    });
  } catch (error) {
    logError('Error fetching bible study groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bible study groups' },
      { status: 500 }
    );
  }
}

// Helper function to fetch a specific bible study group (internal use only)
async function getGroupById(groupId: string) {
  const group = bibleStudyGroups.find(g => g.id === groupId);

  if (!group) {
    return NextResponse.json(
      { error: 'Bible study group not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    group: {
      ...group,
      fillPercentage: Math.round(
        ((group.maxCapacity - group.spotsAvailable) / group.maxCapacity) * 100
      ),
      currentMembers: group.maxCapacity - group.spotsAvailable,
    }
  });
}

// POST endpoint to register for a bible study group
export async function POST(request: NextRequest) {
  try {
    const data: Registration = await request.json();

    // Validate required fields
    if (!data.groupId || !data.name || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields: groupId, name, and email are required' },
        { status: 400 }
      );
    }

    // Find the group
    const groupIndex = bibleStudyGroups.findIndex(g => g.id === data.groupId);
    if (groupIndex === -1) {
      return NextResponse.json(
        { error: 'Bible study group not found' },
        { status: 404 }
      );
    }

    const group = bibleStudyGroups[groupIndex];

    // Check if there are spots available
    if (group.spotsAvailable <= 0) {
      return NextResponse.json(
        { error: 'This bible study group is full. Please join the waiting list.' },
        { status: 400 }
      );
    }

    // In a real application, this would:
    // 1. Save the registration to a database
    // 2. Send confirmation email
    // 3. Update the group's available spots
    // 4. Add to calendar

    // For demo, we'll just simulate the registration
    const registration = {
      ...data,
      registrationDate: new Date().toISOString(),
      confirmationNumber: `BSG-${Date.now().toString(36).toUpperCase()}`,
      groupDetails: {
        name: group.name,
        leader: group.leader,
        schedule: group.schedule,
        location: group.location,
        startDate: group.startDate,
      },
    };

    // Simulate updating available spots
    bibleStudyGroups[groupIndex].spotsAvailable--;

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for bible study group',
      registration,
      groupInfo: {
        name: group.name,
        schedule: group.schedule,
        location: group.location,
        materials: group.materials,
        zoomLink: group.isOnline ? group.zoomLink : null,
      },
    });
  } catch (error) {
    logError('Error registering for bible study:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to cancel registration
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const groupId = searchParams.get('groupId');
    const email = searchParams.get('email');

    if (!groupId || !email) {
      return NextResponse.json(
        { error: 'groupId and email are required' },
        { status: 400 }
      );
    }

    // Find the group
    const groupIndex = bibleStudyGroups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) {
      return NextResponse.json(
        { error: 'Bible study group not found' },
        { status: 404 }
      );
    }

    // In a real application, this would:
    // 1. Verify the registration exists
    // 2. Remove from database
    // 3. Send cancellation email
    // 4. Update available spots

    // Simulate updating available spots
    bibleStudyGroups[groupIndex].spotsAvailable++;

    return NextResponse.json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    logError('Error cancelling registration:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}
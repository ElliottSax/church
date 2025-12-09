// Member directory and management utilities
import { cache } from 'react';

export interface Member {
  id: string;
  userId?: string; // Links to authentication user
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  photo?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
  membershipStatus: 'visitor' | 'regular' | 'member' | 'inactive';
  memberSince?: Date;
  baptismDate?: Date;
  salvationDate?: Date;
  familyMembers?: string[]; // IDs of family members
  occupation?: string;
  employer?: string;
  skills?: string[];
  interests?: string[];
  spiritualGifts?: string[];
  ministries?: string[]; // Ministry IDs they're involved in
  smallGroups?: string[]; // Small group IDs
  volunteerRoles?: string[];
  preferredContactMethod?: 'email' | 'phone' | 'text' | 'mail';
  communicationPreferences?: {
    newsletter: boolean;
    eventNotifications: boolean;
    prayerRequests: boolean;
    volunteerOpportunities: boolean;
    birthdayAnnouncements: boolean;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  notes?: string;
  tags?: string[];
  isActive: boolean;
  isPublic: boolean; // Show in public directory
  createdAt: Date;
  updatedAt: Date;
}

export interface SmallGroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'bible_study' | 'prayer' | 'fellowship' | 'support' | 'service' | 'discipleship';
  leaderId: string; // Member ID
  coLeaders?: string[]; // Member IDs
  members: string[]; // Member IDs
  meetingSchedule: {
    day: string;
    time: string;
    frequency: 'weekly' | 'biweekly' | 'monthly';
    location?: string;
    isOnline?: boolean;
    zoomLink?: string;
  };
  maxCapacity?: number;
  ageRange?: {
    min?: number;
    max?: number;
  };
  gender?: 'male' | 'female' | 'mixed';
  childcareProvided?: boolean;
  materials?: string;
  cost?: string;
  startDate?: Date;
  endDate?: Date;
  isOpen: boolean; // Open for new members
  isActive: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  eventId?: string;
  serviceType: 'sunday' | 'wednesday' | 'special' | 'small_group';
  date: Date;
  present: boolean;
  notes?: string;
}

// Mock data for development
const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    displayName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    membershipStatus: 'member',
    memberSince: new Date('2020-01-15'),
    baptismDate: new Date('2020-06-01'),
    skills: ['Music', 'Teaching', 'Technology'],
    ministries: ['worship', 'youth'],
    isActive: true,
    isPublic: true,
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    firstName: 'Mary',
    lastName: 'Johnson',
    displayName: 'Mary Johnson',
    email: 'mary.johnson@example.com',
    phone: '(555) 234-5678',
    membershipStatus: 'member',
    memberSince: new Date('2019-03-20'),
    skills: ['Administration', 'Hospitality', 'Prayer'],
    ministries: ['womens', 'prayer'],
    smallGroups: ['1'],
    isActive: true,
    isPublic: true,
    createdAt: new Date('2019-03-20'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Williams',
    displayName: 'David Williams',
    email: 'david.williams@example.com',
    membershipStatus: 'regular',
    skills: ['Finance', 'Leadership'],
    interests: ['Bible Study', 'Community Service'],
    isActive: true,
    isPublic: false,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-01-01'),
  },
];

const mockSmallGroups: SmallGroup[] = [
  {
    id: '1',
    name: 'Tuesday Night Bible Study',
    slug: 'tuesday-bible-study',
    description: 'An in-depth study of Scripture with fellowship and prayer.',
    category: 'bible_study',
    leaderId: '2',
    members: ['2', '3'],
    meetingSchedule: {
      day: 'Tuesday',
      time: '7:00 PM',
      frequency: 'weekly',
      location: 'Church Library',
    },
    maxCapacity: 12,
    isOpen: true,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Member directory functions
export const getAllMembers = cache(async (): Promise<Member[]> => {
  // In production, fetch from database
  return mockMembers.filter(m => m.isActive);
});

export const getPublicMembers = cache(async (): Promise<Member[]> => {
  return mockMembers.filter(m => m.isActive && m.isPublic);
});

export const getMemberById = async (id: string): Promise<Member | null> => {
  return mockMembers.find(m => m.id === id) || null;
};

export const getMemberByEmail = async (email: string): Promise<Member | null> => {
  return mockMembers.find(m => m.email === email) || null;
};

export const searchMembers = cache(async (query: string): Promise<Member[]> => {
  const lowerQuery = query.toLowerCase();
  return mockMembers.filter(m =>
    m.isActive &&
    (m.firstName.toLowerCase().includes(lowerQuery) ||
     m.lastName.toLowerCase().includes(lowerQuery) ||
     m.displayName.toLowerCase().includes(lowerQuery) ||
     m.email.toLowerCase().includes(lowerQuery) ||
     m.skills?.some(s => s.toLowerCase().includes(lowerQuery)) ||
     m.interests?.some(i => i.toLowerCase().includes(lowerQuery)))
  );
});

export const getMembersByMinistry = cache(async (ministryId: string): Promise<Member[]> => {
  return mockMembers.filter(m =>
    m.isActive && m.ministries?.includes(ministryId)
  );
});

export const getMembersBySmallGroup = cache(async (groupId: string): Promise<Member[]> => {
  return mockMembers.filter(m =>
    m.isActive && m.smallGroups?.includes(groupId)
  );
});

export const getMembersBySkill = cache(async (skill: string): Promise<Member[]> => {
  return mockMembers.filter(m =>
    m.isActive && m.skills?.includes(skill)
  );
});

// Small group functions
export const getAllSmallGroups = cache(async (): Promise<SmallGroup[]> => {
  return mockSmallGroups.filter(g => g.isActive);
});

export const getOpenSmallGroups = cache(async (): Promise<SmallGroup[]> => {
  return mockSmallGroups.filter(g => g.isActive && g.isOpen);
});

export const getSmallGroupById = async (id: string): Promise<SmallGroup | null> => {
  return mockSmallGroups.find(g => g.id === id) || null;
};

export const getSmallGroupsByCategory = cache(async (category: SmallGroup['category']): Promise<SmallGroup[]> => {
  return mockSmallGroups.filter(g =>
    g.isActive && g.category === category
  );
});

export const joinSmallGroup = async (groupId: string, memberId: string): Promise<boolean> => {
  const group = await getSmallGroupById(groupId);
  if (!group || !group.isOpen) {
    return false;
  }

  if (group.maxCapacity && group.members.length >= group.maxCapacity) {
    return false;
  }

  if (!group.members.includes(memberId)) {
    group.members.push(memberId);
    group.updatedAt = new Date();
    // In production, save to database
    return true;
  }

  return false;
};

// Member statistics
export const getMemberStats = cache(async () => {
  const allMembers = await getAllMembers();
  const activeMembers = allMembers.filter(m => m.membershipStatus === 'member');
  const regularAttenders = allMembers.filter(m => m.membershipStatus === 'regular');
  const visitors = allMembers.filter(m => m.membershipStatus === 'visitor');

  return {
    total: allMembers.length,
    members: activeMembers.length,
    regular: regularAttenders.length,
    visitors: visitors.length,
    newThisMonth: allMembers.filter(m => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return m.createdAt >= oneMonthAgo;
    }).length,
    baptizedThisYear: allMembers.filter(m => {
      if (!m.baptismDate) return false;
      const thisYear = new Date().getFullYear();
      return m.baptismDate.getFullYear() === thisYear;
    }).length,
  };
});

// Family connections
export const getFamilyMembers = async (memberId: string): Promise<Member[]> => {
  const member = await getMemberById(memberId);
  if (!member || !member.familyMembers) {
    return [];
  }

  const family = await Promise.all(
    member.familyMembers.map(id => getMemberById(id))
  );

  return family.filter(m => m !== null) as Member[];
};

// Birthday and anniversary tracking
export const getUpcomingBirthdays = cache(async (days: number = 30): Promise<Member[]> => {
  const today = new Date();
  const members = await getAllMembers();

  return members.filter(m => {
    if (!m.dateOfBirth) return false;

    const birthday = new Date(m.dateOfBirth);
    birthday.setFullYear(today.getFullYear());

    // Handle year boundary
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntil = Math.ceil((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= days;
  }).sort((a, b) => {
    if (!a.dateOfBirth || !b.dateOfBirth) return 0;
    return a.dateOfBirth.getDate() - b.dateOfBirth.getDate();
  });
});

// Communication preferences
export const getMembersForCommunication = cache(async (type: keyof Member['communicationPreferences']): Promise<Member[]> => {
  const members = await getAllMembers();
  return members.filter(m =>
    m.communicationPreferences?.[type] !== false
  );
});

// Skills and volunteer matching
export const findVolunteersWithSkills = cache(async (skills: string[]): Promise<Member[]> => {
  const members = await getAllMembers();
  return members.filter(m =>
    m.skills?.some(skill => skills.includes(skill))
  ).sort((a, b) => {
    // Sort by number of matching skills
    const aMatches = a.skills?.filter(s => skills.includes(s)).length || 0;
    const bMatches = b.skills?.filter(s => skills.includes(s)).length || 0;
    return bMatches - aMatches;
  });
});

// Export member data (for reports/exports)
export const exportMemberData = async (memberIds?: string[]): Promise<any[]> => {
  let members = await getAllMembers();

  if (memberIds) {
    members = members.filter(m => memberIds.includes(m.id));
  }

  return members.map(m => ({
    name: m.displayName,
    email: m.email,
    phone: m.phone,
    membershipStatus: m.membershipStatus,
    memberSince: m.memberSince?.toISOString().split('T')[0],
    ministries: m.ministries?.join(', '),
    skills: m.skills?.join(', '),
  }));
};
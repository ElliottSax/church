// Volunteer management and scheduling utilities
import { cache } from 'react';

export interface VolunteerRole {
  id: string;
  name: string;
  description: string;
  ministry: string;
  requirements?: string[];
  training?: string;
  commitment: 'one-time' | 'weekly' | 'monthly' | 'as-needed';
  minAge?: number;
  backgroundCheckRequired: boolean;
  skills?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerShift {
  id: string;
  roleId: string;
  eventId?: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  spotsNeeded: number;
  spotsFilled: number;
  volunteers: VolunteerAssignment[];
  status: 'open' | 'filled' | 'cancelled';
  notes?: string;
  reminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerAssignment {
  id: string;
  volunteerId: string; // Member ID
  volunteerName: string;
  shiftId: string;
  roleId: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'no-show' | 'cancelled';
  checkedIn: boolean;
  checkedInTime?: Date;
  checkedOutTime?: Date;
  notes?: string;
  rating?: number; // 1-5 rating for the volunteer's performance
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerAvailability {
  id: string;
  volunteerId: string;
  dayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime?: string;
  endTime?: string;
  blackoutDates?: Date[];
  preferredRoles?: string[];
  maxShiftsPerWeek?: number;
  notes?: string;
}

export interface VolunteerProfile {
  memberId: string;
  memberName: string;
  roles: string[]; // Role IDs they're approved for
  totalHours: number;
  shiftsCompleted: number;
  shiftsNoShow: number;
  averageRating?: number;
  lastVolunteered?: Date;
  availability: VolunteerAvailability;
  certifications?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  isActive: boolean;
  notes?: string;
}

export interface VolunteerSchedule {
  weekStarting: Date;
  shifts: {
    [date: string]: VolunteerShift[];
  };
  unfilledShifts: number;
  totalVolunteers: number;
}

// Mock data
const mockRoles: VolunteerRole[] = [
  {
    id: '1',
    name: 'Worship Team',
    description: 'Lead worship through music and song',
    ministry: 'Worship',
    requirements: ['Musical ability', 'Regular attendance'],
    commitment: 'weekly',
    backgroundCheckRequired: false,
    skills: ['Music', 'Singing', 'Instruments'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Children\'s Ministry Teacher',
    description: 'Teach and care for children during services',
    ministry: 'Children',
    requirements: ['Background check', 'Child safety training'],
    training: 'Required child safety training course',
    commitment: 'weekly',
    minAge: 18,
    backgroundCheckRequired: true,
    skills: ['Teaching', 'Child care'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Greeter',
    description: 'Welcome members and visitors',
    ministry: 'Hospitality',
    commitment: 'weekly',
    backgroundCheckRequired: false,
    skills: ['Hospitality', 'Communication'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Tech Team',
    description: 'Manage sound, lighting, and live stream',
    ministry: 'Technology',
    requirements: ['Basic computer skills'],
    commitment: 'weekly',
    backgroundCheckRequired: false,
    skills: ['Technology', 'Audio/Video', 'Computers'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

const mockShifts: VolunteerShift[] = [
  {
    id: '1',
    roleId: '1',
    title: 'Sunday Worship Team',
    date: new Date('2024-02-04'),
    startTime: '09:00',
    endTime: '12:00',
    location: 'Main Sanctuary',
    spotsNeeded: 5,
    spotsFilled: 3,
    volunteers: [],
    status: 'open',
    reminderSent: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    roleId: '2',
    title: 'Sunday School Teachers',
    date: new Date('2024-02-04'),
    startTime: '09:30',
    endTime: '11:00',
    location: 'Children\'s Wing',
    spotsNeeded: 4,
    spotsFilled: 2,
    volunteers: [],
    status: 'open',
    reminderSent: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

const mockProfiles: VolunteerProfile[] = [];

// Volunteer role functions
export const getAllRoles = cache(async (): Promise<VolunteerRole[]> => {
  return mockRoles.filter(r => r.isActive);
});

export const getRoleById = async (id: string): Promise<VolunteerRole | null> => {
  return mockRoles.find(r => r.id === id) || null;
};

export const getRolesByMinistry = cache(async (ministry: string): Promise<VolunteerRole[]> => {
  return mockRoles.filter(r => r.ministry === ministry && r.isActive);
});

// Shift management
export const getUpcomingShifts = cache(async (days: number = 30): Promise<VolunteerShift[]> => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  return mockShifts.filter(s =>
    s.date >= new Date() &&
    s.date <= endDate &&
    s.status !== 'cancelled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
});

export const getShiftById = async (id: string): Promise<VolunteerShift | null> => {
  return mockShifts.find(s => s.id === id) || null;
};

export const getOpenShifts = cache(async (): Promise<VolunteerShift[]> => {
  return mockShifts.filter(s =>
    s.status === 'open' &&
    s.spotsFilled < s.spotsNeeded &&
    s.date >= new Date()
  );
});

export const getShiftsByRole = cache(async (roleId: string): Promise<VolunteerShift[]> => {
  return mockShifts.filter(s => s.roleId === roleId);
});

export const getShiftsByDate = cache(async (date: Date): Promise<VolunteerShift[]> => {
  const dateStr = date.toDateString();
  return mockShifts.filter(s => s.date.toDateString() === dateStr);
});

// Volunteer assignment
export async function assignVolunteer(
  shiftId: string,
  volunteerId: string,
  volunteerName: string
): Promise<VolunteerAssignment | null> {
  const shift = await getShiftById(shiftId);
  if (!shift || shift.spotsFilled >= shift.spotsNeeded) {
    return null;
  }

  const assignment: VolunteerAssignment = {
    id: Date.now().toString(),
    volunteerId,
    volunteerName,
    shiftId,
    roleId: shift.roleId,
    status: 'scheduled',
    checkedIn: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  shift.volunteers.push(assignment);
  shift.spotsFilled++;
  if (shift.spotsFilled >= shift.spotsNeeded) {
    shift.status = 'filled';
  }
  shift.updatedAt = new Date();

  return assignment;
}

export async function cancelAssignment(assignmentId: string): Promise<boolean> {
  for (const shift of mockShifts) {
    const assignmentIndex = shift.volunteers.findIndex(v => v.id === assignmentId);
    if (assignmentIndex !== -1) {
      shift.volunteers[assignmentIndex].status = 'cancelled';
      shift.spotsFilled--;
      if (shift.status === 'filled') {
        shift.status = 'open';
      }
      shift.updatedAt = new Date();
      return true;
    }
  }
  return false;
}

// Volunteer profiles
export async function getVolunteerProfile(memberId: string): Promise<VolunteerProfile | null> {
  return mockProfiles.find(p => p.memberId === memberId) || null;
}

export const getActiveVolunteers = cache(async (): Promise<VolunteerProfile[]> => {
  return mockProfiles.filter(p => p.isActive);
});

export const getVolunteersByRole = cache(async (roleId: string): Promise<VolunteerProfile[]> => {
  return mockProfiles.filter(p => p.roles.includes(roleId) && p.isActive);
});

// Schedule generation
export async function generateSchedule(
  startDate: Date,
  endDate: Date,
  roles: string[]
): Promise<VolunteerSchedule> {
  const schedule: VolunteerSchedule = {
    weekStarting: startDate,
    shifts: {},
    unfilledShifts: 0,
    totalVolunteers: 0,
  };

  const shifts = mockShifts.filter(s =>
    s.date >= startDate &&
    s.date <= endDate &&
    roles.includes(s.roleId)
  );

  // Group shifts by date
  shifts.forEach(shift => {
    const dateKey = shift.date.toISOString().split('T')[0];
    if (!schedule.shifts[dateKey]) {
      schedule.shifts[dateKey] = [];
    }
    schedule.shifts[dateKey].push(shift);

    if (shift.spotsFilled < shift.spotsNeeded) {
      schedule.unfilledShifts += (shift.spotsNeeded - shift.spotsFilled);
    }
    schedule.totalVolunteers += shift.spotsFilled;
  });

  return schedule;
}

// Availability matching
export async function findAvailableVolunteers(
  shift: VolunteerShift
): Promise<VolunteerProfile[]> {
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
    shift.date.getDay()
  ] as VolunteerAvailability['dayOfWeek'];

  return mockProfiles.filter(profile => {
    // Check if volunteer has the required role
    if (!profile.roles.includes(shift.roleId)) return false;

    // Check availability
    const availability = profile.availability;
    if (availability.dayOfWeek && availability.dayOfWeek !== dayOfWeek) return false;

    // Check blackout dates
    if (availability.blackoutDates?.some(date =>
      date.toDateString() === shift.date.toDateString()
    )) return false;

    // Check if already assigned
    const isAssigned = shift.volunteers.some(v =>
      v.volunteerId === profile.memberId &&
      v.status !== 'cancelled'
    );
    if (isAssigned) return false;

    return true;
  });
}

// Reporting
export const getVolunteerStats = cache(async () => {
  const allShifts = mockShifts;
  const upcomingShifts = await getUpcomingShifts();
  const openShifts = await getOpenShifts();

  return {
    totalRoles: mockRoles.length,
    activeVolunteers: mockProfiles.filter(p => p.isActive).length,
    upcomingShifts: upcomingShifts.length,
    openSpots: openShifts.reduce((sum, s) => sum + (s.spotsNeeded - s.spotsFilled), 0),
    totalHoursThisMonth: mockProfiles.reduce((sum, p) => sum + (p.totalHours || 0), 0),
    topVolunteers: mockProfiles
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 5),
  };
});

// Send reminders
export async function sendShiftReminders(): Promise<number> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const shifts = mockShifts.filter(s =>
    s.date >= tomorrow &&
    s.date <= tomorrowEnd &&
    !s.reminderSent &&
    s.status !== 'cancelled'
  );

  // In production, send actual emails/SMS
  shifts.forEach(shift => {
    shift.reminderSent = true;
    shift.updatedAt = new Date();
  });

  return shifts.length;
}

// Check-in/out
export async function checkInVolunteer(
  assignmentId: string
): Promise<boolean> {
  for (const shift of mockShifts) {
    const assignment = shift.volunteers.find(v => v.id === assignmentId);
    if (assignment) {
      assignment.checkedIn = true;
      assignment.checkedInTime = new Date();
      assignment.status = 'confirmed';
      assignment.updatedAt = new Date();
      return true;
    }
  }
  return false;
}

export async function checkOutVolunteer(
  assignmentId: string,
  rating?: number,
  feedback?: string
): Promise<boolean> {
  for (const shift of mockShifts) {
    const assignment = shift.volunteers.find(v => v.id === assignmentId);
    if (assignment && assignment.checkedIn) {
      assignment.checkedOutTime = new Date();
      assignment.status = 'completed';
      if (rating) assignment.rating = rating;
      if (feedback) assignment.feedback = feedback;
      assignment.updatedAt = new Date();

      // Update volunteer profile hours
      const profile = await getVolunteerProfile(assignment.volunteerId);
      if (profile && assignment.checkedInTime) {
        const hours = (assignment.checkedOutTime.getTime() - assignment.checkedInTime.getTime()) / (1000 * 60 * 60);
        profile.totalHours += hours;
        profile.shiftsCompleted++;
        profile.lastVolunteered = new Date();
      }

      return true;
    }
  }
  return false;
}
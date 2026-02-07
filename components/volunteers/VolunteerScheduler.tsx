"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Mail,
  Phone,
  Edit,
  Trash2,
  UserPlus,
  CheckCircle,
  User,
  Loader2,
} from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { logger, logError, logWarn } from '@/lib/logger';

interface VolunteerRole {
  id: string;
  name: string;
  description: string;
  ministry: string;
  requirements?: string[];
  training?: string;
  commitment: string;
  minAge?: number;
  backgroundCheckRequired: boolean;
  skills?: string[];
  isActive: boolean;
}

interface VolunteerAssignment {
  id: string;
  volunteerId: string;
  volunteerName: string;
  shiftId: string;
  roleId: string;
  status: string;
  checkedIn: boolean;
  checkedInTime?: Date;
  checkedOutTime?: Date;
  notes?: string;
}

interface VolunteerShift {
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
  status: string;
  notes?: string;
  reminderSent: boolean;
}

interface VolunteerSchedulerProps {
  isAdmin?: boolean;
}

export default function VolunteerScheduler({
  isAdmin = false,
}: VolunteerSchedulerProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [shifts, setShifts] = useState<VolunteerShift[]>([]);
  const [mySignups, setMySignups] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month" | "list">("week");
  const [selectedShift, setSelectedShift] = useState<VolunteerShift | null>(null);
  const [showAddShift, setShowAddShift] = useState(false);
  const [roles, setRoles] = useState<VolunteerRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    role: "all",
    status: "all",
  });

  const loadScheduleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Calculate date range based on view
      const start = startOfWeek(selectedDate);
      const end = new Date(start);
      end.setDate(end.getDate() + (viewMode === 'week' ? 7 : 30));

      // Load shifts for the selected period
      const shiftsResponse = await fetch(
        `/api/v2/volunteers/shifts?startDate=${start.toISOString()}&endDate=${end.toISOString()}&view=${viewMode}`
      );

      if (!shiftsResponse.ok) {
        throw new Error('Failed to load shifts');
      }

      const shiftsData = await shiftsResponse.json();
      setShifts(shiftsData.data || shiftsData);

      // Load roles
      const rolesResponse = await fetch('/api/v2/volunteers/roles');
      if (rolesResponse.ok) {
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.data || rolesData);
      }

      // Load user's signups if authenticated
      if (session?.user) {
        const signupsResponse = await fetch('/api/v2/volunteers/my-signups');
        if (signupsResponse.ok) {
          const signupsData = await signupsResponse.json();
          setMySignups(signupsData.data || signupsData);
        }
      }
    } catch (err: any) {
      logError('Error loading schedule data:', err);
      setError(err.message || 'Failed to load schedule data');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, viewMode, session]);

  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getShiftsForDate = (date: Date) => {
    return shifts.filter(shift => isSameDay(new Date(shift.date), date));
  };

  const isUserSignedUp = (shiftId: string) => {
    return mySignups.some(signup =>
      signup.shiftId === shiftId &&
      signup.status !== 'cancelled'
    );
  };

  const handleSignUp = async (shiftId: string) => {
    if (!session?.user) {
      alert('Please sign in to volunteer');
      return;
    }

    if (isUserSignedUp(shiftId)) {
      alert('You are already signed up for this shift');
      return;
    }

    setActionLoading(shiftId);
    try {
      const response = await fetch(`/api/v2/volunteers/shifts/${shiftId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to sign up');
      }

      // Reload shifts and signups
      await loadScheduleData();
      setSelectedShift(null);
      alert(data.message || 'Successfully signed up for shift!');
    } catch (err: any) {
      logError('Error signing up for shift:', err);
      alert(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelSignUp = async (shiftId: string) => {
    if (!confirm('Are you sure you want to cancel this shift?')) return;

    setActionLoading(shiftId);
    try {
      const response = await fetch(
        `/api/v2/volunteers/shifts/${shiftId}/signup`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to cancel');
      }

      await loadScheduleData();
      setSelectedShift(null);
      alert(data.message || 'Shift cancelled successfully');
    } catch (err: any) {
      logError('Error cancelling shift:', err);
      alert(err.message || 'Failed to cancel shift');
    } finally {
      setActionLoading(null);
    }
  };

  const getShiftStatusColor = (shift: VolunteerShift) => {
    if (shift.status === 'cancelled') return 'bg-gray-100 text-gray-600';
    if (shift.status === 'filled') return 'bg-green-100 text-green-700';
    const fillPercentage = (shift.spotsFilled / shift.spotsNeeded) * 100;
    if (fillPercentage >= 75) return 'bg-yellow-100 text-yellow-700';
    if (fillPercentage >= 50) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const WeekView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-8 border-b">
        <div className="p-3 bg-gray-50 font-semibold text-sm text-gray-600">
          Time
        </div>
        {getWeekDays().map(day => (
          <div
            key={day.toISOString()}
            className={`p-3 text-center border-l ${
              isSameDay(day, new Date())
                ? 'bg-primary-50 font-semibold'
                : 'bg-gray-50'
            }`}
          >
            <div className="text-xs text-gray-600">{format(day, 'EEE')}</div>
            <div className="text-lg">{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 min-h-[400px]">
        <div className="p-3 bg-gray-50 border-r">
          {['Morning', 'Afternoon', 'Evening'].map(slot => (
            <div key={slot} className="h-32 py-2 text-xs text-gray-600">
              {slot}
            </div>
          ))}
        </div>

        {getWeekDays().map(day => (
          <div key={day.toISOString()} className="border-l min-h-full">
            <div className="p-2 space-y-2">
              {getShiftsForDate(day).map(shift => (
                <motion.div
                  key={shift.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getShiftStatusColor(
                    shift
                  )}`}
                  onClick={() => setSelectedShift(shift)}
                >
                  <div className="text-xs font-semibold truncate">
                    {shift.title}
                  </div>
                  <div className="text-xs mt-1">
                    {shift.startTime} - {shift.endTime}
                  </div>
                  <div className="text-xs mt-1 font-medium">
                    {shift.spotsFilled}/{shift.spotsNeeded}
                  </div>
                  {isUserSignedUp(shift.id) && (
                    <div className="mt-1">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Upcoming Shifts</h3>
          <div className="flex gap-2">
            <select
              value={filter.role}
              onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="filled">Filled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {shifts
          .filter(shift => {
            if (filter.role !== "all" && shift.roleId !== filter.role) return false;
            if (filter.status !== "all" && shift.status !== filter.status) return false;
            return true;
          })
          .map(shift => (
            <div
              key={shift.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedShift(shift)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{shift.title}</h4>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {format(new Date(shift.date), 'EEEE, MMMM d')}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      {shift.startTime} - {shift.endTime}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {shift.location}
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getShiftStatusColor(shift)}`}>
                    <Users size={14} className="mr-1" />
                    {shift.spotsFilled}/{shift.spotsNeeded}
                  </div>
                  {isUserSignedUp(shift.id) ? (
                    <div className="mt-2 flex items-center justify-end text-green-600 text-sm">
                      <CheckCircle size={16} className="mr-1" />
                      Signed Up
                    </div>
                  ) : shift.status === 'open' && session?.user && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignUp(shift.id);
                      }}
                      disabled={actionLoading === shift.id}
                      className="mt-2 block w-full px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 disabled:opacity-50"
                    >
                      {actionLoading === shift.id ? (
                        <Loader2 size={14} className="inline animate-spin" />
                      ) : (
                        'Sign Up'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        {shifts.length === 0 && !isLoading && (
          <div className="p-8 text-center text-gray-500">
            No shifts available for this period
          </div>
        )}
      </div>
    </div>
  );

  const MySignupsSection = () => {
    if (!session?.user || mySignups.length === 0) return null;

    return (
      <div className="mb-6 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">My Upcoming Shifts</h3>
        <div className="space-y-2">
          {mySignups
            .filter(signup => signup.status !== 'cancelled' && signup.status !== 'completed')
            .slice(0, 3)
            .map(signup => (
              <div
                key={signup.id}
                className="flex items-center justify-between bg-white p-3 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-sm">{signup.shift?.title}</div>
                    <div className="text-xs text-gray-600">
                      {format(new Date(signup.shift?.date), 'MMM d')} at {signup.shift?.startTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelSignUp(signup.shiftId)}
                  disabled={actionLoading === signup.shiftId}
                  className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {actionLoading === signup.shiftId ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    'Cancel'
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Volunteer Schedule
        </h1>
        <p className="text-gray-600">
          Sign up for volunteer shifts and manage your schedule
        </p>
      </div>

      {/* Authentication Notice */}
      {sessionStatus !== 'loading' && !session?.user && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-yellow-800">Sign in to volunteer</h3>
              <p className="text-sm text-yellow-700 mt-1">
                You need to be signed in to sign up for volunteer shifts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* My Signups */}
      <MySignupsSection />

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-red-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              className="p-2 hover:bg-gray-100 rounded-lg"
              disabled={isLoading}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {format(selectedDate, 'MMMM yyyy')}
              </div>
              <div className="text-sm text-gray-600">
                Week of {format(startOfWeek(selectedDate), 'MMM d')}
              </div>
            </div>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              className="p-2 hover:bg-gray-100 rounded-lg"
              disabled={isLoading}
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
              disabled={isLoading}
            >
              Today
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              List
            </button>
          </div>

          {/* Actions */}
          {isAdmin && (
            <button
              onClick={() => setShowAddShift(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              disabled={isLoading}
            >
              <Plus size={20} className="mr-2" />
              Add Shift
            </button>
          )}
        </div>
      </div>

      {/* Schedule View */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Loader2 className="inline-block animate-spin h-8 w-8 text-primary-600" />
          <p className="mt-2 text-gray-600">Loading schedule...</p>
        </div>
      ) : viewMode === 'week' ? (
        <WeekView />
      ) : (
        <ListView />
      )}

      {/* Shift Details Modal */}
      <AnimatePresence>
        {selectedShift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedShift(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedShift.title}
                  </h2>
                  <button
                    onClick={() => setSelectedShift(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getShiftStatusColor(selectedShift)}`}>
                  <Users size={14} className="mr-1" />
                  {selectedShift.spotsFilled}/{selectedShift.spotsNeeded} Volunteers
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-3 text-gray-400" />
                    {format(new Date(selectedShift.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock size={18} className="mr-3 text-gray-400" />
                    {selectedShift.startTime} - {selectedShift.endTime}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-3 text-gray-400" />
                    {selectedShift.location}
                  </div>
                </div>

                {selectedShift.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedShift.description}</p>
                  </div>
                )}

                {selectedShift.notes && (
                  <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-1">Notes</h3>
                    <p className="text-yellow-700 text-sm">{selectedShift.notes}</p>
                  </div>
                )}

                {/* Current Volunteers */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Signed Up Volunteers
                  </h3>
                  {selectedShift.volunteers.length > 0 ? (
                    <div className="space-y-2">
                      {selectedShift.volunteers
                        .filter(v => v.status !== 'cancelled')
                        .map(volunteer => (
                          <div
                            key={volunteer.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                <User className="text-primary-600" size={16} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {volunteer.volunteerName}
                                </p>
                                <p className="text-xs text-gray-600 capitalize">
                                  {volunteer.status}
                                </p>
                              </div>
                            </div>
                            {volunteer.checkedIn && (
                              <CheckCircle className="text-green-600" size={20} />
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No volunteers signed up yet</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {session?.user && (
                    <>
                      {isUserSignedUp(selectedShift.id) ? (
                        <button
                          onClick={() => handleCancelSignUp(selectedShift.id)}
                          disabled={actionLoading === selectedShift.id}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading === selectedShift.id ? (
                            <>
                              <Loader2 size={20} className="inline mr-2 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            'Cancel My Signup'
                          )}
                        </button>
                      ) : selectedShift.status === 'open' && (
                        <button
                          onClick={() => handleSignUp(selectedShift.id)}
                          disabled={actionLoading === selectedShift.id}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                        >
                          {actionLoading === selectedShift.id ? (
                            <>
                              <Loader2 size={20} className="inline mr-2 animate-spin" />
                              Signing up...
                            </>
                          ) : (
                            'Sign Up for This Shift'
                          )}
                        </button>
                      )}
                    </>
                  )}

                  {!session?.user && (
                    <div className="flex-1 p-4 bg-yellow-50 rounded-lg text-center">
                      <p className="text-sm text-yellow-700">
                        Please sign in to sign up for this shift
                      </p>
                    </div>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <Edit size={20} className="inline mr-2" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

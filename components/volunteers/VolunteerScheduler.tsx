"use client";

import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import { VolunteerShift, VolunteerRole, VolunteerProfile } from "@/lib/volunteers";
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";

interface VolunteerSchedulerProps {
  initialShifts?: VolunteerShift[];
  isAdmin?: boolean;
}

export default function VolunteerScheduler({
  initialShifts = [],
  isAdmin = false,
}: VolunteerSchedulerProps) {
  const [shifts, setShifts] = useState<VolunteerShift[]>(initialShifts);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month" | "list">("week");
  const [selectedShift, setSelectedShift] = useState<VolunteerShift | null>(null);
  const [showAddShift, setShowAddShift] = useState(false);
  const [showVolunteerList, setShowVolunteerList] = useState(false);
  const [availableVolunteers, setAvailableVolunteers] = useState<VolunteerProfile[]>([]);
  const [roles, setRoles] = useState<VolunteerRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    role: "all",
    status: "all",
  });

  const loadScheduleData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Load shifts for the selected period
      const response = await fetch(
        `/api/volunteers/shifts?date=${selectedDate.toISOString()}&view=${viewMode}`
      );
      if (response.ok) {
        const data = await response.json();
        setShifts(data);
      }

      // Load roles
      const rolesResponse = await fetch('/api/volunteers/roles');
      if (rolesResponse.ok) {
        const rolesData = await rolesResponse.json();
        setRoles(rolesData);
      }
    } catch (error) {
      console.error('Error loading schedule data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, viewMode]);

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

  const handleSignUp = async (shiftId: string) => {
    try {
      const response = await fetch(`/api/volunteers/shifts/${shiftId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Reload shifts
        loadScheduleData();
        alert('Successfully signed up for shift!');
      }
    } catch (error) {
      console.error('Error signing up for shift:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  const handleCancelSignUp = async (shiftId: string, assignmentId: string) => {
    if (!confirm('Are you sure you want to cancel this shift?')) return;

    try {
      const response = await fetch(
        `/api/volunteers/assignments/${assignmentId}/cancel`,
        { method: 'POST' }
      );

      if (response.ok) {
        loadScheduleData();
        alert('Shift cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling shift:', error);
      alert('Failed to cancel shift');
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
          {/* Time slots */}
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
                <div>
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

                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getShiftStatusColor(shift)}`}>
                    <Users size={14} className="mr-1" />
                    {shift.spotsFilled}/{shift.spotsNeeded}
                  </div>
                  {shift.status === 'open' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignUp(shift.id);
                      }}
                      className="mt-2 block w-full px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

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

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              className="p-2 hover:bg-gray-100 rounded-lg"
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
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
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
            >
              List
            </button>
          </div>

          {/* Actions */}
          {isAdmin && (
            <button
              onClick={() => setShowAddShift(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
                      {selectedShift.volunteers.map(volunteer => (
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
                              <p className="text-xs text-gray-600">
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
                  {selectedShift.status === 'open' && (
                    <button
                      onClick={() => handleSignUp(selectedShift.id)}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Sign Up for This Shift
                    </button>
                  )}
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => setShowVolunteerList(true)}
                        className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
                      >
                        <UserPlus size={20} className="inline mr-2" />
                        Assign Volunteer
                      </button>
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

// Add missing User import
import { User } from "lucide-react";
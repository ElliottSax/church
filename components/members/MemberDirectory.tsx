"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Heart,
  Briefcase,
  Grid,
  List,
  X,
  ChevronDown,
} from "lucide-react";
import { Member } from "@/lib/members";
import Image from "next/image";
import { logger, logError, logWarn } from '@/lib/logger';

interface MemberDirectoryProps {
  initialMembers?: Member[];
  isPublic?: boolean; // Public directory shows limited info
}

export default function MemberDirectory({
  initialMembers = [],
  isPublic = false,
}: MemberDirectoryProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    membershipStatus: "all",
    ministry: "all",
    skills: [] as string[],
    gender: "all",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const ministries = new Set<string>();
    const skills = new Set<string>();

    members.forEach((member) => {
      member.ministries?.forEach((m) => ministries.add(m));
      member.skills?.forEach((s) => skills.add(s));
    });

    return {
      ministries: Array.from(ministries).sort(),
      skills: Array.from(skills).sort(),
    };
  }, [members]);

  // Load members data
  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/members${isPublic ? "?public=true" : ""}`
      );
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
        setFilteredMembers(data);
      }
    } catch (error) {
      logError("Error loading members:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isPublic]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // Filter members based on search and filters
  useEffect(() => {
    let filtered = members;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.displayName.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.skills?.some((s) => s.toLowerCase().includes(query)) ||
          member.interests?.some((i) => i.toLowerCase().includes(query))
      );
    }

    // Membership status filter
    if (selectedFilters.membershipStatus !== "all") {
      filtered = filtered.filter(
        (m) => m.membershipStatus === selectedFilters.membershipStatus
      );
    }

    // Ministry filter
    if (selectedFilters.ministry !== "all") {
      filtered = filtered.filter((m) =>
        m.ministries?.includes(selectedFilters.ministry)
      );
    }

    // Skills filter
    if (selectedFilters.skills.length > 0) {
      filtered = filtered.filter((m) =>
        selectedFilters.skills.some((skill) => m.skills?.includes(skill))
      );
    }

    // Gender filter
    if (selectedFilters.gender !== "all") {
      filtered = filtered.filter((m) => m.gender === selectedFilters.gender);
    }

    setFilteredMembers(filtered);
  }, [searchQuery, selectedFilters, members]);

  const toggleSkillFilter = (skill: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      membershipStatus: "all",
      ministry: "all",
      skills: [],
      gender: "all",
    });
    setSearchQuery("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMembershipBadgeColor = (status: Member["membershipStatus"]) => {
    switch (status) {
      case "member":
        return "bg-green-100 text-green-800";
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "visitor":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isPublic ? "Church Directory" : "Member Directory"}
        </h1>
        <p className="text-gray-600">
          {isPublic
            ? "Connect with our church family"
            : `${filteredMembers.length} members found`}
        </p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, skills, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter size={20} />
            Filters
            {(selectedFilters.membershipStatus !== "all" ||
              selectedFilters.ministry !== "all" ||
              selectedFilters.skills.length > 0 ||
              selectedFilters.gender !== "all") && (
              <span className="ml-1 px-2 py-0.5 bg-primary-100 text-primary-600 rounded-full text-xs">
                Active
              </span>
            )}
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* View Mode Toggle */}
          <div className="flex gap-1 border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list"
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t overflow-hidden"
            >
              <div className="grid md:grid-cols-4 gap-4">
                {/* Membership Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Status
                  </label>
                  <select
                    value={selectedFilters.membershipStatus}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        membershipStatus: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All</option>
                    <option value="member">Members</option>
                    <option value="regular">Regular Attenders</option>
                    <option value="visitor">Visitors</option>
                  </select>
                </div>

                {/* Ministry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ministry
                  </label>
                  <select
                    value={selectedFilters.ministry}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        ministry: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Ministries</option>
                    {filterOptions.ministries.map((ministry) => (
                      <option key={ministry} value={ministry}>
                        {ministry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                {!isPublic && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={selectedFilters.gender}
                      onChange={(e) =>
                        setSelectedFilters({
                          ...selectedFilters,
                          gender: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}

                {/* Reset Button */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Skills Tags */}
              {filterOptions.skills.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills & Talents
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkillFilter(skill)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedFilters.skills.includes(skill)
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Members Grid/List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Loading members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No members found matching your criteria</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.displayName}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary-600">
                          {getInitials(member.displayName)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Status */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {member.displayName}
                    </h3>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getMembershipBadgeColor(
                        member.membershipStatus
                      )}`}
                    >
                      {member.membershipStatus}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    {member.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail size={14} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
                    {member.phone && !isPublic && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={14} className="mr-2 flex-shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-0.5 text-gray-500 text-xs">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                {!isPublic && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ministries
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.displayName}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-primary-600">
                            {getInitials(member.displayName)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {member.displayName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMembershipBadgeColor(
                        member.membershipStatus
                      )}`}
                    >
                      {member.membershipStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{member.email}</div>
                    {member.phone && !isPublic && (
                      <div>{member.phone}</div>
                    )}
                  </td>
                  {!isPublic && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.ministries?.join(", ") || "-"}
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {member.skills?.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills && member.skills.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{member.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                >
                  <X size={20} />
                </button>

                {/* Profile Content */}
                <div className="relative px-8 pb-8">
                  {/* Avatar */}
                  <div className="-mt-16 mb-4">
                    {selectedMember.photo ? (
                      <Image
                        src={selectedMember.photo}
                        alt={selectedMember.displayName}
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-primary-100 flex items-center justify-center">
                        <span className="text-3xl font-semibold text-primary-600">
                          {getInitials(selectedMember.displayName)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Status */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedMember.displayName}
                    </h2>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getMembershipBadgeColor(
                        selectedMember.membershipStatus
                      )}`}
                    >
                      {selectedMember.membershipStatus}
                    </span>
                    {selectedMember.memberSince && (
                      <p className="mt-2 text-sm text-gray-600">
                        Member since {new Date(selectedMember.memberSince).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      {selectedMember.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail size={18} className="mr-3 text-gray-400" />
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="hover:text-primary-600"
                          >
                            {selectedMember.email}
                          </a>
                        </div>
                      )}
                      {selectedMember.phone && !isPublic && (
                        <div className="flex items-center text-gray-600">
                          <Phone size={18} className="mr-3 text-gray-400" />
                          <a
                            href={`tel:${selectedMember.phone}`}
                            className="hover:text-primary-600"
                          >
                            {selectedMember.phone}
                          </a>
                        </div>
                      )}
                      {selectedMember.address && !isPublic && (
                        <div className="flex items-start text-gray-600">
                          <MapPin size={18} className="mr-3 mt-1 text-gray-400" />
                          <div>
                            {selectedMember.address.street && (
                              <div>{selectedMember.address.street}</div>
                            )}
                            <div>
                              {selectedMember.address.city && `${selectedMember.address.city}, `}
                              {selectedMember.address.state} {selectedMember.address.zip}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills & Interests */}
                  {(selectedMember.skills || selectedMember.interests) && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Skills & Interests
                      </h3>
                      {selectedMember.skills && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Skills
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedMember.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedMember.interests && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Interests
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedMember.interests.map((interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ministry Involvement */}
                  {selectedMember.ministries && selectedMember.ministries.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Ministry Involvement
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.ministries.map((ministry) => (
                          <span
                            key={ministry}
                            className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                          >
                            {ministry}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  {!isPublic && (
                    <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
                      {selectedMember.occupation && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Occupation
                          </p>
                          <p className="text-gray-600">
                            {selectedMember.occupation}
                          </p>
                        </div>
                      )}
                      {selectedMember.baptismDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Baptism Date
                          </p>
                          <p className="text-gray-600">
                            {new Date(selectedMember.baptismDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
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
"use client";

import { useState } from "react";
import {
  Users,
  Heart,
  Book,
  Coffee,
  Home,
  Globe,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  Filter,
  Search,
  Baby,
  Sunrise,
  Moon,
  Calendar,
} from "lucide-react";
import Link from "next/link";

type GroupCategory = "all" | "fellowship" | "study" | "support" | "mission" | "family";
type MeetingTime = "all" | "morning" | "afternoon" | "evening" | "weekend";

interface SmallGroup {
  id: string;
  name: string;
  category: GroupCategory;
  schedule: string;
  meetingTime: MeetingTime;
  location: string;
  leader: string;
  leaderEmail: string;
  description: string;
  detailedDescription: string;
  icon: any;
  color: string;
  currentMembers: number;
  maxMembers: number;
  ageRange: string;
  childcare: boolean;
  virtual: boolean;
  openToNew: boolean;
}

const groups: SmallGroup[] = [
  {
    id: "young-adults",
    name: "Young Adults Group",
    category: "fellowship",
    schedule: "Thursdays, 7:00 PM",
    meetingTime: "evening",
    location: "Coffee House Ministry Center",
    leader: "Mike & Rachel Thompson",
    leaderEmail: "mike.thompson@example.com",
    description: "Fellowship and faith discussions for ages 18-30",
    detailedDescription:
      "A vibrant community of young adults navigating faith, careers, and relationships. We meet weekly for discussions, social activities, and service projects. Expect authentic conversations, great coffee, and lifelong friendships.",
    icon: Coffee,
    color: "bg-blue-100 text-blue-600",
    currentMembers: 12,
    maxMembers: 20,
    ageRange: "18-30",
    childcare: false,
    virtual: true,
    openToNew: true,
  },
  {
    id: "womens-heart",
    name: "Women's Heart to Heart",
    category: "support",
    schedule: "Tuesdays, 10:00 AM",
    meetingTime: "morning",
    location: "Fellowship Hall",
    leader: "Sarah Miller",
    leaderEmail: "sarah.miller@example.com",
    description: "Women supporting women through prayer and study",
    detailedDescription:
      "A warm and welcoming space for women of all ages to share life, study Scripture, and support one another. We focus on spiritual growth, authentic relationships, and practical faith application. Childcare provided.",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    currentMembers: 15,
    maxMembers: 25,
    ageRange: "All ages",
    childcare: true,
    virtual: false,
    openToNew: true,
  },
  {
    id: "mens-fellowship",
    name: "Men's Fellowship",
    category: "fellowship",
    schedule: "Saturday mornings, 8:00 AM",
    meetingTime: "weekend",
    location: "Church Library",
    leader: "David Brown",
    leaderEmail: "david.brown@example.com",
    description: "Men gathering for breakfast, Bible study, and brotherhood",
    detailedDescription:
      "Start your Saturday with breakfast, Bible study, and brotherhood. We tackle real-life issues through the lens of faith, hold each other accountable, and build genuine friendships. Breakfast provided!",
    icon: Users,
    color: "bg-green-100 text-green-600",
    currentMembers: 10,
    maxMembers: 18,
    ageRange: "Adult men",
    childcare: false,
    virtual: false,
    openToNew: true,
  },
  {
    id: "marriage-family",
    name: "Marriage & Family",
    category: "family",
    schedule: "Fridays, 7:00 PM",
    meetingTime: "evening",
    location: "Conference Room",
    leader: "Tom & Lisa Anderson",
    leaderEmail: "anderson.family@example.com",
    description: "Strengthening marriages and family relationships",
    detailedDescription:
      "For couples and families seeking to strengthen relationships and raise kids with faith. We discuss parenting challenges, marriage enrichment, and family dynamics in a supportive environment. Childcare provided for kids activities.",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
    currentMembers: 8,
    maxMembers: 12,
    ageRange: "Families with children",
    childcare: true,
    virtual: false,
    openToNew: true,
  },
  {
    id: "seekers",
    name: "Seekers & Questions",
    category: "study",
    schedule: "Wednesdays, 6:30 PM",
    meetingTime: "evening",
    location: "Pastor's Office",
    leader: "Pastor John",
    leaderEmail: "pastor.john@example.com",
    description: "Exploring faith, asking questions, finding answers",
    detailedDescription:
      "Perfect for those new to faith or returning after time away. No question is off-limits. We explore Christian beliefs, discuss doubts, and create a safe space for spiritual exploration. Come as you are.",
    icon: Book,
    color: "bg-yellow-100 text-yellow-600",
    currentMembers: 6,
    maxMembers: 12,
    ageRange: "All ages",
    childcare: false,
    virtual: true,
    openToNew: true,
  },
  {
    id: "missions",
    name: "Global Missions Group",
    category: "mission",
    schedule: "First Sunday of month, 12:00 PM",
    meetingTime: "afternoon",
    location: "Room 201",
    leader: "Mission Team",
    leaderEmail: "missions@example.com",
    description: "Supporting our mission work locally and globally",
    detailedDescription:
      "Passionate about making a difference? Join us in supporting mission work locally and around the world. We coordinate service projects, raise funds for missionaries, and participate in hands-on outreach.",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600",
    currentMembers: 14,
    maxMembers: 30,
    ageRange: "All ages",
    childcare: true,
    virtual: false,
    openToNew: true,
  },
  {
    id: "parents-preschool",
    name: "Parents of Preschoolers (POPS)",
    category: "family",
    schedule: "Mondays, 9:30 AM",
    meetingTime: "morning",
    location: "Nursery Wing",
    leader: "Jennifer Clark",
    leaderEmail: "jennifer.clark@example.com",
    description: "Support and community for parents of young children",
    detailedDescription:
      "Parenting preschoolers? You're not alone! Connect with other parents, share experiences, and learn practical parenting skills rooted in faith. Playtime provided for kids while parents meet.",
    icon: Baby,
    color: "bg-teal-100 text-teal-600",
    currentMembers: 11,
    maxMembers: 16,
    ageRange: "Parents of 0-5 year olds",
    childcare: true,
    virtual: false,
    openToNew: true,
  },
  {
    id: "bible-deep-dive",
    name: "Bible Deep Dive",
    category: "study",
    schedule: "Thursdays, 2:00 PM",
    meetingTime: "afternoon",
    location: "Library",
    leader: "Dr. Margaret Stevens",
    leaderEmail: "margaret.stevens@example.com",
    description: "In-depth study of Scripture with historical context",
    detailedDescription:
      "For those who love digging deep into Scripture. We explore biblical texts with historical, cultural, and theological context. Expect lively discussion, scholarly resources, and spiritual enrichment.",
    icon: Book,
    color: "bg-amber-100 text-amber-600",
    currentMembers: 9,
    maxMembers: 15,
    ageRange: "All ages",
    childcare: false,
    virtual: true,
    openToNew: true,
  },
];

export default function GroupsPage() {
  const [categoryFilter, setCategoryFilter] = useState<GroupCategory>("all");
  const [timeFilter, setTimeFilter] = useState<MeetingTime>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<SmallGroup | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const filteredGroups = groups.filter((group) => {
    const matchesCategory =
      categoryFilter === "all" || group.category === categoryFilter;
    const matchesTime =
      timeFilter === "all" || group.meetingTime === timeFilter;
    const matchesSearch =
      searchTerm === "" ||
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTime && matchesSearch && group.openToNew;
  });

  return (
    <div className="w-full bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Small Groups
            </h1>
            <p className="text-xl leading-relaxed opacity-95">
              Life is better together. Find your community in one of our small
              groups.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as GroupCategory)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Categories</option>
              <option value="fellowship">Fellowship</option>
              <option value="study">Bible Study</option>
              <option value="support">Support</option>
              <option value="mission">Mission/Service</option>
              <option value="family">Family</option>
            </select>

            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as MeetingTime)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Any Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="weekend">Weekend</option>
            </select>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Showing {filteredGroups.length} of {groups.length} groups
          </p>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No groups found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search term
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setTimeFilter("all");
                  setSearchTerm("");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${group.color} flex-shrink-0`}>
                        <Icon size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {group.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {group.description}
                        </p>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{group.schedule}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{group.location}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{group.leader}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {group.virtual && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              Virtual Option
                            </span>
                          )}
                          {group.childcare && (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                              Childcare
                            </span>
                          )}
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {group.currentMembers}/{group.maxMembers} members
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedGroup(group)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Learn More &amp; Join
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join a Small Group?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Small groups are where real community happens. Here&apos;s what you can
              expect:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Deep Friendships
              </h3>
              <p className="text-gray-600">
                Move beyond Sunday morning hellos to authentic, lasting
                relationships.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Spiritual Growth
              </h3>
              <p className="text-gray-600">
                Study Scripture together, pray for one another, and grow in faith.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Mutual Support
              </h3>
              <p className="text-gray-600">
                Share joys and burdens with people who genuinely care about you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Not Sure Which Group is Right for You?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            We&apos;d love to help you find the perfect fit. Reach out and we&apos;ll
            connect you with a group leader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowContactForm(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </button>
            <Link
              href="/new-here"
              className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white/30"
            >
              New Here? Start Here
            </Link>
          </div>
        </div>
      </section>

      {/* Group Detail Modal */}
      {selectedGroup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGroup(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${selectedGroup.color}`}>
                    <selectedGroup.icon size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedGroup.name}
                    </h2>
                    <p className="text-gray-600">{selectedGroup.ageRange}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedGroup.detailedDescription}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Meeting Time</p>
                    <p className="text-gray-700">{selectedGroup.schedule}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-700">{selectedGroup.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Group Leader</p>
                    <p className="text-gray-700">{selectedGroup.leader}</p>
                    <a
                      href={`mailto:${selectedGroup.leaderEmail}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {selectedGroup.leaderEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Group Size</p>
                    <p className="text-gray-700">
                      {selectedGroup.currentMembers} current members (max{" "}
                      {selectedGroup.maxMembers})
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedGroup.virtual && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Virtual Option Available
                  </span>
                )}
                {selectedGroup.childcare && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Childcare Provided
                  </span>
                )}
                {selectedGroup.openToNew && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Open to New Members
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedGroup.leaderEmail}?subject=Interested in ${selectedGroup.name}`}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Contact Leader
                </a>
                <button
                  onClick={() => {
                    setSelectedGroup(null);
                    setShowContactForm(true);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Need Help Choosing?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactForm(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Help Finding a Group
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out this form and we&apos;ll help you find the perfect small group.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(612) 555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  What are you looking for in a small group?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your interests, schedule preferences, or any questions..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Calendar, BookOpen, Users, Heart, Settings, LogOut } from 'lucide-react';

export const metadata = {
  title: 'Member Portal | Minneapolis Community of Christ',
  description: 'Access your member dashboard and resources',
};

export default async function MembersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name?.split(' ')[0]}!</h1>
          <p className="text-primary-100">Your member portal</p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Events */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-600" />
              <span className="text-sm text-secondary-500">3 upcoming</span>
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">My Events</h2>
            <p className="text-secondary-600 mb-4">View your registered events and RSVPs</p>
            <a
              href="/members/events"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View events →
            </a>
          </div>

          {/* Giving History */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-primary-600" />
              <span className="text-sm text-secondary-500">2024</span>
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Giving</h2>
            <p className="text-secondary-600 mb-4">View your contribution history and tax statements</p>
            <a
              href="/members/giving"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View giving →
            </a>
          </div>

          {/* My Groups */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-600" />
              <span className="text-sm text-secondary-500">2 groups</span>
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">My Groups</h2>
            <p className="text-secondary-600 mb-4">Connect with your small groups and ministries</p>
            <a
              href="/members/groups"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View groups →
            </a>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Resources</h2>
            <p className="text-secondary-600 mb-4">Access member-only materials and downloads</p>
            <a
              href="/members/resources"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View resources →
            </a>
          </div>

          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Settings className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Settings</h2>
            <p className="text-secondary-600 mb-4">Update your profile and preferences</p>
            <a
              href="/members/settings"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              Edit profile →
            </a>
          </div>

          {/* Sign Out */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <LogOut className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold text-secondary-800 mb-2">Sign Out</h2>
            <p className="text-secondary-600 mb-4">End your session securely</p>
            <a
              href="/api/auth/signout"
              className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-2"
            >
              Sign out →
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-secondary-800 mb-6">Your Impact This Year</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">12</div>
              <div className="text-secondary-600">Events Attended</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">8</div>
              <div className="text-secondary-600">Volunteer Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-secondary-600">Groups Joined</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">24</div>
              <div className="text-secondary-600">Sermons Listened</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

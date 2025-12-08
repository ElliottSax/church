"use client";

import { useState } from "react";
import { Play, Calendar, Search, Download } from "lucide-react";

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  series: string;
  scripture: string;
  duration: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
}

const sermons: Sermon[] = [
  {
    id: 1,
    title: "Walking in Faith and Hope",
    speaker: "Pastor Jane Smith",
    date: "December 3, 2025",
    series: "Advent 2025",
    scripture: "Romans 15:13",
    duration: "32:15",
    videoUrl: "#",
    audioUrl: "#",
  },
  {
    id: 2,
    title: "Love Your Neighbor",
    speaker: "Rev. John Miller",
    date: "November 26, 2025",
    series: "Living the Gospel",
    scripture: "Luke 10:25-37",
    duration: "28:45",
    videoUrl: "#",
    audioUrl: "#",
  },
  {
    id: 3,
    title: "Gratitude in All Things",
    speaker: "Pastor Jane Smith",
    date: "November 24, 2025",
    series: "Thanksgiving",
    scripture: "1 Thessalonians 5:16-18",
    duration: "25:30",
    videoUrl: "#",
    audioUrl: "#",
  },
  {
    id: 4,
    title: "The Power of Community",
    speaker: "Elder Sarah Johnson",
    date: "November 19, 2025",
    series: "Living the Gospel",
    scripture: "Acts 2:42-47",
    duration: "30:20",
    videoUrl: "#",
    audioUrl: "#",
  },
  {
    id: 5,
    title: "Faith in Action",
    speaker: "Pastor Jane Smith",
    date: "November 12, 2025",
    series: "Living the Gospel",
    scripture: "James 2:14-26",
    duration: "27:15",
    videoUrl: "#",
    audioUrl: "#",
  },
  {
    id: 6,
    title: "God's Unconditional Love",
    speaker: "Rev. John Miller",
    date: "November 5, 2025",
    series: "Living the Gospel",
    scripture: "1 John 4:7-12",
    duration: "29:40",
    videoUrl: "#",
    audioUrl: "#",
  },
];

export default function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");

  const series = ["all", ...Array.from(new Set(sermons.map((s) => s.series)))];

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeries =
      selectedSeries === "all" || sermon.series === selectedSeries;

    return matchesSearch && matchesSeries;
  });

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermon Archive</h1>
            <p className="text-xl text-primary-100">
              Watch, listen, and reflect on messages that inspire and challenge
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search sermons by title, speaker, or scripture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {series.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Series" : s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="md:flex">
                  {/* Video Thumbnail */}
                  <div className="md:w-80 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center aspect-video md:aspect-auto">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="text-primary-600 ml-1" size={32} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-2xl font-bold text-secondary-900 mb-1">
                          {sermon.title}
                        </h2>
                        <p className="text-secondary-600">
                          {sermon.speaker} • {sermon.duration}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold whitespace-nowrap">
                        {sermon.series}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-secondary-500 mb-4 space-x-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {sermon.date}
                      </div>
                      <div>Scripture: {sermon.scripture}</div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        <Play size={16} />
                        <span>Watch</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors">
                        <Download size={16} />
                        <span>Audio</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors">
                        <Download size={16} />
                        <span>Transcript</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredSermons.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary-600 text-lg">
                  No sermons found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

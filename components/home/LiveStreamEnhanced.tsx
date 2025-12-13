"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Users, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StreamStatus, ScheduledStream } from "@/lib/streaming";
import { format } from "date-fns";

interface LiveStreamEnhancedProps {
  streamStatus?: StreamStatus;
  upcomingStreams?: ScheduledStream[];
}

export default function LiveStreamEnhanced({
  streamStatus: initialStatus,
  upcomingStreams = []
}: LiveStreamEnhancedProps) {
  const [streamStatus, setStreamStatus] = useState<StreamStatus>(
    initialStatus || { isLive: false, platform: 'none' }
  );
  const [showChat, setShowChat] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  // Poll for live status every minute
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/streaming/status');
        if (response.ok) {
          const status = await response.json();
          setStreamStatus(status);
        }
      } catch (error) {
        console.error('Error checking stream status:', error);
      }
    };

    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getEmbedUrl = () => {
    if (!streamStatus.streamUrl) return '';

    if (streamStatus.platform === 'youtube') {
      const videoId = streamStatus.streamUrl.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (streamStatus.platform === 'vimeo') {
      const videoId = streamStatus.streamUrl.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }

    return '';
  };

  const handlePlayClick = () => {
    if (streamStatus.isLive) {
      setIsEmbedded(true);
    } else if (streamStatus.streamUrl) {
      window.open(streamStatus.streamUrl, '_blank');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary-50 to-primary-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Join Us for Worship
            </h2>
            <p className="text-lg text-secondary-600">
              Experience our services live or watch past sermons at your convenience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Stream Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-800 relative">
                  {/* Live/Status Badge */}
                  <AnimatePresence>
                    {streamStatus.isLive ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center z-10"
                      >
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        LIVE NOW
                        {streamStatus.viewerCount && (
                          <span className="ml-2 flex items-center">
                            <Users size={14} className="mr-1" />
                            {streamStatus.viewerCount}
                          </span>
                        )}
                      </motion.div>
                    ) : upcomingStreams.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-4 left-4 bg-secondary-900/80 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center z-10"
                      >
                        <Calendar size={16} className="mr-2" />
                        Next: {format(upcomingStreams[0].scheduledTime, 'MMM d, h:mm a')}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-4 left-4 bg-secondary-900/80 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center z-10"
                      >
                        <Calendar size={16} className="mr-2" />
                        Sunday Service: 10:30 AM
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Stream Platform Badge */}
                  {streamStatus.platform !== 'none' && (
                    <div className="absolute top-4 right-4 bg-white/90 text-secondary-800 px-3 py-1 rounded-full text-xs font-semibold uppercase z-10">
                      {streamStatus.platform}
                    </div>
                  )}

                  {/* Video Embed or Thumbnail */}
                  {isEmbedded && streamStatus.isLive ? (
                    <iframe
                      src={getEmbedUrl()}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : streamStatus.thumbnailUrl ? (
                    <Image
                      src={streamStatus.thumbnailUrl}
                      alt={streamStatus.title || "Stream thumbnail"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <button
                        onClick={handlePlayClick}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                      >
                        <Play className="text-primary-600 ml-1" size={40} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {streamStatus.isLive ? streamStatus.title || "Live Worship Service" : "Previous Service"}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {streamStatus.isLive
                      ? "Join us right now for our live worship service"
                      : "Watch our most recent sermon: \"Walking in Faith and Hope\""}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {streamStatus.streamUrl && (
                      <a
                        href={streamStatus.streamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Watch on {streamStatus.platform === 'youtube' ? 'YouTube' : 'Vimeo'}
                      </a>
                    )}

                    {streamStatus.isLive && (
                      <button
                        onClick={() => setShowChat(!showChat)}
                        className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                      >
                        {showChat ? 'Hide' : 'Show'} Live Chat
                      </button>
                    )}

                    <Link
                      href="/grow/sermons"
                      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                    >
                      View All Sermons
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Live Chat (if enabled) */}
              {showChat && streamStatus.isLive && streamStatus.platform === 'youtube' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-secondary-900">Live Chat</h4>
                  </div>
                  <iframe
                    src={`https://www.youtube.com/live_chat?v=${streamStatus.streamUrl?.split('v=')[1]}&embed_domain=${window.location.hostname}`}
                    className="w-full h-96"
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar - Upcoming Streams */}
            <div className="space-y-6">
              {/* Upcoming Streams */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-primary-600" size={20} />
                  Upcoming Streams
                </h3>

                {upcomingStreams.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingStreams.slice(0, 3).map((stream) => (
                      <div key={stream.id} className="border-l-4 border-primary-500 pl-3">
                        <h4 className="font-medium text-secondary-900 text-sm">
                          {stream.title}
                        </h4>
                        <p className="text-xs text-secondary-600 mt-1">
                          {format(stream.scheduledTime, 'EEEE, MMM d')}
                        </p>
                        <p className="text-xs text-secondary-600">
                          {format(stream.scheduledTime, 'h:mm a')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-secondary-600 text-sm">
                    <p className="mb-2">Regular Service Times:</p>
                    <ul className="space-y-1">
                      <li>• Sunday Worship: 10:30 AM</li>
                      <li>• Friday Bible Study: 7:00 PM</li>
                      <li>• Youth Service: Saturday 6:00 PM</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Stream Stats */}
              {streamStatus.isLive && (
                <div className="bg-primary-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    Stream Statistics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Viewers</span>
                      <span className="font-semibold">{streamStatus.viewerCount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Platform</span>
                      <span className="font-semibold capitalize">{streamStatus.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Quality</span>
                      <span className="font-semibold">HD 1080p</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-secondary-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link href="/grow/worship" className="block text-primary-600 hover:text-primary-700">
                    → Worship Schedule
                  </Link>
                  <Link href="/grow/sermons" className="block text-primary-600 hover:text-primary-700">
                    → Sermon Archive
                  </Link>
                  <Link href="/connect/events" className="block text-primary-600 hover:text-primary-700">
                    → Upcoming Events
                  </Link>
                  <Link href="/give" className="block text-primary-600 hover:text-primary-700">
                    → Support Our Ministry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
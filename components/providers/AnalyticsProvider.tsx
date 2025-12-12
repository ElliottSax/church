"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeAnalytics, trackPageView, isAnalyticsEnabled } from "@/lib/analytics";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Initialize analytics on mount
  useEffect(() => {
    if (isAnalyticsEnabled) {
      initializeAnalytics();
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (isAnalyticsEnabled) {
      // Get search params from window.location for static export compatibility
      const searchParams = typeof window !== "undefined" ? window.location.search : "";
      const url = pathname + searchParams;
      trackPageView(url);
    }
  }, [pathname]);

  return <>{children}</>;
}
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializeAnalytics, trackPageView, isAnalyticsEnabled } from "@/lib/analytics";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    if (isAnalyticsEnabled) {
      initializeAnalytics();
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (isAnalyticsEnabled) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
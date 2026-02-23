import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import SkipLink from "@/components/accessibility/SkipLink";
import AccessibilityMenu from "@/components/accessibility/AccessibilityMenu";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  title: "Minneapolis Community of Christ",
  description: "A welcoming, loving faith community in Minneapolis. We proclaim Jesus Christ and promote communities of joy, hope, love, and peace.",
  keywords: ["Community of Christ", "Minneapolis", "RLDS", "church", "faith community", "worship"],
  authors: [{ name: "Minneapolis Community of Christ" }],
  openGraph: {
    title: "Minneapolis Community of Christ",
    description: "A welcoming, loving faith community in Minneapolis",
    type: "website",
    locale: "en_US",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkipLink />
        <AnalyticsProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
            <ChatBot />
            <AccessibilityMenu />
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}

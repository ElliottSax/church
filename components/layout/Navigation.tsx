"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Beliefs", href: "/about/beliefs" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Location & Times", href: "/about/location" },
    ],
  },
  {
    label: "Grow",
    href: "/grow",
    children: [
      { label: "Worship Services", href: "/grow/worship" },
      { label: "Bible Study", href: "/grow/bible-study" },
      { label: "Prayer Groups", href: "/grow/prayer" },
      { label: "Sermon Archive", href: "/grow/sermons" },
    ],
  },
  {
    label: "Connect",
    href: "/connect",
    children: [
      { label: "Events", href: "/connect/events" },
      { label: "Small Groups", href: "/connect/groups" },
      { label: "Youth Ministry", href: "/connect/youth" },
      { label: "Community Outreach", href: "/connect/outreach" },
    ],
  },
  {
    label: "Give",
    href: "/give",
    children: [
      { label: "Online Giving", href: "/give/online" },
      { label: "Mission Projects", href: "/give/missions" },
      { label: "Volunteer", href: "/give/volunteer" },
    ],
  },
];

interface NavigationProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Navigation({ mobile = false, onClose }: NavigationProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleClick = () => {
    if (onClose) onClose();
  };

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className={`block px-4 py-2 text-lg font-medium rounded-md ${
                pathname === item.href
                  ? "bg-primary-50 text-primary-700"
                  : "text-secondary-700 hover:bg-secondary-50"
              }`}
              onClick={handleClick}
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={`block px-4 py-2 text-base rounded-md ${
                      pathname === child.href
                        ? "bg-primary-50 text-primary-600"
                        : "text-secondary-600 hover:bg-secondary-50"
                    }`}
                    onClick={handleClick}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item, index) => {
        // Only right-align the last menu item to prevent cutoff
        const isRightAligned = index === navItems.length - 1;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary-700 bg-primary-50"
                  : "text-secondary-700 hover:text-primary-600 hover:bg-secondary-50"
              }`}
            >
              {item.label}
              {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
            </Link>

            {/* Dropdown Menu */}
            {item.children && openDropdown === item.label && (
              <div className={`absolute ${isRightAligned ? 'right-0' : 'left-0'} mt-1 w-56 bg-white rounded-md shadow-lg border border-secondary-200 py-2 z-50`}>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === child.href
                        ? "bg-primary-50 text-primary-700"
                        : "text-secondary-700 hover:bg-secondary-50"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

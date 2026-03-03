/**
 * Fetches and parses the Community of Christ calendar ICS feed
 */

export interface ParsedCalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  url?: string;
  allDay?: boolean;
}

/**
 * Fetch and parse ICS calendar feed from Community of Christ
 */
export async function fetchCommunityOfChristCalendar(): Promise<
  ParsedCalendarEvent[]
> {
  try {
    const response = await fetch(
      "https://gathering.cofchrist.org/feed/calendar.ics",
      {
        // Add cache revalidation to prevent stale data
        next: { revalidate: 3600 }, // revalidate every hour
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch calendar feed:",
        response.status,
        response.statusText
      );
      return [];
    }

    const icsText = await response.text();
    return parseICS(icsText);
  } catch (error) {
    console.error("Error fetching calendar feed:", error);
    return [];
  }
}

/**
 * Parse ICS (iCalendar) format text
 * Handles VEVENT entries and extracts key properties
 */
export function parseICS(icsText: string): ParsedCalendarEvent[] {
  const events: ParsedCalendarEvent[] = [];

  // Split by VEVENT to get individual events
  const eventMatches = icsText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];

  eventMatches.forEach((eventText, index) => {
    try {
      const event = parseVEvent(eventText);
      if (event) {
        events.push(event);
      }
    } catch (error) {
      console.warn(`Failed to parse event ${index}:`, error);
    }
  });

  // Sort by start date
  events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return events;
}

/**
 * Parse individual VEVENT block
 */
function parseVEvent(eventText: string): ParsedCalendarEvent | null {
  // Unfold wrapped lines (lines starting with space/tab)
  const unfolded = eventText.replace(/\r?\n\s+/g, "");

  // Extract properties
  const getProperty = (name: string): string => {
    const regex = new RegExp(`${name}(?:;[^:]*)?:(.*)`, "i");
    const match = unfolded.match(regex);
    return match ? match[1].trim() : "";
  };

  const uid = getProperty("UID");
  const summary = decodeICSText(getProperty("SUMMARY"));
  const description = decodeICSText(getProperty("DESCRIPTION"));
  const location = decodeICSText(getProperty("LOCATION"));
  const dtStart = getProperty("DTSTART");
  const dtEnd = getProperty("DTEND");
  const url = getProperty("URL");

  if (!uid || !summary || !dtStart) {
    return null;
  }

  return {
    id: uid,
    title: summary,
    description: description || undefined,
    location: location || undefined,
    url: url || undefined,
    startDate: parseICSDateTime(dtStart),
    endDate: dtEnd ? parseICSDateTime(dtEnd) : undefined,
    allDay: !dtStart.includes("T"), // All-day events don't have time component
  };
}

/**
 * Parse ICS datetime format: YYYYMMDDTHHMMSSZ or YYYYMMDD
 */
function parseICSDateTime(dateTimeStr: string): Date {
  // Remove any parameters like VALUE=DATE
  dateTimeStr = dateTimeStr.split(";").pop() || dateTimeStr;

  if (dateTimeStr.length === 8) {
    // All-day format: YYYYMMDD
    const year = parseInt(dateTimeStr.substring(0, 4));
    const month = parseInt(dateTimeStr.substring(4, 6)) - 1;
    const day = parseInt(dateTimeStr.substring(6, 8));
    return new Date(year, month, day);
  } else if (dateTimeStr.includes("T")) {
    // DateTime format: YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS
    const year = parseInt(dateTimeStr.substring(0, 4));
    const month = parseInt(dateTimeStr.substring(4, 6)) - 1;
    const day = parseInt(dateTimeStr.substring(6, 8));
    const hours = parseInt(dateTimeStr.substring(9, 11));
    const minutes = parseInt(dateTimeStr.substring(11, 13));
    const seconds = parseInt(dateTimeStr.substring(13, 15));

    // Check if UTC (ends with Z)
    if (dateTimeStr.endsWith("Z")) {
      return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    } else {
      return new Date(year, month, day, hours, minutes, seconds);
    }
  }

  return new Date(dateTimeStr);
}

/**
 * Decode ICS text: handle escaped characters and unicode
 */
function decodeICSText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

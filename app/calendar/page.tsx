import ChurchCalendar from "@/components/calendar/ChurchCalendar";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ChurchCalendar />
      </div>
    </div>
  );
}
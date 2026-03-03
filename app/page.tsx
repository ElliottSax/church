import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Mission />
      <UpcomingEvents />
    </div>
  );
}

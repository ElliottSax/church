import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Mission />
      <UpcomingEvents />
    </div>
  );
}

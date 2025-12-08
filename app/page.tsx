import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import GetInvolved from "@/components/home/GetInvolved";
import NewsStories from "@/components/home/NewsStories";
import PrayerWall from "@/components/home/PrayerWall";
import LiveStream from "@/components/home/LiveStream";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Mission />
      <LiveStream />
      <UpcomingEvents />
      <PrayerWall />
      <NewsStories />
      <GetInvolved />
    </div>
  );
}

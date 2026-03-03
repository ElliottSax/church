import Hero from "@/components/home/Hero";
import JoinUs from "@/components/home/JoinUs";
import Mission from "@/components/home/Mission";
import CommunityGallery from "@/components/home/CommunityGallery";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import GetInvolved from "@/components/home/GetInvolved";
import NewsStories from "@/components/home/NewsStories";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <JoinUs />
      <Mission />
      <CommunityGallery />
      <UpcomingEvents />
      <GetInvolved />
      <NewsStories />
    </div>
  );
}

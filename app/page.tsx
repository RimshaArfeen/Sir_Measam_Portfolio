import { HeroSection } from "@/components/HeroSection";
import { HomeAboutPreview } from "@/components/home/HomeAboutPreview";
import { HomeGreynPreview } from "@/components/home/HomeGreynPreview";
import { HomeImpactPreview } from "@/components/home/HomeImpactPreview";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <HomeAboutPreview />
      <HomeGreynPreview />
      <HomeImpactPreview />
      <HomeFinalCTA />
    </main>
  );
}

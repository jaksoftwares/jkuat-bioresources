import { LandingHero } from "@/components/shared/landing-hero";
import { LandingStats } from "@/components/shared/landing-stats";
import { LandingAbout } from "@/components/shared/landing-about";
import { LandingFeatures } from "@/components/shared/landing-features";

export default function LandingPage() {
  return (
    <div className="w-full">
      <LandingHero />
      <LandingStats />
      <LandingAbout />
      <LandingFeatures />
    </div>
  );
}

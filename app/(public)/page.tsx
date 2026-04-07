import { LandingHero } from "@/components/shared/landing-hero";
import { LandingStats } from "@/components/shared/landing-stats";
import { LandingFeatures } from "@/components/shared/landing-features";
import { LandingRecent } from "@/components/shared/landing-recent";
import { LandingWorkflow } from "@/components/shared/landing-workflow";
import { LandingPartners } from "@/components/shared/landing-partners";
import { LandingCta } from "@/components/shared/landing-cta";

export default function LandingPage() {
  return (
    <div className="w-full">
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingWorkflow />
      <LandingRecent />
      <LandingPartners />
      <LandingCta />
    </div>
  );
}

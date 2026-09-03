import { HeroSection } from "@/components/home/HeroSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { InteractiveSolutionExplorer } from "@/components/home/InteractiveSolutionExplorer";
import { AudienceSegments } from "@/components/home/AudienceSegments";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FeaturedCaseStudies } from "@/components/home/FeaturedCaseStudies";
import { ProcessSnapshot } from "@/components/home/ProcessSnapshot";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { CTASection } from "@/components/shared/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Aether Technologies | Practical B2B Software Engineering",
  description:
    "We design and engineer reliable digital solutions, web applications, and internal tools for schools, colleges, startups, and growing businesses.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <HeroSection />
      <CapabilitiesSection />
      
      {/* Interactive Connected Technology Section */}
      <TechnologySection />

      {/* Interactive Solution Archetypes Explorer */}
      <InteractiveSolutionExplorer />

      <AudienceSegments />
      <FeaturedServices />
      <FeaturedCaseStudies />
      <ProcessSnapshot />
      <WhyUsSection />
      <CTASection />
    </div>
  );
}

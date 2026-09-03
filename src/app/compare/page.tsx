import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ComparisonMatrix } from "@/components/compare/ComparisonMatrix";
import { createMetadata } from "@/lib/metadata";
import { GitCompare } from "lucide-react";

export const metadata = createMetadata({
  title: "Architectural Decisions & Technology Comparison | Aether",
  description:
    "Explore transparent technical comparisons: Custom Software vs. Bloated SaaS ERPs, PostgreSQL ACID vs. NoSQL, and Modern Next.js vs. Legacy PHP.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Technology Comparison" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Engineering Rationale</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Architectural Decisions & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Technology Comparisons.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            Clear, uncompromising architectural trade-offs to help school boards, startup founders, and IT directors evaluate long-term software investments.
          </p>
        </div>

        {/* Interactive Matrix */}
        <div className="mt-12">
          <ComparisonMatrix />
        </div>
      </Container>

      <CTASection
        title="Want to compare a specific technology or vendor quote?"
        description="Schedule a no-obligation technical review with our lead software engineers."
      />
    </div>
  );
}

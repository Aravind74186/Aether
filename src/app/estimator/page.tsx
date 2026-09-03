import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectEstimator } from "@/components/estimator/ProjectEstimator";
import { createMetadata } from "@/lib/metadata";
import { Calculator, ShieldCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Interactive Project Cost & Sprint Estimator | Aether",
  description:
    "Calculate estimated development timelines, sprint milestones, and investment ranges for school platforms, startup MVPs, custom internal tools, and AI systems.",
  path: "/estimator",
});

export default function EstimatorPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Project Cost Estimator" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Transparent Scoping Tool</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Transparent Pricing & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Sprint Timeline Estimator.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            No vague sales quotes or opaque billing. Select your required architectural building blocks to see our transparent timeline, sprint milestones, and estimated investment.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All estimates reflect actual engineering velocity and fixed-scope sprint milestones.
            </span>
          </div>
        </div>

        {/* Interactive Estimator */}
        <div className="mt-12">
          <ProjectEstimator />
        </div>
      </Container>

      <CTASection
        title="Need a custom architecture not listed in the calculator?"
        description="Schedule a technical discovery session with our engineers to scope bespoke multi-system integrations."
      />
    </div>
  );
}

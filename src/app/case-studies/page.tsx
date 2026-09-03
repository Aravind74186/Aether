import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { CaseStudiesHub } from "@/components/case-studies/CaseStudiesHub";
import { caseStudiesData } from "@/data/case-studies";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Case Studies & Architecture Breakdowns | Aether",
  description:
    "Explore in-depth technical case studies, architectural trade-offs, database schemas, and verified outcomes for educational and business software.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 bg-white">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Case Studies" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Engineering Proof & Architecture</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Technical Case Studies & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Architecture Decisions.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            We document the actual problems, constraints, system designs, and verified outcomes behind our systems. No fabricated claims—only honest engineering records.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-mono text-orange-700 mt-2 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              All demonstration & pilot projects are transparently marked as internal reference builds.
            </span>
          </div>
        </div>

        {/* Interactive Hub */}
        <div className="mt-12">
          <CaseStudiesHub initialStudies={caseStudiesData} />
        </div>
      </Container>

      <CTASection
        title="Need an architecture breakdown for your project?"
        description="We can help you evaluate technical trade-offs, database schemas, and deployment topologies."
      />
    </div>
  );
}

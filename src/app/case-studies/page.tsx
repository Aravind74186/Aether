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
    "Explore in-depth technical case studies, architectural trade-offs, database schemas, and verified engineering outcomes across AI/RAG systems, distributed business platforms, and cloud infrastructure.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Case Studies" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Verified Engineering Experience</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Technical Case Studies & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Architecture Decisions.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            A transparent record of actual software engineering work, architectural trade-offs, and verified technical outcomes. Each case study documents real problem constraints, hands-on contributions, and lessons learned.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 text-xs font-mono text-orange-700 dark:text-orange-300 mt-2 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>
              All entries clearly distinguish client engagements, prior company work, independent projects, and applied R&D. Client details are anonymized for confidentiality.
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

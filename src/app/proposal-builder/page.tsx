import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProposalBuilder } from "@/components/proposal/ProposalBuilder";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Institutional Proposal & SOW Generator | Aether",
  description:
    "Generate a formal, print-ready Technical Proposal and Scope of Work (SOW) document with sprint milestones and governance terms.",
  path: "/proposal-builder",
});

export default function ProposalBuilderPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Proposal & SOW Generator" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4 print:hidden">
          <Badge variant="brand">Board-Ready Documentation</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Institutional Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Proposal & SOW Builder.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            Configure project parameters to generate a clean, itemized Scope of Work and milestone proposal ready for review by school boards, university committees, or investors.
          </p>
        </div>

        {/* Interactive Proposal Builder */}
        <div className="mt-8">
          <ProposalBuilder />
        </div>
      </Container>
    </div>
  );
}

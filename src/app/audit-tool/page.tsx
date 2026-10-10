import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ArchitectureAuditTool } from "@/components/audit/ArchitectureAuditTool";
import { createMetadata } from "@/lib/metadata";
import { Activity } from "lucide-react";

export const metadata = createMetadata({
  title: "Legacy Software & Architecture Audit Tool | Aether",
  description:
    "Diagnose software performance bottlenecks, spreadsheet desyncs, and SaaS license bloat. Receive an instant architectural health score and Next.js modernization roadmap.",
  path: "/audit-tool",
});

export default function AuditToolPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Software Architecture Audit" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="warning">Diagnostic Tool</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Diagnose Software Bottlenecks & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Modernization Roadmap.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Is your existing school portal, logistics spreadsheet, or legacy PHP app causing operational delays? Run our instant diagnostic audit to calculate your health score and modernization remedies.
          </p>
        </div>

        {/* Interactive Audit Tool */}
        <div className="mt-12">
          <ArchitectureAuditTool />
        </div>
      </Container>

      <CTASection
        title="Want a complimentary code-level performance audit?"
        description="Our software engineers will review your database query logs and architecture schemas."
      />
    </div>
  );
}

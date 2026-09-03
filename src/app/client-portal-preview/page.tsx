import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ClientPortalPreview } from "@/components/portal/ClientPortalPreview";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck, Eye, Terminal } from "lucide-react";

export const metadata = createMetadata({
  title: "Client Portal & Sprint Experience Preview | Aether",
  description:
    "Explore what collaborating with Aether Technologies looks like: live sprint milestone tracking, continuous staging deployments, and verified deliverable signoffs.",
  path: "/client-portal-preview",
});

export default function ClientPortalPreviewPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Client Portal Preview" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Client Experience & Transparency</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            How You Track & Review Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Active Software Sprints.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            No guessing what engineers are doing. When you partner with Aether, you get access to a private client workspace featuring real-time sprint milestones, live staging URLs, and verified deliverable checklists.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mt-2">
            <Eye className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              Interactive demonstration of our client collaboration dashboard.
            </span>
          </div>
        </div>

        {/* Interactive Portal */}
        <div className="mt-12">
          <ClientPortalPreview />
        </div>
      </Container>

      <CTASection
        title="Ready to start a project with radical milestone transparency?"
        description="Let's discuss your requirements and map out Sprint 01 for your organization."
      />
    </div>
  );
}

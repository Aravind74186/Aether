import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { createMetadata } from "@/lib/metadata";
import { FileText } from "lucide-react";

export const metadata = createMetadata({
  title: "Terms of Service | Aether Technologies",
  description: "Terms and conditions governing use of Aether Technologies services and website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="md">
        <Breadcrumbs items={[{ name: "Terms of Service" }]} />

        <div className="space-y-4">
          <Badge variant="brand">Legal & Governance</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: January 1, 2025 • Version 1.0
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website at {siteConfig.url} or submitting project requests through our platform, you agree to be bound by these Terms of Service. Custom development engagements are further governed by individual Master Services Agreements (MSAs) and Statements of Work (SOWs).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              2. Intellectual Property & Code Ownership
            </h2>
            <p>
              Under our standard client development contracts, clients obtain full ownership of bespoke source code and customized deliverables upon payment completion of agreed sprint milestones. Pre-existing open-source libraries and our standard developer tooling frameworks remain licensed under their respective MIT/Apache designations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              3. Limitation of Liability
            </h2>
            <p>
              This public website and its sample materials are provided &quot;as is&quot; without warranties of any kind. Aether Technologies shall not be liable for any indirect, incidental, or consequential damages resulting from website downtime or informational content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms are governed by the laws applicable in Bangalore, India, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

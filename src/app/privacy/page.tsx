import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { createMetadata } from "@/lib/metadata";
import { Shield, AlertCircle } from "lucide-react";

export const metadata = createMetadata({
  title: "Privacy Policy | Aether Technologies",
  description: "Learn how Aether Technologies handles data privacy, client information, and security practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="md">
        <Breadcrumbs items={[{ name: "Privacy Policy" }]} />

        <div className="space-y-4">
          <Badge variant="brand">Legal & Data Protection</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-500">
            Last Updated: January 1, 2025 • Policy Version 1.1
          </p>

          <div className="p-4 rounded-2xl bg-orange-50/90 border border-orange-200/90 text-xs text-orange-950 font-mono flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong className="font-semibold text-orange-900">Compliance Notice:</strong> This privacy framework outlines our data stewardship practices. For institutional contracts with schools and health-adjacent entities, specialized Data Processing Addendums (DPAs) apply.
            </span>
          </div>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              1. Information We Collect
            </h2>
            <p>
              When you submit a contact inquiry, request a scoping estimate, or interact with {siteConfig.name}, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Contact details: Name, work email address, phone number (if provided), and organization name.</li>
              <li>Project parameters: Project description, technical scope, budget expectations, and target timeline.</li>
              <li>Technical telemetry: Minimal anonymized server access logs (IP address, user agent) strictly used for security rate-limiting and DDoS prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              2. How We Use Information
            </h2>
            <p>
              We collect information strictly to conduct our engineering business. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To evaluate project feasibility and prepare technical proposals.</li>
              <li>To communicate directly regarding ongoing discovery or software development work.</li>
              <li>We never sell, rent, or monetize your contact information with third-party marketing brokers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              3. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS in transit, encrypted storage at rest) for all incoming inquiries. Access to inquiry databases is restricted strictly to active engineering staff on a least-privilege basis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              4. Educational & Student Data Safeguards
            </h2>
            <p>
              When engineering systems for schools or higher education colleges, we enforce strict data isolation protocols. Student data remains the exclusive property of the educational institution. We do not use educational customer records to train public artificial intelligence models without explicit institutional authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              5. Contacting Data Protection
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request the deletion of your inquiry records, please email our team directly at{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2 font-mono"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

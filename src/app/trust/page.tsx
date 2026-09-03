import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { TrustCenter } from "@/components/trust/TrustCenter";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Security, Privacy & Trust Center | Aether",
  description:
    "Explore Aether's enterprise security architecture, student data privacy protections, encryption standards, and 99.9% uptime SLA commitments.",
  path: "/trust",
});

export default function TrustPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Security & Trust Center" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Enterprise Governance</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Security, Privacy & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Institutional Trust Center.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            Whether deploying a campus-wide academic portal or scaling a high-velocity startup MVP, security and verifiable data privacy are engineered into every layer of our systems.
          </p>
        </div>

        {/* Interactive Trust Center */}
        <div className="mt-12">
          <TrustCenter />
        </div>
      </Container>

      <CTASection
        title="Require custom security audits or signed data processing agreements?"
        description="Our engineers work directly with institutional compliance officers and security teams."
      />
    </div>
  );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { VisualArchitectureDesigner } from "@/components/architecture/VisualArchitectureDesigner";
import { createMetadata } from "@/lib/metadata";
import { Layers } from "lucide-react";

export const metadata = createMetadata({
  title: "Visual Cloud Architecture Designer & SOW Exporter | Aether",
  description:
    "Design and configure your custom multi-tier cloud topology. Calculate monthly hosting costs and download a technical Scope of Work (SOW) specification.",
  path: "/architecture-designer",
});

export default function ArchitectureDesignerPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Architecture Designer" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Visual Infrastructure Studio</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Design Your Production <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              System Architecture.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Select your required client interfaces, backend gateways, persistence models, and edge services. Get instant monthly cloud hosting estimates and download a complete Scope of Work (SOW) blueprint.
          </p>
        </div>

        {/* Interactive Designer */}
        <div className="mt-12">
          <VisualArchitectureDesigner />
        </div>
      </Container>

      <CTASection
        title="Ready to build your configured cloud architecture?"
        description="Our engineers will review your generated SOW blueprint and schedule a sprint kickoff."
      />
    </div>
  );
}

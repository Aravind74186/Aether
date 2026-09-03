import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { MsaGenerator } from "@/components/legal/MsaGenerator";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Master Services Agreement (MSA) & NDA Generator | Aether",
  description:
    "Generate formal institutional software engineering contracts with 100% IP assignment, 30-day bug warranties, and milestone-based payment schedules.",
  path: "/msa-generator",
});

export default function MsaGeneratorPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Master Services Agreement (MSA) Generator" }]} />
        <div className="mt-8">
          <MsaGenerator />
        </div>
      </Container>
    </div>
  );
}

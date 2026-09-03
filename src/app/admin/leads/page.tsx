import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LeadDashboard } from "@/components/admin/LeadDashboard";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Inbound Lead Operations & Triage | Aether",
  description: "Internal lead triage and project intake management portal.",
  path: "/admin/leads",
});

export default function AdminLeadsPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Internal Operations" }, { name: "Lead Triage" }]} />
        <LeadDashboard />
      </Container>
    </div>
  );
}

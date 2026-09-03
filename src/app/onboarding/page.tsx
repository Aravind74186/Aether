import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ClientOnboardingHub } from "@/components/onboarding/ClientOnboardingHub";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Client Onboarding & Project Kickoff Roadmap | Aether",
  description:
    "Explore our 5-stage client onboarding blueprint from workspace initialization, data modeling, and weekly staging deployments to production DNS cutover.",
  path: "/onboarding",
});

export default function OnboardingPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Client Onboarding & Project Kickoff Hub" }]} />
        <div className="mt-8">
          <ClientOnboardingHub />
        </div>
      </Container>
    </div>
  );
}

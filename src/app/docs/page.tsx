import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { DocsViewer } from "@/components/docs/DocsViewer";
import { createMetadata } from "@/lib/metadata";
import { BookOpen } from "lucide-react";

export const metadata = createMetadata({
  title: "Engineering & API Architecture Documentation | Aether",
  description:
    "Explore Aether's RESTful API conventions, Zod validation patterns, multi-role RBAC session architecture, and PostgreSQL transaction runbooks.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Developer Documentation" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Technical Reference Hub</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Developer Documentation & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Architecture Runbooks.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            Comprehensive technical standards detailing our RESTful API design, runtime Zod validation, PostgreSQL ACID transaction models, and pgvector semantic search patterns.
          </p>
        </div>

        {/* Interactive Docs Hub */}
        <div className="mt-12">
          <DocsViewer />
        </div>
      </Container>

      <CTASection
        title="Need bespoke API integration or custom webhook endpoints?"
        description="Our team designs, documents, and maintains robust API surfaces tailored to your internal software."
      />
    </div>
  );
}

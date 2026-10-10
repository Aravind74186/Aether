import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ProjectsHub } from "@/components/projects/ProjectsHub";
import { getProjects } from "@/lib/projects-db";
import { createMetadata } from "@/lib/metadata";
import { FlaskConical } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Projects & Engineering Labs | Tools, Prototypes & Experiments",
  description:
    "Explore our experimental developer tools, prototypes, automation utilities, and open research projects built by the Aether engineering team.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Projects & Labs" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Engineering Experiments & Prototypes</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Projects, Developer Tools & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Lab Experiments.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Beyond client software, we build open-source utilities, offline-first educational prototypes, and schema testing tools to keep our engineering sharp.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 mt-2 shadow-2xs">
            <FlaskConical className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              All prototypes and developer tools reflect genuine active engineering codebases.
            </span>
          </div>
        </div>

        {/* Interactive Hub */}
        <div className="mt-12">
          <ProjectsHub initialProjects={projects} />
        </div>
      </Container>

      <CTASection
        title="Interested in collaborating on an experimental build?"
        description="We partner with academic labs, founders, and teams to build specialized tools and prototypes."
      />
    </div>
  );
}

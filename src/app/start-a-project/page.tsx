import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProjectIntakeWizard } from "@/components/forms/ProjectIntakeWizard";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck, Terminal } from "lucide-react";

export const metadata = createMetadata({
  title: "Start a Project | Interactive Scoping Wizard",
  description:
    "Define your project vision, target audience, technical stage, timeline, and budget. Receive a detailed architecture proposal from Aether engineers.",
  path: "/start-a-project",
});

export default function StartAProjectPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 bg-white">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Start a Project" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Project Intake & Scoping</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Start a Project with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Clear Scoping & Feasibility.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Complete our interactive 4-step intake wizard to help us understand your operational bottlenecks, target users, and timeline. Our technical team will review your requirements and provide an honest engineering breakdown.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          <div className="lg:col-span-8">
            <ProjectIntakeWizard />
          </div>

          {/* Sidebar / Expectations */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-mono uppercase text-orange-700 font-bold">
                <Terminal className="w-4 h-4" />
                <span>What Happens Next</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 font-mono">Engineering Triage:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      A senior engineer reviews your problem statement and technical feasibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 font-mono">Discovery Call:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      A 30-minute technical session to review edge cases, user roles, and database schemas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 font-mono">Milestone Proposal:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Fixed-scope sprint timeline, clear acceptance criteria, and verified deliverables.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-2 text-xs font-mono text-slate-700 shadow-2xs">
              <div className="text-emerald-800 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Confidentiality Guaranteed</span>
              </div>
              <p className="leading-relaxed">
                All submitted project requirements, ideas, and organizational details are kept strictly confidential under engineering ethics.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

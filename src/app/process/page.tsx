import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { processSteps } from "@/data/process";
import { createMetadata } from "@/lib/metadata";
import {
  Search,
  FileCode,
  PenTool,
  Terminal,
  ShieldCheck,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Engineering Process & Delivery Methodology | Aether",
  description:
    "Explore our 7-step engineering delivery lifecycle: from rigorous requirements discovery and schema planning to production deployment and long-term support.",
  path: "/process",
});

export default function ProcessPage() {
  const stepIcons = [
    Search,
    FileCode,
    PenTool,
    Terminal,
    ShieldCheck,
    Rocket,
    HeartHandshake,
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Engineering Process" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Our Engineering Lifecycle</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Predictable Delivery Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Disciplined 7-Step Engineering.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            Software projects fail when planning is rushed and architectures are slapped together without clear acceptance criteria. We adhere to a structured 7-phase methodology.
          </p>
        </div>

        {/* 7-Step Detailed Breakdown */}
        <div className="mt-16 space-y-12">
          {processSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Terminal;
            return (
              <div
                key={step.stepNumber}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 hover:border-slate-750 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-orange-500">
                        {step.stepNumber}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-orange-950/80 border border-orange-800/40 flex items-center justify-center text-orange-400">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h2>

                    <p className="text-sm font-medium text-slate-300">
                      {step.shortSummary}
                    </p>

                    {step.durationEstimate && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                        <span>Estimated Duration: {step.durationEstimate}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {step.details}
                    </p>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold">
                        Tangible Phase Deliverables:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {step.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <CTASection
        title="Ready to walk through this process for your upcoming build?"
        description="We start with Phase 01: a focused discovery call to map your requirements and clarify technical feasibility."
      />
    </div>
  );
}

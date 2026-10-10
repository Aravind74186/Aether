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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
            Predictable Delivery Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Disciplined 7-Step Engineering.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed pt-2">
            Software projects fail when planning is rushed and architectures are slapped together without clear acceptance criteria. We adhere to a structured 7-phase methodology.
          </p>
        </div>

        {/* 7-Step Detailed Breakdown */}
        <div className="mt-16 space-y-8">
          {processSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Terminal;
            return (
              <div
                key={step.stepNumber}
                className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-orange-600">
                        {step.stepNumber}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                      {step.title}
                    </h2>

                    <p className="text-sm font-medium text-stone-600">
                      {step.shortSummary}
                    </p>

                    {step.durationEstimate && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono text-stone-600">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>Estimated Duration: {step.durationEstimate}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                      {step.details}
                    </p>

                    <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-orange-700 font-semibold">
                        Tangible Phase Deliverables:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                        {step.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
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

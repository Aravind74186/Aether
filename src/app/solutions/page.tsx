import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { solutionsData } from "@/data/solutions";
import { createMetadata } from "@/lib/metadata";
import {
  GraduationCap,
  Rocket,
  Building2,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Solutions | Tailored Engineering for Schools, Startups & Enterprise",
  description:
    "Explore how Aether engineers problem-first solutions for academic institutions, early founders, local businesses, and modern enterprises.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const iconMap: Record<string, React.ElementType> = {
    "schools-colleges": GraduationCap,
    startups: Rocket,
    "small-business": Building2,
    "enterprise-services": Briefcase,
  };

  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Solutions" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Problem-First Architecture</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Solutions Built Around <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Your Specific Domain Problems.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Every organization operates under unique constraints. Explore how we structure our engineering approach from initial diagnosis to delivered software and verified outcomes.
          </p>
        </div>

        {/* Sector Navigation Quick Bar */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-200">
          {solutionsData.map((sol) => (
            <a
              key={sol.id}
              href={`#${sol.id}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-slate-50 border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 hover:bg-white transition-all shadow-2xs"
            >
              {sol.targetSegment}
            </a>
          ))}
        </div>

        {/* Deep Dive Sector Solution Blocks */}
        <div className="mt-16 space-y-20">
          {solutionsData.map((sol, index) => {
            const Icon = iconMap[sol.id] || Building2;
            return (
              <div
                key={sol.id}
                id={sol.id}
                className="scroll-mt-28 rounded-3xl studio-card p-8 sm:p-12 space-y-8 group"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100/90 border border-slate-200/90 flex items-center justify-center text-slate-800 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                          Sector 0{index + 1}
                        </span>
                        <Badge variant="outline">{sol.badge}</Badge>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                        {sol.targetSegment}
                      </h2>
                    </div>
                  </div>

                  <Button
                    href={`/start-a-project?segment=${sol.id}`}
                    size="sm"
                    variant="primary"
                    className="self-start md:self-auto"
                  >
                    <span>Request {sol.badge} Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {sol.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
                    {sol.overview}
                  </p>
                </div>

                {/* Problem -> Approach -> Delivered Solutions -> Expected Outcome */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Step 1: Pain Points & Problem Diagnosis */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>The Problem & Pain Points</span>
                    </div>
                    <div className="space-y-3">
                      {sol.painPoints.map((pp, ppIdx) => (
                        <div key={ppIdx} className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 font-mono">
                            • {pp.title}
                          </h4>
                          <p className="text-xs text-slate-600 pl-3 leading-relaxed">
                            {pp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Our Technical Approach */}
                  <div className="rounded-2xl border border-orange-100 dark:border-orange-900/50 bg-orange-50/40 dark:bg-orange-950/25 p-6 space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-700 dark:text-orange-400 font-bold">
                      <Lightbulb className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span>Our Engineering Approach</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {sol.approach}
                    </p>
                    <div className="pt-2 border-t border-orange-100 dark:border-orange-900/40">
                      <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        Key Architectural Principle:
                      </div>
                      <div className="text-xs text-orange-800 dark:text-orange-300 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-orange-200 dark:border-orange-800/60 shadow-2xs">
                        Modular deployment • Zero vendor lock-in • Granular role isolation
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Delivered Solutions Matrix */}
                <div className="space-y-4 pt-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Delivered Software Components:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sol.deliveredSolutions.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4: Expected Outcomes */}
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/25 p-6 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Expected Measurable Outcomes</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                    {sol.expectedOutcomes.map((outc, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                        <span>{outc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <CTASection
        title="Ready to solve these operational challenges in your organization?"
        description="Schedule a focused technical discovery session to map your requirements and get a concrete architecture roadmap."
      />
    </div>
  );
}

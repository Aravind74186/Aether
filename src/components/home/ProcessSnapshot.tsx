"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Search,
  CalendarCheck,
  PenTool,
  Terminal,
  ShieldCheck,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  num: string;
  name: string;
  shortDesc: string;
  detail: string;
  icon: React.ElementType;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    num: "01",
    name: "Discover",
    shortDesc: "Bottleneck Diagnosis",
    detail:
      "We interview stakeholders, audit existing spreadsheets or manual workflows, and define non-negotiable operational constraints.",
    icon: Search,
    deliverables: ["Scope Charter", "User Journey Map", "Constraint Audit"],
  },
  {
    num: "02",
    name: "Plan",
    shortDesc: "Architecture & SOW",
    detail:
      "We produce a formal milestone schedule with fixed pricing, clear deliverables, and unambiguous acceptance criteria.",
    icon: CalendarCheck,
    deliverables: ["Fixed Milestone SOW", "Data Flow Blueprint", "Cost Estimate"],
  },
  {
    num: "03",
    name: "Design",
    shortDesc: "Schema & Prototypes",
    detail:
      "We model normalized PostgreSQL schemas, design strict Zod/OpenAPI contracts, and prototype clickable high-fidelity interfaces.",
    icon: PenTool,
    deliverables: ["Relational Schema (ERD)", "API Specifications", "Figma Design System"],
  },
  {
    num: "04",
    name: "Build",
    shortDesc: "Clean TypeScript Code",
    detail:
      "We engineer strictly typed, modular code with automated linting, test suites, and accessible preview deployments for inspection.",
    icon: Terminal,
    deliverables: ["Full-Stack Repository", "Staging Environments", "Zero Boilerplate Debt"],
  },
  {
    num: "05",
    name: "Test",
    shortDesc: "Verification & Security",
    detail:
      "We execute concurrency stress tests, SQL injection validation, role authorization tests, and cross-device responsive verification.",
    icon: ShieldCheck,
    deliverables: ["Automated Test Suite", "Security Audit Report", "P99 Load Benchmark"],
  },
  {
    num: "06",
    name: "Deploy",
    shortDesc: "Production Handover",
    detail:
      "We deploy to secure containerized cloud environments, configure automated backups, and transfer 100% repository and IP ownership.",
    icon: Rocket,
    deliverables: ["Production Cloud Launch", "100% IP Assignment", "30-Day Bug Warranty"],
  },
];

export function ProcessSnapshot() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-20 bg-white border-t border-slate-200 relative overflow-hidden">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <SectionHeader
            badge="Engineering Delivery"
            title="Disciplined 6-Step Delivery Lifecycle"
            description="A systematic, milestone-driven development process engineered to eliminate surprises and guarantee delivery."
            align="left"
            className="mb-0"
          />
          <Link
            href="/process"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>View Complete Process Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Progress Timeline Tracker */}
        <div className="hidden lg:flex items-center justify-between relative mb-12 px-6">
          {/* Background Track Line */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 z-0" />
          {/* Active Filled Progress Line */}
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-orange-600 transition-all duration-300 z-0"
            style={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-500/20 scale-110"
                      : isCompleted
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-white text-stone-400 border-stone-200 group-hover:border-orange-300"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : step.num}
                </div>
                <span
                  className={`mt-2 text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? "text-orange-600 font-bold"
                      : "text-stone-500 group-hover:text-stone-800"
                  }`}
                >
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-7 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? "bg-white border-2 border-orange-600 shadow-xl shadow-orange-500/10 -translate-y-1"
                    : "studio-card"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-2xl font-mono font-extrabold tracking-tight transition-colors ${
                        isActive ? "text-orange-600" : "text-stone-400"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                          : "bg-orange-50/80 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                      {step.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 font-medium mt-0.5">
                      {step.shortDesc}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-600 uppercase font-semibold">
                    Key Deliverables:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

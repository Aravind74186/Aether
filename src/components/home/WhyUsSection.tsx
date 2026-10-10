import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  Code,
  Eye,
  ShieldCheck,
  Cpu,
  GitBranch,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
} from "lucide-react";
import Link from "next/link";

export function WhyUsSection() {
  const engineeringGuarantees = [
    {
      icon: GitBranch,
      title: "100% Code & Database Ownership",
      description:
        "You own 100% of the intellectual property, repository, database schemas, and infrastructure configs. No proprietary runtime lock-in.",
      benefit: "Full IP Assignment on Day 1",
    },
    {
      icon: ShieldCheck,
      title: "Fixed-Scope Sprint Milestones",
      description:
        "Clear milestone definitions with verifiable acceptance criteria. You inspect working staging deployments before approving release tranches.",
      benefit: "Zero Runaway Hourly Invoices",
    },
    {
      icon: Eye,
      title: "Direct Engineering Communication",
      description:
        "Speak directly with the lead software engineer building your system. No non-technical account managers filtering requirements.",
      benefit: "Zero Lost-in-Translation Bugs",
    },
    {
      icon: Cpu,
      title: "Pragmatic Modern Architecture",
      description:
        "We build with battle-tested stacks (Next.js, TypeScript, PostgreSQL) optimized for speed, reliability, and cost-effective hosting.",
      benefit: "Sub-50ms SSR & Lean Cloud Sizing",
    },
    {
      icon: Lock,
      title: "Rigorous Security by Default",
      description:
        "Every endpoint is guarded with runtime Zod schema validation, encrypted HTTP-only auth cookies, and parameterized SQL queries.",
      benefit: "Zero SQL Injection / CSRF Risks",
    },
    {
      icon: HeartHandshake,
      title: "Post-Launch Warranty & Support",
      description:
        "Every project includes a 30-day post-handover warranty for bug fixes and telemetry monitoring at zero additional charge.",
      benefit: "30-Day Guaranteed Bug Warranty",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-transparent border-t border-slate-200 dark:border-slate-800">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <SectionHeader
            badge="Engineering Integrity"
            title="The Engineering-Led Difference"
            description="We are software craftsmen, not a bloated sales agency. Here is our operational contract with every client."
            align="left"
            className="mb-0"
          />
          <Link
            href="/trust"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>Read Complete Trust Charter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Core Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringGuarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-7 rounded-3xl studio-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50/80 dark:bg-orange-950/60 border border-orange-100 dark:border-orange-900/60 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 group-hover:scale-105 transition-all duration-300 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-950 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                    {item.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 rounded-3xl studio-card p-6 sm:p-10">
          <h3 className="text-xl font-bold text-stone-950 dark:text-white text-center mb-8">
            How Aether Compares to Agency & Freelance Alternatives
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-slate-800 text-stone-500 dark:text-slate-400 font-mono">
                  <th className="pb-4 font-semibold">Evaluation Criteria</th>
                  <th className="pb-4 font-bold text-orange-600">Aether Technologies</th>
                  <th className="pb-4 font-normal text-slate-400">Traditional Agency</th>
                  <th className="pb-4 font-normal text-slate-400">Freelance Marketplace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 font-medium">Communication Channel</td>
                  <td className="py-3.5 font-semibold text-slate-900 dark:text-white">Direct Software Engineers</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Non-technical Account Reps</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Unvetted Messaging</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Code & Schema Ownership</td>
                  <td className="py-3.5 font-semibold text-slate-900 dark:text-white">100% IP Handover Day 1</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Often Proprietary Lock-in</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Variable / Ambiguous</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Pricing Model</td>
                  <td className="py-3.5 font-semibold text-slate-900 dark:text-white">Fixed Milestone Scopes</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Open-ended Hourly Retainers</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Unpredictable Overages</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-medium">Post-Launch Guarantee</td>
                  <td className="py-3.5 font-semibold text-slate-900 dark:text-white">30-Day Bug Warranty Included</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Expensive Support Retainer</td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400">Disappears Post-Payment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

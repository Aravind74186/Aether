"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface PainPoint {
  id: string;
  label: string;
  category: "Performance" | "Data Integrity" | "Cost & Licensing" | "Security & Mobile";
  impactScore: number; // Reduces legacy health score
  remedy: string;
}

const painPoints: PainPoint[] = [
  {
    id: "slow_morning",
    label: "Morning roll calls or bulk log-ins take 30+ minutes or crash the portal",
    category: "Performance",
    impactScore: 18,
    remedy: "Replace slow sequential queries with batch PostgreSQL updates and sub-50ms edge caching.",
  },
  {
    id: "spreadsheet_hell",
    label: "Staff rely on multiple disconnected Excel sheets resulting in duplicate/lost data",
    category: "Data Integrity",
    impactScore: 20,
    remedy: "Implement normalized PostgreSQL schemas with foreign-key constraints and ACID transaction locks.",
  },
  {
    id: "high_saas_fees",
    label: "Paying $5,000 - $20,000+/year in recurring per-user SaaS license renewals",
    category: "Cost & Licensing",
    impactScore: 15,
    remedy: "One-time custom software build with 100% source code ownership and zero monthly per-seat taxes.",
  },
  {
    id: "no_offline",
    label: "System fails completely when classroom or warehouse Wi-Fi disconnects",
    category: "Security & Mobile",
    impactScore: 15,
    remedy: "Deploy an Offline-First Progressive Web App (PWA) with background sync via IndexedDB.",
  },
  {
    id: "legacy_wordpress",
    label: "Using outdated WordPress or PHP plugins with unencrypted databases",
    category: "Security & Mobile",
    impactScore: 22,
    remedy: "Migrate to compiled Next.js 14 + Zod schema validation with TLS 1.3 and AES-256 storage encryption.",
  },
  {
    id: "manual_reports",
    label: "Staff spend days manually compiling gradebooks, invoices, or PDF reports",
    category: "Data Integrity",
    impactScore: 10,
    remedy: "Automate dynamic 1-click PDF generation directly from relational database tables.",
  },
];

export function ArchitectureAuditTool() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["slow_morning", "spreadsheet_hell"]);

  const togglePoint = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((p) => p !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const calculatedAudit = () => {
    let totalDeduction = 0;
    selectedIds.forEach((id) => {
      const p = painPoints.find((item) => item.id === id);
      if (p) totalDeduction += p.impactScore;
    });

    const score = Math.max(25, 100 - totalDeduction);
    const selectedList = painPoints.filter((p) => selectedIds.includes(p.id));

    return {
      score,
      severity: score < 50 ? "High Modernization Need" : score < 75 ? "Moderate Friction" : "Optimized Baseline",
      selectedList,
      estimatedHoursSavedMonthly: selectedList.length * 18,
    };
  };

  const audit = calculatedAudit();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
              Self-Service Diagnostic Studio
            </span>
            <Badge variant="warning">Architecture Health Checker</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Legacy Software & Architecture Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Identify operational bottlenecks in your current software and generate a targeted Next.js modernization roadmap.
          </p>
        </div>
      </div>

      {/* Main Grid: Pain Point Selector vs Audit Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pain Point Checkboxes */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
            Select Your Organization&apos;s Current Pain Points:
          </div>

          {painPoints.map((point) => {
            const isChecked = selectedIds.includes(point.id);
            return (
              <div
                key={point.id}
                onClick={() => togglePoint(point.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isChecked
                    ? "border-amber-500/60 bg-amber-950/20 shadow-sm"
                    : "border-slate-800/80 bg-slate-950/50 hover:border-slate-700 opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-amber-600 border-amber-500 text-white"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">
                      {point.label}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded inline-block">
                    {point.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Modernization Scorecard */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="rounded-2xl border border-amber-800/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>Architecture Health Score</span>
              </div>
              <Badge variant={audit.score < 50 ? "outline" : "warning"}>
                {audit.severity}
              </Badge>
            </div>

            {/* Score Visualizer */}
            <div className="text-center p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-4xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                {audit.score} / 100
              </div>
              <div className="text-xs font-mono text-slate-400">
                Potential Productivity Gain: ~{audit.estimatedHoursSavedMonthly} hrs/month saved
              </div>
            </div>

            {/* Recommended Technical Remedies */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Recommended Architectural Roadmap:
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {audit.selectedList.length === 0 ? (
                  <div className="text-xs font-mono text-emerald-400 p-2">
                    No critical bottlenecks selected. Your current stack baseline is stable.
                  </div>
                ) : (
                  audit.selectedList.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-slate-900 border border-slate-850 space-y-1 text-xs font-mono">
                      <div className="text-white font-semibold flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-orange-400" />
                        <span>{item.category} Remedy:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {item.remedy}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                href={`/start-a-project?goal=${encodeURIComponent(
                  `Modernization Project (Health Score ${audit.score}/100, ${audit.selectedList.length} bottlenecks detected)`
                )}`}
                size="md"
                variant="primary"
                className="w-full justify-center"
              >
                <span>Request Modernization Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

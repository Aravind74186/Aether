"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
  FileDown,
} from "lucide-react";
import Link from "next/link";

interface FeatureModule {
  id: string;
  name: string;
  category: "core" | "data" | "advanced" | "integration";
  baseWeeks: number;
  baseCost: number;
  description: string;
  recommendedFor?: string;
}

const availableModules: FeatureModule[] = [
  {
    id: "auth_rbac",
    name: "Multi-Role Authentication & RBAC",
    category: "core",
    baseWeeks: 1.0,
    baseCost: 800,
    description: "Granular roles (Admin, Teacher/Staff, Student/Client), encrypted HTTP-only JWT sessions, and password recovery.",
  },
  {
    id: "postgres_db",
    name: "PostgreSQL Database & Migration Schema",
    category: "core",
    baseWeeks: 1.0,
    baseCost: 700,
    description: "ACID-compliant relational database, Prisma schema modeling, index optimization, and backup runbooks.",
  },
  {
    id: "admin_dashboard",
    name: "Custom Admin Operations Console",
    category: "core",
    baseWeeks: 1.5,
    baseCost: 1100,
    description: "Interactive data tables with multi-filter search, batch actions, and CSV/Excel data import/export.",
  },
  {
    id: "payment_gateway",
    name: "Payment Gateway & Automated Invoicing",
    category: "integration",
    baseWeeks: 1.0,
    baseCost: 900,
    description: "Stripe/Razorpay integration, automated PDF receipt generation, and webhook payment reconciliations.",
    recommendedFor: "Schools & SaaS",
  },
  {
    id: "attendance_engine",
    name: "Batch Attendance & Student Gradebook",
    category: "data",
    baseWeeks: 1.5,
    baseCost: 1200,
    description: "1-click roll call, automated absence alerts, and automated term report card PDF calculations.",
    recommendedFor: "Schools & Colleges",
  },
  {
    id: "rag_ai_search",
    name: "DocuPulse RAG Vector Search & AI Q&A",
    category: "advanced",
    baseWeeks: 2.0,
    baseCost: 1600,
    description: "Hybrid keyword + pgvector search over internal PDF documents with exact page-level citations and refusal guardrails.",
    recommendedFor: "AI & Institutions",
  },
  {
    id: "pwa_offline",
    name: "Offline-First Progressive Web App (PWA)",
    category: "advanced",
    baseWeeks: 1.0,
    baseCost: 800,
    description: "Service workers and IndexedDB storage allowing staff to work without internet and auto-sync upon reconnection.",
  },
  {
    id: "notification_alerts",
    name: "Automated SMS, WhatsApp & Email Alerts",
    category: "integration",
    baseWeeks: 0.5,
    baseCost: 500,
    description: "Transactional notifications triggered by status changes, fee reminders, or emergency school circulars.",
  },
  {
    id: "audit_logging",
    name: "Immutable Security Audit Ledger",
    category: "data",
    baseWeeks: 0.5,
    baseCost: 400,
    description: "Cryptographically verifiable event log recording every sensitive data mutation and login attempt.",
  },
];

export function ProjectEstimator() {
  const [projectType, setProjectType] = useState<string>("School / College Portal");
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    "auth_rbac",
    "postgres_db",
    "admin_dashboard",
    "attendance_engine",
  ]);
  const [speedOption, setSpeedOption] = useState<"standard" | "expedited">("standard");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const toggleModule = (id: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectPreset = (name: string, presetIds: string[]) => {
    setProjectType(name);
    setSelectedModuleIds(presetIds);
  };

  const USD_TO_INR_RATE = 85;

  const formatPrice = (usdAmount: number) => {
    if (currency === "USD") {
      return `$${usdAmount.toLocaleString("en-US")}`;
    }
    const inrAmount = Math.round(usdAmount * USD_TO_INR_RATE);
    return `₹${inrAmount.toLocaleString("en-IN")}`;
  };

  const formatLakhsSubtitle = (minUsd: number, maxUsd: number) => {
    if (currency === "USD") {
      return "Milestone-based release";
    }
    const minLakhs = (minUsd * USD_TO_INR_RATE / 100000).toFixed(2);
    const maxLakhs = (maxUsd * USD_TO_INR_RATE / 100000).toFixed(2);
    return `~ ₹${minLakhs}L - ₹${maxLakhs} Lakhs`;
  };

  const calculatedEstimate = useMemo(() => {
    let totalWeeks = 0;
    let totalCost = 0;

    selectedModuleIds.forEach((id) => {
      const mod = availableModules.find((m) => m.id === id);
      if (mod) {
        totalWeeks += mod.baseWeeks;
        totalCost += mod.baseCost;
      }
    });

    // Baseline project scaffolding & QA buffer (1 week)
    totalWeeks += 1.0;
    totalCost += 500;

    if (speedOption === "expedited") {
      totalWeeks = Math.max(3, Math.round(totalWeeks * 0.75 * 10) / 10);
      totalCost = Math.round(totalCost * 1.25);
    }

    const minCost = Math.round(totalCost * 0.9);
    const maxCost = Math.round(totalCost * 1.15);

    return {
      weeks: totalWeeks,
      minCost,
      maxCost,
      sprints: Math.ceil(totalWeeks / 2),
    };
  }, [selectedModuleIds, speedOption]);

  const selectedModules = availableModules.filter((m) => selectedModuleIds.includes(m.id));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Transparent Engineering Calculator
            </span>
            <Badge variant="brand">Real-Time Estimator</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Scope Your Architecture & Sprint Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Toggle technical modules below to calculate estimated sprint milestones, delivery weeks, and investment range.
          </p>
        </div>

        {/* Toggles: Currency (USD / INR) and Speed Option */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Currency Switcher */}
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center shrink-0 text-xs font-mono">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "USD"
                  ? "bg-orange-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>$ USD</span>
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "INR"
                  ? "bg-emerald-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>₹ INR</span>
            </button>
          </div>

          {/* Speed Option Toggle */}
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center shrink-0 text-xs font-mono">
            <button
              onClick={() => setSpeedOption("standard")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                speedOption === "standard"
                  ? "bg-orange-600 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Standard Delivery
            </button>
            <button
              onClick={() => setSpeedOption("expedited")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                speedOption === "expedited"
                  ? "bg-amber-600 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Expedited Sprint</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
          Select Starting Architecture Archetype:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          <button
            onClick={() =>
              selectPreset("School / College Portal", [
                "auth_rbac",
                "postgres_db",
                "admin_dashboard",
                "attendance_engine",
                "payment_gateway",
                "notification_alerts",
              ])
            }
            className={`p-3 rounded-xl border text-left transition-all ${
              projectType === "School / College Portal"
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
            }`}
          >
            🏫 School & Campus Portal
          </button>

          <button
            onClick={() =>
              selectPreset("Startup SaaS MVP", [
                "auth_rbac",
                "postgres_db",
                "admin_dashboard",
                "payment_gateway",
                "audit_logging",
              ])
            }
            className={`p-3 rounded-xl border text-left transition-all ${
              projectType === "Startup SaaS MVP"
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
            }`}
          >
            🚀 Startup SaaS MVP
          </button>

          <button
            onClick={() =>
              selectPreset("AI / Document RAG System", [
                "auth_rbac",
                "postgres_db",
                "rag_ai_search",
                "admin_dashboard",
              ])
            }
            className={`p-3 rounded-xl border text-left transition-all ${
              projectType === "AI / Document RAG System"
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
            }`}
          >
            🤖 AI & Document RAG
          </button>

          <button
            onClick={() =>
              selectPreset("SME Custom Internal Tool", [
                "auth_rbac",
                "postgres_db",
                "admin_dashboard",
                "pwa_offline",
                "notification_alerts",
              ])
            }
            className={`p-3 rounded-xl border text-left transition-all ${
              projectType === "SME Custom Internal Tool"
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
            }`}
          >
            📦 SME Internal Operations
          </button>
        </div>
      </div>

      {/* Main Grid: Modules Selection vs Live Calculation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Module Checkboxes */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
            Included Technical Modules ({selectedModuleIds.length} active):
          </div>

          {availableModules.map((mod) => {
            const isChecked = selectedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isChecked
                    ? "border-orange-500/60 bg-orange-950/20 shadow-sm"
                    : "border-slate-800/80 bg-slate-950/50 hover:border-slate-700 opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-orange-600 border-orange-500 text-white"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white font-mono">
                      {mod.name}
                    </span>
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span className="text-emerald-400 font-semibold">{formatPrice(mod.baseCost)}</span>
                      <span>•</span>
                      <span>+{mod.baseWeeks} wks</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {mod.description}
                  </p>
                  {mod.recommendedFor && (
                    <span className="inline-block text-[10px] font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40 mt-1">
                      Recommended for {mod.recommendedFor}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Live Summary Card */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="rounded-2xl border border-orange-800/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-7 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>Live Scope Estimate</span>
              </div>
              <Badge variant="success">Fixed Scope</Badge>
            </div>

            {/* Price & Timeline Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>Timeline</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">
                  {calculatedEstimate.weeks} Weeks
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {calculatedEstimate.sprints} Sprint Milestones
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>Investment ({currency})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{currency === "INR" ? "₹ INR" : "$ USD"}</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono tracking-tight truncate">
                  {formatPrice(calculatedEstimate.minCost)} - {formatPrice(calculatedEstimate.maxCost)}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {formatLakhsSubtitle(calculatedEstimate.minCost, calculatedEstimate.maxCost)}
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Selected Modules Breakdown:
              </div>
              <ul className="space-y-1 text-xs font-mono text-slate-300 max-h-48 overflow-y-auto pr-1">
                {selectedModules.map((mod) => (
                  <li key={mod.id} className="flex items-center justify-between py-1 border-b border-slate-850">
                    <span className="truncate max-w-[200px]">{mod.name}</span>
                    <span className="text-slate-500 shrink-0">~{mod.baseWeeks}w</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] font-mono text-slate-400">
              <div className="text-white font-semibold">Included in every Aether build:</div>
              <div>✓ 100% Source Code & Database Ownership</div>
              <div>✓ Staging Environment & Weekly Demos</div>
              <div>✓ Strict Zod Validation & Security Controls</div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                href={`/start-a-project?goal=${encodeURIComponent(
                  `${projectType} (${selectedModules.length} modules, ~${calculatedEstimate.weeks}w timeline, est: ${formatPrice(calculatedEstimate.minCost)} - ${formatPrice(calculatedEstimate.maxCost)})`
                )}`}
                size="md"
                variant="primary"
                className="w-full justify-center"
              >
                <span>Export Scope to Intake Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-[10px] font-mono text-slate-500 text-center mt-2">
                Locks in your module selection for technical review
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    baseCost: 250,
    description: "Granular roles (Admin, Teacher/Staff, Student/Client), encrypted HTTP-only JWT sessions, and password recovery.",
  },
  {
    id: "postgres_db",
    name: "PostgreSQL Database & Migration Schema",
    category: "core",
    baseWeeks: 1.0,
    baseCost: 200,
    description: "ACID-compliant relational database, Prisma schema modeling, index optimization, and backup runbooks.",
  },
  {
    id: "admin_dashboard",
    name: "Custom Admin Operations Console",
    category: "core",
    baseWeeks: 1.5,
    baseCost: 350,
    description: "Interactive data tables with multi-filter search, batch actions, and CSV/Excel data import/export.",
  },
  {
    id: "payment_gateway",
    name: "Payment Gateway & Automated Invoicing",
    category: "integration",
    baseWeeks: 1.0,
    baseCost: 250,
    description: "Stripe/Razorpay integration, automated PDF receipt generation, and webhook payment reconciliations.",
    recommendedFor: "Schools & SaaS",
  },
  {
    id: "attendance_engine",
    name: "Batch Attendance & Student Gradebook",
    category: "data",
    baseWeeks: 1.5,
    baseCost: 350,
    description: "1-click roll call, automated absence alerts, and automated term report card PDF calculations.",
    recommendedFor: "Schools & Colleges",
  },
  {
    id: "rag_ai_search",
    name: "DocuPulse RAG Vector Search & AI Q&A",
    category: "advanced",
    baseWeeks: 2.0,
    baseCost: 450,
    description: "Hybrid keyword + pgvector search over internal PDF documents with exact page-level citations and refusal guardrails.",
    recommendedFor: "AI & Institutions",
  },
  {
    id: "pwa_offline",
    name: "Offline-First Progressive Web App (PWA)",
    category: "advanced",
    baseWeeks: 1.0,
    baseCost: 250,
    description: "Service workers and IndexedDB storage allowing staff to work without internet and auto-sync upon reconnection.",
  },
  {
    id: "notification_alerts",
    name: "Automated SMS, WhatsApp & Email Alerts",
    category: "integration",
    baseWeeks: 0.5,
    baseCost: 150,
    description: "Transactional notifications triggered by status changes, fee reminders, or emergency school circulars.",
  },
  {
    id: "audit_logging",
    name: "Immutable Security Audit Ledger",
    category: "data",
    baseWeeks: 0.5,
    baseCost: 150,
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
    if (selectedModuleIds.length === 0) {
      return {
        weeks: 0,
        minCost: 0,
        maxCost: 0,
        sprints: 0,
      };
    }

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
    totalCost += 150;

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
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
      {/* Top Header & Tool Switchers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-stone-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">
              Interactive Scope Calculator
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200/80 font-bold">
              Real-Time Velocity
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Configure Architecture & Delivery Velocity
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Select technical modules below to calculate sprint milestones and transparent investment range.
          </p>
        </div>

        {/* Toggles: Currency (USD / INR) and Speed Option */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Currency Switcher */}
          <div className="p-1 rounded-xl bg-stone-100 border border-stone-200 flex items-center shrink-0 text-xs font-mono">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "USD"
                  ? "bg-orange-600 text-white font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <span>$ USD</span>
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "INR"
                  ? "bg-emerald-600 text-white font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <span>₹ INR</span>
            </button>
          </div>

          {/* Speed Option Toggle */}
          <div className="p-1 rounded-xl bg-stone-100 border border-stone-200 flex items-center shrink-0 text-xs font-mono">
            <button
              onClick={() => setSpeedOption("standard")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                speedOption === "standard"
                  ? "bg-orange-600 text-white font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Standard Delivery
            </button>
            <button
              onClick={() => setSpeedOption("expedited")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                speedOption === "expedited"
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
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
        <div className="text-xs font-mono uppercase text-stone-500 font-bold">
          Select Starting Architecture Archetype:
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
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
            className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 h-full min-h-[46px] ${
              projectType === "School / College Portal"
                ? "border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs ring-1 ring-orange-400"
                : "border-stone-200 bg-stone-50/80 text-stone-700 hover:border-orange-300 hover:bg-white shadow-2xs"
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
            className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 h-full min-h-[46px] ${
              projectType === "Startup SaaS MVP"
                ? "border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs ring-1 ring-orange-400"
                : "border-stone-200 bg-stone-50/80 text-stone-700 hover:border-orange-300 hover:bg-white shadow-2xs"
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
            className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 h-full min-h-[46px] ${
              projectType === "AI / Document RAG System"
                ? "border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs ring-1 ring-orange-400"
                : "border-stone-200 bg-stone-50/80 text-stone-700 hover:border-orange-300 hover:bg-white shadow-2xs"
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
            className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 h-full min-h-[46px] ${
              projectType === "SME Custom Internal Tool"
                ? "border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs ring-1 ring-orange-400"
                : "border-stone-200 bg-stone-50/80 text-stone-700 hover:border-orange-300 hover:bg-white shadow-2xs"
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
          <div className="text-xs font-mono uppercase text-stone-500 font-bold mb-2 flex items-center justify-between">
            <span>Included Technical Modules:</span>
            <span className="text-orange-600 font-bold">{selectedModuleIds.length} Active</span>
          </div>

          {availableModules.map((mod) => {
            const isChecked = selectedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 select-none ${
                  isChecked
                    ? "border-orange-500 bg-orange-50/90 shadow-xs ring-1 ring-orange-400"
                    : "border-stone-200 bg-stone-50/70 hover:border-orange-300 hover:bg-white shadow-2xs"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? "bg-orange-600 border-orange-500 text-white"
                      : "border-stone-300 bg-white"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-900 font-mono">
                        {mod.name}
                      </span>
                      {mod.recommendedFor && (
                        <span className="text-[10px] font-mono text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md border border-orange-200 font-bold hidden sm:inline-block">
                          {mod.recommendedFor}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-xs font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 font-bold text-emerald-700">
                      <span>{formatPrice(mod.baseCost)}</span>
                      <span className="text-stone-300 font-normal">•</span>
                      <span className="text-stone-600 font-medium">+{mod.baseWeeks}w</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Live Summary Card */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-stone-50/80 p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="text-xs font-mono uppercase text-orange-700 font-bold flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-orange-600" />
                <span>Live Scope Estimate</span>
              </div>
              <Badge variant="success">Fixed Scope</Badge>
            </div>

            {/* Price & Timeline Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between h-28 shadow-2xs">
                <div className="text-[11px] font-mono text-stone-500 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Timeline</span>
                </div>
                <div className="text-2xl font-extrabold text-stone-900 font-mono">
                  {calculatedEstimate.weeks} Weeks
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {calculatedEstimate.sprints} Sprint Milestones
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between h-28 shadow-2xs">
                <div className="text-[11px] font-mono text-stone-500 font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Investment</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase">{currency}</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono tracking-tight truncate">
                  {formatPrice(calculatedEstimate.minCost)} - {formatPrice(calculatedEstimate.maxCost)}
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {formatLakhsSubtitle(calculatedEstimate.minCost, calculatedEstimate.maxCost)}
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="text-xs font-mono uppercase text-stone-500 font-bold flex items-center justify-between">
                <span>Selected Modules:</span>
                <span className="text-orange-600 font-bold">{selectedModules.length} Active</span>
              </div>
              {selectedModules.length === 0 ? (
                <div className="py-6 text-center text-xs text-stone-400 font-mono border border-dashed border-stone-200 rounded-xl bg-white/60">
                  Toggle modules on the left to view breakdown
                </div>
              ) : (
                <ul className="space-y-1 text-xs font-mono text-stone-700 max-h-44 overflow-y-auto pr-1 divide-y divide-stone-100">
                  {selectedModules.map((mod) => (
                    <li key={mod.id} className="flex items-center justify-between py-1.5">
                      <span className="truncate flex-1 pr-2 font-medium">{mod.name}</span>
                      <span className="text-stone-500 font-semibold shrink-0">~{mod.baseWeeks}w</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-[11px] font-mono text-stone-700 shadow-2xs">
              <div className="text-stone-900 font-bold">Included in every Aether build:</div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>100% Source Code & Database Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Staging Environment & Weekly Demos</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Strict Zod Validation & Security Controls</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                href={`/start-a-project?goal=${encodeURIComponent(
                  `${projectType} (${selectedModules.length} modules, ~${calculatedEstimate.weeks}w timeline, est: ${formatPrice(calculatedEstimate.minCost)} - ${formatPrice(calculatedEstimate.maxCost)})`
                )}`}
                size="md"
                variant="primary"
                className="w-full justify-center shadow-xs"
              >
                <span>Export Scope to Intake Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-[10px] font-mono text-stone-500 text-center mt-2 font-medium">
                Locks in your module selection for technical review
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

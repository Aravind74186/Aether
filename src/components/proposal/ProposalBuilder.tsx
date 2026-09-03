"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  Printer,
  Download,
  Building,
  User,
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function ProposalBuilder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    institutionName: "Oakridge International School",
    contactPerson: "Dr. Rachel Thomas (Dean of Academics)",
    email: "dean@oakridge.example.edu",
    archetype: "Campus Academic Management & Student Portal",
    selectedModules: [
      "Multi-Role Authentication & Role-Based Access Control (RBAC)",
      "PostgreSQL Normalized Database & Schema Migration Runbooks",
      "Batch Attendance Engine & Automated Gradebook PDF Generator",
      "Automated SMS & WhatsApp Parent Alert Notifications",
      "Offline-First Progressive Web App (PWA) for Classroom Teachers",
    ],
    timelineWeeks: 6,
    totalInvestment: "$6,800",
    slaTier: "99.9% Uptime SLA + 4-Hour Critical Incident Response",
    compliance: "FERPA / Student Data Privacy & Multi-Tenant Isolation",
  });

  const availableModuleList = [
    "Multi-Role Authentication & Role-Based Access Control (RBAC)",
    "PostgreSQL Normalized Database & Schema Migration Runbooks",
    "Batch Attendance Engine & Automated Gradebook PDF Generator",
    "Automated SMS & WhatsApp Parent Alert Notifications",
    "Stripe / Razorpay Payment Gateway & Automated Invoicing",
    "DocuPulse RAG Semantic Document Vector Search",
    "Offline-First Progressive Web App (PWA) for Classroom Teachers",
    "Immutable Audit Security Ledger & Action Tracking",
  ];

  const toggleModule = (mod: string) => {
    if (formData.selectedModules.includes(mod)) {
      if (formData.selectedModules.length > 2) {
        setFormData({
          ...formData,
          selectedModules: formData.selectedModules.filter((m) => m !== mod),
        });
      }
    } else {
      setFormData({
        ...formData,
        selectedModules: [...formData.selectedModules, mod],
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Generator Controls (Hidden when printing) */}
      <div className="print:hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
                Proposal & SOW Generator
              </span>
              <Badge variant="brand">Step {step} of 3</Badge>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Customize Institutional Proposal Parameters
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handlePrint}>
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </Button>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <button
            onClick={() => setStep(1)}
            className={`p-2.5 rounded-lg border text-left transition-colors ${
              step === 1
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950 text-slate-400"
            }`}
          >
            1. Client & Organization
          </button>
          <button
            onClick={() => setStep(2)}
            className={`p-2.5 rounded-lg border text-left transition-colors ${
              step === 2
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950 text-slate-400"
            }`}
          >
            2. Modules & Architecture
          </button>
          <button
            onClick={() => setStep(3)}
            className={`p-2.5 rounded-lg border text-left transition-colors ${
              step === 3
                ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                : "border-slate-800 bg-slate-950 text-slate-400"
            }`}
          >
            3. Governance & SLA
          </button>
        </div>

        {/* Step 1 Inputs */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Institution / Company Name</label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Primary Stakeholder & Title</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Project Archetype Title</label>
              <input
                type="text"
                value={formData.archetype}
                onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* Step 2 Inputs */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase">
              Toggle Included Scope Deliverables:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {availableModuleList.map((mod) => {
                const active = formData.selectedModules.includes(mod);
                return (
                  <div
                    key={mod}
                    onClick={() => toggleModule(mod)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? "border-orange-500 bg-orange-950/30 text-white"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="truncate pr-2">{mod}</span>
                    {active && <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 Inputs */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Service Level Agreement (SLA)</label>
              <input
                type="text"
                value={formData.slaTier}
                onChange={(e) => setFormData({ ...formData, slaTier: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 uppercase">Compliance Standard</label>
              <input
                type="text"
                value={formData.compliance}
                onChange={(e) => setFormData({ ...formData, compliance: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* The Printable Proposal & SOW Document */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-14 shadow-2xl space-y-10 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-slate-800 print:border-slate-300">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold print:text-orange-700">
              Technical Proposal & Scope of Work (SOW)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white print:text-black tracking-tight mt-1">
              {formData.archetype}
            </h1>
            <p className="text-xs font-mono text-slate-400 print:text-slate-600 mt-1">
              Document Reference: AETH-SOW-{new Date().getFullYear()}-0842
            </p>
          </div>

          <div className="text-right text-xs font-mono space-y-1 text-slate-400 print:text-slate-600">
            <div className="text-white print:text-black font-bold">Aether Technologies Inc.</div>
            <div>Engineering & Architecture Studio</div>
            <div>contact@aethertech.example.com</div>
            <div>Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>

        {/* Client & Executive Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-300 text-xs font-mono">
          <div>
            <div className="text-slate-500 print:text-slate-600 uppercase text-[10px]">Prepared Exclusively For:</div>
            <div className="text-white print:text-black font-bold text-sm mt-0.5">{formData.institutionName}</div>
            <div className="text-slate-300 print:text-slate-700 mt-0.5">{formData.contactPerson}</div>
            <div className="text-orange-400 print:text-orange-700">{formData.email}</div>
          </div>

          <div>
            <div className="text-slate-500 print:text-slate-600 uppercase text-[10px]">Engagement Summary:</div>
            <div className="text-slate-300 print:text-slate-700 mt-1 space-y-1">
              <div>• Delivery Timeline: ~{formData.timelineWeeks} Weeks (Fixed Sprints)</div>
              <div>• Target Estimated Investment: {formData.totalInvestment}</div>
              <div>• Code & Database Ownership: 100% Client Retained</div>
            </div>
          </div>
        </div>

        {/* Section 1: Objective & Scope */}
        <div className="space-y-4 font-sans">
          <h2 className="text-base font-bold text-white print:text-black font-mono uppercase tracking-wider">
            1. Engineering Scope & Deliverables
          </h2>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            Aether Technologies will engineer, test, and deploy a custom, production-grade software platform tailored specifically for {formData.institutionName}. The project encompasses the following verified milestone deliverables:
          </p>

          <div className="space-y-2 pt-2">
            {formData.selectedModules.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/40 print:bg-white print:border-slate-200 flex items-start gap-3 text-xs"
              >
                <span className="font-mono text-orange-400 font-bold print:text-orange-700">0{idx + 1}.</span>
                <div>
                  <span className="font-semibold text-white print:text-black">{m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Milestone Payment Schedule */}
        <div className="space-y-4 font-sans">
          <h2 className="text-base font-bold text-white print:text-black font-mono uppercase tracking-wider">
            2. Milestone-Based Payment Structure
          </h2>
          <div className="rounded-xl border border-slate-800 print:border-slate-300 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 bg-slate-900 print:bg-slate-100 text-slate-400 print:text-slate-700 uppercase">
                  <th className="py-2.5 px-4">Milestone</th>
                  <th className="py-2.5 px-4">Acceptance Criteria</th>
                  <th className="py-2.5 px-4 text-right">Payment Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 print:divide-slate-200 text-slate-300 print:text-slate-800">
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white print:text-black">Sprint 01: Architecture Kickoff</td>
                  <td className="py-2.5 px-4">Database ERD signoff & Staging setup</td>
                  <td className="py-2.5 px-4 text-right font-bold text-emerald-400 print:text-emerald-700">25%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white print:text-black">Sprint 02: Core Feature Implementation</td>
                  <td className="py-2.5 px-4">Interactive staging demo review</td>
                  <td className="py-2.5 px-4 text-right font-bold text-emerald-400 print:text-emerald-700">35%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white print:text-black">Sprint 03: Testing & Acceptance</td>
                  <td className="py-2.5 px-4">Load testing & Staff user testing</td>
                  <td className="py-2.5 px-4 text-right font-bold text-emerald-400 print:text-emerald-700">25%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white print:text-black">Sprint 04: Production Handover</td>
                  <td className="py-2.5 px-4">DNS launch, runbook handover & training</td>
                  <td className="py-2.5 px-4 text-right font-bold text-emerald-400 print:text-emerald-700">15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Governance & Acceptance */}
        <div className="space-y-4 font-sans text-xs">
          <h2 className="text-base font-bold text-white print:text-black font-mono uppercase tracking-wider">
            3. Governance & Quality Commitments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-slate-300 print:text-slate-700">
            <div className="p-3.5 rounded-lg border border-slate-800 print:border-slate-300 bg-slate-900/30 print:bg-white space-y-1">
              <div className="text-white print:text-black font-bold">Service Level Commitment</div>
              <div>{formData.slaTier}</div>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-800 print:border-slate-300 bg-slate-900/30 print:bg-white space-y-1">
              <div className="text-white print:text-black font-bold">Data Privacy & Security</div>
              <div>{formData.compliance}</div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-10 font-mono text-xs text-slate-400 print:text-slate-600">
          <div className="space-y-8">
            <div>For: <strong>Aether Technologies Inc.</strong></div>
            <div className="border-b border-slate-750 print:border-slate-400 w-3/4 pb-1">
              <span className="text-white print:text-black font-serif italic text-sm">Lead Solutions Architect</span>
            </div>
            <div>Date Signed: ____________________</div>
          </div>

          <div className="space-y-8">
            <div>For: <strong>{formData.institutionName}</strong></div>
            <div className="border-b border-slate-750 print:border-slate-400 w-3/4 pb-1">
              <span className="text-white print:text-black">{formData.contactPerson}</span>
            </div>
            <div>Date Signed: ____________________</div>
          </div>
        </div>
      </div>
    </div>
  );
}

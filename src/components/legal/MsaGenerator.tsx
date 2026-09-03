"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Download,
  Building,
  Calendar,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Scale,
} from "lucide-react";

export function MsaGenerator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [clientName, setClientName] = useState("St. Jude Educational Trust");
  const [authorizedSigner, setAuthorizedSigner] = useState("Dr. Rajesh Sharma (Director)");
  const [jurisdiction, setJurisdiction] = useState("State of Delaware / India jurisdiction");
  const [effectiveDate, setEffectiveDate] = useState("October 15, 2025");
  const [warrantyDays, setWarrantyDays] = useState("30");
  const [ipOwnership, setIpOwnership] = useState("100% Client Exclusive Transfer");
  const [paymentStructure, setPaymentStructure] = useState("Milestone Acceptance (30% Kickoff / 40% Staging / 30% Go-Live)");
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const docText = generateDocumentText();
    navigator.clipboard.writeText(docText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateDocumentText = () => {
    return `# MASTER SERVICES AGREEMENT & INTELLECTUAL PROPERTY TRANSFER
**Effective Date:** ${effectiveDate}
**Between:** Aether Technologies ("Service Provider") AND ${clientName} ("Client")

## 1. Engagement & Scope of Work
Aether Technologies shall engineer and deliver custom software solutions strictly adhering to the technical specifications defined in each mutually executed Statement of Work (SOW).

## 2. Intellectual Property (IP) Ownership
Upon receipt of final milestone payment, Aether Technologies irrevocably transfers, assigns, and conveys 100% of all rights, titles, and interests in the developed source code, database architectures, and customized assets to ${clientName}.
- **Client Retains:** 100% exclusive proprietary ownership of application code and database schema.
- **Service Provider Retains:** Non-exclusive rights to open-source libraries and general software development methodologies.

## 3. Warranty & Bug-Fix Period
Aether Technologies provides a **${warrantyDays}-Day Post-Deployment Warranty** commencing upon final production launch. All critical defects, memory leaks, and regressions will be resolved at zero additional engineering cost.

## 4. Payment Terms
Invoicing strictly follows the agreed milestone model: ${paymentStructure}. Payments are net-15 days from milestone acceptance.

## 5. Confidentiality & Non-Disclosure
Both parties agree to protect proprietary business logic, student records, and operational databases with reasonable care (not less than TLS 1.3 / AES-256 standards).

## 6. Governing Law & Jurisdiction
This agreement is governed by the laws of ${jurisdiction}.

---
**Authorized Signatures:**

For Aether Technologies:
_______________________
Date: ${effectiveDate}

For ${clientName}:
_______________________
${authorizedSigner}
Date: ${effectiveDate}
`;
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-400 tracking-wider font-semibold mb-1">
            <Scale className="w-4 h-4" />
            <span>Institutional Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Master Services Agreement (MSA) & NDA Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans mt-0.5">
            Generate formal, board-ready software engineering contracts with 100% client IP transfer terms.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setStep(1)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              step === 1
                ? "bg-orange-600 border-orange-500 text-white font-bold"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            1. Client Entity
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              step === 2
                ? "bg-orange-600 border-orange-500 text-white font-bold"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            2. IP & Terms
          </button>
          <button
            onClick={() => setStep(3)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              step === 3
                ? "bg-orange-600 border-orange-500 text-white font-bold"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            3. Final Contract
          </button>
        </div>
      </div>

      {/* Step 1: Client Entity Details */}
      {step === 1 && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-6 max-w-3xl mx-auto animate-in fade-in">
          <div className="space-y-1 pb-4 border-b border-slate-850">
            <h2 className="text-lg font-bold text-white font-sans">Step 1: Client Organization & Signer</h2>
            <p className="text-xs text-slate-400">Specify the legal institution or business entity entering this engineering agreement.</p>
          </div>

          <div className="space-y-4 font-sans text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">Client / Institution Legal Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">Authorized Signatory Name & Title</label>
              <input
                type="text"
                value={authorizedSigner}
                onChange={(e) => setAuthorizedSigner(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300">Effective Date</label>
                <input
                  type="text"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300">Governing Jurisdiction</label>
                <input
                  type="text"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-850">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <span>Next: Configure IP & Warranty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: IP & Legal Terms */}
      {step === 2 && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-6 max-w-3xl mx-auto animate-in fade-in">
          <div className="space-y-1 pb-4 border-b border-slate-850">
            <h2 className="text-lg font-bold text-white font-sans">Step 2: IP Assignment & Warranty Duration</h2>
            <p className="text-xs text-slate-400">Select standard enterprise protection terms.</p>
          </div>

          <div className="space-y-4 font-sans text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">Intellectual Property Model</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIpOwnership("100% Client Exclusive Transfer")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    ipOwnership.includes("100%")
                      ? "border-orange-500 bg-orange-950/40 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-xs text-white">100% Exclusive Transfer (Standard)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Client owns 100% of source code, database dumps, and assets upon final payment.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setIpOwnership("Perpetual Non-Exclusive Enterprise License")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    ipOwnership.includes("Perpetual")
                      ? "border-orange-500 bg-orange-950/40 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-xs text-white">Perpetual Enterprise License</div>
                  <div className="text-[11px] text-slate-400 mt-1">Perpetual, irrevocable license for custom internal software deployments.</div>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">Post-Launch Warranty Bug Fix Period</label>
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                {["30", "60", "90"].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setWarrantyDays(days)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      warrantyDays === days
                        ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold"
                        : "border-slate-800 bg-slate-900 text-slate-400"
                    }`}
                  >
                    {days} Days Warranty
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">Payment Milestone Structure</label>
              <select
                value={paymentStructure}
                onChange={(e) => setPaymentStructure(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-orange-500"
              >
                <option value="Milestone Acceptance (30% Kickoff / 40% Staging / 30% Go-Live)">
                  3-Stage: 30% Kickoff • 40% Staging • 30% Go-Live
                </option>
                <option value="Two-Stage Milestone (50% Kickoff / 50% Final Acceptance)">
                  2-Stage: 50% Kickoff • 50% Final Acceptance
                </option>
                <option value="Monthly Dedicated Sprint Sprints ($3,500/sprint net-15)">
                  Monthly Dedicated Engineering Sprint
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-850">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white font-mono text-xs"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <span>Generate Contract</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Formal Document Viewer */}
      {step === 3 && (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Contract Generated Successfully</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-lg bg-slate-850 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{copied ? "Copied Markdown!" : "Copy Markdown"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Contract (PDF)</span>
              </button>
            </div>
          </div>

          {/* Paper Document Container (Print-Ready) */}
          <div className="p-8 sm:p-12 rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 font-sans space-y-8 shadow-2xl print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
            {/* Header */}
            <div className="border-b border-slate-800 pb-6 space-y-2 print:border-black">
              <div className="text-xs font-mono uppercase text-orange-400 tracking-widest font-semibold print:text-orange-700">
                AETHER TECHNOLOGIES LEGAL SPECIFICATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight print:text-black">
                MASTER SERVICES AGREEMENT
              </h2>
              <div className="text-xs font-mono text-slate-400 print:text-gray-700">
                Effective Date: {effectiveDate} • Document Ref: AETH-MSA-2025
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl border border-slate-850 bg-slate-900/50 print:border-gray-300 print:bg-gray-50 text-xs font-sans">
              <div className="space-y-1">
                <strong className="text-white font-mono uppercase print:text-black">Service Provider:</strong>
                <p className="text-slate-400 print:text-gray-700">Aether Technologies</p>
                <p className="text-slate-500 text-[11px] print:text-gray-600">contact@aethertech.example.com</p>
              </div>
              <div className="space-y-1">
                <strong className="text-white font-mono uppercase print:text-black">Client Institution:</strong>
                <p className="text-slate-200 font-semibold print:text-black">{clientName}</p>
                <p className="text-slate-400 text-[11px] print:text-gray-700">Authorized: {authorizedSigner}</p>
              </div>
            </div>

            {/* Contract Clauses */}
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-black">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide print:text-black">
                  1. Engagement & Deliverables
                </h3>
                <p>
                  Aether Technologies agrees to perform software development, engineering, and deployment services in accordance with individual Statements of Work (SOW) mutually agreed upon between both parties.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide print:text-black">
                  2. Intellectual Property (IP) Transfer
                </h3>
                <p>
                  <strong>Terms: {ipOwnership}.</strong> Upon receipt of full payment for completed milestones, Aether Technologies irrevocably transfers, assigns, and conveys all rights, title, and ownership in custom source code, Prisma schemas, database migrations, and visual assets developed under this agreement to <strong>{clientName}</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide print:text-black">
                  3. Warranty & Bug Warranty
                </h3>
                <p>
                  Aether Technologies warrants that delivered software will perform substantially in accordance with agreed specifications for a period of <strong>{warrantyDays} calendar days</strong> following production go-live. Aether will rectify any reproducible software bugs, server crashes, or data schema errors during this period at zero additional cost.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide print:text-black">
                  4. Payment Terms & Invoicing
                </h3>
                <p>
                  Payment structure: <strong>{paymentStructure}</strong>. All invoices are due within 15 calendar days from client approval of the corresponding milestone demonstration.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide print:text-black">
                  5. Governing Law
                </h3>
                <p>
                  This agreement shall be interpreted and enforced under the laws of <strong>{jurisdiction}</strong>.
                </p>
              </section>
            </div>

            {/* Signature Block */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono print:border-black">
              <div className="space-y-4">
                <div className="text-slate-400 print:text-gray-700">For Aether Technologies:</div>
                <div className="h-10 border-b border-slate-700 print:border-black"></div>
                <div>Authorized Engineering Lead</div>
                <div className="text-slate-500">Date: {effectiveDate}</div>
              </div>

              <div className="space-y-4">
                <div className="text-slate-400 print:text-gray-700">For {clientName}:</div>
                <div className="h-10 border-b border-slate-700 print:border-black"></div>
                <div>{authorizedSigner}</div>
                <div className="text-slate-500">Date: {effectiveDate}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

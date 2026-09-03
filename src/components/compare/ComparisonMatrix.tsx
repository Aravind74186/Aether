"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Check,
  X,
  Layers,
  Database,
  Code2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ComparisonRow {
  dimension: string;
  aetherApproach: string;
  alternativeApproach: string;
  whyItMatters: string;
}

const customVsSaasRows: ComparisonRow[] = [
  {
    dimension: "Long-Term Cost & ROI",
    aetherApproach: "One-time milestone engineering cost. Zero per-user or per-student monthly subscription taxes.",
    alternativeApproach: "$5,000 - $25,000+ recurring annually in per-seat SaaS license renewals.",
    whyItMatters: "Saves institutions tens of thousands of dollars as student and staff headcount scales.",
  },
  {
    dimension: "Workflow Fit",
    aetherApproach: "Engineered around your exact grading terms, attendance rules, and fee schedules.",
    alternativeApproach: "Rigid cookie-cutter workflows requiring staff to change their operating habits.",
    whyItMatters: "Eliminates staff frustration and manual Excel workarounds.",
  },
  {
    dimension: "Data Sovereignty & IP",
    aetherApproach: "100% Client Ownership. Full source code, database dumps, and Docker configs are handed over.",
    alternativeApproach: "Proprietary database lock-in. Expensive or difficult export barriers.",
    whyItMatters: "You are never hostage to a vendor's pricing hikes or shutdown.",
  },
  {
    dimension: "Performance & UI",
    aetherApproach: "Sub-second Next.js pages with clean, clutter-free dark enterprise aesthetic.",
    alternativeApproach: "Slow, bloated 10-year-old interfaces loaded with unused menu modules.",
    whyItMatters: "Teachers and parents can complete tasks in seconds on mobile.",
  },
];

const postgresVsNosqlRows: ComparisonRow[] = [
  {
    dimension: "ACID Transaction Guarantees",
    aetherApproach: "Full ACID compliance with foreign keys and multi-table atomic transactions.",
    alternativeApproach: "Eventual consistency and manual multi-document application logic.",
    whyItMatters: "Zero risk of financial ledger corruption or orphan student records.",
  },
  {
    dimension: "Relational Modeling",
    aetherApproach: "Normalized schemas (Students ↔ Classes ↔ Grades ↔ Invoices) with indexed queries.",
    alternativeApproach: "Denormalized embedded documents with high risk of stale duplicated data.",
    whyItMatters: "Updating a student's profile updates every report card instantly without desync.",
  },
  {
    dimension: "AI Vector Extensions",
    aetherApproach: "Native pgvector embeddings inside the same PostgreSQL engine.",
    alternativeApproach: "Requires a separate vector database (Pinecone/Milvus) adding infrastructure complexity.",
    whyItMatters: "Unified SQL queries combining relational filters with semantic document search.",
  },
];

const nextjsVsLegacyRows: ComparisonRow[] = [
  {
    dimension: "Type Safety & Maintainability",
    aetherApproach: "End-to-end TypeScript with Zod validation across API and client components.",
    alternativeApproach: "Untyped PHP or loosely structured vanilla scripts prone to runtime crashes.",
    whyItMatters: "Prevents 90%+ of common production errors before code is ever deployed.",
  },
  {
    dimension: "Security Surface Area",
    aetherApproach: "Modern compiled React bundle with zero third-party plugin vulnerability chains.",
    alternativeApproach: "WordPress/Joomla ecosystems prone to abandoned plugin exploits and attacks.",
    whyItMatters: "Protects sensitive student data and institutional portals from mass automated exploits.",
  },
  {
    dimension: "Serverless & Edge Speed",
    aetherApproach: "Edge caching with sub-50ms TTFB on global CDNs.",
    alternativeApproach: "Monolithic single-server setups that slow down during peak morning roll calls.",
    whyItMatters: "Handles 1,000+ simultaneous classroom logins smoothly at 8:00 AM.",
  },
];

export function ComparisonMatrix() {
  const [activeTab, setActiveTab] = useState<"saas" | "db" | "framework">("saas");

  const getRows = () => {
    switch (activeTab) {
      case "saas":
        return {
          title: "Custom Engineered Platform vs. Off-the-Shelf SaaS ERP",
          aetherLabel: "Aether Custom Platform",
          altLabel: "Generic Subscription ERP",
          rows: customVsSaasRows,
        };
      case "db":
        return {
          title: "PostgreSQL ACID vs. Document NoSQL (MongoDB)",
          aetherLabel: "Aether PostgreSQL Standard",
          altLabel: "Generic NoSQL / MongoDB",
          rows: postgresVsNosqlRows,
        };
      case "framework":
        return {
          title: "Next.js Full-Stack vs. Legacy PHP / WordPress Monolith",
          aetherLabel: "Aether Next.js Architecture",
          altLabel: "Legacy PHP / WordPress",
          rows: nextjsVsLegacyRows,
        };
    }
  };

  const currentData = getRows();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Architectural Rationale
            </span>
            <Badge variant="brand">Technical Decision Hub</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Why We Engineer Systems the Way We Do
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Data-backed architectural comparisons to help leadership and boards make informed technology investments.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab("saas")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "saas"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Custom Platform vs. Bloated SaaS</span>
        </button>

        <button
          onClick={() => setActiveTab("db")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "db"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>PostgreSQL vs. Document NoSQL</span>
        </button>

        <button
          onClick={() => setActiveTab("framework")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "framework"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Next.js Full-Stack vs. Legacy PHP</span>
        </button>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs animate-in fade-in duration-150">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase">
                <th className="py-4 px-5 w-1/4">Evaluation Dimension</th>
                <th className="py-4 px-5 w-1/3 text-orange-400 bg-orange-950/30">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>{currentData.aetherLabel}</span>
                  </div>
                </th>
                <th className="py-4 px-5 w-1/3 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <X className="w-4 h-4 text-slate-500" />
                    <span>{currentData.altLabel}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {currentData.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-4 px-5 align-top">
                    <div className="font-bold text-white font-sans text-sm">{row.dimension}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{row.whyItMatters}</div>
                  </td>
                  <td className="py-4 px-5 align-top bg-orange-950/10 text-slate-200 leading-relaxed font-sans">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{row.aetherApproach}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 align-top text-slate-400 leading-relaxed font-sans">
                    <div className="flex items-start gap-2">
                      <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                      <span>{row.alternativeApproach}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

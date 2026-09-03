"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Bot,
  Truck,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface SolutionArchetype {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string; detail: string }[];
  keyFeatures: string[];
  architectureHighlights: string;
  caseStudySlug: string;
  badgeColor: string;
}

const archetypes: SolutionArchetype[] = [
  {
    id: "education",
    name: "CampusFlow Academic Engine",
    category: "Education & Schools",
    icon: GraduationCap,
    tagline: "High-concurrency roll call & automated gradebook portal for schools & colleges",
    description:
      "Engineered specifically for low-connectivity classroom tablets and high-volume morning attendance bursts. Generates official term report cards in 1 click without spreadsheet errors.",
    stack: ["Next.js 14 PWA", "PostgreSQL 16", "IndexedDB Offline Sync", "WhatsApp Alerts"],
    metrics: [
      { label: "P99 Roll Call Latency", value: "< 45ms", detail: "Instant offline cache write" },
      { label: "Gradebook Calculations", value: "100%", detail: "Zero manual Excel formulas" },
      { label: "Morning Surge Load", value: "3,500+", detail: "Concurrent student check-ins" },
    ],
    keyFeatures: [
      "Offline-first PWA caching for classrooms with weak Wi-Fi",
      "Cryptographically verified roll call and attendance logs",
      "Automated PDF report card generation with custom school crests",
      "Instant transactional WhatsApp & SMS absence notifications",
    ],
    architectureHighlights:
      "Client-side IndexedDB buffer queues attendance mutations and synchronizes with PostgreSQL upon reconnection using idempotency keys.",
    caseStudySlug: "campus-flow-academic-management-portal",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: "ai-rag",
    name: "DocuPulse Institutional RAG",
    category: "Practical AI & Compliance",
    icon: Bot,
    tagline: "Private document question-answering with verifiable page-level citation audit trails",
    description:
      "Allows internal legal, compliance, and academic teams to interrogate complex multi-hundred-page handbooks and regulatory guidelines with pinpoint page-number proofs.",
    stack: ["FastAPI", "pgvector", "Claude 3.5 Sonnet", "Chunking Engine"],
    metrics: [
      { label: "Answer Citation Accuracy", value: "99.4%", detail: "Verified against source pages" },
      { label: "Document Ingestion Speed", value: "350 pgs/min", detail: "Parallel text extraction" },
      { label: "Data Leakage Risk", value: "0%", detail: "Zero external model training" },
    ],
    keyFeatures: [
      "Page-level PDF text and table extraction with high accuracy",
      "Exact-source quote verification badges on every model reply",
      "Strict tenant-isolated vector tables preventing cross-data leaks",
      "Deterministic fallback when documents lack sufficient context",
    ],
    architectureHighlights:
      "Embeddings are generated via text-embedding-3-small, indexed using IVFFlat in PostgreSQL, and injected into Claude with strict system prompts.",
    caseStudySlug: "docupulse-intelligent-document-rag-pipeline",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: "logistics",
    name: "OpsForge Field Dispatch",
    category: "Local Logistics & SMEs",
    icon: Truck,
    tagline: "Real-time fleet scheduling, inventory verification, and PDF invoice generation",
    description:
      "Replaces messy whiteboard schedules and unorganized WhatsApp dispatch chains with a real-time responsive web console for dispatchers and drivers.",
    stack: ["Node.js API", "PostgreSQL ACID", "WebSockets", "Leaflet Maps"],
    metrics: [
      { label: "Scheduling Friction", value: "-65%", detail: "Automated route dispatch" },
      { label: "Invoicing Turnaround", value: "Same Day", detail: "Digital proof-of-delivery" },
      { label: "Inventory Discrepancies", value: "< 0.2%", detail: "Barcode scanning validation" },
    ],
    keyFeatures: [
      "Live interactive driver route assignment and status board",
      "Mobile driver receipt upload and signature capture",
      "Automated PDF bill of lading and invoice generation",
      "Inventory reconciliation with safety stock email warnings",
    ],
    architectureHighlights:
      "Row-level locks in PostgreSQL prevent race conditions when multiple dispatchers assign the same vehicle or inventory item simultaneously.",
    caseStudySlug: "opsforge-business-operations-and-dispatch-portal",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: "saas",
    name: "SaaS Launchpad Multi-Tenant",
    category: "B2B Cloud & Startups",
    icon: Rocket,
    tagline: "Production-ready multi-tenant foundation with Stripe billing and team workspaces",
    description:
      "A rock-solid architecture foundation for founders needing to launch a multi-tenant B2B application without technical debt or security vulnerabilities.",
    stack: ["Next.js App Router", "Prisma ORM", "Stripe Checkout", "Tailwind CSS"],
    metrics: [
      { label: "Time-to-Production", value: "4 Weeks", detail: "From spec to live domain" },
      { label: "Tenant Isolation", value: "100%", detail: "Row-Level Security & schema" },
      { label: "Core Web Vitals", value: "100/100", detail: "Google PageSpeed performance" },
    ],
    keyFeatures: [
      "Multi-tenant workspace switcher with invite link management",
      "Automated Stripe subscription checkout & recurring invoicing",
      "Granular role management (Owner, Admin, Member, Read-Only)",
      "Automated CI/CD staging pipelines with preview deployments",
    ],
    architectureHighlights:
      "Stateless session JWTs with HTTP-only security cookies protect against XSS and CSRF token interception.",
    caseStudySlug: "saas-launchpad-multitenant-mvp-architecture",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
];

export function InteractiveSolutionExplorer() {
  const [activeTab, setActiveTab] = useState<string>("education");

  const active = archetypes.find((a) => a.id === activeTab) || archetypes[0];
  const Icon = active.icon;

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden">
      <Container size="xl" className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeader
            badge="Live Solution Archetypes"
            title="Engineered Blueprints for Real-World Deployments"
            description="Explore our proven, battle-tested system architectures customized for institutional and high-growth requirements."
            align="left"
            className="mb-0"
          />

          <Link
            href="/estimator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-mono text-stone-700 hover:text-orange-600 hover:border-orange-300 transition-all shrink-0 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Customize in Cost Estimator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {archetypes.map((arch) => {
            const TabIcon = arch.icon;
            const isSelected = activeTab === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setActiveTab(arch.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? "border-orange-600 bg-white shadow-md shadow-orange-500/10 ring-2 ring-orange-500/20 -translate-y-0.5"
                    : "border-stone-200/90 bg-white hover:bg-stone-50/80 text-stone-600 hover:border-orange-300 shadow-2xs"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isSelected
                      ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                      : "bg-orange-50/80 border-orange-100 text-orange-600"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">
                    {arch.category}
                  </div>
                  <div className="text-sm font-bold text-stone-950 tracking-tight mt-0.5">
                    {arch.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Archetype Showcase Card */}
        <div className="rounded-3xl studio-card p-6 sm:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono border font-semibold bg-orange-50 text-orange-700 border-orange-200">
                  {active.category}
                </span>
                <span className="text-xs font-mono text-stone-500">Production Verified Blueprint</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                {active.name}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
                {active.description}
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <Button href={`/case-studies/${active.caseStudySlug}`} size="md" variant="primary">
                <span>View Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/start-a-project" size="md" variant="secondary">
                <span>Request Custom Build</span>
              </Button>
            </div>
          </div>

          {/* Metric Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {active.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1"
              >
                <div className="text-xs font-mono text-stone-500 flex items-center justify-between">
                  <span>{metric.label}</span>
                  <Zap className="w-3 h-3 text-orange-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-mono tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-stone-500">{metric.detail}</div>
              </div>
            ))}
          </div>

          {/* Technical Deep Dive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Key Capabilities */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-2xs">
              <div className="text-xs font-mono uppercase text-orange-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Verified Technical Capabilities</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Invariants */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-stone-200 space-y-4 flex flex-col justify-between shadow-2xs">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-stone-800 font-bold flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-orange-600" />
                  <span>Architecture & Dataflow</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-mono">
                  {active.architectureHighlights}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-mono text-slate-500 mb-2 uppercase font-medium">Core Tech Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {active.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

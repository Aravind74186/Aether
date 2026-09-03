"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Code2,
  Database,
  Cpu,
  Bot,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";

interface TechNode {
  id: string;
  name: string;
  discipline: string;
  icon: React.ElementType;
  primaryTech: string;
  stack: string[];
  metrics: string;
  description: string;
}

const techNodes: TechNode[] = [
  {
    id: "frontend",
    name: "Frontend & Interfaces",
    discipline: "Presentation Layer",
    icon: Code2,
    primaryTech: "Next.js 14 App Router",
    stack: ["React SSR", "TypeScript", "Tailwind CSS", "Zod Validation"],
    metrics: "Sub-50ms First Contentful Paint",
    description: "Server-side rendered web applications, client portals, and responsive PWAs optimized for immediate interactivity.",
  },
  {
    id: "backend",
    name: "Application & API Core",
    discipline: "Business Logic",
    icon: Cpu,
    primaryTech: "Node.js & FastAPI",
    stack: ["TypeScript", "Python", "REST / JSON-RPC", "Async Queues"],
    metrics: "Type-Safe Contracts & Zero Runtime Drift",
    description: "Modular micro-engines and server action pipelines with end-to-end type validation and rigorous error handling.",
  },
  {
    id: "database",
    name: "Data Vault & Vectors",
    discipline: "Storage & State",
    icon: Database,
    primaryTech: "PostgreSQL 16 & pgvector",
    stack: ["Strict ACID Transactions", "Vector Embeddings", "Connection Pooling", "Daily Backups"],
    metrics: "100% Data Integrity & Row-Level Security",
    description: "Normalized relational schemas with ACID guarantees, automated migration history, and semantic similarity search.",
  },
  {
    id: "ai",
    name: "Practical AI & RAG",
    discipline: "Intelligent Retrieval",
    icon: Bot,
    primaryTech: "Retrieval-Augmented Generation",
    stack: ["LangChain", "Claude 3.5 Sonnet", "Cosine Similarity", "Page-Level Citations"],
    metrics: "Zero Hallucination Grounded Proofs",
    description: "Contextual search and document intelligence engines that cite exact page source snippets with zero fabricated output.",
  },
  {
    id: "cloud",
    name: "Cloud & Edge Infrastructure",
    discipline: "Deployment & Scale",
    icon: Cloud,
    primaryTech: "Docker & Cloudflare Edge",
    stack: ["Container Orchestration", "SSL / TLS 1.3", "Global CDN", "DDoS Mitigation"],
    metrics: "99.9% Verified Uptime SLA",
    description: "Cost-effective, immutable cloud deployments configured for predictable flat-rate hosting and zero runtime lock-in.",
  },
  {
    id: "security",
    name: "DevOps & Security",
    discipline: "Assurance & Auditing",
    icon: ShieldCheck,
    primaryTech: "bcrypt & HTTP-Only Tokens",
    stack: ["Role Authorization", "Rate Limiting", "Parameterized SQL", "Audit Logging"],
    metrics: "Zero OWASP Top 10 Vulnerabilities",
    description: "Battle-tested authentication, cryptographically hashed passwords, and proactive dependency scanning on every commit.",
  },
];

export function TechnologySection() {
  const [activeNode, setActiveNode] = useState<string>("frontend");
  const selectedNode = techNodes.find((n) => n.id === activeNode) || techNodes[0];

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            badge="Engineering Ecosystem"
            title="Connected Technology Architecture"
            description="Our systems are engineered as interconnected, type-safe modules rather than isolated codebases."
            align="left"
            className="mb-0"
          />
          <Link
            href="/technology"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>Explore Full Stack Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Architecture Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Topology Node Selector */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techNodes.map((node) => {
              const Icon = node.icon;
              const isActive = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  className={`p-6 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                    isActive
                      ? "bg-white border-orange-600 shadow-lg shadow-orange-500/10 ring-2 ring-orange-500/20 -translate-y-0.5"
                      : "bg-white hover:bg-stone-50/80 border-stone-200/90 hover:border-orange-300 shadow-2xs"
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                            : "bg-orange-50/80 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 group-hover:scale-105"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-stone-500 font-medium">
                        {node.discipline}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-base font-bold tracking-tight transition-colors ${
                          isActive ? "text-stone-950" : "text-stone-900 group-hover:text-orange-600"
                        }`}
                      >
                        {node.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-mono mt-0.5">
                        {node.primaryTech}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium font-mono text-[11px]">
                      {node.stack.slice(0, 2).join(" • ")}
                    </span>
                    <span
                      className={`text-xs font-mono font-semibold transition-opacity ${
                        isActive ? "text-orange-600 opacity-100" : "text-stone-400 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      Inspect →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Central Node Deep-Dive Inspection Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-stone-200/90 bg-white p-7 sm:p-8 shadow-xl shadow-stone-900/5 relative overflow-hidden card-hover-lift">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
                  <span className="text-xs font-mono text-stone-700 font-semibold uppercase tracking-wider">
                    Node Telemetry Inspection
                  </span>
                </div>
                <span className="text-xs font-mono text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 font-medium">
                  Connected
                </span>
              </div>

              {/* Selected Node Details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-mono">
                    <Terminal className="w-3.5 h-3.5 text-orange-600" />
                    <span>{selectedNode.primaryTech}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-950 tracking-tight">
                    {selectedNode.name}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Key Metric Spotlight */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50/80 to-amber-50/40 border border-orange-100">
                  <div className="text-[11px] font-mono text-orange-700 uppercase font-semibold">
                    Target Performance Benchmark
                  </div>
                  <div className="text-lg font-extrabold text-stone-950 mt-0.5">
                    {selectedNode.metrics}
                  </div>
                </div>

                {/* Full Stack Chips */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-slate-700 uppercase tracking-wider">
                    Production Stack Components:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.stack.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Integration Guarantee */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
                  <span>✓ 100% Code Ownership</span>
                  <span>✓ Zero Proprietary Lock-In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

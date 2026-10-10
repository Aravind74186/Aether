"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Layers,
  Cpu,
  Database,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface LayerInfo {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  summary: string;
  stack: string[];
  responsibilities: string[];
  securityControls: string[];
}

const architectureLayers: LayerInfo[] = [
  {
    id: "presentation",
    name: "Presentation & Edge Layer",
    badge: "Layer 01",
    icon: Layers,
    color: "text-orange-700 border-orange-200 bg-orange-50",
    summary: "Server-side rendered (SSR) React components with client hydration only where necessary for maximum speed and SEO indexability.",
    stack: ["Next.js App Router", "React Server Components", "Tailwind CSS", "TypeScript", "Vercel Edge / CDN"],
    responsibilities: [
      "Sub-second First Contentful Paint (FCP) and low bundle sizes.",
      "Accessible WAI-ARIA compliant interactive components.",
      "Edge caching of static assets and streaming HTML.",
    ],
    securityControls: [
      "Strict Content-Security-Policy (CSP) headers.",
      "Zero client-side secrets or sensitive token exposure.",
      "Automated XSS sanitization.",
    ],
  },
  {
    id: "api",
    name: "API & Server Actions Layer",
    badge: "Layer 02",
    icon: Cpu,
    color: "text-amber-700 border-amber-200 bg-amber-50",
    summary: "Type-safe Remote Procedure Call (RPC) layer and structured REST/GraphQL endpoints with runtime Zod schema parsing.",
    stack: ["Next.js Server Actions", "Node.js runtime", "FastAPI (Python Microservices)", "Zod Schema Parser"],
    responsibilities: [
      "Enforcing business logic constraints and multi-role access policies.",
      "Orchestrating background tasks and external payment webhooks.",
      "Returning structured error payloads with audit logging.",
    ],
    securityControls: [
      "CSRF token verification on all mutation requests.",
      "IP-based sliding window rate-limiting.",
      "HTTP-only encrypted JWT session cookies.",
    ],
  },
  {
    id: "data",
    name: "Database & Storage Layer",
    badge: "Layer 03",
    icon: Database,
    color: "text-sky-700 border-sky-200 bg-sky-50",
    summary: "Relational PostgreSQL database with strict foreign-key constraints, row-level locking, and high-dimensional vector search.",
    stack: ["PostgreSQL (Relational)", "Prisma ORM", "pgvector extension", "Redis (In-Memory)"],
    responsibilities: [
      "ACID transactional guarantees on financial and enrollment ledger tables.",
      "Row-level locking (`SELECT FOR UPDATE`) on concurrent orders.",
      "Sub-15ms semantic vector similarity queries.",
    ],
    securityControls: [
      "Encrypted data storage at rest with AES-256.",
      "Parameterized SQL queries preventing SQL injection.",
      "Automated daily incremental snapshots and disaster recovery backups.",
    ],
  },
  {
    id: "infra",
    name: "Infrastructure & Telemetry",
    badge: "Layer 04",
    icon: Server,
    color: "text-emerald-700 border-emerald-200 bg-emerald-50",
    summary: "Containerized deployment pipelines with healthcheck probes, zero-downtime rolling updates, and real-time error tracking.",
    stack: ["Docker & Docker Compose", "GitHub Actions CI/CD", "Linux VPS / Cloud", "Sentry Telemetry"],
    responsibilities: [
      "Automated test verification on every Git push.",
      "Isolated reproducible staging environments.",
      "Continuous server uptime and latency monitoring.",
    ],
    securityControls: [
      "Isolated Docker network boundaries.",
      "Principle of least-privilege for database and cloud service roles.",
      "Automated dependency vulnerability audits (`npm audit` & Snyk).",
    ],
  },
];

export function InteractiveArchitecture() {
  const [activeLayer, setActiveLayer] = useState<LayerInfo>(architectureLayers[0]);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 space-y-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">
              Interactive System Topology
            </span>
            <Badge variant="brand">Click to Inspect</Badge>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight mt-1">
            4-Tier Architecture Dataflow
          </h2>
        </div>
        <div className="text-xs font-mono text-stone-500">
          Click any tier below to inspect technical controls
        </div>
      </div>

      {/* Layer Navigation 3D Slabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-1200">
        {architectureLayers.map((layer) => {
          const Icon = layer.icon;
          const isSelected = activeLayer.id === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 preserve-3d iso-3d-slab flex flex-col justify-between h-full min-h-[100px] ${
                isSelected
                  ? `${layer.color} shadow-md ring-2 ring-orange-500 scale-[1.03]`
                  : "border-stone-200 bg-stone-50/80 hover:border-orange-200 hover:bg-white text-stone-600 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold">{layer.badge}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-stone-900 font-mono">{layer.name}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Layer Inspector Box */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${activeLayer.color}`}>
              <activeLayer.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-orange-600 uppercase font-bold tracking-wider">
                {activeLayer.badge} Inspection
              </span>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                {activeLayer.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeLayer.stack.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white text-stone-700 border border-stone-200 shadow-2xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed max-w-4xl">
          {activeLayer.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Responsibilities */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="text-xs font-mono uppercase text-orange-600 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Core Operational Responsibilities</span>
            </div>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {activeLayer.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Safeguards */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="text-xs font-mono uppercase text-emerald-600 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security & Integrity Controls</span>
            </div>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {activeLayer.securityControls.map((sec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

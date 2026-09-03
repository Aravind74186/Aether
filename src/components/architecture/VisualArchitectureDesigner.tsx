"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  Server,
  Database,
  Cpu,
  Shield,
  Download,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Radio,
  FileDown,
} from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  tier: "client" | "api" | "data" | "infra";
  monthlyHostingEst: number;
  description: string;
  isDefault?: boolean;
}

const allNodes: NodeItem[] = [
  // Client Tier
  {
    id: "web_app",
    name: "Next.js 14 Responsive Web App",
    tier: "client",
    monthlyHostingEst: 0, // Free on Vercel/Cloudflare Pages or low-cost VPS
    description: "Server-side rendered (SSR) React interface with sub-second page loads.",
    isDefault: true,
  },
  {
    id: "pwa_client",
    name: "Offline-First Mobile PWA",
    tier: "client",
    monthlyHostingEst: 0,
    description: "Service workers with IndexedDB cache for offline operations in classrooms/warehouses.",
  },
  {
    id: "admin_portal",
    name: "Executive & Staff Management Console",
    tier: "client",
    monthlyHostingEst: 0,
    description: "High-density data tables, multi-parameter search, and CSV batch exports.",
    isDefault: true,
  },

  // API Tier
  {
    id: "api_gateway",
    name: "Node.js / Express API Gateway",
    tier: "api",
    monthlyHostingEst: 10,
    description: "RESTful endpoints with Zod runtime validation and JWT session handling.",
    isDefault: true,
  },
  {
    id: "bullmq_workers",
    name: "BullMQ Asynchronous Job Queue",
    tier: "api",
    monthlyHostingEst: 10,
    description: "Background worker instances processing batch PDF report cards and email broadcasts.",
  },
  {
    id: "redis_cache",
    name: "Redis In-Memory Cache",
    tier: "api",
    monthlyHostingEst: 10,
    description: "Sub-millisecond session state and global rate-limiting tokens.",
  },

  // Data Tier
  {
    id: "postgres_core",
    name: "PostgreSQL ACID Relational Database",
    tier: "data",
    monthlyHostingEst: 15,
    description: "Strict relational integrity, automated daily backups, and indexed schemas.",
    isDefault: true,
  },
  {
    id: "pgvector_rag",
    name: "pgvector Document Semantic Search",
    tier: "data",
    monthlyHostingEst: 15,
    description: "HNSW indexed vector embeddings for instant document Q&A with exact citations.",
  },
  {
    id: "s3_storage",
    name: "S3-Compatible Secure Document Bucket",
    tier: "data",
    monthlyHostingEst: 5,
    description: "Encrypted storage for school certificates, invoice PDFs, and media assets.",
    isDefault: true,
  },

  // Infra Tier
  {
    id: "cloudflare_edge",
    name: "Cloudflare Edge CDN & WAF Protection",
    tier: "infra",
    monthlyHostingEst: 0,
    description: "Global SSL termination, edge caching, and automated DDoS mitigation.",
    isDefault: true,
  },
  {
    id: "payment_webhook",
    name: "Automated Payment Webhook Engine",
    tier: "infra",
    monthlyHostingEst: 0,
    description: "Stripe/Razorpay reconciliation handlers with idempotency keys.",
  },
  {
    id: "sms_gateway",
    name: "Transactional SMS / WhatsApp Dispatcher",
    tier: "infra",
    monthlyHostingEst: 10,
    description: "Emergency alerts, attendance absent circulars, and fee reminders.",
  },
];

export function VisualArchitectureDesigner() {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([
    "web_app",
    "admin_portal",
    "api_gateway",
    "postgres_core",
    "s3_storage",
    "cloudflare_edge",
  ]);

  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    if (selectedNodeIds.includes(id)) {
      if (selectedNodeIds.length > 2) {
        setSelectedNodeIds(selectedNodeIds.filter((n) => n !== id));
      }
    } else {
      setSelectedNodeIds([...selectedNodeIds, id]);
    }
  };

  const calculatedTotals = useMemo(() => {
    let monthlyHosting = 0;
    selectedNodeIds.forEach((id) => {
      const node = allNodes.find((n) => n.id === id);
      if (node) {
        monthlyHosting += node.monthlyHostingEst;
      }
    });

    return {
      monthlyHosting: Math.max(15, monthlyHosting),
      nodeCount: selectedNodeIds.length,
      estimatedRPS: selectedNodeIds.includes("redis_cache") ? "2,500+ Req/sec" : "500+ Req/sec",
    };
  }, [selectedNodeIds]);

  const exportSOW = () => {
    const chosenNodes = allNodes.filter((n) => selectedNodeIds.includes(n.id));
    const lines = [
      "# Aether Technologies - System Architecture Specification & SOW Blueprint",
      `Generated on: ${new Date().toISOString().split("T")[0]}`,
      "",
      "## 1. System Topology Overview",
      `- Selected Architectural Nodes: ${chosenNodes.length}`,
      `- Estimated Monthly Infrastructure Cloud Cost: $${calculatedTotals.monthlyHosting}/month`,
      `- Concurrency Capability: ${calculatedTotals.estimatedRPS}`,
      "",
      "## 2. Selected Architecture Modules",
      ...chosenNodes.map((n) => `### ${n.name} (${n.tier.toUpperCase()} TIER)\n- Description: ${n.description}\n- Est. Hosting: $${n.monthlyHostingEst}/mo\n`),
      "## 3. Engineering & Security Commitments",
      "- 100% Client Source Code & Database Ownership",
      "- Strict Zod Schema Validation & TLS 1.3 Transport Encryption",
      "- Multi-stage Docker & Automated CI/CD Deployments",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aether_architecture_sow_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadMsg("Architecture Blueprint & SOW downloaded successfully!");
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  const getTierNodes = (tier: NodeItem["tier"]) => allNodes.filter((n) => n.tier === tier);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Visual Topology Studio
            </span>
            <Badge variant="brand">Interactive Canvas</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Visual Architecture & Infrastructure Designer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Toggle cloud components to design a production topology and export a technical Scope of Work (SOW).
          </p>
        </div>

        <Button size="sm" variant="primary" onClick={exportSOW}>
          <FileDown className="w-4 h-4" />
          <span>Export SOW Blueprint</span>
        </Button>
      </div>

      {downloadMsg && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Main Grid: Tier Visualizer vs Live Specification Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: The 4 Tiers */}
        <div className="lg:col-span-8 space-y-8">
          {/* Tier 1: Client Layer */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Tier 01: Client & Presentation Layer</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Sub-second Next.js SSR</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getTierNodes("client").map((node) => {
                const active = selectedNodeIds.includes(node.id);
                return (
                  <div
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 ${
                      active
                        ? "border-orange-500 bg-orange-950/30 ring-1 ring-orange-500/40"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{node.name}</span>
                      {active && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{node.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tier 2: API & Gateway */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Tier 02: API, Validation & Async Queues</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Zod Validated Endpoints</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getTierNodes("api").map((node) => {
                const active = selectedNodeIds.includes(node.id);
                return (
                  <div
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 ${
                      active
                        ? "border-orange-500 bg-orange-950/30 ring-1 ring-orange-500/40"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{node.name}</span>
                      {active && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{node.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tier 3: Data Tier */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>Tier 03: PostgreSQL Persistence & Vector Stores</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">ACID + S3 Storage</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getTierNodes("data").map((node) => {
                const active = selectedNodeIds.includes(node.id);
                return (
                  <div
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 ${
                      active
                        ? "border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/40"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{node.name}</span>
                      {active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{node.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tier 4: Edge & Integrations */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Tier 04: Edge Protection & Notification Pipelines</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Cloudflare Edge + SMS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getTierNodes("infra").map((node) => {
                const active = selectedNodeIds.includes(node.id);
                return (
                  <div
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 ${
                      active
                        ? "border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/40"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{node.name}</span>
                      {active && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{node.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Live Summary & Hosting Estimation */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                <Server className="w-4 h-4" />
                <span>Topology Spec</span>
              </div>
              <Badge variant="brand">{calculatedTotals.nodeCount} Active Nodes</Badge>
            </div>

            {/* Metric Highlights */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400">Estimated Monthly Cloud Bill</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  ${calculatedTotals.monthlyHosting} / mo
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Deployable to Hetzner, Railway, or AWS Lightsail
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400">Peak Concurrency Capacity</div>
                <div className="text-lg font-bold text-white font-mono">
                  {calculatedTotals.estimatedRPS}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Tested under sub-second P95 latency
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Architecture Blueprint Deliverables:
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production Docker Compose</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Prisma ORM Migrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub Actions CI Pipeline</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Button size="md" variant="primary" className="w-full justify-center" onClick={exportSOW}>
                <Download className="w-4 h-4" />
                <span>Download SOW Blueprint</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

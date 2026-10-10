"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Database,
  ShieldCheck,
  Smartphone,
  Laptop,
  Server,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Radio,
  Terminal,
  Activity,
  Boxes,
  Workflow,
  Compass,
  ArrowRight,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type ArchitectureViewMode = "pcb-chip" | "orbital-radar" | "pipeline-highway";

interface ArchitectureNode {
  id: string;
  chipCode: string;
  name: string;
  category: "client" | "edge" | "compute" | "storage";
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  latency: string;
  throughput: string;
  description: string;
  vulnerabilityPrevented: string;
  codeSnippet: string;
  xPercent: number; // For PCB & Orbital coordinate mapping
  yPercent: number;
}

const systemNodes: ArchitectureNode[] = [
  {
    id: "client-pwa",
    chipCode: "IC-01: CLIENT_PWA",
    name: "Zero-Install Mobile PWA",
    category: "client",
    icon: Smartphone,
    tag: "Client Tier",
    latency: "< 45ms TTI",
    throughput: "Local Cache",
    description:
      "Progressive Web App with Service Workers and IndexedDB optimistic offline sync for classroom tablets and phones.",
    vulnerabilityPrevented: "Network dropouts during roll call causing lost attendance marks.",
    codeSnippet: "navigator.serviceWorker.register('/sw.js');",
    xPercent: 18,
    yPercent: 28,
  },
  {
    id: "admin-portal",
    chipCode: "IC-02: ADMIN_WEB",
    name: "Enterprise Admin Console",
    category: "client",
    icon: Laptop,
    tag: "Admin Tier",
    latency: "99+ Lighthouse",
    throughput: "SSR Stream",
    description:
      "Server-side rendered desktop portal with accessible data grids, CSV exports, and role-based permissions.",
    vulnerabilityPrevented: "Cluttered PHP screens exposing unauthorized administrative endpoints.",
    codeSnippet: "export default async function AdminDashboard()",
    xPercent: 18,
    yPercent: 72,
  },
  {
    id: "edge-waf",
    chipCode: "IC-03: CLOUDFLARE_WAF",
    name: "Edge WAF & SSL Gateway",
    category: "edge",
    icon: ShieldCheck,
    tag: "Security Edge",
    latency: "< 12ms",
    throughput: "100k req/sec",
    description:
      "Global Layer-7 DDoS mitigation, TLS 1.3 termination, and intelligent bot filtering before traffic hits origin.",
    vulnerabilityPrevented: "Brute-force password guessing and origin server IP discovery.",
    codeSnippet: "strict-transport-security: max-age=63072000; includeSubDomains",
    xPercent: 42,
    yPercent: 32,
  },
  {
    id: "redis-limiter",
    chipCode: "IC-04: REDIS_THROTTLE",
    name: "Redis Token Bucket Limiter",
    category: "edge",
    icon: Lock,
    tag: "Traffic Guard",
    latency: "< 3ms",
    throughput: "100 req/min/IP",
    description:
      "In-memory sliding window rate limiter safeguarding APIs from traffic surges and crawler exhaustion.",
    vulnerabilityPrevented: "API starvation when hundreds of teachers submit reports simultaneously.",
    codeSnippet: "const { success } = await ratelimit.limit(clientIP);",
    xPercent: 42,
    yPercent: 68,
  },
  {
    id: "nextjs-core",
    chipCode: "IC-05: NEXTJS_KERNEL",
    name: "Next.js 14 Compute Kernel",
    category: "compute",
    icon: Server,
    tag: "Application Core",
    latency: "< 28ms",
    throughput: "Node.js V8",
    description:
      "Server Actions and runtime business logic engine executing strictly typed mutation contracts without client API sprawl.",
    vulnerabilityPrevented: "Fragile microservice meshes that require 15 containers for single page views.",
    codeSnippet: "export async function generateTermReport(studentId: string)",
    xPercent: 68,
    yPercent: 32,
  },
  {
    id: "zod-guard",
    chipCode: "IC-06: ZOD_VALIDATOR",
    name: "Zod Schema Gatekeeper",
    category: "compute",
    icon: Cpu,
    tag: "Zero-Trust Guard",
    latency: "< 1ms",
    throughput: "100% Type-Safe",
    description:
      "Runtime validation schema intercepting malformed payloads before they reach SQL execution or business rules.",
    vulnerabilityPrevented: "Malformed JSON injecting corrupted data or triggering unhandled exceptions.",
    codeSnippet: "const validPayload = StudentSchema.safeParse(data);",
    xPercent: 68,
    yPercent: 68,
  },
  {
    id: "postgres-vault",
    chipCode: "IC-07: POSTGRES_ACID",
    name: "PostgreSQL 16 ACID Vault",
    category: "storage",
    icon: Database,
    tag: "Relational Vault",
    latency: "< 5ms",
    throughput: "ACID Guaranteed",
    description:
      "Relational data store with PgBouncer connection pooling, foreign key constraints, and point-in-time WAL archiving.",
    vulnerabilityPrevented: "NoSQL eventual consistency creating duplicate invoice numbers or lost fee records.",
    codeSnippet: "BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
    xPercent: 90,
    yPercent: 32,
  },
  {
    id: "pgvector-ai",
    chipCode: "IC-08: PGVECTOR_RAG",
    name: "pgvector AI Embedding Index",
    category: "storage",
    icon: Sparkles,
    tag: "AI Vector Core",
    latency: "< 18ms",
    throughput: "HNSW Index",
    description:
      "1536-dimensional vector similarity search over school policies and contracts with exact page citations.",
    vulnerabilityPrevented: "Hallucinating AI chatbots giving incorrect institutional guidance.",
    codeSnippet: "SELECT * FROM chunks ORDER BY embedding <=> $1 LIMIT 5;",
    xPercent: 90,
    yPercent: 68,
  },
];

export function VisualSystemDiagram() {
  const [viewMode, setViewMode] = useState<ArchitectureViewMode>("pcb-chip");
  const [activeNodeId, setActiveNodeId] = useState<string>("nextjs-core");
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceStep, setTraceStep] = useState<number>(0);

  const selectedNode =
    systemNodes.find((n) => n.id === activeNodeId) || systemNodes[4];

  // Live Packet Trace Simulation
  const runTrace = () => {
    if (isTracing) return;
    setIsTracing(true);
    setTraceStep(1);

    const steps = [
      "client-pwa",
      "edge-waf",
      "nextjs-core",
      "zod-guard",
      "postgres-vault",
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setActiveNodeId(steps[current]);
        setTraceStep(current + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTracing(false);
          setTraceStep(0);
        }, 1200);
      }
    }, 1000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Architecture Console Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-6 sm:p-7 rounded-3xl border border-stone-200 bg-white shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-600 font-bold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Architecture Topology Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Aether System Architecture Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mt-0.5 font-sans">
            Inspect how high-concurrency requests traverse between Edge Security, Node.js Kernels, and PostgreSQL Storage.
          </p>
        </div>

        {/* View Style Switcher & Trace Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Visual Paradigm Selector */}
          <div className="inline-flex p-1 rounded-2xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 font-mono text-xs shadow-inner">
            <button
              onClick={() => setViewMode("pcb-chip")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "pcb-chip"
                  ? "bg-emerald-600 text-white font-bold shadow-sm"
                  : "text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Silicon PCB Board</span>
            </button>
            <button
              onClick={() => setViewMode("orbital-radar")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "orbital-radar"
                  ? "bg-sky-600 text-white font-bold shadow-sm"
                  : "text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Orbital Radar Node</span>
            </button>
            <button
              onClick={() => setViewMode("pipeline-highway")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "pipeline-highway"
                  ? "bg-orange-600 text-white font-bold shadow-sm"
                  : "text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Data Highway</span>
            </button>
          </div>

          {/* Trace Packet Button */}
          <button
            onClick={runTrace}
            disabled={isTracing}
            className={`px-4 py-2 rounded-2xl font-mono text-xs flex items-center gap-2 transition-all shadow-md font-semibold ${
              isTracing
                ? "bg-amber-600/30 border border-amber-500/50 text-amber-300 animate-pulse cursor-wait"
                : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white"
            }`}
          >
            {isTracing ? (
              <>
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span>Tracing Request (Node {traceStep}/5)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Trace Live Request</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Architecture Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 8 Cols - Interactive Custom Viewport */}
        <div className="lg:col-span-8">
          {/* ========================================================================= */}
          {/* 1. SILICON PCB MICROCHIP BOARD VIEW */}
          {/* ========================================================================= */}
          {viewMode === "pcb-chip" && (
            <div className="relative rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 min-h-[560px] shadow-xs overflow-hidden">
              {/* Copper / Orange PCB Matrix Circuit Grid Background */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(234, 88, 12, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(234, 88, 12, 0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Silicon Board Watermark & Status */}
              <div className="relative flex items-center justify-between pb-4 border-b border-orange-100 dark:border-slate-800 font-mono text-xs mb-6">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span>AETHER_SILICON_MOTHERBOARD // REV 4.2</span>
                </div>
                <div className="text-[11px] text-stone-500 dark:text-slate-400 hidden sm:block">
                  STATUS: BUS_ACTIVE • VOLTAGE: 3.3V • CLOCK: 100MHz
                </div>
              </div>

              {/* 4 Architectural Columns of Chips on PCB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {/* Column 1: Client Layer */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-800 dark:text-slate-200 border-b border-stone-200 dark:border-slate-800 pb-1 flex items-center justify-between">
                    <span>01. Clients</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  {systemNodes
                    .filter((n) => n.category === "client")
                    .map((node) => {
                      const isSelected = activeNodeId === node.id;
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none flex flex-col justify-between h-[124px] ${
                            isSelected
                              ? "border-orange-500 bg-orange-50/95 dark:bg-orange-950/60 shadow-md ring-2 ring-orange-400 scale-[1.03]"
                              : "border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-950/70 hover:border-orange-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-stone-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">● LIVE</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 2: Edge Security */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-800 dark:text-slate-200 border-b border-stone-200 dark:border-slate-800 pb-1 flex items-center justify-between">
                    <span>02. Edge WAF</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  {systemNodes
                    .filter((n) => n.category === "edge")
                    .map((node) => {
                      const isSelected = activeNodeId === node.id;
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none flex flex-col justify-between h-[124px] ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-50/95 dark:bg-emerald-950/60 shadow-md ring-2 ring-emerald-400 scale-[1.03]"
                              : "border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-950/70 hover:border-emerald-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 shadow-2xs">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-stone-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">● SECURE</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 3: Compute & AI */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-800 dark:text-slate-200 border-b border-stone-200 dark:border-slate-800 pb-1 flex items-center justify-between">
                    <span>03. App Kernel</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                  </div>
                  {systemNodes
                    .filter((n) => n.category === "compute")
                    .map((node) => {
                      const isSelected = activeNodeId === node.id;
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none flex flex-col justify-between h-[124px] ${
                            isSelected
                              ? "border-orange-500 bg-orange-50/95 dark:bg-orange-950/60 shadow-md ring-2 ring-orange-400 scale-[1.03]"
                              : "border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-950/70 hover:border-orange-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-stone-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-orange-700 dark:text-orange-400 font-bold">● EXEC</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 4: Storage & Vectors */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-stone-800 dark:text-slate-200 border-b border-stone-200 dark:border-slate-800 pb-1 flex items-center justify-between">
                    <span>04. Data Vault</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  </div>
                  {systemNodes
                    .filter((n) => n.category === "storage")
                    .map((node) => {
                      const isSelected = activeNodeId === node.id;
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none flex flex-col justify-between h-[124px] ${
                            isSelected
                              ? "border-sky-500 bg-sky-50/95 dark:bg-sky-950/60 shadow-md ring-2 ring-sky-400 scale-[1.03]"
                              : "border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-950/70 hover:border-sky-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-sky-700 dark:text-sky-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-sky-600 dark:text-sky-400 shadow-2xs">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-stone-500 dark:text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-sky-700 dark:text-sky-400 font-bold">● ACID</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Silicon PCB Bus Footer */}
              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-stone-600 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px]">TLS 1.3 BUS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-[11px]">V8 RUNTIME BUS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span className="text-[11px]">SERIALIZABLE ACID BUS</span>
                  </div>
                </div>
                <div className="text-[11px] text-orange-700 dark:text-orange-400 font-bold">
                  OVERALL P99 LATENCY: 38ms
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. ORBITAL RADAR TOPOLOGY VIEW */}
          {/* ========================================================================= */}
          {viewMode === "orbital-radar" && (
            <div className="relative rounded-3xl border border-stone-200 dark:border-slate-800 bg-gradient-to-b from-stone-50 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20 p-6 sm:p-8 min-h-[560px] shadow-xs flex flex-col justify-between overflow-hidden">
              {/* Concentric Radar Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[180px] h-[180px] rounded-full border border-orange-400/40 animate-ping" style={{ animationDuration: "6s" }} />
                <div className="absolute w-[340px] h-[340px] rounded-full border border-orange-200/60 dark:border-orange-500/20" />
                <div className="absolute w-[500px] h-[500px] rounded-full border border-stone-200/80 dark:border-slate-800/80" />
              </div>

              {/* Central Core Satellite */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-12 space-y-6">
                <div className="p-6 rounded-full bg-white dark:bg-slate-900 border-2 border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.25)] flex flex-col items-center justify-center text-center space-y-2 max-w-[200px]">
                  <Server className="w-8 h-8 text-orange-600 dark:text-orange-400 animate-pulse" />
                  <div className="text-xs font-bold text-stone-950 dark:text-slate-100 font-mono">NEXT.JS 14 CORE</div>
                  <div className="text-[10px] font-mono text-orange-700 dark:text-orange-400 font-bold">Zero-Trust Kernel</div>
                </div>

                {/* Orbiting Nodes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4">
                  {systemNodes
                    .filter((n) => n.id !== "nextjs-core")
                    .slice(0, 4)
                    .map((node) => {
                      const isSelected = activeNodeId === node.id;
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer text-center space-y-2 transition-all ${
                            isSelected
                              ? "border-orange-500 bg-orange-50/95 dark:bg-orange-950/60 shadow-md ring-2 ring-orange-400 scale-105"
                              : "border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-300 dark:hover:border-slate-700 hover:shadow-md shadow-2xs"
                          }`}
                        >
                          <div className="w-8 h-8 mx-auto rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-slate-100 truncate font-mono">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-orange-700 dark:text-orange-400 font-bold">
                            {node.latency}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. DATA HIGHWAY PIPELINE VIEW */}
          {/* ========================================================================= */}
          {viewMode === "pipeline-highway" && (
            <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 min-h-[560px] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-slate-800 font-mono text-xs text-orange-700 dark:text-orange-400 font-bold">
                <span>STAGE-BY-STAGE REQUEST PIPELINE</span>
                <span>STREAM: TLS 1.3 ➔ ZOD ➔ POSTGRES</span>
              </div>

              <div className="space-y-4">
                {systemNodes.map((node, idx) => {
                  const isSelected = activeNodeId === node.id;
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNodeId(node.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? "border-orange-500 bg-orange-50/95 dark:bg-orange-950/60 shadow-md ring-1 ring-orange-400 scale-[1.01]"
                          : "border-stone-200 dark:border-slate-800 bg-stone-50/80 dark:bg-slate-950/70 hover:border-orange-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-7 h-7 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-400 flex items-center justify-center font-mono font-bold text-xs">
                          {idx + 1}
                        </span>
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-stone-900 dark:text-slate-100 font-mono">
                            {node.name}
                          </div>
                          <div className="text-xs text-stone-600 dark:text-slate-400 font-sans">
                            {node.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono text-xs">
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold">{node.latency}</div>
                        <div className="text-stone-500 dark:text-slate-400 text-[10px]">{node.tag}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: 4 Cols - Real-Time Telemetry & Oscilloscope Inspector */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-xs">
            {/* Selected Component Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 shadow-2xs">
                  <selectedNode.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">
                    {selectedNode.chipCode}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-slate-100 font-sans">
                    {selectedNode.name}
                  </h3>
                </div>
              </div>
              <Badge variant="brand">{selectedNode.tag}</Badge>
            </div>

            {/* Performance Telemetry */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-1">
                <div className="text-[10px] text-stone-500 dark:text-slate-400 uppercase font-semibold">Response Latency</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{selectedNode.latency}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-1">
                <div className="text-[10px] text-stone-500 dark:text-slate-400 uppercase font-semibold">Throughput Bus</div>
                <div className="text-sky-600 dark:text-sky-400 font-bold text-sm">{selectedNode.throughput}</div>
              </div>
            </div>

            {/* Function & Role Overview */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-stone-500 dark:text-slate-400 font-semibold">
                Architectural Role & Scope
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedNode.description}
              </p>
            </div>

            {/* Code Verification Invariant */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-2 font-mono text-xs shadow-2xs">
              <div className="text-[10px] text-orange-600 dark:text-orange-400 uppercase font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Production Code Contract:</span>
              </div>
              <div className="text-stone-800 dark:text-slate-200 text-[11px] truncate bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-stone-200 dark:border-slate-800 font-semibold shadow-xs">
                {selectedNode.codeSnippet}
              </div>
            </div>

            {/* Anti-Pattern & Vulnerability Prevented */}
            <div className="p-4 rounded-2xl border border-orange-200/90 dark:border-orange-900/50 bg-orange-50/60 dark:bg-orange-950/30 space-y-1 shadow-2xs">
              <div className="text-xs font-mono uppercase text-orange-700 dark:text-orange-400 font-bold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 flex items-center justify-center text-[10px] font-bold">✕</span>
                <span>Vulnerability Prevented</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed font-sans pt-0.5">
                {selectedNode.vulnerabilityPrevented}
              </p>
            </div>

            {/* Live Trace Status Indicator */}
            {isTracing && (
              <div className="p-3.5 rounded-2xl border border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 font-mono text-xs text-orange-800 dark:text-orange-300 animate-pulse space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Request Packet Flowing:</span>
                </div>
                <div className="text-[11px] text-stone-700 dark:text-slate-300">
                  Step {traceStep}/5: Active on {selectedNode.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

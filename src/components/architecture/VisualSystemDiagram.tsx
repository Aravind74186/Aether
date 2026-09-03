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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-6 rounded-3xl border border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Architecture Topology Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
            Aether System Architecture Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-0.5 font-sans">
            Inspect how high-concurrency requests traverse between Edge Security, Node.js Kernels, and PostgreSQL Storage.
          </p>
        </div>

        {/* View Style Switcher & Trace Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Visual Paradigm Selector */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs shadow-inner">
            <button
              onClick={() => setViewMode("pcb-chip")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "pcb-chip"
                  ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Silicon PCB Board</span>
            </button>
            <button
              onClick={() => setViewMode("orbital-radar")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "orbital-radar"
                  ? "bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Orbital Radar Node</span>
            </button>
            <button
              onClick={() => setViewMode("pipeline-highway")}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                viewMode === "pipeline-highway"
                  ? "bg-orange-600 text-white font-bold shadow-lg shadow-orange-950/50"
                  : "text-slate-400 hover:text-white"
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
            <div className="relative rounded-3xl border border-emerald-500/30 bg-[#030d0a] p-6 sm:p-8 min-h-[560px] shadow-[0_0_60px_rgba(16,185,129,0.1)] overflow-hidden">
              {/* Copper PCB Matrix Circuit Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Silicon Board Watermark & Status */}
              <div className="relative flex items-center justify-between pb-4 border-b border-emerald-900/40 font-mono text-xs mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>AETHER_SILICON_MOTHERBOARD // REV 4.2</span>
                </div>
                <div className="text-[11px] text-emerald-600 hidden sm:block">
                  STATUS: BUS_ACTIVE • VOLTAGE: 3.3V • CLOCK: 100MHz
                </div>
              </div>

              {/* 4 Architectural Columns of Chips on PCB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {/* Column 1: Client Layer */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-cyan-400 border-b border-cyan-900/50 pb-1 flex items-center justify-between">
                    <span>01. Clients</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none ${
                            isSelected
                              ? "border-cyan-400 bg-cyan-950/80 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-[1.03]"
                              : "border-slate-800 bg-[#081512]/90 hover:border-cyan-600 hover:bg-[#0c1f1a]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-emerald-400">● LIVE</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 2: Edge Security */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-emerald-400 border-b border-emerald-900/50 pb-1 flex items-center justify-between">
                    <span>02. Edge WAF</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none ${
                            isSelected
                              ? "border-emerald-400 bg-emerald-950/80 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-[1.03]"
                              : "border-slate-800 bg-[#081512]/90 hover:border-emerald-600 hover:bg-[#0c1f1a]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-emerald-400">● SECURE</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 3: Compute & AI */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-orange-400 border-b border-orange-900/50 pb-1 flex items-center justify-between">
                    <span>03. App Kernel</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
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
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none ${
                            isSelected
                              ? "border-orange-400 bg-orange-950/80 shadow-[0_0_30px_rgba(99,102,241,0.4)] scale-[1.03]"
                              : "border-slate-800 bg-[#081512]/90 hover:border-orange-600 hover:bg-[#0c1f1a]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-orange-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-orange-950 border border-orange-800 text-orange-300">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-orange-400">● EXEC</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Column 4: Storage & Vectors */}
                <div className="space-y-4">
                  <div className="text-[11px] font-mono font-bold uppercase text-sky-400 border-b border-sky-900/50 pb-1 flex items-center justify-between">
                    <span>04. Data Vault</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group select-none ${
                            isSelected
                              ? "border-sky-400 bg-sky-950/80 shadow-[0_0_30px_rgba(56,189,248,0.4)] scale-[1.03]"
                              : "border-slate-800 bg-[#081512]/90 hover:border-sky-600 hover:bg-[#0c1f1a]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-sky-400 font-bold">
                              {node.chipCode.split(":")[0]}
                            </span>
                            <div className="p-1.5 rounded-lg bg-sky-950 border border-sky-800 text-sky-300">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight leading-snug">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-between">
                            <span>{node.latency}</span>
                            <span className="text-sky-400">● ACID</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Silicon PCB Bus Footer */}
              <div className="mt-8 pt-4 border-t border-emerald-950/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-emerald-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-[11px]">TLS 1.3 BUS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-[11px]">V8 RUNTIME BUS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="text-[11px]">SERIALIZABLE ACID BUS</span>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-500 font-bold">
                  OVERALL P99 LATENCY: 38ms
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. ORBITAL RADAR TOPOLOGY VIEW */}
          {/* ========================================================================= */}
          {viewMode === "orbital-radar" && (
            <div className="relative rounded-3xl border border-cyan-500/30 bg-[#020b18] p-6 sm:p-8 min-h-[560px] shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col justify-between overflow-hidden">
              {/* Concentric Radar Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-[180px] h-[180px] rounded-full border border-cyan-400/60 animate-ping" style={{ animationDuration: "6s" }} />
                <div className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/40" />
                <div className="absolute w-[500px] h-[500px] rounded-full border border-cyan-400/20" />
              </div>

              {/* Central Core Satellite */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-12 space-y-6">
                <div className="p-6 rounded-full bg-cyan-950/80 border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.6)] flex flex-col items-center justify-center text-center space-y-2 max-w-[200px]">
                  <Server className="w-8 h-8 text-cyan-300 animate-pulse" />
                  <div className="text-xs font-bold text-white font-mono">NEXT.JS 14 CORE</div>
                  <div className="text-[10px] font-mono text-cyan-400">Zero-Trust Kernel</div>
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
                              ? "border-cyan-400 bg-cyan-950/90 shadow-xl scale-105"
                              : "border-slate-800 bg-slate-950/80 hover:border-cyan-600"
                          }`}
                        >
                          <div className="w-8 h-8 mx-auto rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs font-bold text-white truncate font-mono">
                            {node.name}
                          </div>
                          <div className="text-[10px] font-mono text-cyan-400">
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
            <div className="rounded-3xl border border-orange-500/30 bg-slate-950 p-6 sm:p-8 min-h-[560px] shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-850 font-mono text-xs text-orange-400">
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
                          ? "border-orange-400 bg-orange-950/70 shadow-lg scale-[1.01]"
                          : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-7 h-7 rounded-xl bg-orange-950 border border-orange-800 text-orange-400 flex items-center justify-center font-mono font-bold text-xs">
                          {idx + 1}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white font-mono">
                            {node.name}
                          </div>
                          <div className="text-xs text-slate-400 font-sans">
                            {node.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono text-xs">
                        <div className="text-emerald-400 font-bold">{node.latency}</div>
                        <div className="text-slate-500 text-[10px]">{node.tag}</div>
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
          <div className="sticky top-24 rounded-3xl border border-slate-800 bg-slate-950/95 p-6 space-y-6 shadow-2xl backdrop-blur-xl">
            {/* Selected Component Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-850">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 shadow-sm">
                  <selectedNode.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                    {selectedNode.chipCode}
                  </div>
                  <h3 className="text-base font-bold text-white font-sans">
                    {selectedNode.name}
                  </h3>
                </div>
              </div>
              <Badge variant="brand">{selectedNode.tag}</Badge>
            </div>

            {/* Performance Telemetry */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Response Latency</div>
                <div className="text-emerald-400 font-bold text-sm">{selectedNode.latency}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Throughput Bus</div>
                <div className="text-cyan-400 font-bold text-sm">{selectedNode.throughput}</div>
              </div>
            </div>

            {/* Function & Role Overview */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Architectural Role & Scope
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedNode.description}
              </p>
            </div>

            {/* Code Verification Invariant */}
            <div className="p-3.5 rounded-2xl bg-[#030d12] border border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="text-[10px] text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Production Code Contract:</span>
              </div>
              <div className="text-slate-300 text-[11px] truncate bg-slate-950 p-2 rounded-xl border border-slate-850">
                {selectedNode.codeSnippet}
              </div>
            </div>

            {/* Anti-Pattern & Vulnerability Prevented */}
            <div className="p-4 rounded-2xl border border-red-900/50 bg-red-950/20 space-y-1">
              <div className="text-xs font-mono uppercase text-red-400 font-bold flex items-center gap-1.5">
                <span>✕ Vulnerability Prevented</span>
              </div>
              <p className="text-xs text-red-300/90 leading-relaxed font-sans">
                {selectedNode.vulnerabilityPrevented}
              </p>
            </div>

            {/* Live Trace Status Indicator */}
            {isTracing && (
              <div className="p-3.5 rounded-2xl border border-orange-500/60 bg-orange-950/50 font-mono text-xs text-orange-300 animate-pulse space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Request Packet Flowing:</span>
                </div>
                <div className="text-[11px] text-slate-200">
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

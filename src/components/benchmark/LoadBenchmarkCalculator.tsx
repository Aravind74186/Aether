"use client";

import React, { useState, useId } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Cpu,
  Database,
  Server,
  Zap,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Download,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

export function LoadBenchmarkCalculator() {
  const [concurrentUsers, setConcurrentUsers] = useState<number>(2500);
  const [requestsPerSec, setRequestsPerSec] = useState<number>(200);
  const [hasRagSearch, setHasRagSearch] = useState<boolean>(true);
  const [databaseWriteRatio, setDatabaseWriteRatio] = useState<"low" | "medium" | "high">("medium");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const concurrentId = useId();
  const reqSecId = useId();

  const USD_TO_INR_RATE = 85;

  const formatPrice = (usdAmount: number) => {
    if (currency === "USD") {
      return `$${usdAmount.toLocaleString("en-US")}`;
    }
    const inrAmount = Math.round(usdAmount * USD_TO_INR_RATE);
    return `₹${inrAmount.toLocaleString("en-IN")}`;
  };

  // Preset Handlers
  const applyPreset = (users: number, rps: number, rag: boolean, write: "low" | "medium" | "high") => {
    setConcurrentUsers(users);
    setRequestsPerSec(rps);
    setHasRagSearch(rag);
    setDatabaseWriteRatio(write);
  };

  // Calculations
  const calculatedVcpu = Math.max(2, Math.ceil(requestsPerSec / 150) * 2);
  const calculatedRamGb = Math.max(4, Math.ceil(concurrentUsers / 800) * 2 + (hasRagSearch ? 4 : 0));
  const pgbouncerPool = Math.min(120, Math.max(20, Math.ceil(concurrentUsers / 50)));
  const estimatedLatencyMs = Math.round(25 + (requestsPerSec / 100) * 3 + (hasRagSearch ? 12 : 0));

  // Cost Comparison
  const vpsCostMonthly = Math.round(10 + calculatedVcpu * 6 + calculatedRamGb * 2.5);
  const awsCostMonthly = Math.round(vpsCostMonthly * 4.5);
  const savingsPct = Math.round(((awsCostMonthly - vpsCostMonthly) / awsCostMonthly) * 100);

  return (
    <div className="w-full space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-400 tracking-wider font-semibold mb-1">
            <Activity className="w-4 h-4" />
            <span>Infrastructure Engineering</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Concurrent Load & Cloud Sizing Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans mt-0.5">
            Model your expected traffic surges to estimate required hardware specs, database pool size, and monthly hosting costs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center shrink-0 text-xs font-mono">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "USD"
                  ? "bg-orange-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>$ USD</span>
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                currency === "INR"
                  ? "bg-emerald-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>₹ INR</span>
            </button>
          </div>
          <Badge variant="brand">Zero AWS Over-provisioning</Badge>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-slate-500 uppercase text-[11px] mr-1">Load Presets:</span>
        <button
          onClick={() => applyPreset(1200, 80, false, "medium")}
          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-orange-500 transition-all"
        >
          🏫 School Roll Call (1.2k users)
        </button>
        <button
          onClick={() => applyPreset(8500, 600, true, "high")}
          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-orange-500 transition-all"
        >
          🎓 University Portal (8.5k users)
        </button>
        <button
          onClick={() => applyPreset(25000, 1800, true, "medium")}
          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-orange-500 transition-all"
        >
          🚀 B2B SaaS Launch (25k users)
        </button>
      </div>

      {/* Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-6">
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide border-b border-slate-850 pb-3">
            1. Traffic Parameters
          </h2>

          {/* Concurrent Users Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={concurrentId} className="text-slate-300 font-semibold cursor-pointer">Peak Concurrent Users:</label>
              <span className="text-orange-400 font-bold text-sm">{concurrentUsers.toLocaleString()} Users</span>
            </div>
            <input
              id={concurrentId}
              type="range"
              min="100"
              max="50000"
              step="100"
              value={concurrentUsers}
              onChange={(e) => setConcurrentUsers(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>100</span>
              <span>25,000</span>
              <span>50,000+</span>
            </div>
          </div>

          {/* Peak Requests Per Second Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={reqSecId} className="text-slate-300 font-semibold cursor-pointer">Peak API Throughput:</label>
              <span className="text-orange-400 font-bold text-sm">{requestsPerSec} Req / Sec</span>
            </div>
            <input
              id={reqSecId}
              type="range"
              min="10"
              max="2500"
              step="10"
              value={requestsPerSec}
              onChange={(e) => setRequestsPerSec(Number(e.target.value))}
              className="w-full accent-orange-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>10 req/s</span>
              <span>1,200 req/s</span>
              <span>2,500 req/s</span>
            </div>
          </div>

          {/* Vector Search Toggle */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white font-mono">AI Vector Search & Embeddings (pgvector)</div>
              <p className="text-[11px] text-slate-400 font-sans">Enables semantic search over PDF circulars & policies (+4GB RAM for vector index).</p>
            </div>
            <button
              type="button"
              onClick={() => setHasRagSearch(!hasRagSearch)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                hasRagSearch ? "bg-orange-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  hasRagSearch ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Database Write Intensity */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-300">Database Transaction Load</label>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {(["low", "medium", "high"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setDatabaseWriteRatio(w)}
                  className={`p-2 rounded-lg border uppercase transition-all ${
                    databaseWriteRatio === w
                      ? "border-orange-500 bg-orange-950/40 text-orange-300 font-bold"
                      : "border-slate-800 bg-slate-900 text-slate-400"
                  }`}
                >
                  {w} writes
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Calculations (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Spec Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-orange-800/40 bg-slate-950 space-y-6 shadow-2xl">
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide border-b border-slate-850 pb-3 flex items-center justify-between">
              <span>2. Calculated Hardware Sizing</span>
              <span className="text-xs text-emerald-400 font-mono">~{estimatedLatencyMs}ms p95 Latency</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-orange-400" />
                  <span>CPU Allocation</span>
                </div>
                <div className="text-lg font-bold text-white">{calculatedVcpu} vCPUs</div>
                <div className="text-[10px] text-slate-500">Dedicated compute</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-orange-400" />
                  <span>RAM Memory</span>
                </div>
                <div className="text-lg font-bold text-white">{calculatedRamGb} GB RAM</div>
                <div className="text-[10px] text-slate-500">Buffer cache + vectors</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PgBouncer Pool</span>
                </div>
                <div className="text-lg font-bold text-white">{pgbouncerPool} Max Conns</div>
                <div className="text-[10px] text-slate-500">Zero connection exhaustion</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>SSL & Edge Shield</span>
                </div>
                <div className="text-lg font-bold text-white">TLS 1.3 + WAF</div>
                <div className="text-[10px] text-slate-500">Free Cloudflare Tier</div>
              </div>
            </div>

            {/* Hosting Cost Comparison */}
            <div className="p-5 rounded-xl border border-emerald-800/40 bg-emerald-950/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  <span>Monthly Cloud Cost Comparison</span>
                </span>
                <Badge variant="success">Save {savingsPct}%</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-slate-400">Aether Lean Linux VPS:</div>
                  <div className="text-2xl font-black text-white">{formatPrice(vpsCostMonthly)} <span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <p className="text-[10px] text-slate-400 font-sans">Full root access, automated backups, zero per-seat markup.</p>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-500">Bloated AWS / SaaS Tier:</div>
                  <div className="text-2xl font-bold text-slate-400 line-through">{formatPrice(awsCostMonthly)} <span className="text-xs font-normal">/mo</span></div>
                  <p className="text-[10px] text-slate-500 font-sans">Over-provisioned multi-zone RDS and serverless gateway markup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

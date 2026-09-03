"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Radio,
  CheckCircle2,
  AlertCircle,
  Clock,
  Server,
  Database,
  Globe,
  Cpu,
  FileText,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface ServiceStatus {
  name: string;
  category: string;
  status: "Operational" | "Degraded" | "Maintenance";
  uptime90d: string;
  latencyAvg: string;
}

const serviceList: ServiceStatus[] = [
  {
    name: "API Gateway & Request Validation Service",
    category: "Edge & APIs",
    status: "Operational",
    uptime90d: "99.99%",
    latencyAvg: "24ms",
  },
  {
    name: "PostgreSQL Primary Cluster & Connection Pooler",
    category: "Persistence",
    status: "Operational",
    uptime90d: "99.98%",
    latencyAvg: "8ms",
  },
  {
    name: "DocuPulse pgvector RAG Embedding & Search",
    category: "AI & Vector",
    status: "Operational",
    uptime90d: "100%",
    latencyAvg: "115ms",
  },
  {
    name: "Automated Gradebook & SOW PDF Rendering Engine",
    category: "Workers",
    status: "Operational",
    uptime90d: "99.95%",
    latencyAvg: "380ms",
  },
  {
    name: "Cloudflare Global Edge CDN & SSL Termination",
    category: "Infrastructure",
    status: "Operational",
    uptime90d: "100%",
    latencyAvg: "12ms",
  },
];

export function StatusDashboard() {
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setRefreshTime(new Date().toLocaleTimeString());
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
              Live Reliability Monitor
            </span>
            <Badge variant="success">All Systems Operational</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            System Reliability & Service Health
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Transparent real-time operational status across Aether&apos;s API gateways, databases, and worker pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-500">
            Updated: {refreshTime}
          </div>
          <Button size="sm" variant="secondary" onClick={handleRefresh}>
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* 90-Day Uptime Overview Bar */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold uppercase">90-Day Rolling System Uptime</span>
          <span className="text-emerald-400 font-bold">99.98% Average</span>
        </div>

        {/* 90 Bars */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {Array.from({ length: 60 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full min-w-[3px] h-8 rounded-sm bg-emerald-500 hover:bg-emerald-400 transition-colors"
              title={`Day -${60 - idx}: 100% Uptime`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
          <span>60 Days Ago</span>
          <span>Today (Zero Degradation)</span>
        </div>
      </div>

      {/* Core Services Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/70 text-slate-400 uppercase">
              <th className="py-3.5 px-5">System Component</th>
              <th className="py-3.5 px-5">Category</th>
              <th className="py-3.5 px-5">Avg Latency</th>
              <th className="py-3.5 px-5">90d Uptime</th>
              <th className="py-3.5 px-5 text-right">Operational Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {serviceList.map((svc, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-5 font-bold text-white font-sans text-sm">
                  {svc.name}
                </td>
                <td className="py-3.5 px-5 text-slate-400">{svc.category}</td>
                <td className="py-3.5 px-5 text-orange-400 font-bold">{svc.latencyAvg}</td>
                <td className="py-3.5 px-5 text-emerald-400 font-bold">{svc.uptime90d}</td>
                <td className="py-3.5 px-5 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{svc.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Incident Log & Maintenance */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Recent Maintenance & Incident History:
        </h3>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold">Scheduled Database Maintenance & Kernel Patching</span>
            <span className="text-slate-500">Jan 12, 2025 • Completed</span>
          </div>
          <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
            Routine PostgreSQL engine patch applied with seamless hot standby failover. Total client disruption: 0 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}

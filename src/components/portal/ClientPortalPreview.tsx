"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  ExternalLink,
  Download,
  FileText,
  GitCommit,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Play,
} from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  period: string;
  status: "completed" | "in_progress" | "upcoming";
  progressPct: number;
  deliverables: string[];
  paymentAmount: string;
  paymentStatus: "paid" | "pending_review" | "upcoming";
}

const sampleMilestones: Milestone[] = [
  {
    id: "m1",
    name: "Sprint 01: Discovery & Database Architecture",
    period: "Weeks 1 - 2",
    status: "completed",
    progressPct: 100,
    deliverables: [
      "User role matrix & entity-relationship diagrams (ERD)",
      "PostgreSQL normalized schema with foreign-key constraints",
      "Staging repository initialization & CI/CD pipeline",
    ],
    paymentAmount: "$2,000",
    paymentStatus: "paid",
  },
  {
    id: "m2",
    name: "Sprint 02: Multi-Role Auth & Core Portals",
    period: "Weeks 3 - 4",
    status: "completed",
    progressPct: 100,
    deliverables: [
      "Role-Based Access Control (Admin, Principal, Teacher, Parent)",
      "Encrypted HTTP-only JWT sessions & password resets",
      "Teacher dashboard layout & responsive mobile navigation",
    ],
    paymentAmount: "$2,500",
    paymentStatus: "paid",
  },
  {
    id: "m3",
    name: "Sprint 03: Attendance Engine & Dynamic PDF Gradebooks",
    period: "Weeks 5 - 6",
    status: "in_progress",
    progressPct: 75,
    deliverables: [
      "1-Click batch roll call with optimistic offline caching",
      "Automated PDF report card generator with grade calculations",
      "SMS & Email notification webhook triggers for absentees",
    ],
    paymentAmount: "$2,500",
    paymentStatus: "pending_review",
  },
  {
    id: "m4",
    name: "Sprint 04: Load Testing, Deployment & Runbook Handover",
    period: "Weeks 7 - 8",
    status: "upcoming",
    progressPct: 0,
    deliverables: [
      "Sub-second load testing across 1,000 concurrent classroom sessions",
      "Production DNS, SSL, and daily automated backup configuration",
      "Administrator training session & technical documentation handover",
    ],
    paymentAmount: "$2,000",
    paymentStatus: "upcoming",
  },
];

const sampleCommits = [
  { hash: "7f4a21e", message: "feat(reports): add dynamic grade calculation and PDF layout", time: "2 hours ago" },
  { hash: "3c89b02", message: "perf(db): add index on student_enrollments(class_id, academic_year)", time: "6 hours ago" },
  { hash: "9e11fd4", message: "feat(attendance): optimistic state update on batch roll call", time: "Yesterday" },
  { hash: "5a22c81", message: "test(auth): add unit test coverage for RBAC middleware", time: "2 days ago" },
];

export function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState<"milestones" | "staging" | "invoices">("milestones");
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownloadReceipt = (milestoneName: string) => {
    setDownloadMsg(`Simulated download for ${milestoneName} invoice receipt.`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 space-y-8 shadow-2xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              Transparent Client Workspace
            </span>
            <Badge variant="demo">Interactive Client Portal</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            St. Jude Academy: CampusFlow Deployment
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Project Lead: Dr. Arvind Rao • Architecture Lead: Aether Engineering Team
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sprint 3 of 4 Active</span>
          </div>
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold uppercase">Overall Project Velocity</span>
          <span className="text-orange-400 font-bold">75% Complete (Sprint 3 in progress)</span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 w-3/4 transition-all" />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Target Production Launch: March 15, 2025</span>
          <span>Zero Technical Debt Detected</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab("milestones")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "milestones"
              ? "bg-orange-600 text-white font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sprint Milestones & Deliverables
        </button>
        <button
          onClick={() => setActiveTab("staging")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "staging"
              ? "bg-orange-600 text-white font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Live Staging & Git Activity
        </button>
        <button
          onClick={() => setActiveTab("invoices")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "invoices"
              ? "bg-orange-600 text-white font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Milestone Payments & Invoices
        </button>
      </div>

      {downloadMsg && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Tab 1: Milestones */}
      {activeTab === "milestones" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {sampleMilestones.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-xl border transition-all ${
                m.status === "in_progress"
                  ? "border-orange-500/60 bg-slate-950 shadow-md ring-1 ring-orange-500/30"
                  : m.status === "completed"
                  ? "border-slate-800 bg-slate-950/60"
                  : "border-slate-850 bg-slate-950/30 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-850">
                <div>
                  <div className="text-xs font-mono text-slate-500">{m.period}</div>
                  <h3 className="text-base font-bold text-white tracking-tight mt-0.5 font-mono">
                    {m.name}
                  </h3>
                </div>

                <Badge
                  variant={
                    m.status === "completed"
                      ? "success"
                      : m.status === "in_progress"
                      ? "brand"
                      : "outline"
                  }
                >
                  {m.status === "completed"
                    ? "Verified & Completed"
                    : m.status === "in_progress"
                    ? `Active Sprint (${m.progressPct}%)`
                    : "Upcoming Sprint"}
                </Badge>
              </div>

              <div className="pt-4 space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Sprint Acceptance Criteria & Deliverables:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                  {m.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          m.status === "completed"
                            ? "text-emerald-400"
                            : m.status === "in_progress"
                            ? "text-orange-400"
                            : "text-slate-600"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Staging & Git Activity */}
      {activeTab === "staging" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
          {/* Staging Launcher */}
          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-semibold">
              <Play className="w-3.5 h-3.5" />
              <span>Active Staging Environment</span>
            </div>
            <h3 className="text-lg font-bold text-white">Live Client Review Preview</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Every sprint deliverable is continuously deployed to an isolated staging URL for your staff to test.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <span>https://staging-campusflow.internal.example.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              • Environment: Isolated PostgreSQL + Seed Records (1,200 mock students)
            </div>
          </div>

          {/* Git Activity Log */}
          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-semibold">
              <GitCommit className="w-3.5 h-3.5" />
              <span>Real-Time Git Commit Log</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              {sampleCommits.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-orange-400 font-bold">{c.hash}</span>
                    <p className="text-slate-300 text-[11px] mt-0.5">{c.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Invoices */}
      {activeTab === "invoices" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase">
                  <th className="py-3 px-4">Milestone</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {sampleMilestones.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 text-white font-semibold font-sans">{m.name}</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{m.paymentAmount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          m.paymentStatus === "paid"
                            ? "success"
                            : m.paymentStatus === "pending_review"
                            ? "warning"
                            : "outline"
                        }
                      >
                        {m.paymentStatus === "paid"
                          ? "Paid & Cleared"
                          : m.paymentStatus === "pending_review"
                          ? "Due Upon Acceptance"
                          : "Scheduled"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {m.paymentStatus === "paid" ? (
                        <button
                          onClick={() => handleDownloadReceipt(m.name)}
                          className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF Receipt</span>
                        </button>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

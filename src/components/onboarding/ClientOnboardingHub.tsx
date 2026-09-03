"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Compass,
  CheckCircle2,
  Calendar,
  Layers,
  Database,
  Globe,
  Lock,
  ArrowRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

interface OnboardingStage {
  id: number;
  stageNumber: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  clientActionItem: string;
}

export function ClientOnboardingHub() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const stages: OnboardingStage[] = [
    {
      id: 0,
      stageNumber: "STAGE 01",
      title: "Workspace Provisioning & Kickoff Alignment",
      duration: "Days 1 - 3",
      summary: "We establish direct engineering communication channels and initialize secure version control.",
      deliverables: [
        "Private Slack/Discord coordination channel with lead engineers",
        "Encrypted GitHub repository & initial project backlog setup",
        "Technical requirements and legacy data schema review",
      ],
      clientActionItem: "Invite key departmental stakeholders (Head of IT / Academic Director) to the shared channel.",
    },
    {
      id: 1,
      stageNumber: "STAGE 02",
      title: "Data Modeling & Entity Relational Architecture",
      duration: "Week 1",
      summary: "Drafting the normalized PostgreSQL schema, Prisma relations, and RBAC permission hierarchy.",
      deliverables: [
        "Entity Relationship Diagram (ERD) mapping all student, parent, and transaction records",
        "Role-Based Access Control matrix (SuperAdmin, Staff, Student, Read-Only)",
        "API specification and validation schemas (Zod)",
      ],
      clientActionItem: "Review sample student CSV/Excel formats to ensure all legacy fields are mapped.",
    },
    {
      id: 2,
      stageNumber: "STAGE 03",
      title: "Interactive UI/UX Wireframes & Component Tokens",
      duration: "Week 2",
      summary: "Designing high-fidelity, responsive screens tailored to your brand with zero generic bloat.",
      deliverables: [
        "Clickable desktop & mobile interactive wireframes",
        "Tailwind CSS design token system (custom color palettes & typography)",
        "Mobile roll call & batch gradebook interface prototypes",
      ],
      clientActionItem: "Provide school/company logo vector files and approve primary color scheme.",
    },
    {
      id: 3,
      stageNumber: "STAGE 04",
      title: "Modular Development & Continuous Staging Demos",
      duration: "Weeks 3 - 6",
      summary: "Bi-weekly agile sprint milestones deployed to a password-protected staging URL for client review.",
      deliverables: [
        "Live staging preview URL (e.g. staging.yourdomain.com) updated with every commit",
        "Bi-weekly sprint demonstration walkthrough video calls",
        "Zod validation, rate limiting, and core business logic integration",
      ],
      clientActionItem: "Test key workflows on staging (e.g. submit test roll call or create student profile).",
    },
    {
      id: 4,
      stageNumber: "STAGE 05",
      title: "Data Migration, Staff Workshop & DNS Go-Live",
      duration: "Final Week",
      summary: "Seamless cutover from old spreadsheets to production with staff training and daily automated backups.",
      deliverables: [
        "Automated migration script importing historical records cleanly into PostgreSQL",
        "Cloudflare SSL configuration, custom domain DNS cutover, and WAF setup",
        "1-Hour recorded staff onboarding workshop & video quickstart guides",
        "30-Day post-launch warranty period activated",
      ],
      clientActionItem: "Update domain DNS A-records to point to the production server IP.",
    },
  ];

  const current = stages[activeStage];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-400 tracking-wider font-semibold mb-1">
            <Compass className="w-4 h-4" />
            <span>Sprint 01 Execution Runbook</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Client Onboarding & Project Kickoff Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans mt-0.5">
            The exact 5-stage blueprint we follow from signed contract to production DNS cutover.
          </p>
        </div>

        <Link
          href="/start-a-project"
          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <span>Kick Off Sprint 01</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stage Progress Timeline Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
        {stages.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => setActiveStage(idx)}
            className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
              activeStage === idx
                ? "border-orange-500 bg-orange-950/60 ring-1 ring-orange-500 shadow-md"
                : "border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold ${activeStage === idx ? "text-orange-400" : "text-slate-500"}`}>
                {st.stageNumber}
              </span>
              <span className="text-[10px] text-slate-400">{st.duration}</span>
            </div>
            <div className="font-bold text-xs text-white truncate font-sans">{st.title}</div>
          </button>
        ))}
      </div>

      {/* Detailed Stage Deep-Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Deliverables & Details (8 Cols) */}
        <div className="lg:col-span-8 p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-850">
            <div className="flex items-center justify-between font-mono text-xs">
              <Badge variant="brand">{current.stageNumber}</Badge>
              <span className="text-slate-400 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>Estimated Timeline: {current.duration}</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans">{current.title}</h2>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">{current.summary}</p>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-orange-400 font-bold tracking-wide">
              Engineering Deliverables in this Stage
            </h3>
            <div className="space-y-2.5">
              {current.deliverables.map((item, idx) => {
                const taskId = `${current.id}-${idx}`;
                const isDone = !!completedTasks[taskId];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(taskId)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isDone
                        ? "border-emerald-500/60 bg-emerald-950/20 text-emerald-200"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                        isDone ? "text-emerald-400" : "text-slate-600"
                      }`}
                    />
                    <span className="text-xs font-sans leading-relaxed">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client Responsibility */}
          <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/20 space-y-1 font-sans text-xs">
            <div className="font-bold text-amber-300 font-mono uppercase">Client Action Item:</div>
            <p className="text-amber-200/80 leading-relaxed">{current.clientActionItem}</p>
          </div>
        </div>

        {/* Right: Summary & Guarantees (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-md space-y-5 shadow-2xl">
            <div className="text-xs font-mono uppercase text-orange-400 font-bold border-b border-slate-850 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Aether Delivery Guarantees</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-sans">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Surprise Invoices:</strong> Fixed milestone payment releases tied to verified staging demos.</span>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Full Source Code Escrow:</strong> 100% repository and database schema access from Day 1.</span>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>30-Day Post-Launch Warranty:</strong> Free critical bug fixing after DNS cutover.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850">
              <Link
                href="/start-a-project"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Start Intake Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

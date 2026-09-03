"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Terminal,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Globe,
  Grid,
} from "lucide-react";
import Link from "next/link";

interface SlideData {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  layout: "title" | "split" | "cards" | "code" | "stats" | "cta";
  content: React.ReactNode;
}

export function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const totalSlides = 8;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          setIsFullscreen(true);
        } else {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        }
      } else if (e.key === "g" || e.key === "G" || e.key === "Escape") {
        setShowGrid((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slides: SlideData[] = [
    // Slide 1: Title
    {
      id: 0,
      tag: "AETHER TECHNOLOGIES • ENTERPRISE SLIDES",
      title: "Building Practical Technology for the Next Generation",
      subtitle: "Custom-engineered software systems for Schools, Colleges, Startups, and SMEs.",
      layout: "title",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-950/80 border border-orange-800/60 text-orange-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>2025 Architectural Pitch & Capabilities Deck</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Reliable Software Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">
              Zero Operational Friction.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl font-sans leading-relaxed">
            We engineer high-performance web platforms, academic portals, and AI systems with 100% source code ownership and radical milestone transparency.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-4">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">→</kbd> to Advance</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">F</kbd> for Fullscreen</span>
          </div>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      id: 1,
      tag: "THE STATUS QUO CHALLENGE",
      title: "Why Legacy Software & Fragile Spreadsheets Fail",
      subtitle: "Institutions and growing companies are trapped between two broken extremes.",
      layout: "cards",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-4">
          <div className="p-6 rounded-2xl border border-red-900/40 bg-slate-950/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400 font-bold font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Bloated $15k/yr SaaS ERPs</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Rigid menus, unused enterprise features, and punitive per-student or per-seat recurring subscription taxes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-amber-900/40 bg-slate-950/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Disconnected Excel Sheets</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Critical student marks, attendance roll calls, and purchase logs stored in shared files with zero concurrency protection.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 font-bold font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Legacy Vulnerable Plugins</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Outdated WordPress/PHP installs suffering from unencrypted databases and frequent morning login crashes.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: Our Solution
    {
      id: 2,
      tag: "THE AETHER APPROACH",
      title: "Clean, Tailored, 100% Owned Software",
      subtitle: "Custom architecture designed specifically for your organizational workflows.",
      layout: "split",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center py-4">
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-orange-800/40 bg-orange-950/20 space-y-1">
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>One-Time Engineering • Zero Seat Tax</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pay for the sprints we engineer. You own 100% of the source code and database dumps with zero recurring license fees.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sub-Second Next.js Performance</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Server-side rendered (SSR) React interfaces with instant mobile loading for morning roll calls.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ACID-Compliant PostgreSQL</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict relational integrity and automated daily backups preventing data corruption.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-orange-500/30 bg-slate-950 space-y-4 font-mono text-xs shadow-2xl">
            <div className="text-xs text-orange-400 uppercase font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Core Architecture Standard</span>
            </div>
            <pre className="text-slate-300 leading-relaxed">
              <code>{`// Aether Production Contract
export const EngagementTerms = {
  ipOwnership: "100% Client Retained",
  database: "PostgreSQL (ACID Normalized)",
  frontend: "Next.js 14 + Tailwind CSS",
  validation: "Zod Strict Runtime Checks",
  sla: "99.9% Uptime Guarantee",
};`}</code>
            </pre>
          </div>
        </div>
      ),
    },

    // Slide 4: Target Sectors
    {
      id: 3,
      tag: "SECTOR ARCHITECTURES",
      title: "Engineered Across 4 Key Audiences",
      subtitle: "Tailored technical solutions for institutional and commercial scale.",
      layout: "cards",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto py-4 font-mono text-xs">
          <div className="p-5 rounded-xl border border-orange-800/40 bg-slate-950 space-y-2">
            <div className="text-2xl">🏫</div>
            <h3 className="font-bold text-white text-sm">Schools & Academics</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Batch roll call attendance, dynamic PDF report cards, and parent SMS alerts.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-orange-800/40 bg-slate-950 space-y-2">
            <div className="text-2xl">🎓</div>
            <h3 className="font-bold text-white text-sm">Colleges & Depts</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Course registration, multi-department faculty portals, and lab allocation engines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-emerald-800/40 bg-slate-950 space-y-2">
            <div className="text-2xl">🚀</div>
            <h3 className="font-bold text-white text-sm">Startup MVPs</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Multi-tenant B2B SaaS boilerplates with Stripe payments built in 4-6 weeks.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-amber-800/40 bg-slate-950 space-y-2">
            <div className="text-2xl">📦</div>
            <h3 className="font-bold text-white text-sm">SME Operations</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Internal dispatch logging, inventory trackers, and offline-capable mobile PWAs.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: System Topology
    {
      id: 4,
      tag: "ENTERPRISE TOPOLOGY",
      title: "4-Tier Production Cloud Architecture",
      subtitle: "Sub-second response times with zero vendor lock-in.",
      layout: "cards",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-5xl mx-auto py-4 font-mono text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-xs text-orange-400 uppercase font-semibold">Tier 01: Client</div>
            <div className="text-white font-bold">Next.js 14 SSR + PWA</div>
            <p className="text-[11px] text-slate-400">Sub-50ms TTFB across mobile & desktop with offline sync.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-xs text-orange-400 uppercase font-semibold">Tier 02: API</div>
            <div className="text-white font-bold">Node.js + Zod Validation</div>
            <p className="text-[11px] text-slate-400">Type-safe endpoints and sliding window IP rate limiters.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-xs text-emerald-400 uppercase font-semibold">Tier 03: Data</div>
            <div className="text-white font-bold">PostgreSQL + pgvector</div>
            <p className="text-[11px] text-slate-400">ACID transactions, foreign key cascades, and document vectors.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-xs text-amber-400 uppercase font-semibold">Tier 04: Edge</div>
            <div className="text-white font-bold">Cloudflare WAF + S3</div>
            <p className="text-[11px] text-slate-400">Global DDoS mitigation, SSL termination, and encrypted storage.</p>
          </div>
        </div>
      ),
    },

    // Slide 6: Case Study Proof
    {
      id: 5,
      tag: "PRODUCTION VERIFICATION",
      title: "Real-World Systems in Action",
      subtitle: "Verified outcomes without fabricated claims or inflated numbers.",
      layout: "split",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-4 font-mono text-xs">
          <div className="p-6 rounded-2xl border border-orange-800/40 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-orange-400 font-bold uppercase">CampusFlow Portal</span>
              <Badge variant="success">Completed</Badge>
            </div>
            <h3 className="text-base font-bold text-white font-sans">St. Jude Senior Secondary School</h3>
            <div className="space-y-1 text-slate-300 font-sans">
              <div>• 1,200 Student records digitized</div>
              <div>• 1-Click roll call replacing 40-minute paper rosters</div>
              <div>• Automated PDF grade report card calculations</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-orange-800/40 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-orange-400 font-bold uppercase">DocuPulse RAG System</span>
              <Badge variant="brand">Active Engine</Badge>
            </div>
            <h3 className="text-base font-bold text-white font-sans">Intelligent Document Pipeline</h3>
            <div className="space-y-1 text-slate-300 font-sans">
              <div>• Hybrid vector similarity search over compliance PDFs</div>
              <div>• Exact page-level bounding box citation highlights</div>
              <div>• Anti-hallucination refusal guardrails</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 7: Economics
    {
      id: 6,
      tag: "TRANSPARENT ECONOMICS",
      title: "Fixed-Scope Sprints & Zero Vendor Lock-in",
      subtitle: "Milestone-based releases with clear deliverables at every phase.",
      layout: "cards",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto py-4 font-mono text-xs">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-emerald-400 text-xl font-bold">100%</div>
            <h3 className="text-white font-bold text-sm">Source Code Ownership</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Complete GitHub repo, Prisma schemas, and Docker runbooks handed over upon completion.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-orange-400 text-xl font-bold">4 - 8 Wks</div>
            <h3 className="text-white font-bold text-sm">Rapid Delivery Velocity</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Structured 2-week agile sprint milestones with continuous staging deployment reviews.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
            <div className="text-orange-400 text-xl font-bold">99.9%</div>
            <h3 className="text-white font-bold text-sm">Production SLA</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Documented uptime commitment with sub-4 hour critical incident response runbooks.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 8: Next Steps / CTA
    {
      id: 7,
      tag: "ENGAGEMENT SPRINT 01",
      title: "Let's Architect Your Platform Together",
      subtitle: "Schedule a technical scoping call to map out Sprint 01.",
      layout: "cta",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto py-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to kick off your custom software sprint?
          </h2>

          <p className="text-slate-400 text-sm max-w-xl font-sans leading-relaxed">
            Use our interactive scoping tools or connect directly with our engineering leads to review your architecture requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start-a-project"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm font-mono shadow-lg transition-all flex items-center gap-2"
            >
              <span>Start Project Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/estimator"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-mono text-sm transition-all"
            >
              Calculate Sprint Cost
            </Link>
          </div>

          <div className="text-xs font-mono text-slate-500 pt-4">
            Aether Technologies • contact@aethertech.example.com
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  return (
    <div className="relative w-full h-[85vh] sm:h-[88vh] min-h-[550px] rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col justify-between shadow-2xl cyber-grid select-none">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Slide Top Bar */}
      <div className="relative z-10 p-6 flex items-center justify-between border-b border-slate-900/80 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-mono text-xs font-bold">
            &gt;_
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-orange-400 tracking-widest font-semibold">
              {current.tag}
            </div>
            <div className="text-xs font-bold text-white font-sans hidden sm:block">
              {current.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Grid Overview (G)"
          >
            <Grid className="w-4 h-4" />
          </button>

          <span className="text-slate-400 text-xs">
            <strong className="text-white font-bold">{currentSlide + 1}</strong> / {totalSlides}
          </span>
        </div>
      </div>

      {/* Slide Center Content Viewport (Viewport-safe, no scrollbars) */}
      <div className="relative z-10 flex-grow flex items-center justify-center p-6 sm:p-12 overflow-hidden animate-in fade-in zoom-in-95 duration-200 key={currentSlide}">
        <div className="w-full max-w-6xl mx-auto">
          {current.content}
        </div>
      </div>

      {/* Slide Bottom Bar & Controls */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between border-t border-slate-900/80 bg-slate-950/80 backdrop-blur-md">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 flex-grow max-w-xs">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all flex-grow ${
                idx === currentSlide
                  ? "bg-orange-500 w-8"
                  : idx < currentSlide
                  ? "bg-slate-700"
                  : "bg-slate-850 hover:bg-slate-700"
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-2.5 rounded-xl border font-mono text-xs flex items-center gap-1 transition-all ${
              currentSlide === 0
                ? "border-slate-900 text-slate-700 cursor-not-allowed"
                : "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`p-2.5 rounded-xl border font-mono text-xs flex items-center gap-1 transition-all ${
              currentSlide === totalSlides - 1
                ? "border-slate-900 text-slate-700 cursor-not-allowed"
                : "border-orange-600 bg-orange-600 text-white hover:bg-orange-500 shadow-md font-semibold"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Overview Modal */}
      {showGrid && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-8 overflow-y-auto animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <h3 className="text-lg font-bold text-white font-mono">Slide Deck Index</h3>
            <button
              onClick={() => setShowGrid(false)}
              className="text-slate-400 hover:text-white font-mono text-xs"
            >
              [Close ✕]
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSlide(idx);
                  setShowGrid(false);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  currentSlide === idx
                    ? "border-orange-500 bg-orange-950/50 shadow-md ring-1 ring-orange-500"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-orange-400 font-bold">0{idx + 1}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{s.layout}</span>
                </div>
                <div className="text-xs font-bold text-white truncate font-sans">{s.title}</div>
                <p className="text-[10px] text-slate-400 truncate">{s.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

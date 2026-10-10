import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Technology3D } from "@/components/3d/Technology3D";
import {
  ArrowRight,
  Terminal,
  Shield,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Server,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none">
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[420px] h-[420px] bg-orange-500/[0.04] rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Small startup today. Building reliable technology for tomorrow.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-white leading-[1.08] text-balance">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                Practical Technology
              </span>{" "}
              for the Next Generation.
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal text-balance">
              We design and engineer reliable digital solutions, modern web applications, and custom workflow tools for schools, colleges, startups, and growing businesses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                href="/start-a-project"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto shadow-sm hover:shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href="/case-studies"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <span>Explore Our Work</span>
              </Button>
            </div>

            {/* Credibility Markers */}
            <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-600" />
                <span>Zero Technical Debt</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-600" />
                <span>Direct Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Modern TypeScript & Next.js</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Technology Visual Panel */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-5 sm:p-6 shadow-xl shadow-stone-900/5 dark:shadow-black/50 backdrop-blur-xl card-hover-lift">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-stone-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-orange-600" />
                  <span>system_3d_topology.ts</span>
                </div>
                <Badge variant="brand" size="sm">
                  Interactive 3D
                </Badge>
              </div>

              {/* 3D Canvas Canvas */}
              <div className="relative rounded-2xl bg-gradient-to-b from-stone-50/70 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20 border border-stone-100 dark:border-slate-800 overflow-hidden">
                <Technology3D
                  scale={1.05}
                  rotationSpeed={0.0025}
                  particleCount={24}
                  className="h-[380px] sm:h-[420px]"
                />

                {/* Floating telemetry metrics badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-200 shadow-2xs backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>PostgreSQL pgvector: Active</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-200 shadow-2xs backdrop-blur-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>P99 SSR Latency: &lt; 45ms</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold shadow-2xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>0 Data Loss Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Status footer inside visual */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>// Aether System Topology</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Production Ready Architecture</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

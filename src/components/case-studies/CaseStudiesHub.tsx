"use client";

import React, { useState, useMemo } from "react";
import { CaseStudyItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Search,
  Code2,
} from "lucide-react";
import Link from "next/link";

interface CaseStudiesHubProps {
  initialStudies: CaseStudyItem[];
}

export function CaseStudiesHub({ initialStudies }: CaseStudiesHubProps) {
  const [searchQuery, setSearchQuery] = useState<string>("" );

  const filteredStudies = useMemo(() => {
    if (!searchQuery.trim()) return initialStudies;
    const q = searchQuery.toLowerCase();
    return initialStudies.filter((study) => {
      return (
        study.title.toLowerCase().includes(q) ||
        study.summary.toLowerCase().includes(q) ||
        study.industry.toLowerCase().includes(q) ||
        study.myRole?.toLowerCase().includes(q) ||
        study.technologies.some((t) => t.toLowerCase().includes(q)) ||
        study.technicalContributions?.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [initialStudies, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-grow max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tech, architecture problem, role, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 font-mono transition-colors focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-900 dark:text-white">{filteredStudies.length}</strong> of{" "}
          {initialStudies.length} Case Studies
        </div>
      </div>

      {/* Case Study Cards Grid */}
      {filteredStudies.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-12 text-center space-y-3 shadow-xs">
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">
            No case studies match your search query.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 hover:border-orange-300 dark:hover:border-slate-700 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-4">
                {/* Header Metadata Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-orange-700 dark:text-orange-400 font-bold">
                      {study.industry}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-900/50 font-semibold">
                      {study.projectType}
                    </span>
                  </div>
                  <Badge variant={study.isDemonstration ? "demo" : "success"}>
                    {study.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      {study.title}
                    </Link>
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Role: <strong className="text-slate-800 dark:text-slate-200">{study.myRole}</strong> • {study.timeline}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* Technical Contributions Highlight */}
                {study.technicalContributions && study.technicalContributions.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold uppercase flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span>Key Technical Contributions:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
                      {study.technicalContributions.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-orange-500 shrink-0">•</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenge & Verified Outcome */}
                <div className="space-y-3 pt-1">
                  <div className="bg-red-50/50 dark:bg-red-950/20 p-3.5 rounded-xl border border-red-200/80 dark:border-red-900/50">
                    <div className="text-[11px] font-mono text-red-700 dark:text-red-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      <span>The Engineering Challenge</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-200/80 dark:border-emerald-900/50">
                    <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Verified Outcome</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {study.verifiedOutcomes[0]}
                    </p>
                  </div>
                </div>

                {/* Stack Pills */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase mb-1.5 font-medium">
                    Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 group"
                >
                  <span>Full Architecture & Implementation Decisions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

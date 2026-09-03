"use client";

import React, { useState, useMemo } from "react";
import { CaseStudyItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";

interface CaseStudiesHubProps {
  initialStudies: CaseStudyItem[];
}

export function CaseStudiesHub({ initialStudies }: CaseStudiesHubProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const industries = useMemo(() => {
    const set = new Set<string>();
    initialStudies.forEach((s) => set.add(s.industry));
    return ["All", ...Array.from(set)];
  }, [initialStudies]);

  const filteredStudies = useMemo(() => {
    return initialStudies.filter((study) => {
      const matchIndustry =
        selectedIndustry === "All" || study.industry === selectedIndustry;
      const matchStatus =
        selectedStatus === "All" || study.status === selectedStatus;
      const matchSearch =
        searchQuery === "" ||
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchIndustry && matchStatus && matchSearch;
    });
  }, [initialStudies, selectedIndustry, selectedStatus, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filtering Bar */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project, technology, or problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono transition-colors"
            />
          </div>

          <div className="text-xs font-mono text-slate-500">
            Showing <strong className="text-slate-900">{filteredStudies.length}</strong> of{" "}
            {initialStudies.length} Case Studies
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <span>Industry:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                  selectedIndustry === ind
                    ? "bg-orange-600 text-white font-semibold shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Cards Grid */}
      {filteredStudies.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center space-y-3 shadow-xs">
          <p className="text-slate-500 font-mono text-sm">
            No case studies match your current filter parameters.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedIndustry("All");
              setSelectedStatus("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 hover:border-orange-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-orange-700 font-bold">
                    {study.industry}
                  </span>
                  <Badge variant={study.isDemonstration ? "demo" : "success"}>
                    {study.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="hover:text-orange-600 transition-colors"
                    >
                      {study.title}
                    </Link>
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    Client Context: {study.clientType} • {study.timeline}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-200">
                    <div className="text-[11px] font-mono text-red-700 font-bold uppercase mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200">
                    <div className="text-[11px] font-mono text-emerald-800 font-bold uppercase mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Outcome</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {study.verifiedOutcomes[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-500 uppercase mb-1.5 font-medium">
                    Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-orange-600 hover:text-orange-700 group"
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

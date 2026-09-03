"use client";

import React, { useState, useMemo } from "react";
import { ProjectItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import {
  Github,
  Search,
  FlaskConical,
  FolderGit2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ProjectsHubProps {
  initialProjects: ProjectItem[];
}

export function ProjectsHub({ initialProjects }: ProjectsHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchCategory && matchSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  const getStatusVariant = (status: string) => {
    if (status.includes("Active") || status.includes("Beta") || status.includes("Pilot") || status.includes("Production")) {
      return "brand";
    }
    if (status.includes("Live") || status.includes("Completed")) {
      return "success";
    }
    return "outline";
  };

  // If no projects yet, render a sleek Coming Soon / Empty state
  if (initialProjects.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50/60 p-10 sm:p-16 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-orange-600 mx-auto shadow-2xs">
          <FolderGit2 className="w-7 h-7" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            New Projects Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-mono leading-relaxed">
            We are currently documenting and packaging our latest developer tools, lab prototypes, and open-source utilities. Check back soon for new releases.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-mono font-semibold transition-colors shadow-xs"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
          >
            <span>Read Engineering Blog</span>
          </Link>
        </div>
      </div>
    );
  }

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
              placeholder="Search experiments, tools, and prototypes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono transition-colors"
            />
          </div>

          <div className="text-xs font-mono text-slate-500">
            Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of{" "}
            {initialProjects.length} Projects & Labs
          </div>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
            <span className="font-mono text-slate-500 font-medium">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-mono transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white font-semibold shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl border border-slate-200/90 bg-white p-6 hover:border-orange-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-5 shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {project.category}
                </span>
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlight Note */}
              {project.highlight && (
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs font-mono text-orange-800">
                  <span className="text-orange-600 font-bold">// Highlight: </span>
                  {project.highlight}
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links and Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold transition-colors"
                  >
                    <span>Launch Demo →</span>
                  </a>
                )}
              </div>

              {project.notes && (
                <span className="text-[11px] text-slate-500 font-mono italic truncate max-w-[200px]">
                  {project.notes}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ProjectItem } from "@/types";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Loader2,
  AlertTriangle,
  FolderGit2,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch {
      setNotification({ message: "Failed to load projects.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, categoryFilter, statusFilter, search]);

  // Counts
  const counts = useMemo(() => {
    return {
      total: projects.length,
      production: projects.filter((p) => p.status === "Production").length,
      inDevelopment: projects.filter((p) => p.status === "In Development").length,
      completed: projects.filter((p) => p.status === "Completed").length,
      prototype: projects.filter((p) => p.status === "Prototype" || p.status === "Concept").length,
    };
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [projects]);

  // Duplicate
  const handleDuplicate = async (project: ProjectItem) => {
    setActionLoadingId(project.id);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}/duplicate`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.project) {
        setNotification({
          message: `Duplicated "${project.title}" successfully.`,
          type: "success",
        });
        setProjects((prev) => [data.project, ...prev]);
      } else {
        setNotification({ message: data.error || "Failed to duplicate.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error duplicating project.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteConfirmProject) return;
    const projId = deleteConfirmProject.id;
    setActionLoadingId(projId);
    try {
      const res = await fetch(`/api/admin/projects/${projId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({
          message: `"${deleteConfirmProject.title}" deleted from database.`,
          type: "success",
        });
        setDeleteConfirmProject(null);
        setProjects((prev) => prev.filter((p) => p.id !== projId));
      } else {
        setNotification({ message: data.error || "Failed to delete.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error deleting project.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "Production":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-50 border border-emerald-200 text-emerald-700">Production</span>;
      case "In Development":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-blue-50 border border-blue-200 text-blue-700">In Dev</span>;
      case "Completed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-purple-50 border border-purple-200 text-purple-700">Completed</span>;
      case "Prototype":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-50 border border-amber-200 text-amber-700">Prototype</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 border border-stone-200 text-stone-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Projects & Labs Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-mono mt-1">
            Create, showcase, update, and manage open-source tools, prototypes, and laboratory experiments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-sm shadow-orange-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 hover:text-orange-600 transition-colors shadow-2xs"
          >
            <span>View Public /projects</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-2xs ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-stone-400 hover:text-stone-700 ml-3 text-sm">✕</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="text-xs font-mono text-stone-500 font-medium">Total Projects</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
            {counts.total}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="text-xs font-mono text-emerald-600 font-medium">Production / Live</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
            {counts.production}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="text-xs font-mono text-blue-600 font-medium">In Development</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">
            {counts.inDevelopment}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="text-xs font-mono text-amber-600 font-medium">Prototypes & Concepts</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">
            {counts.prototype}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="Production">Production</option>
            <option value="In Development">In Development</option>
            <option value="Completed">Completed</option>
            <option value="Prototype">Prototype</option>
            <option value="Concept">Concept</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, technologies..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-16 text-center text-stone-500 font-mono text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
            <span>Loading projects repository...</span>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-50/80 border-b border-stone-100 text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 font-semibold">Title & Description</th>
                  <th className="p-3.5 font-semibold">Category</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Technologies</th>
                  <th className="p-3.5 font-semibold">Links</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredProjects.map((project) => {
                  const isBusy = actionLoadingId === project.id;

                  return (
                    <tr key={project.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3.5 max-w-xs">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="font-bold text-stone-950 hover:text-orange-600 transition-colors truncate block"
                        >
                          {project.title}
                        </Link>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          {project.description}
                        </p>
                      </td>
                      <td className="p-3.5 text-stone-600 whitespace-nowrap">{project.category}</td>
                      <td className="p-3.5 whitespace-nowrap">{getStatusBadge(project.status)}</td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.technologies.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 rounded bg-stone-100 border border-stone-200 text-[10px] text-stone-600"
                            >
                              {t}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-[10px] text-stone-400 font-mono">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-stone-500 hover:text-stone-900"
                              title="GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-orange-600 hover:text-orange-700"
                              title="Live Demo"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit */}
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => handleDuplicate(project)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                            title="Duplicate Project"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmProject(project)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-14 text-center space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mx-auto">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <p className="text-stone-600 font-mono text-xs">
              No projects found in this repository.
            </p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Your First Project</span>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-red-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Project</h3>
                <p className="text-[11px] text-stone-500 font-mono">Permanent destruction</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Are you sure you want to permanently delete{" "}
              <strong className="text-stone-900">&ldquo;{deleteConfirmProject.title}&rdquo;</strong>?
              This project will be removed from the database and public site.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={actionLoadingId === deleteConfirmProject.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {actionLoadingId === deleteConfirmProject.id ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

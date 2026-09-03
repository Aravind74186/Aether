"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectItem } from "@/types";
import {
  Save,
  Trash2,
  Copy,
  ArrowLeft,
  ExternalLink,
  FolderGit2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Tag,
  Sparkles,
  Github,
  Globe,
  StickyNote,
} from "lucide-react";
import Link from "next/link";

interface ProjectEditorProps {
  initialProject?: ProjectItem;
  isEditing?: boolean;
}

const CATEGORIES: ProjectItem["category"][] = [
  "Web Applications",
  "AI Projects",
  "Education Projects",
  "Automation",
  "Developer Tools",
  "Experimental Projects",
];

const STATUSES: ProjectItem["status"][] = [
  "Concept",
  "Prototype",
  "In Development",
  "Completed",
  "Production",
];

export function ProjectEditor({ initialProject, isEditing = false }: ProjectEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialProject?.title || "");
  const [category, setCategory] = useState<ProjectItem["category"]>(
    initialProject?.category || "Developer Tools"
  );
  const [status, setStatus] = useState<ProjectItem["status"]>(
    initialProject?.status || "In Development"
  );
  const [description, setDescription] = useState(initialProject?.description || "");
  const [highlight, setHighlight] = useState(initialProject?.highlight || "");
  const [techInput, setTechInput] = useState(
    initialProject?.technologies ? initialProject.technologies.join(", ") : ""
  );
  const [githubUrl, setGithubUrl] = useState(initialProject?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(initialProject?.demoUrl || "");
  const [notes, setNotes] = useState(initialProject?.notes || "");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      setNotification({ message: "Please enter a project title.", type: "error" });
      return;
    }
    if (!description.trim()) {
      setNotification({ message: "Please enter a project description.", type: "error" });
      return;
    }

    setSaving(true);
    setNotification(null);

    const techArray = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      category,
      status,
      description,
      highlight,
      technologies: techArray,
      githubUrl: githubUrl || undefined,
      demoUrl: demoUrl || undefined,
      notes: notes || undefined,
    };

    try {
      const url = isEditing && initialProject
        ? `/api/admin/projects/${initialProject.id}`
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.project) {
        setNotification({
          message: isEditing ? "Project updated successfully!" : "Project created successfully!",
          type: "success",
        });
        setTimeout(() => {
          router.push("/admin/projects");
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to save project.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error saving project.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async () => {
    if (!initialProject) return;
    setDuplicating(true);
    try {
      const res = await fetch(`/api/admin/projects/${initialProject.id}/duplicate`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.project) {
        setNotification({
          message: `Duplicated "${initialProject.title}". Redirecting...`,
          type: "success",
        });
        setTimeout(() => {
          router.push(`/admin/projects/${data.project.id}/edit`);
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to duplicate project.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error duplicating project.", type: "error" });
    } finally {
      setDuplicating(false);
    }
  };

  const handleDelete = async () => {
    if (!initialProject) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${initialProject.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ message: "Project deleted permanently. Redirecting...", type: "success" });
        setTimeout(() => {
          router.push("/admin/projects");
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to delete project.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error deleting project.", type: "error" });
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h1>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              {isEditing ? `ID: ${initialProject?.id}` : "Showcase prototype, developer tool or research experiment"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isEditing && initialProject && (
            <button
              type="button"
              onClick={handleDuplicate}
              disabled={duplicating || saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              title="Duplicate project"
            >
              <Copy className="w-3.5 h-3.5 text-stone-500" />
              <span>{duplicating ? "Duplicating..." : "Duplicate"}</span>
            </button>
          )}

          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
            <span>View Public /projects</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-lg shadow-orange-600/20 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? "Update Project" : "Create Project"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-2xs ${
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
          <button onClick={() => setNotification(null)} className="text-stone-400 hover:text-stone-700 ml-3">✕</button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SQL & Schema Migration Verifier"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-200 text-sm font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold">
              Description *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed 2-3 sentence overview of what this project does, problem it solves, and its architecture..."
              className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs leading-relaxed"
            />
          </div>

          {/* Key Highlight / Engineering Takeaway */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Key Highlight / Architectural Callout</span>
            </label>
            <input
              type="text"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="e.g. Catches destructive DDL locks in CI/CD pipelines before production deployment."
              className="w-full px-4 py-2.5 rounded-2xl bg-orange-50/40 border border-orange-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
            />
          </div>

          {/* Technologies */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-500" />
              <span>Technologies (Comma separated)</span>
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="TypeScript, Node.js, PostgreSQL AST Parser, Docker"
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
            />
          </div>

          {/* External Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-700 font-semibold flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-stone-600" />
                <span>GitHub / Source URL (Optional)</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-700 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-orange-600" />
                <span>Demo / Live URL (Optional)</span>
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo.example.com"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Internal Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5 text-stone-500" />
              <span>Footnote / Internal Notes (Optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Internal developer tool used across our client projects."
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-mono text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Sidebar Settings (1 col) */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-stone-900 tracking-wider flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Project Classification</span>
            </h3>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Discipline / Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectItem["category"])}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Development Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectItem["status"])}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Danger Zone: Delete Project */}
          {isEditing && initialProject && (
            <div className="rounded-3xl border border-red-200 bg-red-50/50 p-5 space-y-3 shadow-xs">
              <h3 className="text-xs font-mono font-bold uppercase text-red-700 tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Danger Zone</span>
              </h3>
              <p className="text-[11px] text-stone-600 leading-relaxed font-mono">
                Permanently remove this project showcase from the database and public site.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && initialProject && (
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
              <strong className="text-stone-900">&ldquo;{initialProject.title}&rdquo;</strong>?
              This will remove the project from the public showcase.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {deleting ? (
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

"use client";

import React, { useState, useEffect } from "react";
import type { BlogCategoryRecord } from "@/lib/blog-db";
import { FolderTree, Plus, Trash2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch {
      setNotification({ message: "Failed to load categories.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();

      if (res.ok && data.category) {
        setNotification({ message: "Category created successfully.", type: "success" });
        setName("");
        setDescription("");
        fetchCategories();
      } else {
        setNotification({ message: data.error || "Failed to create category.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({ message: "Category deleted.", type: "success" });
        fetchCategories();
      } else {
        setNotification({ message: data.error || "Failed to delete category.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error deleting category.", type: "error" });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-slate-850">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Category Taxonomy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Manage core engineering disciplines and topic groupings
        </p>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between ${
            notification.type === "success"
              ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
              : "bg-red-950/40 border-red-800/60 text-red-300"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 h-fit">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange-400" />
            <span>Add New Category</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Systems"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of this technical category..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Save Category"}
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-orange-400" />
            <span>Configured Categories ({categories.length})</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
              <span>Loading categories...</span>
            </div>
          ) : (
            <div className="divide-y divide-slate-850">
              {categories.map((c) => (
                <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{c.name}</span>
                      <code className="text-[11px] font-mono text-slate-500">/blog/category/{c.slug}</code>
                    </div>
                    {c.description && (
                      <p className="text-xs text-slate-400 max-w-lg leading-relaxed">{c.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 rounded-lg bg-slate-950 hover:bg-red-950/60 text-slate-500 hover:text-red-400 border border-slate-850 hover:border-red-900/40 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

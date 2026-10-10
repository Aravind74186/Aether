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
      <div className="pb-6 border-b border-stone-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
          Category Taxonomy
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-mono mt-1">
          Manage core engineering disciplines and topic groupings
        </p>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-2xs ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-stone-400 hover:text-stone-700 ml-3 text-sm">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 h-fit shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Add New Category</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-700 font-bold">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Systems"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-700 font-bold">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of this technical category..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 shadow-sm shadow-orange-600/20 cursor-pointer"
            >
              {submitting ? "Creating..." : "Save Category"}
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-orange-600" />
            <span>Configured Categories ({categories.length})</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center text-stone-500 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span>Loading categories...</span>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {categories.map((c) => (
                <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{c.name}</span>
                      <code className="text-[11px] font-mono text-orange-700 bg-orange-50 border border-orange-200/70 px-2 py-0.5 rounded-md">
                        /blog/category/{c.slug}
                      </code>
                    </div>
                    {c.description && (
                      <p className="text-xs text-stone-600 max-w-lg leading-relaxed">{c.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 rounded-xl bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-red-600 border border-stone-200 hover:border-red-200 transition-colors shadow-2xs cursor-pointer"
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

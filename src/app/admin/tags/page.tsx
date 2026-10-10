"use client";

import React, { useState, useEffect } from "react";
import type { BlogTagRecord } from "@/lib/blog-db";
import { Tags, Plus, Loader2 } from "lucide-react";

export default function AdminTagsPage() {
  const [tags, setTags] = useState<BlogTagRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/tags");
      const data = await res.json();
      if (data.tags) {
        setTags(data.tags);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setName("");
        fetchTags();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-stone-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
          Topic Tags
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-mono mt-1">
          Taxonomy tags applied across technical publications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 h-fit shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Add New Tag</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-700 font-bold">Tag Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kubernetes"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 shadow-sm shadow-orange-600/20 cursor-pointer"
            >
              {submitting ? "Adding..." : "Add Tag"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
            <Tags className="w-4 h-4 text-orange-600" />
            <span>Active Tags ({tags.length})</span>
          </h2>

          {loading ? (
            <div className="p-8 text-center text-stone-500 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span>Loading tags...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="px-3 py-1.5 rounded-xl bg-orange-50/70 hover:bg-orange-100/70 border border-orange-200 text-xs font-mono text-stone-800 font-semibold shadow-2xs transition-colors"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

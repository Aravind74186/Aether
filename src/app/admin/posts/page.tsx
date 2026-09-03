"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { BlogPostRecord } from "@/lib/blog-db";
import {
  Search,
  PlusCircle,
  Edit,
  Eye,
  Trash2,
  AlertTriangle,
  Loader2,
  Copy,
  ExternalLink,
  CheckSquare,
  Square,
  ArrowUpDown,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "title-asc" | "title-desc">("date-desc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<BlogPostRecord | null>(null);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchPostsAndCategories = async () => {
    try {
      setLoading(true);
      const [postsRes, catRes] = await Promise.all([
        fetch("/api/admin/posts"),
        fetch("/api/admin/categories"),
      ]);

      if (postsRes.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const postsData = await postsRes.json();
      const catData = await catRes.json();

      if (postsData.posts) {
        setPosts(postsData.posts);
      }
      if (catData.categories) {
        setCategories(catData.categories);
      }
    } catch {
      setNotification({ message: "Failed to load posts or categories.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsAndCategories();
  }, []);

  // Filter & Sort calculation
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesStatus = statusFilter === "ALL" || post.status === statusFilter;
        const matchesCategory =
          categoryFilter === "ALL" ||
          post.categoryId === categoryFilter ||
          post.categorySlug === categoryFilter;

        const q = search.toLowerCase().trim();
        const matchesSearch =
          q === "" ||
          post.title.toLowerCase().includes(q) ||
          post.authorName.toLowerCase().includes(q) ||
          post.categoryName.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q));

        return matchesStatus && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "date-desc") {
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
        }
        if (sortBy === "date-asc") {
          return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
        }
        if (sortBy === "title-asc") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "title-desc") {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [posts, statusFilter, categoryFilter, search, sortBy]);

  // Counts for status tabs
  const counts = useMemo(() => {
    return {
      ALL: posts.length,
      PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
      DRAFT: posts.filter((p) => p.status === "DRAFT").length,
      SCHEDULED: posts.filter((p) => p.status === "SCHEDULED").length,
    };
  }, [posts]);

  // Selection handlers
  const allVisibleSelected =
    filteredAndSortedPosts.length > 0 &&
    filteredAndSortedPosts.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const visibleIdSet = new Set(filteredAndSortedPosts.map((p) => p.id));
      setSelectedIds((prev) => prev.filter((id) => !visibleIdSet.has(id)));
    } else {
      const visibleIds = filteredAndSortedPosts.map((p) => p.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Actions: Publish Single
  const handlePublish = async (post: BlogPostRecord) => {
    setActionLoadingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/publish`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ message: `"${post.title}" published successfully.`, type: "success" });
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: "PUBLISHED" } : p))
        );
      } else {
        setNotification({ message: data.error || "Failed to publish.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error publishing post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Actions: Unpublish Single
  const handleUnpublish = async (post: BlogPostRecord) => {
    setActionLoadingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/unpublish`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ message: `"${post.title}" moved to Drafts.`, type: "success" });
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: "DRAFT" } : p))
        );
      } else {
        setNotification({ message: data.error || "Failed to unpublish.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error unpublishing post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Actions: Duplicate Single
  const handleDuplicate = async (post: BlogPostRecord) => {
    setActionLoadingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/duplicate`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.post) {
        setNotification({
          message: `Duplicated "${post.title}" as new draft.`,
          type: "success",
        });
        setPosts((prev) => [data.post, ...prev]);
      } else {
        setNotification({ message: data.error || "Failed to duplicate.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error duplicating post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Actions: Delete Single
  const handleDelete = async () => {
    if (!deleteConfirmPost) return;
    const postId = deleteConfirmPost.id;
    setActionLoadingId(postId);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ message: `Article "${deleteConfirmPost.title}" deleted.`, type: "success" });
        setDeleteConfirmPost(null);
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        setSelectedIds((prev) => prev.filter((id) => id !== postId));
      } else {
        setNotification({ message: data.error || "Failed to delete.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error deleting post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Bulk Actions
  const handleBulkAction = async (action: "delete" | "publish" | "unpublish") => {
    if (selectedIds.length === 0) return;
    setBulkLoading(true);

    try {
      const res = await fetch("/api/admin/posts/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({ message: data.message, type: "success" });
        if (action === "delete") {
          const selectedSet = new Set(selectedIds);
          setPosts((prev) => prev.filter((p) => !selectedSet.has(p.id)));
          setSelectedIds([]);
          setBulkDeleteModalOpen(false);
        } else if (action === "publish") {
          const selectedSet = new Set(selectedIds);
          setPosts((prev) =>
            prev.map((p) => (selectedSet.has(p.id) ? { ...p, status: "PUBLISHED" } : p))
          );
          setSelectedIds([]);
        } else if (action === "unpublish") {
          const selectedSet = new Set(selectedIds);
          setPosts((prev) =>
            prev.map((p) => (selectedSet.has(p.id) ? { ...p, status: "DRAFT" } : p))
          );
          setSelectedIds([]);
        }
      } else {
        setNotification({ message: data.error || "Bulk action failed.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error performing bulk action.", type: "error" });
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Page Title & Add New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Blog Post Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Create, review, publish, delete, and duplicate articles across engineering topics
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-sm shadow-orange-600/20 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
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
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-700 ml-3 text-sm leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters, Categories, Search & Sorting */}
      <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-5 space-y-4 shadow-xs">
        {/* Top filter row: Status tabs & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {(["ALL", "PUBLISHED", "DRAFT", "SCHEDULED"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  statusFilter === s
                    ? "bg-orange-600 text-white font-semibold shadow-xs"
                    : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>{s === "ALL" ? "All Posts" : s}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                    statusFilter === s ? "bg-orange-700 text-white" : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, author, category, tags..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Secondary filter row: Category and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
              >
                <option value="ALL">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="title-asc">Title (A to Z)</option>
                <option value="title-desc">Title (Z to A)</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-mono text-stone-500">
            Showing <strong className="text-stone-900">{filteredAndSortedPosts.length}</strong> of {posts.length} articles
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="sticky top-4 z-40 p-3.5 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-orange-600 font-bold">
              {selectedIds.length}
            </span>
            <span>selected article{selectedIds.length > 1 ? "s" : ""}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction("publish")}
              disabled={bulkLoading}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Bulk Publish
            </button>
            <button
              onClick={() => handleBulkAction("unpublish")}
              disabled={bulkLoading}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Bulk Unpublish
            </button>
            <button
              onClick={() => setBulkDeleteModalOpen(true)}
              disabled={bulkLoading}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-medium transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer ml-1"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-16 text-center text-stone-500 font-mono text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
            <span>Loading publications repository...</span>
          </div>
        ) : filteredAndSortedPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-50/80 border-b border-stone-100 text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 w-10">
                    <button
                      onClick={toggleSelectAll}
                      className="text-stone-400 hover:text-stone-700 flex items-center cursor-pointer"
                      title={allVisibleSelected ? "Deselect All" : "Select All"}
                    >
                      {allVisibleSelected ? (
                        <CheckSquare className="w-4 h-4 text-orange-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3.5 font-semibold">Title & Slug</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Category</th>
                  <th className="p-3.5 font-semibold">Author</th>
                  <th className="p-3.5 font-semibold">Date</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredAndSortedPosts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  const isBusy = actionLoadingId === post.id;

                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-stone-50/80 transition-colors ${
                        isSelected ? "bg-orange-50/30" : ""
                      }`}
                    >
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleSelectOne(post.id)}
                          className="text-stone-400 hover:text-stone-700 flex items-center cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-orange-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-3.5 max-w-sm">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="font-bold text-stone-950 hover:text-orange-600 transition-colors truncate block"
                        >
                          {post.title}
                        </Link>
                        <div className="text-[11px] text-stone-400 font-mono truncate">
                          /blog/{post.slug}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            post.status === "PUBLISHED"
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                              : post.status === "DRAFT"
                              ? "bg-amber-50 border border-amber-200 text-amber-700"
                              : "bg-purple-50 border border-purple-200 text-purple-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-stone-600">{post.categoryName}</td>
                      <td className="p-3.5 text-stone-600">{post.authorName}</td>
                      <td className="p-3.5 text-stone-500">{post.publishedAt || "Draft"}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit */}
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs"
                            title="Edit Post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* View Live / Preview */}
                          <Link
                            href={post.status === "PUBLISHED" ? `/blog/${post.slug}` : `/admin/posts/${post.id}/preview`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs"
                            title={post.status === "PUBLISHED" ? "View Live Blog Article" : "Admin Preview Draft"}
                          >
                            {post.status === "PUBLISHED" ? (
                              <ExternalLink className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </Link>

                          {/* Duplicate */}
                          <button
                            onClick={() => handleDuplicate(post)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                            title="Duplicate Post (Copy as Draft)"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Publish / Unpublish Toggle */}
                          {post.status === "PUBLISHED" ? (
                            <button
                              onClick={() => handleUnpublish(post)}
                              disabled={isBusy}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                              title="Unpublish to Draft"
                            >
                              {isBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : "Unpublish"}
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePublish(post)}
                              disabled={isBusy}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                              title="Publish immediately"
                            >
                              {isBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : "Publish"}
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeleteConfirmPost(post)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                            title="Delete Post"
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
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            No articles found matching the current filter criteria.
          </div>
        )}
      </div>

      {/* Single Delete Confirmation Modal */}
      {deleteConfirmPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-red-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Post</h3>
                <p className="text-[11px] text-stone-500 font-mono">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Are you sure you want to permanently delete{" "}
              <strong className="text-stone-900">&ldquo;{deleteConfirmPost.title}&rdquo;</strong>?
              This article will be completely removed from the database.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmPost(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoadingId === deleteConfirmPost.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {actionLoadingId === deleteConfirmPost.id ? (
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

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-red-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Bulk Delete Articles</h3>
                <p className="text-[11px] text-stone-500 font-mono">Permanent deletion</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Are you sure you want to permanently delete{" "}
              <strong className="text-red-700">{selectedIds.length}</strong> selected article
              {selectedIds.length > 1 ? "s" : ""}? All selected publications will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setBulkDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                disabled={bulkLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {bulkLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete {selectedIds.length} Posts</span>
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPostRecord } from "@/lib/blog-db";
import {
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface RecentArticlesTableProps {
  initialPosts: BlogPostRecord[];
  totalCount: number;
}

export function RecentArticlesTable({ initialPosts, totalCount }: RecentArticlesTableProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostRecord[]>(initialPosts);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<BlogPostRecord | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Refresh post list from API
  const refreshPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.posts) {
        const sorted = [...data.posts]
          .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
          .slice(0, 7);
        setPosts(sorted);
      }
    } catch {
      // Fallback router refresh
      router.refresh();
    }
  };

  // Handle Delete Post
  const handleDelete = async () => {
    if (!deleteConfirmPost) return;
    const postId = deleteConfirmPost.id;
    setActionLoadingId(postId);

    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({
          message: `"${deleteConfirmPost.title}" removed successfully.`,
          type: "success",
        });
        setDeleteConfirmPost(null);
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        router.refresh();
      } else {
        setNotification({
          message: data.error || "Failed to delete post.",
          type: "error",
        });
      }
    } catch {
      setNotification({
        message: "Network error while deleting post.",
        type: "error",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Quick Publish
  const handlePublish = async (post: BlogPostRecord) => {
    setActionLoadingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/publish`, { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({
          message: `"${post.title}" published to live blog.`,
          type: "success",
        });
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: "PUBLISHED" } : p))
        );
        router.refresh();
      } else {
        setNotification({ message: data.error || "Failed to publish.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error publishing post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Quick Unpublish
  const handleUnpublish = async (post: BlogPostRecord) => {
    setActionLoadingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/unpublish`, { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({
          message: `"${post.title}" moved to Drafts.`,
          type: "success",
        });
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: "DRAFT" } : p))
        );
        router.refresh();
      } else {
        setNotification({ message: data.error || "Failed to unpublish.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error unpublishing post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Duplicate
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
        await refreshPosts();
      } else {
        setNotification({ message: data.error || "Failed to duplicate.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error duplicating post.", type: "error" });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Articles</h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Latest published and draft engineering posts
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 hover:text-orange-700 font-semibold"
        >
          <span>Manage All ({totalCount})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-between transition-all ${
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-stone-100 text-stone-500 uppercase tracking-wider bg-stone-50/70">
            <tr>
              <th className="p-3.5 font-semibold">Title</th>
              <th className="p-3.5 font-semibold">Status</th>
              <th className="p-3.5 font-semibold">Category</th>
              <th className="p-3.5 font-semibold">Published</th>
              <th className="p-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-stone-400 font-mono text-xs">
                  No articles available.
                </td>
              </tr>
            ) : (
              posts.map((post) => {
                const isBusy = actionLoadingId === post.id;

                return (
                  <tr key={post.id} className="hover:bg-stone-50/80 transition-colors group">
                    <td className="p-3.5 font-medium text-stone-900 max-w-xs truncate">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="hover:text-orange-600 transition-colors font-semibold"
                        title={post.title}
                      >
                        {post.title}
                      </Link>
                      <div className="text-[10px] text-stone-400 font-mono truncate">
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
                    <td className="p-3.5 text-stone-500">{post.publishedAt || "Draft"}</td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit */}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5 text-orange-600" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>

                        {/* View Live / Preview */}
                        <Link
                          href={post.status === "PUBLISHED" ? `/blog/${post.slug}` : `/admin/posts/${post.id}/preview`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shadow-2xs"
                          title={post.status === "PUBLISHED" ? "View Live Blog Post" : "Preview Draft"}
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
                          className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                          title="Duplicate Post (Copy as Draft)"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Publish / Unpublish Toggle */}
                        {post.status === "PUBLISHED" ? (
                          <button
                            onClick={() => handleUnpublish(post)}
                            disabled={isBusy}
                            className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                            title="Unpublish to Draft"
                          >
                            {isBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : "Unpublish"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublish(post)}
                            disabled={isBusy}
                            className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold transition-colors cursor-pointer disabled:opacity-50"
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
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-red-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Post</h3>
                <p className="text-[11px] text-stone-500 font-mono">This action is permanent</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Are you sure you want to permanently delete{" "}
              <strong className="text-stone-900">&ldquo;{deleteConfirmPost.title}&rdquo;</strong>?
              The post and its associated assets will be removed from the database.
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
    </div>
  );
}

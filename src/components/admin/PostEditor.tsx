"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { BlogPostRecord } from "@/lib/blog-db";
import { generateSlug } from "@/lib/slug";
import {
  Save,
  Send,
  Eye,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Tag,
  ArrowLeft,
  Sparkles,
  Trash2,
  Copy,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

interface PostEditorProps {
  initialPost?: BlogPostRecord;
  isEditing?: boolean;
}

export function PostEditor({ initialPost, isEditing = false }: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(Boolean(initialPost?.slug));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || "");
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || "");
  const [tagsInput, setTagsInput] = useState(initialPost?.tags.join(", ") || "");
  const [authorName, setAuthorName] = useState(initialPost?.authorName || "Aether Engineering Team");
  const [authorRole, setAuthorRole] = useState(initialPost?.authorRole || "Staff Systems Engineer");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED">(
    initialPost?.status || "DRAFT"
  );
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || "");
  const [ogImage, setOgImage] = useState(initialPost?.ogImage || "");

  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Live content stats calculation
  const stats = useMemo(() => {
    const trimmed = content.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = content.length;
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readTimeMinutes };
  }, [content]);

  // Auto-generate slug when title changes (unless manually customized)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugCustomized(true);
    setSlug(generateSlug(val));
  };

  // Fetch categories
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories);
          if (!categoryId && data.categories.length > 0) {
            setCategoryId(data.categories[0].id);
          }
        }
      })
      .catch(() => {});
  }, [categoryId]);

  // Image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
        setNotification({ message: "Cover image uploaded successfully.", type: "success" });
      } else {
        setNotification({ message: data.error || "Failed to upload image.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error uploading image.", type: "error" });
    } finally {
      setUploadingImage(false);
    }
  };

  // Duplicate handler
  const handleDuplicate = async () => {
    if (!initialPost) return;
    setDuplicating(true);
    try {
      const res = await fetch(`/api/admin/posts/${initialPost.id}/duplicate`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.post) {
        setNotification({
          message: `Duplicated "${initialPost.title}" as new draft. Redirecting...`,
          type: "success",
        });
        setTimeout(() => {
          router.push(`/admin/posts/${data.post.id}/edit`);
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to duplicate post.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error duplicating post.", type: "error" });
    } finally {
      setDuplicating(false);
    }
  };

  // Delete handler
  const handleDeletePost = async () => {
    if (!initialPost) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${initialPost.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ message: "Post deleted permanently. Redirecting...", type: "success" });
        setTimeout(() => {
          router.push("/admin/posts");
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to delete post.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error deleting post.", type: "error" });
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Save Post
  const savePost = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      setNotification({ message: "Please enter an article title.", type: "error" });
      return;
    }
    if (!content.trim()) {
      setNotification({ message: "Article content cannot be empty.", type: "error" });
      return;
    }

    setSaving(true);
    setNotification(null);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      coverImage,
      categoryId,
      tags: tagsArray,
      authorName,
      authorRole,
      status: targetStatus,
      seoTitle,
      seoDescription,
      ogImage: ogImage || coverImage,
    };

    try {
      const url = isEditing && initialPost
        ? `/api/admin/posts/${initialPost.id}`
        : "/api/admin/posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.post) {
        setNotification({
          message: targetStatus === "PUBLISHED"
            ? "Post published to public blog successfully!"
            : "Draft saved successfully.",
          type: "success",
        });
        setTimeout(() => {
          router.push("/admin/posts");
        }, 800);
      } else {
        setNotification({ message: data.error || "Failed to save post.", type: "error" });
      }
    } catch {
      setNotification({ message: "Network error saving post.", type: "error" });
    } finally {
      setSaving(false);
      setShowPublishModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {isEditing ? "Edit Article" : "Create New Publication"}
            </h1>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              {isEditing ? `ID: ${initialPost?.id}` : "Draft engineering publication"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Duplicate Button */}
          {isEditing && initialPost && (
            <button
              onClick={handleDuplicate}
              disabled={duplicating || saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              title="Clone this post as a new draft"
            >
              <Copy className="w-3.5 h-3.5 text-stone-500" />
              <span>{duplicating ? "Duplicating..." : "Duplicate"}</span>
            </button>
          )}

          {/* Save Draft */}
          <button
            onClick={() => savePost("DRAFT")}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <Save className="w-3.5 h-3.5 text-stone-500" />
            <span>{saving ? "Saving..." : "Save Draft"}</span>
          </button>

          {/* Preview / View live */}
          {isEditing && initialPost && (
            <Link
              href={initialPost.status === "PUBLISHED" ? `/blog/${initialPost.slug}` : `/admin/posts/${initialPost.id}/preview`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
            >
              {initialPost.status === "PUBLISHED" ? (
                <>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                  <span>View Live</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-orange-600" />
                  <span>Preview</span>
                </>
              )}
            </Link>
          )}

          {/* Publish */}
          <button
            onClick={() => setShowPublishModal(true)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-lg shadow-orange-600/20 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish</span>
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
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-700 ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Col (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold">Article Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Building a Production Ready RAG Application"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-200 text-sm font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs transition-colors"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-500">
              URL Slug (auto-generated, editable)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-400">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="building-a-production-ready-rag-application"
                className="flex-grow px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-orange-700 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-700 font-semibold">
              Excerpt / Executive Summary
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief 1-2 sentence overview of the technical problem, solution, and takeaway..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs leading-relaxed"
            />
          </div>

          {/* Markdown Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-stone-700 font-semibold">
                Content (Markdown & Code Blocks) *
              </label>

              {/* Content Tabs & Live Stats */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-stone-400">
                  <span>{stats.words} words</span>
                  <span>•</span>
                  <span>{stats.readTimeMinutes} min read</span>
                </div>

                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "write" ? "bg-orange-600 text-white font-semibold shadow-xs" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "preview" ? "bg-orange-600 text-white font-semibold shadow-xs" : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {activeTab === "write" ? (
              <textarea
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your engineering publication in standard Markdown...&#10;&#10;## Architecture Overview&#10;Describe system components and design decisions...&#10;&#10;```typescript&#10;// Code snippet here&#10;```"
                className="w-full p-4 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs leading-relaxed"
              />
            ) : (
              <div className="w-full min-h-[360px] p-6 rounded-2xl bg-stone-50/60 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed prose max-w-none shadow-2xs">
                {content ? (
                  <div className="whitespace-pre-wrap font-sans">{content}</div>
                ) : (
                  <span className="text-stone-400 font-mono">Nothing to preview yet.</span>
                )}
              </div>
            )}

            {/* Live Metrics Footnote */}
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                <span>Estimated reading time: {stats.readTimeMinutes} min ({stats.words} words, {stats.chars} characters)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Meta Col (1 col) */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-stone-900 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Publication Settings</span>
            </h3>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Discipline / Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Tags (comma separated)</label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="RAG, PostgreSQL, Docker, Next.js"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Author info */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Author Role</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-600">Publication Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
              >
                <option value="DRAFT">DRAFT (Hidden from Public)</option>
                <option value="PUBLISHED">PUBLISHED (Public on /blog)</option>
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-stone-900 tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
              <span>Cover Image</span>
            </h3>

            {coverImage && (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-stone-100 shadow-2xs">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/blog/cover.webp or URL"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-2xs"
              />

              <label className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-stone-300 hover:border-orange-400 bg-stone-50 text-xs font-mono text-stone-600 hover:text-orange-600 cursor-pointer transition-colors shadow-2xs">
                <Upload className="w-3.5 h-3.5 text-orange-600" />
                <span>{uploadingImage ? "Uploading..." : "Upload from Device (max 5MB)"}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase text-stone-900 tracking-wider">
              SEO Optimization
            </h3>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-stone-500">SEO Meta Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Title | Aether Blog"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-stone-500">SEO Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="160 character description for search engines..."
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Danger Zone: Delete Article (Only when editing) */}
          {isEditing && initialPost && (
            <div className="rounded-3xl border border-red-200 bg-red-50/50 p-5 space-y-3 shadow-xs">
              <h3 className="text-xs font-mono font-bold uppercase text-red-700 tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Danger Zone</span>
              </h3>
              <p className="text-[11px] text-stone-600 leading-relaxed font-mono">
                Permanently delete this article and its configuration from the database.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete This Article</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-orange-600">
              <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Publish this article?</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              This will set the article status to <strong className="text-emerald-700 font-bold">PUBLISHED</strong>,
              generate its public route on <code className="text-orange-700 font-mono bg-orange-50 px-1.5 py-0.5 rounded">/blog/{slug}</code>, and
              make it instantly visible to all website visitors.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => savePost("PUBLISHED")}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm shadow-orange-600/20"
              >
                {saving ? "Publishing..." : "Confirm & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && initialPost && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-3xl border border-red-200 bg-white p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">Delete Article</h3>
                <p className="text-[11px] text-stone-500 font-mono">Permanent destruction</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Are you sure you want to permanently delete{" "}
              <strong className="text-stone-900">&ldquo;{initialPost.title}&rdquo;</strong>?
              This action cannot be undone and will remove the publication from the live website.
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
                onClick={handleDeletePost}
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

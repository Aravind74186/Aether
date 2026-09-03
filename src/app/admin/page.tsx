import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getBlogDatabase } from "@/lib/blog-db";
import {
  FileText,
  CheckCircle2,
  Clock,
  Archive,
  FolderTree,
  PlusCircle,
  ExternalLink,
  FolderGit2,
} from "lucide-react";

import { RecentArticlesTable } from "@/components/admin/RecentArticlesTable";
import { getProjectsDatabase } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const db = getBlogDatabase();
  const projDb = getProjectsDatabase();

  const totalPosts = db.posts.length;
  const publishedCount = db.posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = db.posts.filter((p) => p.status === "DRAFT").length;
  const scheduledCount = db.posts.filter((p) => p.status === "SCHEDULED").length;
  const projectCount = projDb.projects.length;

  const recentPosts = [...db.posts]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
    .slice(0, 7);

  const stats = [
    {
      label: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-orange-700",
      bg: "bg-orange-50 border-orange-200",
      href: "/admin/posts",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: CheckCircle2,
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      href: "/admin/posts",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: Clock,
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      href: "/admin/posts",
    },
    {
      label: "Projects & Labs",
      value: projectCount,
      icon: FolderGit2,
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
      href: "/admin/projects",
    },
    {
      label: "Categories",
      value: db.categories.length,
      icon: FolderTree,
      color: "text-purple-700",
      bg: "bg-purple-50 border-purple-200",
      href: "/admin/categories",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
            Editorial Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-mono mt-1">
            Signed in as <span className="text-stone-900 font-bold">{user.email}</span> (Admin Role)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-sm shadow-orange-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 hover:text-orange-600 transition-colors shadow-2xs"
          >
            <span>View Blog</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
          </Link>
        </div>
      </div>

      {/* Verified Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-medium">{s.label}</span>
                <div className={`p-2 rounded-xl border ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {s.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Recent Articles Table */}
      <RecentArticlesTable initialPosts={recentPosts} totalCount={totalPosts} />
    </div>
  );
}

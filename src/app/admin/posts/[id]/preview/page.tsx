import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getBlogDatabase } from "@/lib/blog-db";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  AlertCircle,
  Edit,
  Eye,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PreviewPageProps {
  params: {
    id: string;
  };
}

export default async function AdminDraftPreviewPage({ params }: PreviewPageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const db = getBlogDatabase();
  const post = db.posts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-5 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto shadow-2xs">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Article Not Found
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-mono leading-relaxed">
              The article with ID <code className="px-1.5 py-0.5 rounded bg-stone-100 text-orange-700 font-bold">{params.id}</code> cannot be previewed because it does not exist in the database.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-mono font-semibold transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Posts</span>
            </Link>

            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-mono font-semibold transition-colors shadow-sm shadow-orange-600/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Article</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors shadow-2xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Preview Floating Header */}
      <div className="rounded-2xl border border-amber-800/60 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Admin Draft Preview
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Status: {post.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              This preview is private to authenticated administrators and is hidden from the public blog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Article</span>
          </Link>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs font-mono text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Posts</span>
          </Link>
        </div>
      </div>

      {/* Full Simulated Blog Reading Layout */}
      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.categoryName, href: `/blog/category/${post.categorySlug}` },
            { name: post.title },
          ]}
        />

        <article className="max-w-4xl mx-auto mt-8 space-y-8">
          <div className="space-y-4">
            <Badge variant="brand">{post.categoryName}</Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-950 border border-orange-800 flex items-center justify-center text-orange-400">
                  <User className="w-3 h-3" />
                </div>
                <span className="text-white">{post.authorName}</span>
                <span className="text-slate-500">({post.authorRole})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 aspect-video bg-slate-950">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Markdown Content Body */}
          <div className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-sans space-y-4 pt-4">
            {post.content}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-500">Tags:</div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}

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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-mono font-semibold transition-colors shadow-2xs"
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
      <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 shadow-2xs">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                Admin Draft Preview
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300/60 font-bold">
                Status: {post.status}
              </span>
            </div>
            <p className="text-xs text-stone-600 font-mono mt-0.5">
              This preview is private to authenticated administrators and is hidden from the public blog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-xs font-mono text-stone-800 hover:text-orange-600 border border-stone-200 transition-colors shadow-2xs"
          >
            <Edit className="w-3.5 h-3.5 text-orange-600" />
            <span>Edit Article</span>
          </Link>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-xs font-mono text-stone-700 hover:text-stone-900 border border-stone-200 transition-colors shadow-2xs"
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 pt-2 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <User className="w-3 h-3" />
                </div>
                <span className="text-stone-900 font-bold">{post.authorName}</span>
                <span className="text-stone-500">({post.authorRole})</span>
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
            <div className="rounded-3xl overflow-hidden border border-stone-200 aspect-video bg-stone-100 shadow-xs">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Markdown Content Body */}
          <div className="text-stone-800 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-sans space-y-4 pt-4">
            {post.content}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-stone-200 space-y-2">
            <div className="text-xs font-mono uppercase text-stone-500 font-bold">Tags:</div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl bg-orange-50/70 border border-orange-200 text-xs font-mono text-stone-800 font-semibold shadow-2xs"
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

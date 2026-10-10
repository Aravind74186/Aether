import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getBlogDatabase } from "@/lib/blog-db";
import { PostEditor } from "@/components/admin/PostEditor";
import { AlertCircle, ArrowLeft, PlusCircle, LayoutDashboard } from "lucide-react";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPageProps) {
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
              The article with ID <code className="px-1.5 py-0.5 rounded bg-stone-100 text-orange-700 font-bold">{params.id}</code> does not exist in the database. It may have been permanently deleted.
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

  return <PostEditor initialPost={post} isEditing={true} />;
}

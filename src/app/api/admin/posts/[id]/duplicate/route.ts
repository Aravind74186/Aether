import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getBlogDatabase,
  saveBlogDatabase,
  getUniquePostSlug,
  BlogPostRecord,
} from "@/lib/blog-db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getBlogDatabase();
    const originalPost = db.posts.find((p) => p.id === params.id);

    if (!originalPost) {
      return NextResponse.json({ error: "Source post not found." }, { status: 404 });
    }

    const newTitle = `${originalPost.title} (Copy)`;
    const newSlug = getUniquePostSlug(`${originalPost.slug}-copy`);
    const now = new Date().toISOString();
    const newId = `post_${crypto.randomBytes(6).toString("hex")}`;

    const duplicatedPost: BlogPostRecord = {
      ...originalPost,
      id: newId,
      title: newTitle,
      slug: newSlug,
      status: "DRAFT",
      createdAt: now,
      updatedAt: now,
      publishedAt: now.split("T")[0],
    };

    // Prepend to posts list
    db.posts.unshift(duplicatedPost);
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: `Duplicated "${originalPost.title}" as new draft.`,
      post: duplicatedPost,
    });
  } catch (error) {
    console.error("[POST /api/admin/posts/[id]/duplicate ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to duplicate blog post." },
      { status: 500 }
    );
  }
}

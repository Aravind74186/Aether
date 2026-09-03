import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import { getBlogDatabase, saveBlogDatabase } from "@/lib/blog-db";

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
    const post = db.posts.find((p) => p.id === params.id);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    if (!post.title || !post.content) {
      return NextResponse.json(
        { error: "Cannot publish an article with empty title or content." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    post.status = "PUBLISHED";
    post.publishedAt = post.publishedAt || now.split("T")[0];
    post.updatedAt = now;

    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Post published to public blog successfully.",
      post,
    });
  } catch (error) {
    console.error("[POST /api/admin/posts/[id]/publish ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to publish post." },
      { status: 500 }
    );
  }
}

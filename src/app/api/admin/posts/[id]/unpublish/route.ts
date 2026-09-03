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

    post.status = "DRAFT";
    post.updatedAt = new Date().toISOString();

    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Post unpublished and moved to Drafts.",
      post,
    });
  } catch (error) {
    console.error("[POST /api/admin/posts/[id]/unpublish ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to unpublish post." },
      { status: 500 }
    );
  }
}

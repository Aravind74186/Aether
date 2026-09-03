import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import { getBlogDatabase, saveBlogDatabase } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const { action, ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No post IDs provided." }, { status: 400 });
    }

    const db = getBlogDatabase();
    const idSet = new Set(ids);
    const now = new Date().toISOString();

    if (action === "delete") {
      const initialCount = db.posts.length;
      db.posts = db.posts.filter((p) => !idSet.has(p.id));
      const deletedCount = initialCount - db.posts.length;

      saveBlogDatabase(db);
      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${deletedCount} post(s).`,
        count: deletedCount,
      });
    }

    if (action === "publish") {
      let count = 0;
      db.posts.forEach((p) => {
        if (idSet.has(p.id)) {
          p.status = "PUBLISHED";
          p.updatedAt = now;
          if (!p.publishedAt) {
            p.publishedAt = now.split("T")[0];
          }
          count++;
        }
      });

      saveBlogDatabase(db);
      return NextResponse.json({
        success: true,
        message: `Successfully published ${count} post(s).`,
        count,
      });
    }

    if (action === "unpublish") {
      let count = 0;
      db.posts.forEach((p) => {
        if (idSet.has(p.id)) {
          p.status = "DRAFT";
          p.updatedAt = now;
          count++;
        }
      });

      saveBlogDatabase(db);
      return NextResponse.json({
        success: true,
        message: `Successfully moved ${count} post(s) to Drafts.`,
        count,
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("[POST /api/admin/posts/bulk ERROR]:", error);
    return NextResponse.json({ error: "Failed to perform bulk action." }, { status: 500 });
  }
}

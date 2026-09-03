import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import { getBlogDatabase, saveBlogDatabase, generateSlug } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  const db = getBlogDatabase();
  return NextResponse.json({ tags: db.tags });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Tag name is required." }, { status: 400 });
    }

    const slug = generateSlug(name);
    const db = getBlogDatabase();

    if (db.tags.some((t) => t.slug === slug)) {
      return NextResponse.json(
        { error: "A tag with this name already exists." },
        { status: 409 }
      );
    }

    const newTag = {
      id: `tag_${slug}`,
      name: name.trim(),
      slug,
    };

    db.tags.push(newTag);
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Tag created successfully.",
      tag: newTag,
    });
  } catch (error) {
    console.error("[POST /api/admin/tags ERROR]:", error);
    return NextResponse.json({ error: "Failed to create tag." }, { status: 500 });
  }
}

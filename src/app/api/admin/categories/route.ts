import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import { getBlogDatabase, saveBlogDatabase, generateSlug } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  const db = getBlogDatabase();
  return NextResponse.json({ categories: db.categories });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const body = await req.json();
    const { name, description = "", topics = [] } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const slug = generateSlug(name);
    const db = getBlogDatabase();

    if (db.categories.some((c) => c.slug === slug)) {
      return NextResponse.json(
        { error: "A category with this name/slug already exists." },
        { status: 409 }
      );
    }

    const newCategory = {
      id: `cat_${slug}`,
      name: name.trim(),
      slug,
      description: description.trim(),
      topics: Array.isArray(topics) ? topics : [],
      icon: "Code2",
    };

    db.categories.push(newCategory);
    saveBlogDatabase(db);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/categories ERROR]:", error);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    const db = getBlogDatabase();

    // Referential integrity check: do not allow deletion if posts reference this category
    const activePosts = db.posts.filter((p) => p.categoryId === id || p.categorySlug === id);
    if (activePosts.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete category: ${activePosts.length} article(s) are currently assigned to it. Please reassign them first.`,
        },
        { status: 409 }
      );
    }

    const index = db.categories.findIndex((c) => c.id === id || c.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    const removed = db.categories.splice(index, 1)[0];
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Category removed successfully.",
      category: removed,
    });
  } catch (error) {
    console.error("[DELETE /api/admin/categories ERROR]:", error);
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}

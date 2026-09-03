import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getBlogDatabase,
  saveBlogDatabase,
  BlogPostRecord,
  getUniquePostSlug,
} from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getBlogDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const category = searchParams.get("category");

    let posts = [...db.posts];

    if (status && status !== "ALL") {
      posts = posts.filter((p) => p.status === status);
    }

    if (category && category !== "ALL") {
      posts = posts.filter(
        (p) => p.categoryId === category || p.categorySlug === category
      );
    }

    if (search) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.excerpt.toLowerCase().includes(search) ||
          p.authorName.toLowerCase().includes(search) ||
          p.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    // Sort newest updated or published first
    posts.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

    return NextResponse.json({
      posts,
      total: posts.length,
    });
  } catch (error) {
    console.error("[GET /api/admin/posts ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from database." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      categoryId,
      tags = [],
      authorName = "Aether Engineering Team",
      authorRole = "Staff Engineer",
      status = "DRAFT",
      seoTitle,
      seoDescription,
      ogImage,
      keyTakeaways,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Article title is required." },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Article content is required." },
        { status: 400 }
      );
    }

    const db = getBlogDatabase();

    // Find category details
    const category = db.categories.find(
      (c) => c.id === categoryId || c.slug === categoryId
    ) || db.categories[0] || {
      id: "cat_general",
      name: "Software Engineering",
      slug: "software-engineering",
    };

    // Calculate reading time (~200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readingTime = `${readingMinutes} min read`;

    // Generate unique slug
    const finalSlug = getUniquePostSlug(customSlug || title);

    const now = new Date().toISOString();
    const postDate = status === "PUBLISHED" ? now : (body.publishedAt || now);

    const newPost: BlogPostRecord = {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      slug: finalSlug,
      excerpt: (excerpt || content.slice(0, 160).replace(/[#*`]/g, "")).trim(),
      content: content.trim(),
      coverImage: coverImage || "/images/blog/default-cover.webp",
      authorId: auth.user.id,
      authorName: authorName.trim(),
      authorRole: authorRole.trim(),
      categoryId: category.id,
      categoryName: category.name,
      categorySlug: category.slug,
      tags: Array.isArray(tags) ? tags.map((t: string) => t.trim()).filter(Boolean) : [],
      status,
      publishedAt: postDate.split("T")[0],
      createdAt: now,
      updatedAt: now,
      seoTitle: seoTitle?.trim() || `${title} | Aether Blog`,
      seoDescription: seoDescription?.trim() || excerpt?.trim(),
      ogImage: ogImage || coverImage,
      readingTime,
      keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : [],
    };

    db.posts.unshift(newPost);

    // Sync any new tags into tags collection
    newPost.tags.forEach((tagName) => {
      const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (!db.tags.some((t) => t.slug === tagSlug)) {
        db.tags.push({
          id: `tag_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          name: tagName,
          slug: tagSlug,
        });
      }
    });

    saveBlogDatabase(db);

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully.",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/posts ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}

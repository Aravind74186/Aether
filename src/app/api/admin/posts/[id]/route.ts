import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getBlogDatabase,
  saveBlogDatabase,
  getUniquePostSlug,
} from "@/lib/blog-db";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  const db = getBlogDatabase();
  const post = db.posts.find((p) => p.id === params.id);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getBlogDatabase();
    const index = db.posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const currentPost = db.posts[index];
    const body = await req.json();

    const {
      title,
      slug: newSlug,
      excerpt,
      content,
      coverImage,
      categoryId,
      tags,
      authorName,
      authorRole,
      status,
      publishedAt,
      seoTitle,
      seoDescription,
      ogImage,
      keyTakeaways,
    } = body;

    // Validate title & content if updated
    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
    }
    if (content !== undefined && !content.trim()) {
      return NextResponse.json({ error: "Content cannot be empty." }, { status: 400 });
    }

    // Handle slug change with uniqueness validation
    let finalSlug = currentPost.slug;
    if (newSlug && newSlug !== currentPost.slug) {
      finalSlug = getUniquePostSlug(newSlug, currentPost.id);
    }

    // Category mapping
    let categoryName = currentPost.categoryName;
    let categorySlug = currentPost.categorySlug;
    let updatedCatId = currentPost.categoryId;

    if (categoryId && categoryId !== currentPost.categoryId) {
      const cat = db.categories.find((c) => c.id === categoryId || c.slug === categoryId);
      if (cat) {
        updatedCatId = cat.id;
        categoryName = cat.name;
        categorySlug = cat.slug;
      }
    }

    // Calculate reading time if content changed
    let readingTime = currentPost.readingTime;
    if (content) {
      const wordCount = content.trim().split(/\s+/).length;
      readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    }

    const now = new Date().toISOString();

    const updatedPost = {
      ...currentPost,
      title: title !== undefined ? title.trim() : currentPost.title,
      slug: finalSlug,
      excerpt: excerpt !== undefined ? excerpt.trim() : currentPost.excerpt,
      content: content !== undefined ? content.trim() : currentPost.content,
      coverImage: coverImage !== undefined ? coverImage : currentPost.coverImage,
      categoryId: updatedCatId,
      categoryName,
      categorySlug,
      tags: tags !== undefined ? tags : currentPost.tags,
      authorName: authorName !== undefined ? authorName.trim() : currentPost.authorName,
      authorRole: authorRole !== undefined ? authorRole.trim() : currentPost.authorRole,
      status: status !== undefined ? status : currentPost.status,
      publishedAt: publishedAt !== undefined ? publishedAt : currentPost.publishedAt,
      updatedAt: now,
      seoTitle: seoTitle !== undefined ? seoTitle : currentPost.seoTitle,
      seoDescription: seoDescription !== undefined ? seoDescription : currentPost.seoDescription,
      ogImage: ogImage !== undefined ? ogImage : currentPost.ogImage,
      readingTime,
      keyTakeaways: keyTakeaways !== undefined ? keyTakeaways : currentPost.keyTakeaways,
    };

    db.posts[index] = updatedPost;
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Post updated successfully.",
      post: updatedPost,
    });
  } catch (error) {
    console.error("[PUT /api/admin/posts/[id] ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getBlogDatabase();
    const index = db.posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const removed = db.posts.splice(index, 1)[0];
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully.",
      deletedId: removed.id,
    });
  } catch (error) {
    console.error("[DELETE /api/admin/posts/[id] ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}

import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { insightsData } from "@/data/insights";
import { insightCategories } from "@/data/insight-categories";

export type UserRole = "ADMIN" | "USER";
export type PostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown text
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorBio?: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
  status: PostStatus;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  readingTime: string;
  keyTakeaways?: string[];
}

export interface BlogCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  topics: string[];
  icon: string;
}

export interface BlogTagRecord {
  id: string;
  name: string;
  slug: string;
}

export interface MediaRecord {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface BlogDatabaseSchema {
  users: UserRecord[];
  sessions: SessionRecord[];
  posts: BlogPostRecord[];
  categories: BlogCategoryRecord[];
  tags: BlogTagRecord[];
  media: MediaRecord[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "blog-db.json");

// Helper to convert structured insight articles to clean Markdown text
function convertSectionsToMarkdown(article: (typeof insightsData)[0]): string {
  let md = "";
  article.contentSections.forEach((sec) => {
    md += `\n## ${sec.heading}\n\n`;
    if (sec.subheading) {
      md += `### ${sec.subheading}\n\n`;
    }
    md += `${sec.body}\n\n`;

    if (sec.listItems && sec.listItems.length > 0) {
      sec.listItems.forEach((item) => {
        md += `- ${item}\n`;
      });
      md += "\n";
    }

    if (sec.codeSnippet) {
      md += `\`\`\`${sec.codeSnippet.language}${sec.codeSnippet.filename ? `:${sec.codeSnippet.filename}` : ""}\n${sec.codeSnippet.code}\n\`\`\`\n\n`;
    }

    if (sec.callout) {
      md += `> [!${sec.callout.type.toUpperCase()}]\n> **${sec.callout.title}**\n> ${sec.callout.content}\n\n`;
    }

    if (sec.table) {
      md += `| ${sec.table.headers.join(" | ")} |\n`;
      md += `| ${sec.table.headers.map(() => "---").join(" | ")} |\n`;
      sec.table.rows.forEach((row) => {
        md += `| ${row.join(" | ")} |\n`;
      });
      if (sec.table.caption) {
        md += `\n*${sec.table.caption}*\n\n`;
      } else {
        md += "\n";
      }
    }
  });
  return md.trim();
}

// Generate default initial database
function createInitialDatabase(): BlogDatabaseSchema {
  // 1. Initial Admin User
  const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@aethertech.com").trim().toLowerCase();
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || "AetherAdmin@2025Secure";
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(defaultAdminPassword, salt);

  const initialUser: UserRecord = {
    id: "usr_admin_seed",
    email: defaultAdminEmail,
    passwordHash,
    role: "ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 2. Categories
  const initialCategories: BlogCategoryRecord[] = insightCategories.map((c) => ({
    id: `cat_${c.slug}`,
    name: c.name,
    slug: c.slug,
    description: c.description,
    topics: c.topics,
    icon: c.icon,
  }));

  // 3. Posts (Migrated from technical articles)
  const initialPosts: BlogPostRecord[] = insightsData.map((art) => {
    const cat = initialCategories.find((c) => c.slug === art.categorySlug) || {
      id: `cat_${art.categorySlug}`,
      name: art.category,
      slug: art.categorySlug,
    };

    return {
      id: `post_${art.id}`,
      title: art.title,
      slug: art.slug,
      excerpt: art.summary,
      content: convertSectionsToMarkdown(art),
      coverImage: `/images/blog/${art.slug}.webp`,
      authorId: "id" in art.author ? (art.author.id as string) : "team-author",
      authorName: art.author.name,
      authorRole: art.author.role,
      authorBio: "bio" in art.author ? (art.author.bio as string) : undefined,
      categoryId: cat.id,
      categoryName: cat.name,
      categorySlug: cat.slug,
      tags: art.tags,
      status: "PUBLISHED",
      publishedAt: art.publishedAt,
      createdAt: new Date(art.publishedAt).toISOString(),
      updatedAt: art.updatedAt ? new Date(art.updatedAt).toISOString() : new Date(art.publishedAt).toISOString(),
      seoTitle: art.seoTitle || `${art.title} | Aether Blog`,
      seoDescription: art.seoDescription || art.summary,
      ogImage: `/images/blog/${art.slug}-og.png`,
      readingTime: art.readTime,
      keyTakeaways: art.keyTakeaways,
    };
  });

  // 4. Tags
  const tagSet = new Set<string>();
  initialPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  const initialTags: BlogTagRecord[] = Array.from(tagSet).map((t) => ({
    id: `tag_${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: t,
    slug: t.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));

  return {
    users: [initialUser],
    sessions: [],
    posts: initialPosts,
    categories: initialCategories,
    tags: initialTags,
    media: [],
  };
}

// Read database
export function getBlogDatabase(): BlogDatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = createInitialDatabase();
      saveBlogDatabase(initialDb);
      return initialDb;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);

    // Verify minimum schema keys
    if (!parsed.users || !parsed.posts || !parsed.categories || !parsed.tags) {
      const initialDb = createInitialDatabase();
      saveBlogDatabase(initialDb);
      return initialDb;
    }
    return parsed as BlogDatabaseSchema;
  } catch (err) {
    console.error("[BLOG DB READ ERROR]:", err);
    return createInitialDatabase();
  }
}

// Asynchronously sync posts to Supabase table
export async function syncPostsToSupabase(posts: BlogPostRecord[]): Promise<void> {
  if (!supabaseAdmin || !posts || posts.length === 0) return;
  try {
    const records = posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content,
      cover_image: p.coverImage || null,
      author_name: p.authorName,
      author_role: p.authorRole,
      category_id: p.categoryId,
      category_name: p.categoryName,
      category_slug: p.categorySlug,
      tags: p.tags || [],
      status: p.status,
      reading_time: p.readingTime || "5 min",
      seo_title: p.seoTitle || null,
      seo_description: p.seoDescription || null,
      published_at: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      created_at: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
      updated_at: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
    }));

    const { error } = await supabaseAdmin.from("posts").upsert(records, { onConflict: "id" });
    if (error) {
      console.warn("[supabase] Failed syncing posts to Supabase:", error.message);
    } else {
      console.log("[supabase] Successfully synced posts to Supabase:", records.length);
    }
  } catch (err) {
    console.warn("[supabase] Exception syncing posts:", err);
  }
}

// Atomic database write with Supabase sync
export function saveBlogDatabase(db: BlogDatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);

    // Asynchronously sync posts to Supabase
    if (db.posts && db.posts.length > 0) {
      syncPostsToSupabase(db.posts);
    }
  } catch (err) {
    console.error("[BLOG DB WRITE ERROR]:", err);
  }
}

// Slug generator & validation helper
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Safe unique slug generator
export function getUniquePostSlug(desiredSlug: string, currentPostId?: string): string {
  const baseSlug = generateSlug(desiredSlug) || "untitled-post";
  const db = getBlogDatabase();
  let candidate = baseSlug;
  let counter = 1;

  while (
    db.posts.some((p) => p.slug === candidate && (!currentPostId || p.id !== currentPostId))
  ) {
    candidate = `${baseSlug}-${counter}`;
    counter++;
  }

  return candidate;
}

// Public Post Queries (Strictly filters for status === 'PUBLISHED')
export function getPublishedPosts(): BlogPostRecord[] {
  const db = getBlogDatabase();
  return db.posts
    .filter((p) => p.status === "PUBLISHED")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string, allowDrafts = false): BlogPostRecord | null {
  const db = getBlogDatabase();
  const post = db.posts.find((p) => p.slug === slug);
  if (!post) return null;
  if (!allowDrafts && post.status !== "PUBLISHED") return null;
  return post;
}

export function getPostsByCategory(categorySlug: string): BlogPostRecord[] {
  return getPublishedPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getPostsByTag(tag: string): BlogPostRecord[] {
  const normalized = tag.toLowerCase();
  return getPublishedPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === normalized)
  );
}

export function searchBlogPosts(query: string): BlogPostRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return getPublishedPosts();

  return getPublishedPosts().filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPostRecord[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const allPublished = getPublishedPosts().filter((p) => p.slug !== currentSlug);

  return allPublished
    .map((candidate) => {
      let score = 0;
      if (candidate.categorySlug === current.categorySlug) score += 5;
      const sharedTags = candidate.tags.filter((t) =>
        current.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
      );
      score += sharedTags.length * 2;
      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

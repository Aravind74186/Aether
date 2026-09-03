import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  getPostBySlug,
  getRelatedBlogPosts,
  getPublishedPosts,
} from "@/lib/blog-db";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { TableOfContents, TocItem } from "@/components/insights/TableOfContents";
import { SocialShareButtons } from "@/components/insights/SocialShareButtons";
import { BackToTop } from "@/components/insights/BackToTop";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const published = getPublishedPosts();
  return published.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post || post.status !== "PUBLISHED") {
    return {};
  }

  return createMetadata({
    title: post.seoTitle || `${post.title} | Aether Blog`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  // Draft, Scheduled, or non-existent articles are strictly hidden from public view
  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

  // Extract table of contents from markdown content
  const tocItems: TocItem[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const level = (match[1].length === 3 ? 3 : 2) as 2 | 3;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
    tocItems.push({ id, text: title, level });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.categoryName,
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 bg-white">
      <ReadingProgress />
      <BackToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.categoryName, href: `/blog/category/${post.categorySlug}` },
            { name: post.title },
          ]}
        />

        <div className="mb-6 pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all Blog Publications</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/blog/category/${post.categorySlug}`}>
              <Badge variant="brand">{post.categoryName}</Badge>
            </Link>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published {post.publishedAt}
              </span>
              {post.updatedAt && (
                <>
                  <span>•</span>
                  <span>Updated {post.updatedAt.split("T")[0]}</span>
                </>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Card & Social Share */}
          <div className="pt-2 pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-950">{post.authorName}</div>
                <div className="text-xs font-mono text-stone-500">{post.authorRole}</div>
              </div>
            </div>

            <SocialShareButtons title={post.title} url={articleUrl} />
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-4xl my-8 rounded-3xl overflow-hidden border border-stone-200 aspect-video bg-stone-50 shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          <main className="lg:col-span-8 space-y-12">
            {/* Key Takeaways if available */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-7 rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/30 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-700 font-bold">
                  <Bookmark className="w-4 h-4" />
                  <span>Key Architectural Takeaways</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile TOC */}
            {tocItems.length > 0 && (
              <div className="lg:hidden">
                <TableOfContents items={tocItems} />
              </div>
            )}

            {/* Markdown Content Body */}
            <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-wrap font-sans">
              {post.content}
            </div>

            {/* Tags */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Article Tags:
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`}
                    className="text-xs font-mono text-stone-700 hover:text-orange-600 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-orange-300 transition-colors shadow-2xs"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Share Bottom */}
            <div className="pt-6 pb-6 border-b border-stone-200">
              <SocialShareButtons title={post.title} url={articleUrl} />
            </div>

            {/* Required CTA */}
            <div className="my-12 rounded-3xl border border-orange-200/80 bg-gradient-to-r from-orange-50/90 via-white to-amber-50/40 p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-orange-700 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineering Collaboration</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                    Building something similar?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    We partner with schools, startups, and growing enterprises to design, architect, and engineer reliable digital platforms. Let&apos;s evaluate your technical requirements.
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href="/start-a-project"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold font-mono transition-colors shadow-sm"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-12 border-t border-stone-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-stone-950">Related Publications</h3>
                  <Link
                    href="/blog"
                    className="text-xs font-mono text-orange-600 hover:text-orange-700"
                  >
                    View all blog posts →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sticky Desktop TOC */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 space-y-8">
              <div className="sticky top-28 space-y-6">
                <TableOfContents items={tocItems} />

                {/* Author Card */}
                <div className="rounded-3xl border border-stone-200/90 bg-white p-6 space-y-3 text-xs shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-950">{post.authorName}</div>
                      <div className="text-xs font-mono text-stone-500">{post.authorRole}</div>
                    </div>
                  </div>
                  {post.authorBio && (
                    <p className="text-stone-600 leading-relaxed pt-1">{post.authorBio}</p>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </div>
  );
}

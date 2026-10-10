import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getPostsByTag, getPublishedPosts, getBlogDatabase } from "@/lib/blog-db";
import { createMetadata } from "@/lib/metadata";
import { ArrowLeft, Tag as TagIcon, BookOpen } from "lucide-react";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export function generateStaticParams() {
  const db = getBlogDatabase();
  return db.tags.map((t) => ({
    tag: encodeURIComponent(t.name.toLowerCase()),
  }));
}

export function generateMetadata({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tag);

  return createMetadata({
    title: `Articles tagged #${tagName} | Aether Blog`,
    description: `Engineering articles, tutorials, and architecture case studies tagged with #${tagName}.`,
    path: `/blog/tag/${params.tag}`,
  });
}

export default function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tag);
  const articles = getPostsByTag(tagName);
  const allPublished = getPublishedPosts();

  // Extract all active tags
  const tagSet = new Set<string>();
  allPublished.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  const allTags = Array.from(tagSet);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: "Tags", href: "/blog" },
            { name: `#${tagName}` },
          ]}
        />

        <div className="mb-6 pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all Blog Publications</span>
          </Link>
        </div>

        {/* Tag Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-orange-50 border border-orange-200 text-orange-700 font-semibold">
            <TagIcon className="w-3.5 h-3.5" />
            <span>Topic Tag</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            #{tagName}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineering write-ups, architecture breakdowns, and technical articles tagged with #{tagName}.
          </p>
        </div>

        {/* Related Tags */}
        <div className="pt-2 space-y-2">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Explore Other Topics:
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map((t) => (
              <Link
                key={t}
                href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`}
                className={`text-xs font-mono px-3 py-1 rounded-md border transition-colors ${
                  t.toLowerCase() === tagName.toLowerCase()
                    ? "bg-orange-600 border-orange-600 text-white font-semibold shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200">
            <span>
              Showing <strong className="text-slate-900">{articles.length}</strong>{" "}
              {articles.length === 1 ? "article" : "articles"} matching #{tagName}
            </span>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 mx-auto shadow-2xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No articles with this tag</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check our other topic categories or return to the main blog page.
              </p>
            </div>
          )}
        </div>
      </Container>

      <CTASection
        title="Ready to build your next product with clean engineering?"
        description="Let's discuss your project requirements and design an architecture built for long-term maintainability."
      />
    </div>
  );
}

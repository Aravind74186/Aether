import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { getPublishedPosts, getBlogDatabase } from "@/lib/blog-db";
import { createMetadata } from "@/lib/metadata";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { NewsletterSection } from "@/components/insights/NewsletterSection";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Server,
  GraduationCap,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Blog | Technology, Engineering & Startup Publications",
  description:
    "Practical ideas, engineering lessons, and technology insights from our journey building digital products for schools, startups, and growing enterprises.",
  path: "/blog",
});

const categoryIconMap: Record<string, React.ElementType> = {
  "ai-machine-learning": Sparkles,
  "software-engineering": Code2,
  "devops-cloud": Server,
  "education-technology": GraduationCap,
  "startup-engineering": Rocket,
  cybersecurity: ShieldCheck,
};

export default function BlogPage() {
  const publishedPosts = getPublishedPosts();
  const featuredPost = publishedPosts[0];
  const db = getBlogDatabase();

  // Extract tag counts from published posts only
  const tagMap = new Map<string, number>();
  publishedPosts.forEach((p) => {
    p.tags.forEach((t) => {
      tagMap.set(t, (tagMap.get(t) || 0) + 1);
    });
  });
  const tags = Array.from(tagMap.entries()).map(([name, count]) => ({ name, count }));

  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Blog" }]} />

        {/* Hero Section */}
        <div className="max-w-3xl space-y-4 pt-4">
          <Badge variant="brand">Aether Engineering Publications</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Technology, Engineering & Startup Blog
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
            Practical architectural patterns, production postmortems, and technical guides written by the engineers building software at Aether.
          </p>
        </div>

        {/* Featured Article Hero */}
        {featuredPost && (
          <div className="mt-12">
            <ArticleCard article={featuredPost} featured={true} />
          </div>
        )}

        {/* Discipline Categories Grid */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-mono">
              // Engineering Disciplines
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {db.categories.length} Specialized Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {db.categories.map((cat) => {
              const Icon = categoryIconMap[cat.slug] || Code2;
              const postCount = publishedPosts.filter(
                (p) => p.categorySlug === cat.slug
              ).length;

              return (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="group rounded-2xl border border-stone-200/90 bg-white p-5 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-stone-500">
                        {postCount} {postCount === 1 ? "article" : "articles"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Explore discipline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Live Search & Filter Engine */}
        <div className="mt-20">
          <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-lg font-bold text-stone-900 font-mono">
              // Publication Index & Search
            </h2>
            <Link
              href="/blog/search"
              className="text-xs font-mono text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>Dedicated Search Mode</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500 font-mono">Loading publications...</div>}>
            <BlogSearch
              articles={publishedPosts}
              categories={db.categories.map((c) => ({ slug: c.slug, name: c.name }))}
              tags={tags}
            />
          </Suspense>
        </div>

        {/* Topics Cloud */}
        <div className="mt-16 p-8 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-mono uppercase tracking-wider">
              Explore Popular Technology Tags
            </h3>
            <span className="text-xs font-mono text-stone-500 dark:text-slate-400">
              {tags.length} Active Tags
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.name}
                href={`/blog/tag/${encodeURIComponent(t.name.toLowerCase())}`}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-stone-200/90 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-2xs transition-all flex items-center gap-1.5"
              >
                <span>#{t.name}</span>
                <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded-full">
                  {t.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20">
          <NewsletterSection />
        </div>
      </Container>

      <CTASection
        title="Building a system that requires technical excellence?"
        description="Whether you need a custom web portal, an AI RAG pipeline, or scalable cloud infrastructure, our engineering team is ready to help."
      />
    </div>
  );
}

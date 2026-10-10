import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getPostsByCategory, getBlogDatabase } from "@/lib/blog-db";
import { createMetadata } from "@/lib/metadata";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  const db = getBlogDatabase();
  return db.categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const db = getBlogDatabase();
  const category = db.categories.find((c) => c.slug === params.category);
  if (!category) return {};

  return createMetadata({
    title: `${category.name} Engineering Blog | Aether`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const db = getBlogDatabase();
  const category = db.categories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const articles = getPostsByCategory(category.slug);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: "Categories", href: "/blog" },
            { name: category.name },
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

        {/* Category Hero Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Engineering Discipline</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-1">
            {category.description}
          </p>

          {/* Subtopic Tags */}
          {category.topics && category.topics.length > 0 && (
            <div className="pt-3 space-y-2">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-orange-600" />
                <span>Focus Topics:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.topics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/blog/tag/${encodeURIComponent(topic.toLowerCase())}`}
                    className="text-xs font-mono text-slate-700 hover:text-orange-600 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 transition-colors"
                  >
                    #{topic}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article Grid */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-200">
            <span>
              Showing <strong className="text-slate-900">{articles.length}</strong>{" "}
              {articles.length === 1 ? "article" : "articles"} in {category.name}
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
              <h3 className="text-lg font-bold text-slate-900">No articles published yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We are currently drafting technical publications for {category.name}. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </Container>

      <CTASection
        title={`Need specialized expertise in ${category.name}?`}
        description="Our engineering team builds custom digital systems, APIs, and cloud infrastructure tailored to your exact operational requirements."
      />
    </div>
  );
}

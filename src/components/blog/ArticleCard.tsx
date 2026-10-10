import React from "react";
import Link from "next/link";
import type { BlogPostRecord } from "@/lib/blog-db";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, User, Calendar, Sparkles } from "lucide-react";

interface ArticleCardProps {
  article: BlogPostRecord;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative rounded-3xl border border-orange-200/80 dark:border-orange-500/30 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/30 dark:from-[#0f172a] dark:via-[#131d33] dark:to-[#0f172a] p-6 sm:p-10 shadow-lg shadow-orange-500/5 dark:shadow-black/50 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-100/80 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-orange-700 dark:text-orange-300">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Publication
              </span>
              <Link
                href={`/blog/category/${article.categorySlug}`}
                className="hover:opacity-80 transition-opacity"
              >
                <Badge variant="brand">{article.categoryName}</Badge>
              </Link>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 dark:text-white group-hover:text-orange-600 transition-colors">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
                  <User className="w-3 h-3" />
                </div>
                <span className="text-stone-800 font-medium">{article.authorName}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.slice(0, 4).map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`}
                  className="text-xs font-mono text-stone-600 hover:text-stone-950 px-2.5 py-1 rounded-md bg-white border border-stone-200/80 shadow-2xs hover:border-orange-300 transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:self-end shrink-0">
            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all group-hover:translate-x-1"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard Article Card
  return (
    <article className="group rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/blog/category/${article.categorySlug}`}
            className="hover:opacity-80 transition-opacity"
          >
            <Badge variant="brand" size="sm">
              {article.categoryName}
            </Badge>
          </Link>
          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
            <Clock className="w-3 h-3" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-stone-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.slice(0, 3).map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`}
              className="text-[10px] font-mono text-stone-600 hover:text-stone-950 px-2 py-0.5 rounded bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors"
            >
              #{t}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-5 border-t border-stone-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-mono text-stone-600">
          <div className="w-5 h-5 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 text-[10px]">
            <User className="w-2.5 h-2.5" />
          </div>
          <span className="truncate max-w-[130px] font-medium">{article.authorName}</span>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

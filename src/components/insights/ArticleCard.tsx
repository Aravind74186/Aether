import React from "react";
import Link from "next/link";
import { InsightArticle } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, User, Calendar, Tag, Sparkles } from "lucide-react";

interface ArticleCardProps {
  article: InsightArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative rounded-3xl border border-orange-800/40 bg-gradient-to-b from-orange-950/30 via-slate-900/60 to-slate-900/40 p-6 sm:p-10 shadow-2xl hover:border-orange-700/60 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <Sparkles className="w-3 h-3" />
                Featured Publication
              </span>
              <Link
                href={`/insights/category/${article.categorySlug}`}
                className="hover:opacity-80 transition-opacity"
              >
                <Badge variant="brand">{article.category}</Badge>
              </Link>
              {article.isSample && (
                <span className="text-xs font-mono text-slate-500">// Sample Content</span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
              <Link href={`/insights/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
              {article.summary}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-950 border border-orange-800 flex items-center justify-center text-orange-400">
                  <User className="w-3 h-3" />
                </div>
                <span className="text-slate-200">{article.author.name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((t) => (
                <Link
                  key={t}
                  href={`/insights/tag/${encodeURIComponent(t.toLowerCase())}`}
                  className="text-xs font-mono text-slate-400 hover:text-orange-300 hover:bg-slate-800/80 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href={`/insights/${article.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-600/20"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 hover:border-slate-750 transition-all flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/insights/category/${article.categorySlug}`}
            className="hover:opacity-80 transition-opacity"
          >
            <Badge variant="outline">{article.category}</Badge>
          </Link>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors">
            <Link href={`/insights/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.slice(0, 3).map((t) => (
            <Link
              key={t}
              href={`/insights/tag/${encodeURIComponent(t.toLowerCase())}`}
              className="text-xs font-mono text-slate-400 hover:text-orange-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-850 transition-colors"
            >
              #{t}
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <div className="text-slate-500">
          <span>{article.publishedAt}</span>
        </div>
        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold"
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

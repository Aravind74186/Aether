"use client";

import React, { useState, useMemo, useEffect } from "react";
import { InsightArticle } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { Search, X, Filter, Tag, BookOpen, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface InsightsSearchProps {
  articles: InsightArticle[];
  categories: { slug: string; name: string }[];
  tags: { name: string; count: number }[];
  initialCategory?: string;
  initialTag?: string;
  initialQuery?: string;
  standalonePage?: boolean;
}

export function InsightsSearch({
  articles,
  categories,
  tags,
  initialCategory = "all",
  initialTag = "all",
  initialQuery = "",
  standalonePage = false,
}: InsightsSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery || searchParams.get("q") || "");
  const [category, setCategory] = useState(initialCategory || searchParams.get("category") || "all");
  const [selectedTag, setSelectedTag] = useState(initialTag || searchParams.get("tag") || "all");

  // Keep state synced with URL when props change
  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    const t = searchParams.get("tag");
    if (q !== null) setQuery(q);
    if (cat !== null) setCategory(cat);
    if (t !== null) setSelectedTag(t);
  }, [searchParams]);

  const updateURL = (newQ: string, newCat: string, newTag: string) => {
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    if (newCat && newCat !== "all") params.set("category", newCat);
    if (newTag && newTag !== "all") params.set("tag", newTag);

    const basePath = standalonePage ? "/insights/search" : "/insights";
    const queryString = params.toString();
    const newPath = queryString ? `${basePath}?${queryString}` : basePath;
    router.replace(newPath, { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateURL(val, category, selectedTag);
  };

  const handleCategorySelect = (catSlug: string) => {
    const next = category === catSlug ? "all" : catSlug;
    setCategory(next);
    updateURL(query, next, selectedTag);
  };

  const handleTagSelect = (tagName: string) => {
    const next = selectedTag === tagName ? "all" : tagName;
    setSelectedTag(next);
    updateURL(query, category, next);
  };

  const handleClearAll = () => {
    setQuery("");
    setCategory("all");
    setSelectedTag("all");
    const basePath = standalonePage ? "/insights/search" : "/insights";
    router.replace(basePath, { scroll: false });
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (category !== "all" && article.categorySlug !== category) {
        return false;
      }

      // Tag filter
      if (selectedTag !== "all") {
        const matchesTag = article.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );
        if (!matchesTag) return false;
      }

      // Search text query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const titleMatch = article.title.toLowerCase().includes(q);
        const summaryMatch = article.summary.toLowerCase().includes(q);
        const tagMatch = article.tags.some((t) => t.toLowerCase().includes(q));
        const authorMatch = article.author.name.toLowerCase().includes(q);
        const contentMatch = article.contentSections.some(
          (sec) =>
            sec.heading.toLowerCase().includes(q) ||
            sec.body.toLowerCase().includes(q)
        );
        return titleMatch || summaryMatch || tagMatch || authorMatch || contentMatch;
      }

      return true;
    });
  }, [articles, query, category, selectedTag]);

  const hasActiveFilters = query.trim() !== "" || category !== "all" || selectedTag !== "all";

  return (
    <div className="space-y-8">
      {/* Search Bar & Filter Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search engineering insights, RAG, PostgreSQL, Docker, security..."
              aria-label="Search articles"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono transition-colors"
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                aria-label="Clear search input"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5 text-red-400" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-orange-400" />
            <span>Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                category === "all"
                  ? "bg-orange-600 border border-orange-500 text-white font-semibold"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  category === cat.slug
                    ? "bg-orange-600 border border-orange-500 text-white font-semibold"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="space-y-2 pt-2 border-t border-slate-850">
          <div className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-orange-400" />
            <span>Topics & Tags:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 10).map((t) => (
              <button
                key={t.name}
                onClick={() => handleTagSelect(t.name)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedTag.toLowerCase() === t.name.toLowerCase()
                    ? "bg-orange-500/20 border border-orange-400 text-orange-300 font-semibold"
                    : "bg-slate-950/80 border border-slate-850 text-slate-400 hover:text-slate-200"
                }`}
              >
                #{t.name} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
        <div>
          Showing <span className="text-white font-semibold">{filteredArticles.length}</span>{" "}
          {filteredArticles.length === 1 ? "article" : "articles"}
          {query && (
            <span>
              {" "}
              matching <span className="text-orange-400 font-semibold">&ldquo;{query}&rdquo;</span>
            </span>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-center text-slate-400 mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No articles matched your search</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Try adjusting your query, clearing the category filter, or exploring one of our primary technology disciplines below.
          </p>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-semibold transition-colors"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

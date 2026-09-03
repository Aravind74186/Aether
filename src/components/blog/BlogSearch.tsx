"use client";

import React, { useState, useMemo, useEffect } from "react";
import type { BlogPostRecord } from "@/lib/blog-db";
import { ArticleCard } from "./ArticleCard";
import { Search, X, Filter, Tag, BookOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogSearchProps {
  articles: BlogPostRecord[];
  categories: { slug: string; name: string }[];
  tags: { name: string; count: number }[];
  standalonePage?: boolean;
}

export function BlogSearch({
  articles,
  categories,
  tags,
  standalonePage = false,
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "all");

  // Keep state in sync with URL params
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("category") || "all";
    const t = searchParams.get("tag") || "all";
    setQuery(q);
    setCategory(cat);
    setSelectedTag(t);
  }, [searchParams]);

  const updateUrl = (newQuery: string, newCat: string, newTag: string) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set("q", newQuery.trim());
    if (newCat !== "all") params.set("category", newCat);
    if (newTag !== "all") params.set("tag", newTag);

    const basePath = standalonePage ? "/blog/search" : "/blog";
    const queryString = params.toString();
    const targetUrl = queryString ? `${basePath}?${queryString}` : basePath;
    router.replace(targetUrl, { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, category, selectedTag);
  };

  const handleCategorySelect = (slug: string) => {
    const newCat = category === slug ? "all" : slug;
    setCategory(newCat);
    updateUrl(query, newCat, selectedTag);
  };

  const handleTagSelect = (tagName: string) => {
    const newTag = selectedTag.toLowerCase() === tagName.toLowerCase() ? "all" : tagName;
    setSelectedTag(newTag);
    updateUrl(query, category, newTag);
  };

  const handleClearAll = () => {
    setQuery("");
    setCategory("all");
    setSelectedTag("all");
    const basePath = standalonePage ? "/blog/search" : "/blog";
    router.replace(basePath, { scroll: false });
  };

  // Filtered articles computation
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (category !== "all" && article.categorySlug !== category) {
        return false;
      }

      if (selectedTag !== "all") {
        const matchesTag = article.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );
        if (!matchesTag) return false;
      }

      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const titleMatch = article.title.toLowerCase().includes(q);
        const excerptMatch = article.excerpt.toLowerCase().includes(q);
        const contentMatch = article.content.toLowerCase().includes(q);
        const tagMatch = article.tags.some((t) => t.toLowerCase().includes(q));
        const authorMatch = article.authorName.toLowerCase().includes(q);
        return titleMatch || excerptMatch || contentMatch || tagMatch || authorMatch;
      }

      return true;
    });
  }, [articles, query, category, selectedTag]);

  const hasActiveFilters = query.trim() !== "" || category !== "all" || selectedTag !== "all";

  return (
    <div className="space-y-8">
      {/* Search Bar & Filter Controls */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search engineering blog, RAG, PostgreSQL, Docker, cloud..."
              aria-label="Search blog articles"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 font-mono transition-colors"
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                aria-label="Clear search input"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-red-500" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-stone-500 font-semibold tracking-wider flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-orange-600" />
            <span>Discipline:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                category === "all"
                  ? "bg-orange-600 border border-orange-600 text-white font-semibold shadow-xs"
                  : "bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100"
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
                    ? "bg-orange-600 border border-orange-600 text-white font-semibold shadow-xs"
                    : "bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="text-xs font-mono uppercase text-stone-500 font-semibold tracking-wider flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-orange-600" />
            <span>Topics & Tags:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 10).map((t) => (
              <button
                key={t.name}
                onClick={() => handleTagSelect(t.name)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedTag.toLowerCase() === t.name.toLowerCase()
                    ? "bg-orange-600 border border-orange-600 text-white font-semibold shadow-xs"
                    : "bg-stone-50 border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-stone-900"
                }`}
              >
                #{t.name} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredArticles.length}</strong>{" "}
          {filteredArticles.length === 1 ? "result" : "results"}
          {query ? ` for "${query}"` : ""}
          {category !== "all" ? ` in ${category}` : ""}
          {selectedTag !== "all" ? ` tagged #${selectedTag}` : ""}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-orange-600 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 mx-auto shadow-2xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching publications</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No engineering write-ups matched your active query. Try searching for broader terms like &quot;database&quot;, &quot;architecture&quot;, or &quot;API&quot;.
          </p>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-mono hover:bg-orange-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

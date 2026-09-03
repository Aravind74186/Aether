import React from "react";
import { InsightArticle } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface RelatedArticlesProps {
  articles: InsightArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-800 space-y-8">
      <SectionHeader
        badge="Related Research"
        title="Continue Reading"
        description="Further architectural write-ups and engineering lessons from our technical team."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

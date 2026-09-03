import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { getPublishedPosts, getBlogDatabase } from "@/lib/blog-db";
import { createMetadata } from "@/lib/metadata";
import { Loader2 } from "lucide-react";

export const metadata = createMetadata({
  title: "Search Engineering Blog | Aether",
  description:
    "Search through technical articles, architectural guides, tutorials, and engineering write-ups from Aether Technologies.",
  path: "/blog/search",
});

export default function SearchPage() {
  const publishedPosts = getPublishedPosts();
  const db = getBlogDatabase();

  const tagMap = new Map<string, number>();
  publishedPosts.forEach((p) => {
    p.tags.forEach((t) => {
      tagMap.set(t, (tagMap.get(t) || 0) + 1);
    });
  });
  const tags = Array.from(tagMap.entries()).map(([name, count]) => ({ name, count }));
  const categories = db.categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <div className="py-12 sm:py-16 space-y-16 bg-white">
      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: "Search" },
          ]}
        />

        {/* Hero Header */}
        <div className="max-w-3xl space-y-4 pt-4">
          <Badge variant="brand">Publication Search</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Search Engineering Blog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Query across technical titles, summaries, code topics, and architectural deep dives.
          </p>
        </div>

        {/* Search & Results */}
        <div className="mt-12">
          <Suspense
            fallback={
              <div className="p-12 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                <span>Initializing search engine...</span>
              </div>
            }
          >
            <BlogSearch
              articles={publishedPosts}
              categories={categories}
              tags={tags}
              standalonePage={true}
            />
          </Suspense>
        </div>
      </Container>

      <CTASection
        title="Can't find the architectural guidance you need?"
        description="Reach out to our engineering team directly for a tailored consultation on your application stack."
      />
    </div>
  );
}

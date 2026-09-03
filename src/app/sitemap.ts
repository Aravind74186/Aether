import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { caseStudiesData } from "@/data/case-studies";
import { getPublishedPosts, getBlogDatabase } from "@/lib/blog-db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Core static public routes (Admin routes are strictly omitted from indexing)
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/case-studies",
    "/estimator",
    "/slides",
    "/proposal-builder",
    "/msa-generator",
    "/benchmark",
    "/onboarding",
    "/audit-tool",
    "/architecture-designer",
    "/compare",
    "/trust",
    "/docs",
    "/status",
    "/client-portal-preview",
    "/projects",
    "/process",
    "/technology",
    "/blog",
    "/blog/search",
    "/contact",
    "/start-a-project",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Case Studies
  const caseStudyRoutes = caseStudiesData.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const db = getBlogDatabase();
  const publishedPosts = getPublishedPosts();

  // Dynamic Published Blog Articles
  const blogRoutes = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Blog Categories
  const categoryRoutes = db.categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic Blog Tags
  const tagRoutes = db.tags.map((t) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(t.name.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...blogRoutes,
  ];
}

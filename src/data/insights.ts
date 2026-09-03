import { InsightArticle } from "@/types";
import { authorsData } from "./authors";

export const insightsData: InsightArticle[] = [
  {
    id: "building-production-ready-rag-application",
    slug: "building-production-ready-rag-application",
    title: "Building a Production-Ready RAG Application: Architecture & Hallucination Elimination",
    summary:
      "A complete engineering breakdown of designing verifiable Retrieval-Augmented Generation systems with hybrid vector/keyword retrieval, strict chunk boundaries, and automated citation guardrails.",
    excerpt:
      "Deploying enterprise RAG requires moving beyond toy tutorial scripts. Learn how to architect hybrid retrieval, enforce coordinate-level citations, and eliminate hallucinations.",
    category: "AI & Machine Learning",
    categorySlug: "ai-machine-learning",
    tags: ["RAG", "Generative AI", "Vector Databases", "Document Intelligence", "Python"],
    readTime: "9 min read",
    publishedAt: "2025-01-18",
    updatedAt: "2025-01-25",
    author: authorsData["ai-systems"],
    isSample: true,
    featured: true,
    status: "published",
    seoTitle: "Building a Production-Ready RAG Application | Aether Insights",
    seoDescription: "Learn how to architect verifiable RAG pipelines with hybrid search, deterministic citations, and hallucination guardrails for production applications.",
    keyTakeaways: [
      "Semantic chunking with header hierarchy retention eliminates 80% of retrieval context corruption.",
      "Hybrid retrieval (BM25 lexical scoring + dense vector similarity) outperforms pure vector search for structured identifiers and dates.",
      "Strict system prompt constraints coupled with a minimum cosine distance threshold guarantee deterministic fallback when queries lack grounding.",
      "Always emit coordinate or page-level citations to empower end-user verification.",
    ],
    contentSections: [
      {
        heading: "The Problem with Naive RAG Implementations",
        subheading: "Why basic vector search pipelines fail in production",
        body: "Most generative AI tutorials demonstrate RAG using 10 lines of LangChain code: read a PDF, split by arbitrary 500-token chunks, embed into an in-memory vector store, and prompt GPT-4 to answer. In production, this naive pipeline catastrophically fails. Tables get cleaved in half, numerical values lose their column headers, and the language model confidently hallucinates when asked about specific regulation numbers that were split across chunk boundaries.",
        callout: {
          type: "warning",
          title: "The Risk of Plausible Fabrication",
          content: "In institutional and business environments (legal, finance, medical, administrative), an AI model returning an articulate but subtly incorrect answer creates immense liability. A verifiable system must prefer explicit refusal over probabilistic fabrication.",
        },
      },
      {
        heading: "Architecture & Multi-Stage Retrieval Pipeline",
        subheading: "End-to-end data flow from document ingestion to synthesized response",
        body: "To build a production system, we separate the pipeline into four deterministic phases: structural document ingestion, hybrid reciprocal-rank fusion (RRF) retrieval, contextual re-ranking, and guarded generation with provenance citations.",
        table: {
          headers: ["Pipeline Stage", "Primary Technology", "Production Metric Target"],
          rows: [
            ["Document Parsing", "PyMuPDF / Custom AST Parser", "Preserve 100% table matrix geometry"],
            ["Vector + Keyword Index", "PostgreSQL (pgvector + tsvector)", "< 45ms retrieval latency across 500k chunks"],
            ["Cross-Encoder Re-rank", "FlashRank / bge-reranker-small", "Top-3 document relevance > 94%"],
            ["Guarded Synthesis", "Claude 3.5 Sonnet / GPT-4o with Structured Outputs", "Zero uncited factual assertions"],
          ],
          caption: "Table 1: Production RAG pipeline stages and SLA benchmarks",
        },
      },
      {
        heading: "Implementation: Hybrid Retrieval Engine",
        subheading: "Combining pgvector dense search with PostgreSQL tsvector full-text search",
        body: "Here is an idiomatic implementation of Reciprocal Rank Fusion inside a single PostgreSQL query, avoiding the operational complexity of maintaining external vector databases:",
        codeSnippet: {
          language: "sql",
          filename: "hybrid_rag_query.sql",
          code: `-- Hybrid Search with Reciprocal Rank Fusion (RRF)
WITH semantic_search AS (
  SELECT id, document_id, content, page_number,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $query_embedding) AS rank
  FROM document_chunks
  WHERE organization_id = $org_id
  LIMIT 30
),
keyword_search AS (
  SELECT id, document_id, content, page_number,
         ROW_NUMBER() OVER (ORDER BY ts_rank(tsv, plainto_tsquery('english', $query_text)) DESC) AS rank
  FROM document_chunks
  WHERE organization_id = $org_id AND tsv @@ plainto_tsquery('english', $query_text)
  LIMIT 30
)
SELECT COALESCE(s.id, k.id) AS chunk_id,
       COALESCE(s.content, k.content) AS content,
       COALESCE(s.page_number, k.page_number) AS page_number,
       (COALESCE(1.0 / (60 + s.rank), 0.0) + COALESCE(1.0 / (60 + k.rank), 0.0)) AS rrf_score
FROM semantic_search s
FULL OUTER JOIN keyword_search k ON s.id = k.id
ORDER BY rrf_score DESC
LIMIT 5;`,
        },
      },
      {
        heading: "Security & Multi-Tenant Access Control",
        subheading: "Preventing cross-tenant data leakage at the query layer",
        body: "Never filter access control in application memory after retrieving vectors. Every vector search query must enforce tenant isolation directly at the database engine level using Row-Level Security (RLS) or indexed tenant foreign keys.",
        listItems: [
          "Mandate mandatory tenant_id equality filters in WHERE clauses prior to vector distance calculations.",
          "Encrypt vector embedding stores at rest using AES-256.",
          "Sanitize document metadata to strip internal corporate file paths, author personal data, and local server hostnames.",
        ],
      },
      {
        heading: "Testing & Automated Groundedness Validation",
        subheading: "Quantifying hallucinations with deterministic unit tests",
        body: "We test RAG pipelines with an automated verification harness that checks three quantitative scores: Context Precision, Context Recall, and Faithfulness. If an answer includes claims not present in the retrieved chunks, the integration test fails automatically in CI.",
        callout: {
          type: "tip",
          title: "CI/CD Evaluation Habit",
          content: "Run a golden dataset of 50 challenging test questions against every deployment. Track retrieval rank degradation and citation precision before promoting any prompt or model update to production.",
        },
      },
      {
        heading: "Production Considerations & Lessons Learned",
        subheading: "Key operational takeaways from real-world deployments",
        body: "Start simple before adopting complex agentic workflows. In 90% of business applications, a clean PostgreSQL hybrid search with an efficient re-ranker delivers higher accuracy, lower latency, and 80% lower cloud hosting costs than multi-agent frameworks.",
      },
    ],
  },
  {
    id: "why-postgres-over-nosql-for-startups",
    slug: "why-we-default-to-postgres-for-startups-and-institutions",
    title: "Why We Default to PostgreSQL for 90% of Startups & Institutions",
    summary:
      "A pragmatic engineering analysis of why relational ACID guarantees, JSONB semi-structured storage, and battle-tested operational stability make PostgreSQL the optimal foundation.",
    excerpt:
      "Avoid the premature multi-database trap. Discover how modern PostgreSQL comfortably handles relational data, JSON documents, full-text search, and vectors in a single engine.",
    category: "Software Engineering",
    categorySlug: "software-engineering",
    tags: ["Databases", "PostgreSQL", "Architecture", "Backend", "Performance"],
    readTime: "7 min read",
    publishedAt: "2024-11-15",
    updatedAt: "2025-01-10",
    author: authorsData["engineering-team"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Why PostgreSQL is the Default Choice for Modern Startups | Aether",
    seoDescription: "An engineering perspective on why relational integrity, JSONB, and extensions make PostgreSQL the ideal single-database architecture for startups.",
    keyTakeaways: [
      "ACID transactions eliminate silent data discrepancies in financial, inventory, and attendance records.",
      "JSONB columns allow rapid prototyping with NoSQL flexibility while retaining strict relational constraints on critical entities.",
      "Native full-text indexing and pgvector eliminate the operational complexity of syncing Elasticsearch or dedicated vector databases during early stages.",
      "A single managed database instance dramatically simplifies disaster recovery, backup automation, and connection management.",
    ],
    contentSections: [
      {
        heading: "The Premature Multi-Database Trap",
        subheading: "The hidden operational overhead of fragmented data stores",
        body: "Early-stage software projects often adopt fragmented stacks prematurely: MongoDB for documents, Redis for sessions, Pinecone for embeddings, and Elasticsearch for queries. This introduces immense operational friction—syncing data across four stores, writing two-phase commit logic, and troubleshooting network partitions before validating core product demand.",
      },
      {
        heading: "The Modern PostgreSQL Unified Capability Set",
        subheading: "Consolidating multiple paradigms into one rock-solid runtime",
        body: "PostgreSQL is not the rigid tabular system of twenty years ago. With modern extensions and GIN indexes, PostgreSQL seamlessly handles multiple storage paradigms with superior performance.",
        table: {
          headers: ["Workload Type", "PostgreSQL Native Tooling", "External Specialized Alternative"],
          rows: [
            ["Relational / Financial", "B-Tree, Foreign Keys, ACID Isolation", "MySQL, Oracle"],
            ["Document / JSON", "JSONB with GIN index path queries", "MongoDB, DynamoDB"],
            ["Text Search", "tsvector, tsquery, pg_trgm fuzzy matching", "Elasticsearch, OpenSearch"],
            ["Vector Embeddings", "pgvector (HNSW / IVFFlat indexing)", "Pinecone, Qdrant"],
          ],
          caption: "Table 1: How PostgreSQL replaces multiple external specialized services",
        },
      },
      {
        heading: "Implementation: Combining Strict Relations with Dynamic JSONB",
        subheading: "A hybrid schema pattern for evolving product requirements",
        body: "Here is the production schema pattern we use for multi-tenant organizational platforms that need dynamic configuration fields without breaking relational integrity:",
        codeSnippet: {
          language: "sql",
          filename: "hybrid_schema.sql",
          code: `-- Normalized Core with Typed JSONB Extension Attributes
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast Indexing on Nested JSON Attributes
CREATE INDEX idx_user_records_metadata_department 
ON user_records ((metadata->>'department'));`,
        },
      },
      {
        heading: "Conclusion: Pragmatic Engineering Over Resume-Driven Architecture",
        subheading: "Choosing boring technology that survives",
        body: "PostgreSQL has survived 30 years of technological hype cycles because it prioritizes data safety above all else. When you build on PostgreSQL, you are choosing software that won't lose your client's data when the power fluctuates.",
      },
    ],
  },
  {
    id: "building-secure-authentication-modern-web",
    slug: "building-secure-authentication-for-modern-web-applications",
    title: "Building Secure Authentication for Modern Web Applications",
    summary:
      "A hands-on guide to implementing defensible session security, HTTP-only cookie encryption, and role-based authorization without leaking credentials.",
    excerpt:
      "Learn the core security patterns behind production session management: HTTP-only cookies, server-side session invalidation, CSRF mitigation, and role-based access control.",
    category: "Cybersecurity",
    categorySlug: "cybersecurity",
    tags: ["Authentication", "Security", "JWT", "RBAC", "TypeScript", "Next.js"],
    readTime: "8 min read",
    publishedAt: "2025-01-22",
    updatedAt: "2025-01-28",
    author: authorsData["cloud-security"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Secure Web Authentication & Session Architecture | Aether Insights",
    seoDescription: "A deep dive into secure authentication: HTTP-only encrypted cookies, server-side token invalidation, and role-based access controls.",
    keyTakeaways: [
      "Never store authorization tokens in localStorage or sessionStorage where XSS vulnerabilities can extract them.",
      "Combine signed HTTP-only cookies with server-side session revocation for true logout capability.",
      "Enforce Role-Based Access Control (RBAC) at the server layer rather than relying on UI component hiding.",
      "Implement cryptographically random token generation and constant-time string comparison to prevent timing attacks.",
    ],
    contentSections: [
      {
        heading: "The Danger of Client-Side Token Storage",
        subheading: "Why localStorage is an anti-pattern for sensitive authorization tokens",
        body: "Many modern single-page applications take JWTs returned from an API and save them directly into browser `localStorage`. This is a critical security vulnerability: any third-party npm dependency or malicious script injected via an XSS flaw can access `localStorage.getItem('token')` and permanently hijack user accounts without needing their password.",
        callout: {
          type: "important",
          title: "The Golden Rule of Session Storage",
          content: "Authentication tokens should reside strictly in HTTP-only, Secure cookies configured with SameSite=Lax or SameSite=Strict. JavaScript code running in the browser cannot read HTTP-only cookies.",
        },
      },
      {
        heading: "Implementation: Secure Session Route Handler",
        subheading: "Setting encrypted session cookies in Next.js Server Actions / API routes",
        body: "Here is the production cookie configuration pattern used across Aether web applications:",
        codeSnippet: {
          language: "typescript",
          filename: "auth-cookie-handler.ts",
          code: `import { NextResponse } from "next/server";

export function setSessionCookie(response: NextResponse, sessionToken: string): void {
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: "aether_session_token",
    value: sessionToken,
    httpOnly: true,
    secure: isProduction, // Enforces HTTPS transmission
    sameSite: "lax",      // Defends against CSRF while permitting top-level navigation
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    path: "/",
  });
}`,
        },
      },
      {
        heading: "Enforcing Granular RBAC on Server Routes",
        subheading: "Moving beyond basic authenticated/unauthenticated boolean checks",
        body: "Real-world institutional and B2B platforms require granular roles (SuperAdmin, Admin, Editor, Viewer). Middleware and server endpoints must verify permissions hierarchically against an immutable session payload rather than trusting client-supplied role parameters.",
      },
    ],
  },
  {
    id: "digitizing-school-operations-without-software-bloat",
    slug: "digitizing-school-operations-without-software-bloat",
    title: "Digitizing School Operations Without Clunky Enterprise Bloat",
    summary:
      "Why legacy school management software fails classroom teachers, and how lightweight, mobile-first web platforms transform educational administrative efficiency in weeks.",
    excerpt:
      "Classroom software should take seconds, not minutes. Discover how modern responsive web tools eliminate attendance friction and manual gradebook calculation.",
    category: "Education Technology",
    categorySlug: "education-technology",
    tags: ["EdTech", "School Software", "PWA", "UX Design", "Productivity"],
    readTime: "6 min read",
    publishedAt: "2025-01-10",
    updatedAt: "2025-01-20",
    author: authorsData["engineering-team"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Digitizing School Operations & Campus Management | Aether Insights",
    seoDescription: "Practical lessons on engineering lightweight, mobile-responsive school management tools that teachers actually love using.",
    keyTakeaways: [
      "Teachers abandon software that takes more than 60 seconds to perform routine daily workflows like attendance roll-call.",
      "Mobile-responsive web platforms eliminate the friction of requiring parents and staff to download bloated native store apps.",
      "Optimistic UI updates ensure instantaneous user feedback even during campus network drops.",
      "Automated term fee reconciliation saves administrative bursars dozens of hours each academic semester.",
    ],
    contentSections: [
      {
        heading: "The Usability Crisis in Educational Administration",
        subheading: "Why teachers continue keeping duplicate paper registers",
        body: "Most educational institutions struggle with legacy software dating back to the early 2000s. These desktop tools require Windows machines, require manual server backups, and feature labyrinthine menus. Because taking roll-call takes 10 minutes on a slow computer, teachers keep paper diaries and transfer data hours later, introducing clerical errors and exhausting staff.",
      },
      {
        heading: "Principles for High-Adoption Educational Web Apps",
        subheading: "Four non-negotiable engineering principles",
        body: "When designing CampusFlow and institutional portals at Aether, we adhere to four rules:",
        listItems: [
          "Zero-Click Defaults: Assume 100% attendance by default; teachers only tap to mark absentees, cutting roll-call duration to under 30 seconds.",
          "Mobile-First Access: Works on budget smartphones in low-connectivity classrooms.",
          "Instant Parent Dispatch: Automated SMS/email alerts trigger directly from attendance completion with zero manual data entry.",
          "Clean PDF Generation: Grade cards and report sheets render into downloadable vector PDFs in under 800ms.",
        ],
      },
    ],
  },
  {
    id: "from-idea-to-mvp-practical-approach",
    slug: "from-idea-to-mvp-a-practical-software-development-approach",
    title: "From Idea to MVP: A Pragmatic Engineering Roadmap for Founders",
    summary:
      "How early-stage startup founders can scope, architect, and ship a defensible Minimum Viable Product in 6 to 8 weeks without incurring crippling technical debt.",
    excerpt:
      "Shipping fast doesn't require writing sloppy code. Learn how to scope ruthless MVPs, establish clean modular boundaries, and reach initial users quickly.",
    category: "Startup Engineering",
    categorySlug: "startup-engineering",
    tags: ["MVP", "Startup", "Product Engineering", "TypeScript", "Next.js"],
    readTime: "7 min read",
    publishedAt: "2025-01-26",
    updatedAt: "2025-01-30",
    author: authorsData["engineering-team"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Practical MVP Development Roadmap for Startups | Aether Insights",
    seoDescription: "A pragmatic guide to scoping and shipping startup MVPs in 6-8 weeks using disciplined architecture and high-leverage frameworks.",
    keyTakeaways: [
      "An MVP is not a broken version of a final product; it is the simplest complete solution to one high-priority bottleneck.",
      "TypeScript + PostgreSQL + Next.js delivers the fastest velocity-to-stability ratio for B2B applications.",
      "Never build custom billing, auth, or email infrastructure when battle-tested APIs exist.",
      "Enforce database constraints on day one; retrofitting relational integrity onto a messy production database costs months.",
    ],
    contentSections: [
      {
        heading: "The Scope Creep Disease",
        subheading: "The number one reason early-stage MVPs run out of capital",
        body: "Startups do not fail from lack of features; they fail from building the wrong features before validating real demand. When scoping an MVP, eliminate every feature that does not directly solve the single most acute pain point of your primary customer persona.",
      },
      {
        heading: "The 8-Week Execution Framework",
        subheading: "Weekly milestone schedule from zero to production staging",
        body: "A structured sprint schedule keeps development disciplined and predictable:",
        table: {
          headers: ["Week", "Sprint Milestone", "Deliverable"],
          rows: [
            ["Week 1-2", "Discovery & Architecture", "ERD database schema, wireframes, API contracts"],
            ["Week 3-4", "Core Data Layer & Auth", "PostgreSQL tables, session auth, seed data"],
            ["Week 5-6", "Primary User Workflows", "CRUD interfaces, forms, business logic"],
            ["Week 7", "Integration & QA", "Email dispatch, automated test suite, error tracking"],
            ["Week 8", "Production Deployment", "Domain DNS, SSL, cloud staging, analytics"],
          ],
          caption: "Table 1: 8-week production MVP sprint cadence",
        },
      },
    ],
  },
  {
    id: "local-ai-vs-cloud-ai-tradeoffs",
    slug: "local-ai-vs-cloud-ai-understanding-the-trade-offs",
    title: "Local AI vs Cloud AI: Evaluating Privacy, Latency & Infrastructure Costs",
    summary:
      "A technical comparison of self-hosting open-weight models (Llama 3, DeepSeek, Mistral) via vLLM/Ollama versus calling managed cloud APIs (Claude, OpenAI).",
    excerpt:
      "Should your application run on-premises open-weight models or managed cloud endpoints? We analyze compute costs, data governance, and operational reality.",
    category: "AI & Machine Learning",
    categorySlug: "ai-machine-learning",
    tags: ["Local AI", "Cloud AI", "Ollama", "vLLM", "Cost Optimization"],
    readTime: "8 min read",
    publishedAt: "2025-01-28",
    author: authorsData["ai-systems"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Local AI vs Cloud AI: Complete Engineering Trade-Off Guide | Aether",
    seoDescription: "Examine the technical trade-offs between self-hosted open-weight LLMs and managed cloud AI APIs for privacy, latency, and cloud budgets.",
    keyTakeaways: [
      "Cloud AI endpoints offer superior reasoning-per-dollar for variable and low-to-moderate volume workloads.",
      "Local/On-Premise inference is non-negotiable for strict healthcare, banking, or defense data residency compliance.",
      "Self-hosting models introduces non-trivial GPU cluster orchestration, cold-start latency, and driver maintenance overhead.",
      "A hybrid architecture (local embeddings + cloud synthesis with anonymized PII) frequently delivers the optimal balance.",
    ],
    contentSections: [
      {
        heading: "The Economic Calculation: API Calls vs Dedicated GPU Rentals",
        subheading: "Breaking down the real costs of self-hosted vLLM servers",
        body: "Many teams jump to self-hosting models under the assumption that it will be cheaper than cloud token fees. However, running an 8x A100 or H100 GPU cluster 24/7 costs upwards of $2,500 to $5,000 per month. Unless your application handles millions of tokens every day, managed API calls with pay-per-token pricing are significantly more cost-effective.",
      },
      {
        heading: "When Local Models Are Unquestionably Required",
        subheading: "Data sovereignty, offline environments, and regulatory fences",
        body: "Local inference is required in three clear scenarios: institutions with strict air-gapped security, organizations forbidden by privacy regulations from sending customer data across international borders, and field software operating on edge devices with intermittent internet connectivity.",
      },
    ],
  },
  {
    id: "docker-patterns-for-reliable-node-deployments",
    slug: "docker-patterns-for-reliable-node-deployments",
    title: "Production Docker Patterns for Reliable Next.js & Node Deployments",
    summary:
      "Proven multi-stage Dockerfile patterns that reduce container image sizes by 80%, secure non-root processes, and ensure deterministic cloud builds.",
    excerpt:
      "Cut build times and shrink container footprints. Learn how multi-stage Docker builds create minimal, secure production containers for Next.js applications.",
    category: "DevOps & Cloud",
    categorySlug: "devops-cloud",
    tags: ["Docker", "DevOps", "Containers", "Next.js", "CI/CD"],
    readTime: "6 min read",
    publishedAt: "2025-01-14",
    author: authorsData["cloud-security"],
    isSample: true,
    featured: false,
    status: "published",
    seoTitle: "Production Dockerfile Patterns for Next.js | Aether Insights",
    seoDescription: "Step-by-step guide to writing lean, secure, multi-stage Dockerfiles for Next.js App Router applications with non-root security.",
    keyTakeaways: [
      "Multi-stage Docker builds eliminate npm development dependencies from the final production runner container.",
      "Always run applications under a dedicated unprivileged user (non-root) to mitigate container escape vulnerabilities.",
      "Use Docker layer caching effectively by copying package.json and lockfiles before source code.",
      "Leverage Next.js standalone output to bundle only strictly necessary node_modules.",
    ],
    contentSections: [
      {
        heading: "Why Default Dockerfiles Create Bloated Containers",
        subheading: "The cost of shipping developer tooling to production servers",
        body: "A single `npm install` in modern web projects often pulls hundreds of megabytes of compilers, TypeScript tools, and linters. Shipping this entire tree into production containers bloats image sizes past 1.5 GB, slows down CI/CD deployments, and increases security attack surfaces.",
      },
      {
        heading: "The Multi-Stage Solution",
        subheading: "Separating dependencies, compilation, and lightweight execution",
        body: "By employing multi-stage Docker builds, we split the workflow into three isolated environments: dependency caching, compilation, and a minimal unprivileged runner image:",
        codeSnippet: {
          language: "dockerfile",
          filename: "Dockerfile",
          code: `# Multi-stage lean Next.js Dockerfile
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]`,
        },
      },
    ],
  },
];

export function getPublishedArticles(): InsightArticle[] {
  return insightsData
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedArticle(): InsightArticle | undefined {
  return insightsData.find((a) => a.featured && a.status === "published") || getPublishedArticles()[0];
}

export function getArticlesByCategory(categorySlug: string): InsightArticle[] {
  return getPublishedArticles().filter((a) => a.categorySlug === categorySlug);
}

export function getArticlesByTag(tag: string): InsightArticle[] {
  const normalized = tag.toLowerCase();
  return getPublishedArticles().filter((a) =>
    a.tags.some((t) => t.toLowerCase() === normalized)
  );
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap: Record<string, number> = {};
  getPublishedArticles().forEach((a) => {
    a.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function searchArticles(query: string, categoryFilter?: string, tagFilter?: string): InsightArticle[] {
  let articles = getPublishedArticles();

  if (categoryFilter && categoryFilter !== "all") {
    articles = articles.filter((a) => a.categorySlug === categoryFilter);
  }

  if (tagFilter && tagFilter !== "all") {
    const normalizedTag = tagFilter.toLowerCase();
    articles = articles.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === normalizedTag)
    );
  }

  if (!query || query.trim() === "") {
    return articles;
  }

  const q = query.toLowerCase().trim();
  return articles.filter((a) => {
    const titleMatch = a.title.toLowerCase().includes(q);
    const summaryMatch = a.summary.toLowerCase().includes(q);
    const tagMatch = a.tags.some((t) => t.toLowerCase().includes(q));
    const contentMatch = a.contentSections.some(
      (sec) =>
        sec.heading.toLowerCase().includes(q) ||
        sec.body.toLowerCase().includes(q)
    );
    return titleMatch || summaryMatch || tagMatch || contentMatch;
  });
}

export function getRelatedArticles(currentSlug: string, count: number = 3): InsightArticle[] {
  const current = insightsData.find((a) => a.slug === currentSlug);
  if (!current) return getPublishedArticles().slice(0, count);

  const others = getPublishedArticles().filter((a) => a.slug !== currentSlug);

  // Score articles by matching category and common tags
  const scored = others.map((article) => {
    let score = 0;
    if (article.categorySlug === current.categorySlug) score += 3;
    const commonTags = article.tags.filter((t) => current.tags.includes(t));
    score += commonTags.length * 2;
    return { article, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.article);
}

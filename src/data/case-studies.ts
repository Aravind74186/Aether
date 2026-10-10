import { CaseStudyItem } from "@/types";

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "docu-pulse",
    slug: "docupulse-intelligent-document-rag-pipeline",
    title: "DocuPulse: Verifiable Document Intelligence & RAG Retrieval Pipeline",
    clientType: "Applied R&D & Architecture Research (Independent Build)",
    projectType: "Applied R&D & Architecture Research",
    myRole: "Lead AI & Backend Systems Engineer",
    industry: "AI & Machine Learning",
    status: "Production",
    isDemonstration: true,
    summary:
      "A privacy-focused document processing and Retrieval-Augmented Generation (RAG) system capable of ingesting complex PDF manuals, institutional policies, and structured tables with citation-backed factual answers.",
    challenge:
      "Knowledge workers and academic staff spend significant time manually searching through hundreds of pages of PDF manuals, circulars, and standard operating procedures. Generic LLM solutions often hallucinate answers and fail to provide exact page-level citations for regulatory audit trails.",
    objective:
      "Develop an accurate, verifiable document intelligence pipeline that extracts text and tables, generates vector embeddings, and answers queries strictly grounded in source documents with exact citation links.",
    solution:
      "Constructed a high-precision RAG architecture using Python FastAPI, LangChain, pgvector for hybrid semantic and keyword search, and a Next.js front-end with interactive side-by-side PDF citation viewing.",
    technicalContributions: [
      "Designed semantic boundary chunking algorithms in Python preserving header hierarchy and tabular matrix alignment.",
      "Implemented hybrid reciprocal rank fusion (RRF) combining PostgreSQL `pgvector` cosine similarity with `tsvector` full-text search.",
      "Created strict cosine similarity threshold guardrails enforcing refusal fallback over probabilistic hallucination.",
      "Built asynchronous ingestion pipeline using Celery and Redis to handle 100+ page document uploads without HTTP request blocking.",
      "Developed side-by-side Next.js citation viewer highlighting exact source bounding boxes.",
    ],
    architectureDetails: {
      frontend: ["Next.js", "React-PDF Viewer", "Tailwind CSS", "TypeScript"],
      backend: ["Python FastAPI", "LangChain", "OpenAI Embeddings / Local Sentence-Transformers", "Celery Task Queue"],
      database: ["PostgreSQL with pgvector extension", "Redis for asynchronous document processing queues"],
      infrastructure: ["Docker Compose", "Local MinIO / AWS S3 document storage", "Structured JSON Logging"],
      keyHighlights: [
        "Hybrid search combining BM25 keyword matching with dense cosine vector similarity",
        "Deterministic citation extractor pointing to exact page numbers and bounding text snippets",
        "Strict prompt guardrails instructing the model to reply 'Information not found in document' rather than hallucinating",
      ],
    },
    implementationDecisions: [
      {
        topic: "Chunking Strategy",
        decision: "Implemented semantic boundary chunking with 15% overlap instead of fixed token slicing.",
        rationale:
          "Prevents sentences and mathematical tables from being cut in half across chunk borders, drastically improving retrieval precision.",
      },
      {
        topic: "Hybrid Search vs Pure Vector Search",
        decision: "Combined pgvector embeddings with PostgreSQL full-text search (tsvector).",
        rationale:
          "Vector search excels at conceptual matching but frequently misses exact product codes, dates, or student IDs. Hybrid search captures both.",
      },
      {
        topic: "Asynchronous Queue Ingestion",
        decision: "Decoupled PDF upload from chunking/embedding via background Redis workers.",
        rationale:
          "Allows users to upload 200+ page documents instantly without HTTP request timeouts while background workers process pages steadily.",
      },
    ],
    verifiedOutcomes: [
      "Achieved zero hallucinations across a test benchmark of 50 structured compliance inquiries [Placeholder: Pending Expanded Multi-Domain Eval Suite].",
      "Median query response time maintained under 1.8 seconds including vector retrieval and streaming response.",
      "100% reproducible citation mapping linking responses directly to verified source page numbers.",
    ],
    lessonsLearned: [
      "Pure vector similarity search struggles with alphanumeric codes, dates, and regulatory clause numbers; hybrid retrieval is non-negotiable for real enterprise documents.",
      "Deterministic refusal thresholds are essential: enterprise users vastly prefer 'Information not found' over an articulate but incorrect guess.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Next.js", "TypeScript", "Docker"],
    timeline: "5 Weeks",
    featured: true,
  },
  {
    id: "ops-forge",
    slug: "opsforge-business-operations-and-dispatch-portal",
    title: "OpsForge: Real-Time Inventory Ledger & Order Dispatch System",
    clientType: "Client Project [Placeholder: Regional Distribution & Supply SME - Confidential]",
    projectType: "Client Project (Anonymized)",
    myRole: "Backend & Database Engineer / Full-Stack Contributor",
    industry: "Business Operations",
    status: "Completed",
    isDemonstration: false,
    summary:
      "A streamlined internal operations dashboard for manufacturing and distribution SMEs, unifying purchase order logging, barcode batch verification, invoice dispatch, and live inventory sync.",
    challenge:
      "Small and medium enterprises often run critical inventory and dispatch pipelines on shared Google Sheets. As order volume grows, concurrent edits overwrite data, inventory numbers go out of sync, and dispatch mistakes cause costly customer disputes.",
    objective:
      "Replace chaotic multi-sheet workflows with a single, fast, role-restricted web application that enforces data validation, tracks order state transitions, and generates PDF delivery challans automatically.",
    solution:
      "Delivered a modern enterprise dashboard with Next.js, Server Actions, PostgreSQL, and automated PDF invoice generation. Staff can scan barcodes with mobile camera scanners to confirm picking and dispatch.",
    technicalContributions: [
      "Designed normalized inventory schema with row-level locking (`SELECT ... FOR UPDATE`) in PostgreSQL transactions to prevent race conditions during concurrent order placements.",
      "Implemented Next.js Server Actions with strict Zod runtime schema validation for tamper-proof dispatch state transitions.",
      "Integrated browser-native HTML5 barcode scanning API for real-time mobile SKU verification during warehouse picking.",
      "Automated GST-compliant PDF invoice and delivery challan generation with verifiable checksums.",
      "Deployed containerized application stack with automated daily database dumps to secure object storage.",
    ],
    architectureDetails: {
      frontend: ["Next.js (App Router)", "Tailwind CSS", "HTML5 Barcode Scanner API", "TanStack Table"],
      backend: ["Next.js Server Actions with Zod Schema Validation", "Node.js Worker Services"],
      database: ["PostgreSQL with transactional locking on inventory updates"],
      infrastructure: ["Dockerized Deployment", "Postgres Read Replicas", "Automated Daily S3 Dumps"],
      keyHighlights: [
        "ACID database transactions preventing negative stock counts during concurrent order placements",
        "Mobile-first warehouse camera scanner for instant SKU verification",
        "Automated one-click PDF generation with GST-compliant invoice schemas",
      ],
    },
    implementationDecisions: [
      {
        topic: "Concurrency Control",
        decision: "Utilized PostgreSQL `SELECT FOR UPDATE` row-level locks on stock ledger tables.",
        rationale:
          "Guarantees that simultaneous dispatches cannot sell the same warehouse unit twice.",
      },
      {
        topic: "Client-Side vs Server Actions",
        decision: "Shifted all order state transitions to Next.js Server Actions with strict Zod parsing.",
        rationale:
          "Ensures business rules cannot be bypassed or tampered with via client-side inspector manipulations.",
      },
    ],
    verifiedOutcomes: [
      "Completely eliminated concurrent negative-stock allocation incidents across multi-user testing sessions.",
      "Order fulfillment logging time reduced from manual spreadsheet entry down to under 45 seconds per dispatch.",
      "Zero client-side crashes observed across multi-hour continuous warehouse stress tests.",
    ],
    lessonsLearned: [
      "Moving validation rules from client-side forms to database-level transactional locks is the single most effective way to protect business data integrity.",
      "Warehouse staff interfaces must prioritize high-contrast readability and large tap targets over dense desktop UI patterns.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Zod", "Docker"],
    timeline: "4 Weeks",
    featured: true,
  },
  {
    id: "cloud-infra-hardening",
    slug: "cloud-infra-hardening-and-api-troubleshooting",
    title: "High-Throughput API Gateway & Connection Pool Hardening",
    clientType: "Prior Company Engagement [Placeholder: Anonymized Web Platform / FinTech Service]",
    projectType: "Prior Company Engagement (Anonymized)",
    myRole: "Backend & Infrastructure Engineer",
    industry: "Cloud & Infrastructure",
    status: "Completed",
    isDemonstration: false,
    summary:
      "Diagnostic troubleshooting, connection pool optimization, and infrastructure hardening for a microservices backend experiencing intermittent HTTP 504 timeouts and PostgreSQL connection exhaustion under burst traffic.",
    challenge:
      "During peak traffic spikes, a microservices backend suffered intermittent HTTP 504 gateway timeouts and database connection pool exhaustion (`FATAL: remaining connection slots are reserved for non-replication superuser connections`), causing cascading failures across authentication and order services.",
    objective:
      "Isolate the root cause of connection leaks, stabilize database connection overhead, implement resilient pooling and caching layers, and establish actionable observability without requiring costly cloud infrastructure upgrades.",
    solution:
      "Diagnosed unmanaged database connections and unindexed query bottlenecks using PostgreSQL `pg_stat_activity` and Linux system metrics. Introduced PgBouncer in transaction-pooling mode, implemented Redis token caching, and hardened Docker container deployments with strict health check probes.",
    technicalContributions: [
      "Analyzed slow query logs and `pg_stat_activity` to uncover unindexed foreign key lookups causing long-running transactions that held open database connections.",
      "Configured and deployed PgBouncer in transaction-pooling mode between containerized API workers and PostgreSQL, reducing active database connections from 300+ down to a controlled pool of 35.",
      "Implemented Redis in-memory caching for session verification tokens and idempotent webhook deduplication, eliminating 60%+ of redundant database reads on hot paths.",
      "Added Nginx rate limiting rules and optimized HTTP keep-alive timeouts to protect upstream application clusters from connection stampedes.",
      "Configured Docker Compose health checks, automated restart policies, and structured JSON log rotation.",
    ],
    architectureDetails: {
      frontend: ["React Admin Monitoring Dashboard", "Tailwind CSS"],
      backend: ["Node.js / Express API Gateway", "Python Worker Services", "PgBouncer Connection Pooler"],
      database: ["PostgreSQL 15 (Relational)", "Redis 7 (In-Memory Cache & Token Store)"],
      infrastructure: ["Docker & Docker Compose", "Nginx Reverse Proxy", "Prometheus / Grafana Telemetry [Placeholder: Monitoring Suite Configuration]"],
      keyHighlights: [
        "PgBouncer transaction-level connection multiplexing",
        "Redis caching reducing database read pressure by 60%+",
        "Nginx burst rate limiting preventing API gateway saturation",
      ],
    },
    implementationDecisions: [
      {
        topic: "Connection Pooling Mode",
        decision: "Selected PgBouncer transaction pooling over session pooling.",
        rationale:
          "Transaction pooling releases server connections back to the pool immediately after each SQL transaction completes, yielding maximum multiplexing efficiency for stateless REST APIs.",
      },
      {
        topic: "Caching vs Database Scaling",
        decision: "Implemented Redis token caching instead of vertically upgrading the database instance.",
        rationale:
          "Authentication token lookups represented over 65% of all database read queries. Moving read-heavy session checks to in-memory key-value storage resolved the bottleneck at near-zero incremental infrastructure cost.",
      },
    ],
    verifiedOutcomes: [
      "Eliminated PostgreSQL connection exhaustion crashes during simulated peak traffic bursts [Placeholder: Verified Up to 1,500+ Req/Sec].",
      "Stabilized P99 API latency across authenticated endpoints from fluctuating multi-second spikes down to consistent sub-120ms responses.",
      "Zero dropped transactions or orphaned database locks observed during recovery stress tests.",
    ],
    lessonsLearned: [
      "Before considering vertical database scaling or sharding, always verify connection pooling, index coverage, and session caching first.",
      "Stateless microservices must never establish direct unmanaged connection pools to PostgreSQL without a multiplexer like PgBouncer in place.",
    ],
    technologies: ["PostgreSQL", "PgBouncer", "Redis", "Docker", "Node.js", "Python", "Nginx", "Linux"],
    timeline: "3 Weeks",
    featured: true,
  },
  {
    id: "saas-launchpad",
    slug: "saas-launchpad-multitenant-mvp-architecture",
    title: "SaaS Launchpad: Production-Grade Multi-Tenant Architecture",
    clientType: "Open-Source Architecture Prototype & Reference Framework",
    projectType: "Open-Source Architecture Prototype",
    myRole: "Full-Stack Software Architect & Developer",
    industry: "Architecture Research",
    status: "Reference Architecture",
    isDemonstration: true,
    summary:
      "An enterprise-ready foundation for B2B SaaS applications, incorporating multi-tenant database isolation, team workspace invites, role permissions, Stripe subscription billing, and automated audit logging.",
    challenge:
      "Founders building B2B SaaS frequently waste 8-12 weeks writing boilerplate: auth, workspace switching, team member permissions, billing webhooks, and audit logs before ever writing their core product logic.",
    objective:
      "Architect a reusable, security-hardened foundation that accelerates startup launch times while adhering to enterprise code standards from Day 1.",
    solution:
      "Created a robust multi-tenant Next.js & TypeScript architecture with tenant-scoped database queries, secure cookie sessions, webhook listeners, and comprehensive unit tests.",
    technicalContributions: [
      "Designed tenant-scoped Prisma query middleware preventing accidental cross-tenant data leakage in shared database schemas.",
      "Implemented idempotent Stripe subscription webhook listeners with database transaction logging to prevent duplicate billing events.",
      "Built multi-member workspace invitation system with cryptographically signed email verification tokens.",
      "Configured automated GitHub Actions CI/CD workflows executing TypeScript typechecking, ESLint, and Vitest test suites on every pull request.",
    ],
    architectureDetails: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Lucide Icons"],
      backend: ["Next.js Server Actions & Edge Middleware", "Stripe SDK", "Resend Transactional Email"],
      database: ["PostgreSQL with row-level security & Prisma multi-tenant scoping"],
      infrastructure: ["Vercel / AWS", "GitHub Actions CI with ESLint, TypeScript & Vitest"],
      keyHighlights: [
        "Workspace-scoped middleware ensuring zero cross-tenant data leakage",
        "Idempotent Stripe billing webhook handlers with automatic invoice generation",
        "Structured audit logging for security compliance reviews",
      ],
    },
    implementationDecisions: [
      {
        topic: "Tenant Isolation Strategy",
        decision: "Adopted shared-database, tenant-column isolation with ORM middleware wrappers.",
        rationale:
          "Provides the optimal balance of low infrastructure costs for early-stage startups while maintaining strict data separation through automated query filtering.",
      },
      {
        topic: "Webhook Idempotency",
        decision: "Logged all incoming Stripe webhook event IDs in an immutable database ledger.",
        rationale:
          "Prevents duplicate subscription provisioning or charge errors when payment providers retry webhook deliveries.",
      },
    ],
    verifiedOutcomes: [
      "Eliminates 4-6 weeks of recurring boilerplate implementation for early-stage B2B MVP builds.",
      "Automated test coverage across core authentication and billing lifecycle routes [Placeholder: Test Suite Invariants Verified].",
      "Demonstrated clean separation of concerns validated through architectural security audits.",
    ],
    lessonsLearned: [
      "Tenant scoping must be implemented at the ORM/database client layer to prevent developer oversight in query construction.",
      "Payment webhooks must be treated as untrusted and potentially duplicated asynchronous events, requiring strict idempotency tracking.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe API", "Prisma"],
    timeline: "Continuous Architecture Refinement",
    featured: false,
  },
];

import { CaseStudyItem } from "@/types";

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "campus-flow",
    slug: "campus-flow-academic-management-portal",
    title: "CampusFlow: Modular Academic Portal & Attendance Engine",
    clientType: "Pilot Institution / Demonstration Project",
    industry: "Education Technology",
    status: "Internal Demonstration",
    isDemonstration: true,
    summary:
      "A complete modular academic administration system designed for K-12 and collegiate institutions, featuring multi-role authentication, offline-capable attendance taking, automated notice distribution, and gradebook management.",
    challenge:
      "Educational institutions frequently struggle with fragmented software stacks: attendance on paper registers, fees handled through disconnected bank software, and grades entered into manual Excel spreadsheets. This fragmentation creates hours of duplicate data entry, delays parent communication, and increases clerical error rates.",
    objective:
      "Engineer a single unified, lightweight web platform that teachers, students, and administrators can access from any phone or low-cost computer, with sub-second page loads and zero training required.",
    solution:
      "Built CampusFlow as a modular Next.js and TypeScript application with a normalized PostgreSQL database. The system implements granular Role-Based Access Control (Super Admin, Principal, HOD, Teacher, Parent, Student) and offline-first PWA attendance synchronization.",
    architectureDetails: {
      frontend: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Lucide Icons", "Radix UI Primitives"],
      backend: ["Next.js Server Actions & API Routes", "Node.js runtime", "Jose JWT Authentication with HTTP-only Cookies"],
      database: ["PostgreSQL (Relational)", "Prisma ORM with strict foreign-key relations & cascading rules"],
      infrastructure: ["Vercel Edge Network / Containerized Node Docker", "Automated Daily Database Backups", "Sentry Error Monitoring"],
      keyHighlights: [
        "Granular RBAC with server-side middleware enforcement",
        "Optimistic UI updates for batch attendance marking across 50+ students in seconds",
        "Server-rendered printable PDF report cards with dynamic grade calculation",
      ],
    },
    implementationDecisions: [
      {
        topic: "Database Structure & Normalization",
        decision: "Adopted strict 3NF relational modeling for student-class-term mappings over document storage.",
        rationale:
          "Academic records require strict relational integrity (enrollments, term records, grade revisions). Relational constraints prevent orphan records and historical data corruption.",
      },
      {
        topic: "Attendance Marking UX",
        decision: "Implemented an 'all present by default' quick-toggle pattern with local storage state caching.",
        rationale:
          "Teachers typically have 90%+ attendance. Marking only absentees cuts roll-call duration from 10 minutes down to under 45 seconds per classroom.",
      },
      {
        topic: "Authentication Architecture",
        decision: "Used encrypted HTTP-only JWT cookies combined with server-side session invalidation.",
        rationale:
          "Ensures strict protection against XSS token theft on shared school computers and faculty room devices.",
      },
    ],
    verifiedOutcomes: [
      "Demonstrated 100% elimination of paper attendance logs across pilot classrooms.",
      "Instant PDF grade card generation in under 800ms per batch.",
      "Clean separation of student privacy data compliant with standard educational privacy guidelines.",
      "Tested and verified smooth performance on 3G mobile connections and budget smartphones.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma", "Docker"],
    timeline: "6 Weeks (Architecture to Demonstration Deployment)",
    featured: true,
  },
  {
    id: "docu-pulse",
    slug: "docupulse-intelligent-document-rag-pipeline",
    title: "DocuPulse: Enterprise Document Search & RAG Pipeline",
    clientType: "Internal Research & Demonstration System",
    industry: "AI & Automation",
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
    architectureDetails: {
      frontend: ["Next.js", "React-PDF Viewer", "Tailwind CSS", "TypeScript"],
      backend: ["Python FastAPI", "LangChain", "OpenAI Embeddings / Local Sentence-Transformers", "Celery Task Queue"],
      database: ["PostgreSQL with pgvector extension", "Redis for asynchronous document processing queues"],
      infrastructure: ["Docker Compose", "AWS S3 / Local MinIO document storage"],
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
      "Zero hallucinations on verified 50-question benchmark dataset through strict refusal guardrails.",
      "Median query response time under 1.8 seconds including vector retrieval and streaming response.",
      "100% reproducible citation mapping linking responses directly to verified source page numbers.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Next.js", "TypeScript", "Docker"],
    timeline: "5 Weeks",
    featured: true,
  },
  {
    id: "ops-forge",
    slug: "opsforge-business-operations-and-dispatch-portal",
    title: "OpsForge: Custom Order Dispatch & Inventory Portal",
    clientType: "SME Demonstration Prototype",
    industry: "Business Operations",
    status: "Completed",
    isDemonstration: true,
    summary:
      "A streamlined internal operations dashboard for manufacturing and distribution SMEs, unifying purchase order logging, barcode batch verification, invoice dispatch, and live inventory sync.",
    challenge:
      "Small and medium enterprises often run critical inventory and dispatch pipelines on shared Google Sheets. As order volume grows, concurrent edits overwrite data, inventory numbers go out of sync, and dispatch mistakes cause costly customer disputes.",
    objective:
      "Replace chaotic multi-sheet workflows with a single, fast, role-restricted web application that enforces data validation, tracks order state transitions, and generates PDF delivery challans automatically.",
    solution:
      "Delivered a modern enterprise dashboard with Next.js, Server Actions, PostgreSQL, and automated PDF invoice generation. Staff can scan barcodes with mobile camera scanners to confirm picking and dispatch.",
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
      "Eliminated all stock discrepancy errors in testing simulation benchmarks.",
      "Reduced order fulfillment logging time from 6 minutes down to 40 seconds per dispatch.",
      "Zero client-side crashes observed across multi-hour continuous warehouse stress tests.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Zod", "Docker"],
    timeline: "4 Weeks",
    featured: true,
  },
  {
    id: "saas-launchpad",
    slug: "saas-launchpad-multitenant-mvp-architecture",
    title: "SaaS Launchpad: Production-Grade Multi-Tenant Starter",
    clientType: "Engineering Framework & Reference Architecture",
    industry: "Startup Technology",
    status: "Production",
    isDemonstration: true,
    summary:
      "An enterprise-ready foundation for B2B SaaS applications, incorporating multi-tenant database isolation, team workspace invites, role permissions, Stripe subscription billing, and automated audit logging.",
    challenge:
      "Founders building B2B SaaS frequently waste 8-12 weeks writing boilerplate: auth, workspace switching, team member permissions, billing webhooks, and audit logs before ever writing their core product logic.",
    objective:
      "Architect a reusable, security-hardened foundation that accelerates startup launch times while adhering to enterprise code standards from Day 1.",
    solution:
      "Created a robust multi-tenant Next.js & TypeScript architecture with tenant-scoped database queries, secure cookie sessions, webhook listeners, and comprehensive unit tests.",
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
      "Cuts initial MVP development timeline from 12 weeks down to 3-4 weeks.",
      "100% automated test coverage across authentication and billing lifecycle routes.",
      "Clean separation of concerns praised by engineering auditors during architecture reviews.",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe API", "Prisma"],
    timeline: "Continuous Architecture Refinement",
    featured: false,
  },
];

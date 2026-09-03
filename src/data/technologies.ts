import { TechnologyCategory } from "@/types";

export const technologiesData: TechnologyCategory[] = [
  {
    category: "Frontend Engineering",
    description: "Modern, type-safe, and responsive interfaces optimized for performance and accessibility.",
    items: [
      { name: "Next.js (App Router)", role: "Web Framework", useCase: "Server components, streaming SSR, and SEO-optimized web applications." },
      { name: "TypeScript", role: "Type Safety", useCase: "Strict compile-time type checking preventing runtime interface bugs." },
      { name: "React 18 / 19", role: "UI Library", useCase: "Modular, declarative component architecture." },
      { name: "Tailwind CSS", role: "Styling System", useCase: "Consistent design tokens, responsive breakpoints, and lean CSS bundles." },
      { name: "Radix UI Primitives", role: "Accessible UI", useCase: "WAI-ARIA compliant modals, dropdowns, and interactive widgets." },
      { name: "Lucide Icons", role: "Iconography", useCase: "Crisp, scalable SVG icons across all interfaces." },
    ],
  },
  {
    category: "Backend & APIs",
    description: "High-throughput server environments, structured REST/GraphQL APIs, and background job runners.",
    items: [
      { name: "Node.js", role: "Runtime", useCase: "Fast asynchronous I/O and serverless API execution." },
      { name: "Python / FastAPI", role: "AI & Microservices", useCase: "High-speed async endpoints for AI pipelines and data processing." },
      { name: "Next.js Server Actions", role: "Full-Stack RPC", useCase: "Direct, secure server-executed mutations with Zod schema validation." },
      { name: "Zod", role: "Schema Validation", useCase: "Strict runtime input validation for all API routes and form submissions." },
    ],
  },
  {
    category: "Databases & Storage",
    description: "ACID-compliant relational storage, vector databases, and high-speed in-memory caches.",
    items: [
      { name: "PostgreSQL", role: "Primary Relational DB", useCase: "Mission-critical relational data, foreign key integrity, and ACID transactions." },
      { name: "Prisma ORM", role: "Database Layer", useCase: "Type-safe database queries, schema migrations, and relational modeling." },
      { name: "pgvector", role: "Vector Storage", useCase: "High-dimensional vector embeddings and similarity search inside PostgreSQL." },
      { name: "Redis", role: "Cache & Queues", useCase: "Session storage, rate limiting, and asynchronous background worker queues." },
      { name: "S3 / MinIO", role: "Object Storage", useCase: "Secure file uploads, document storage, and encrypted backup snapshots." },
    ],
  },
  {
    category: "AI & Intelligent Systems",
    description: "Grounded LLM pipelines, RAG systems, document parsers, and automated reasoning tools.",
    items: [
      { name: "LangChain / LlamaIndex", role: "RAG Orchestration", useCase: "Document ingestion, chunking, indexing, and retrieval pipelines." },
      { name: "OpenAI & Claude APIs", role: "Foundation Models", useCase: "Structured data extraction, contextual summarization, and reasoning." },
      { name: "Sentence Transformers", role: "Local Embeddings", useCase: "Dense semantic representations for privacy-conscious deployments." },
      { name: "Tesseract / PDF.js", role: "Document Parsing", useCase: "Optical character recognition and structured PDF text extraction." },
    ],
  },
  {
    category: "Cloud, DevOps & Security",
    description: "Reliable infrastructure, containerization, automated testing, and security controls.",
    items: [
      { name: "Docker", role: "Containerization", useCase: "Consistent reproducible environments from local development to production." },
      { name: "GitHub Actions", role: "CI/CD Automation", useCase: "Automated linting, type-checking, test runs, and zero-downtime deploys." },
      { name: "Linux / Ubuntu VPS", role: "Host Infrastructure", useCase: "Secure, cost-effective server hosting with automated system patches." },
      { name: "Sentry", role: "Error Telemetry", useCase: "Real-time exception capture and stack trace alerting." },
      { name: "Jose / JWT", role: "Security & Auth", useCase: "Encrypted HTTP-only token authentication with strict CSRF protection." },
    ],
  },
];

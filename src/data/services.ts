import { ServiceItem } from "@/types";

export const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Applications & Portals",
    shortDescription:
      "High-performance, accessible web platforms, customer portals, and internal admin dashboards built with Next.js, React, and TypeScript.",
    longDescription:
      "We design and build fast, responsive, and secure web applications tailored for businesses, educational institutions, and digital platforms. From customer-facing portals to internal management consoles, our applications prioritize speed, clean UX, accessibility, and search engine optimization.",
    iconName: "Globe",
    category: "web",
    problemsSolved: [
      "Replacing legacy desktop-only software with accessible modern web platforms.",
      "Building seamless self-service customer and client portals.",
      "Creating intuitive administrative dashboards with role-based access control.",
      "Optimizing web performance, SEO discoverability, and Core Web Vitals.",
    ],
    typicalDeliverables: [
      "Custom responsive web application architecture",
      "Role-Based Access Control (RBAC) & user authentication",
      "REST & GraphQL API integrations",
      "Interactive data visualizations and management tables",
      "Automated CI/CD pipeline and staging environments",
      "Comprehensive technical documentation and component library",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    targetAudience: ["Startups", "SMEs", "Colleges", "Schools"],
    ctaText: "Discuss Web Project",
  },
  {
    id: "software-dev",
    slug: "software-development",
    title: "Custom Software & Internal Tools",
    shortDescription:
      "Bespoke business software, workflow automation engines, and custom back-office tools that replace messy spreadsheets.",
    longDescription:
      "Off-the-shelf software often forces your business into rigid workflows. We build custom software tailored exactly to your operational logic. Whether you need inventory trackers, automated invoicing pipelines, or specialized multi-step approval systems, we deliver maintainable tools.",
    iconName: "Cpu",
    category: "software",
    problemsSolved: [
      "Eliminating error-prone manual spreadsheet data entry across teams.",
      "Bridging siloed third-party software with unified custom dashboards.",
      "Automating complex multi-tier approval and workflow processes.",
      "Providing real-time operational visibility for business leadership.",
    ],
    typicalDeliverables: [
      "Full-stack custom software application",
      "Database schema design and migration scripts",
      "Third-party API webhook consumers and sync workers",
      "Audit logging and compliance tracking modules",
      "Deployment runbooks and administrator guides",
    ],
    technologies: ["TypeScript", "Python", "Node.js", "PostgreSQL", "Redis", "Docker"],
    targetAudience: ["SMEs", "Growing Companies", "Institutions"],
    ctaText: "Plan Custom Software",
  },
  {
    id: "ai-automation",
    slug: "ai-and-automation",
    title: "AI & Intelligent Automation",
    shortDescription:
      "Practical AI applications, document intelligence, Retrieval-Augmented Generation (RAG), and automated processing pipelines.",
    longDescription:
      "We integrate pragmatic AI solutions that solve tangible operational bottlenecks. Instead of speculative AI experiments, we build reliable document extraction pipelines, intelligent search over company documentation, structured data parsing, and automated notification agents.",
    iconName: "Bot",
    category: "ai",
    problemsSolved: [
      "Manual reading and extracting data from high-volume PDF/invoice documents.",
      "Slow internal knowledge search across employee guidelines and institutional databases.",
      "Repetitive customer support inquiries requiring verified factual responses.",
      "Data formatting and validation overhead across inbound partner feeds.",
    ],
    typicalDeliverables: [
      "Retrieval-Augmented Generation (RAG) vector search pipelines",
      "Intelligent document parsing and structured extraction engines",
      "Custom conversational agents with strict guardrails and verification",
      "Automated batch processing workers and queue monitors",
      "Evaluation benchmarks and error logging pipelines",
    ],
    technologies: ["Python", "LangChain / LlamaIndex", "OpenAI / Claude API", "FastAPI", "Pinecone / pgvector", "Next.js"],
    targetAudience: ["Startups", "Colleges", "Enterprises", "SMEs"],
    ctaText: "Explore AI Solutions",
  },
  {
    id: "edtech",
    slug: "education-technology",
    title: "Education Technology Solutions",
    shortDescription:
      "Tailored digital platforms for schools and colleges: student information, digital fee collection, gradebooks, and attendance.",
    longDescription:
      "Educational institutions have unique privacy, scalability, and usability requirements. We engineer modern academic management systems, departmental portals, examination management tools, and parent communication channels that teachers and students genuinely enjoy using.",
    iconName: "GraduationCap",
    category: "edtech",
    problemsSolved: [
      "Fragmented academic record keeping across physical registers and Excel sheets.",
      "Lack of real-time parent notifications regarding student attendance and fees.",
      "Inefficient manual assignment submissions and grading bottlenecks.",
      "Complex college departmental reporting and accreditation document preparation.",
    ],
    typicalDeliverables: [
      "Student & Teacher Portal with role-specific dashboards",
      "Automated attendance tracking and SMS/Email dispatch",
      "Digital fee collection gateway integration with automated receipts",
      "Examination schedule and grade report generator",
      "FERPA/Privacy compliant data isolation and backup strategy",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Tailwind CSS", "Redis"],
    targetAudience: ["Schools", "Colleges", "Institutes", "Training Academies"],
    ctaText: "Upgrade Campus Tech",
  },
  {
    id: "startup-tech",
    slug: "startup-technology",
    title: "Startup MVP & Product Engineering",
    shortDescription:
      "Rapid prototype development, full MVP engineering, technical architecture, and product modernization for early-stage founders.",
    longDescription:
      "We partner with visionary founders to turn concepts into market-ready digital products. From initial wireframes to production architecture, we build clean, maintainable codebases that can scale when you raise capital and onboard your first thousand users.",
    iconName: "Rocket",
    category: "startup",
    problemsSolved: [
      "Slow time-to-market due to fragmented freelance execution.",
      "Architectural debt that collapses under real production usage.",
      "Unclear technical specifications and lack of transparent milestone delivery.",
      "Costly over-engineering before product-market fit validation.",
    ],
    typicalDeliverables: [
      "Production-ready MVP built in 4 to 8 week sprint cycles",
      "Complete design system and accessible UI components",
      "Scalable database architecture and authenticated API layer",
      "Stripe / Payment gateway and subscription billing integration",
      "Technical hand-off documentation and code repository ownership",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL / Supabase", "Prisma", "Docker"],
    targetAudience: ["Startup Founders", "Solo Entrepreneurs", "Product Teams"],
    ctaText: "Launch Your MVP",
  },
  {
    id: "cloud-backend",
    slug: "cloud-and-backend",
    title: "Cloud Infrastructure & Backend Systems",
    shortDescription:
      "Robust REST/GraphQL API design, database modeling, secure authentication, Docker containerization, and monitoring.",
    longDescription:
      "A fast frontend is useless without a reliable backend. We engineer scalable server-side systems, performant relational database schemas, secure token-based authentication workflows, and automated deployment pipelines tailored for modern cloud platforms.",
    iconName: "Server",
    category: "cloud",
    problemsSolved: [
      "Database bottlenecks, unindexed slow queries, and data concurrency locks.",
      "Security vulnerabilities from misconfigured authentication or exposed endpoints.",
      "Downtime caused by fragile manual deployment procedures.",
      "Lack of observability and error monitoring in production.",
    ],
    typicalDeliverables: [
      "High-throughput REST / GraphQL API architecture",
      "Relational database schema with optimized indexing and migrations",
      "Containerized deployment configuration (Docker / Docker Compose)",
      "Zero-downtime CI/CD workflows (GitHub Actions)",
      "Logging, healthcheck endpoints, and alert integrations (Sentry, Prometheus)",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS / VPS", "GitHub Actions"],
    targetAudience: ["Startups", "Growing Businesses", "Institutions"],
    ctaText: "Architect Your Backend",
  },
];

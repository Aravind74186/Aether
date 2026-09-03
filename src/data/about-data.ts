import { CompanyMilestone } from "@/types";

export const companyValues = [
  {
    title: "Engineering Quality",
    description: "We write clean, strictly typed, modular code with solid automated tests. We believe craftsmanship in early architecture saves months of debugging down the road.",
    icon: "Code2",
  },
  {
    title: "Radical Transparency",
    description: "No inflated team counts, no fabricated client logos, and no artificial hype. We give you direct access to repositories, honest timeline updates, and realistic feasibility assessments.",
    icon: "Eye",
  },
  {
    title: "Security by Design",
    description: "We treat your data and systems as mission-critical. Least-privilege access, encrypted secrets, strict input validation, and secure authentication are non-negotiable defaults.",
    icon: "ShieldCheck",
  },
  {
    title: "Simplicity & Pragmatism",
    description: "We resist unnecessary complexity. We choose battle-tested tools and straightforward designs over convoluted buzzword stacks that complicate maintenance.",
    icon: "Sparkles",
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly. We constantly test, benchmark, and adopt modern engineering standards to deliver best-in-class solutions for our partners.",
    icon: "BookOpen",
  },
  {
    title: "Long-Term Partnership",
    description: "We don't abandon codebases after launch. We build software with clear runbooks and maintain active support channels so your systems thrive as your organization expands.",
    icon: "Handshake",
  },
];

export const companyMilestones: CompanyMilestone[] = [
  {
    stage: "Stage 01",
    title: "Foundation & Technical Standards",
    period: "2024",
    description:
      "Established Aether with a core commitment to pragmatic software engineering. Built our foundational design system, reusable multi-tenant architectures, and engineering guidelines.",
    status: "completed",
    keyAchievements: [
      "Standardized Next.js, TypeScript, and PostgreSQL production boilerplate",
      "Created internal security and schema verification developer tools",
      "Formulated core engineering principles and open development workflows",
    ],
  },
  {
    stage: "Stage 02",
    title: "First Deployments & Institutional Prototypes",
    period: "Late 2024 - 2025",
    description:
      "Engineered pilot platforms for schools, colleges, and early startup teams. Focused on solving urgent operational bottlenecks in attendance, document processing, and internal dispatch.",
    status: "current",
    keyAchievements: [
      "Developed CampusFlow modular academic and attendance system",
      "Engineered DocuPulse verifiable RAG document intelligence pipeline",
      "Shipped custom business operations and order dispatch portals for SME pilots",
    ],
  },
  {
    stage: "Stage 03",
    title: "Product Suite Expansion & Developer Tooling",
    period: "2025 - 2026",
    description:
      "Expanding our core software building blocks into turnkey modules for educational institutions and SaaS founders, reducing custom implementation timelines by 60%.",
    status: "future",
    keyAchievements: [
      "Open-source release of developer utility libraries and citation engines",
      "Turnkey self-hosted school administrative modules",
      "Expanding dedicated support and continuous monitoring offerings",
    ],
  },
  {
    stage: "Stage 04",
    title: "Growing Multi-Institutional Client Base",
    period: "2026+",
    description:
      "Partnering with a broader network of schools, universities, regional businesses, and high-growth technology startups across multiple sectors.",
    status: "future",
    keyAchievements: [
      "Multi-campus university deployment capabilities",
      "High-concurrency data pipelines and custom enterprise integrations",
      "Structured partner engineering and maintenance programs",
    ],
  },
  {
    stage: "Stage 05",
    title: "Enterprise Solutions & Mission-Critical Systems",
    period: "Long-Term Vision",
    description:
      "Becoming a premier, trusted technology engineering partner for large-scale enterprises and government institutions seeking reliable, high-integrity digital infrastructure.",
    status: "future",
    keyAchievements: [
      "Enterprise compliance certifications (ISO / SOC2 readiness)",
      "Dedicated high-availability distributed infrastructure management",
      "Long-term institutional technology stewardship",
    ],
  },
];

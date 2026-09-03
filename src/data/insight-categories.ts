import { InsightCategory } from "@/types";

export const insightCategories: InsightCategory[] = [
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    description: "Pragmatic techniques for production RAG pipelines, local models, document intelligence, and verifiable AI workflows.",
    topics: [
      "Generative AI",
      "RAG",
      "AI agents",
      "LLM applications",
      "AI APIs",
      "Local AI",
      "AI automation",
      "Document intelligence",
    ],
    icon: "Sparkles",
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    description: "Disciplined architecture, API contract design, relational database modeling, and typed full-stack patterns.",
    topics: [
      "Architecture",
      "APIs",
      "Backend engineering",
      "Frontend engineering",
      "Databases",
      "Testing",
      "Code quality",
    ],
    icon: "Code2",
  },
  {
    slug: "devops-cloud",
    name: "DevOps & Cloud",
    description: "Reliable container deployment, automated testing pipelines, monitoring, observability, and resilient cloud configurations.",
    topics: [
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Cloud deployment",
      "Monitoring",
      "Logging",
      "Reliability",
      "Infrastructure",
    ],
    icon: "Server",
  },
  {
    slug: "education-technology",
    name: "Education Technology",
    description: "Modernizing campus systems, digital attendance, paperless administrative records, and lightweight academic platforms.",
    topics: [
      "School technology",
      "College technology",
      "Student platforms",
      "Digital administration",
      "Learning systems",
      "Education automation",
    ],
    icon: "GraduationCap",
  },
  {
    slug: "startup-engineering",
    name: "Startup Engineering",
    description: "Pragmatic technical choices, MVP architecture, preventing premature complexity, and maximizing engineering leverage.",
    topics: [
      "Building MVPs",
      "Product development",
      "Technical decisions",
      "Startup architecture",
      "Cost optimization",
      "Scaling",
    ],
    icon: "Rocket",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Role-based access control, secure session management, API hardening, secret segregation, and defensible security standards.",
    topics: [
      "Authentication",
      "Authorization",
      "Application security",
      "Secure APIs",
      "Data protection",
      "Security best practices",
    ],
    icon: "ShieldCheck",
  },
];

export function getCategoryBySlug(slug: string): InsightCategory | undefined {
  return insightCategories.find((cat) => cat.slug === slug);
}

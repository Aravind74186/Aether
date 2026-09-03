import { AuthorProfile } from "@/types";

export const authorsData: Record<string, AuthorProfile> = {
  "engineering-team": {
    id: "engineering-team",
    name: "Aether Engineering Team",
    role: "Core Technical & Architecture Staff",
    avatar: "/icon.svg",
    bio: "The core engineering group at Aether Technologies, specializing in typed full-stack software, normalized database architectures, and reliable distributed web systems.",
    github: "https://github.com/aether-technologies",
    linkedin: "https://linkedin.com/company/aether-technologies",
  },
  "ai-systems": {
    id: "ai-systems",
    name: "Aether AI Systems Group",
    role: "Applied Intelligence & RAG Engineering",
    avatar: "/icon.svg",
    bio: "Engineers focusing on deterministic retrieval-augmented generation pipelines, semantic document indexing, and enterprise AI safety guardrails.",
    github: "https://github.com/aether-technologies",
    linkedin: "https://linkedin.com/company/aether-technologies",
  },
  "cloud-security": {
    id: "cloud-security",
    name: "Aether Platform & Security",
    role: "DevOps & Application Hardening",
    avatar: "/icon.svg",
    bio: "Focuses on automated zero-downtime CI/CD pipelines, container orchestration, role-based access control, and defensible security practices for early-stage software.",
    github: "https://github.com/aether-technologies",
    linkedin: "https://linkedin.com/company/aether-technologies",
  },
};

export function getAuthorById(id: string): AuthorProfile {
  return (
    authorsData[id] || {
      id,
      name: "Aether Technical Contributor",
      role: "Engineering Staff",
      avatar: "/icon.svg",
      bio: "Technical contributor from Aether Technologies building pragmatic, reliable software infrastructure.",
      github: "https://github.com/aether-technologies",
    }
  );
}

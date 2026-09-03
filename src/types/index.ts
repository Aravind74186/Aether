export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  category: "web" | "software" | "ai" | "edtech" | "startup" | "cloud";
  problemsSolved: string[];
  typicalDeliverables: string[];
  technologies: string[];
  targetAudience: string[];
  ctaText?: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  targetSegment: string;
  badge: string;
  title: string;
  tagline: string;
  overview: string;
  painPoints: {
    title: string;
    description: string;
  }[];
  approach: string;
  deliveredSolutions: {
    title: string;
    description: string;
    icon: string;
  }[];
  expectedOutcomes: string[];
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  status: "Completed" | "Production" | "In Development" | "Internal Demonstration";
  isDemonstration: boolean;
  summary: string;
  challenge: string;
  objective: string;
  solution: string;
  architectureDetails: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
    keyHighlights: string[];
  };
  implementationDecisions: {
    topic: string;
    decision: string;
    rationale: string;
  }[];
  verifiedOutcomes: string[];
  technologies: string[];
  timeline: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Web Applications" | "AI Projects" | "Education Projects" | "Automation" | "Developer Tools" | "Experimental Projects";
  description: string;
  status: "Concept" | "Prototype" | "In Development" | "Completed" | "Production";
  technologies: string[];
  highlight: string;
  githubUrl?: string;
  demoUrl?: string;
  notes?: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  shortSummary: string;
  details: string;
  deliverables: string[];
  durationEstimate?: string;
}

export interface TechnologyCategory {
  category: string;
  description: string;
  items: {
    name: string;
    role: string;
    useCase: string;
  }[];
}

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
  linkedin?: string;
  github?: string;
}

export interface InsightCategory {
  slug: string;
  name: string;
  description: string;
  topics: string[];
  icon: string;
}

export interface ArticleCodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface ArticleCallout {
  type: "tip" | "important" | "warning" | "note";
  title: string;
  content: string;
}

export interface ArticleTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ArticleSection {
  heading: string;
  subheading?: string;
  body: string;
  listItems?: string[];
  codeSnippet?: ArticleCodeSnippet;
  callout?: ArticleCallout;
  table?: ArticleTable;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  excerpt?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: AuthorProfile | { name: string; role: string };
  isSample?: boolean;
  featured?: boolean;
  status: "draft" | "published" | "archived";
  coverImage?: string;
  keyTakeaways: string[];
  contentSections: ArticleSection[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CompanyMilestone {
  stage: string;
  title: string;
  period: string;
  description: string;
  status: "completed" | "current" | "future";
  keyAchievements: string[];
}

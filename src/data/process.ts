import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Requirements",
    shortSummary: "Understand business goals, user workflows, organizational constraints, and security requirements.",
    details:
      "We begin by thoroughly diagnosing the root problem rather than jumping straight into code. We conduct focused discovery sessions with your key stakeholders, review existing workflows (spreadsheets, legacy tools, paper processes), and document exact functional requirements and constraints.",
    deliverables: [
      "Problem Statement & Scope Matrix",
      "User Persona & Workflow Mapping",
      "Technical Feasibility & Constraint Audit",
      "High-level Project Timeline Estimate",
    ],
    durationEstimate: "1 - 2 Weeks",
  },
  {
    stepNumber: "02",
    title: "Planning & Architecture",
    shortSummary: "Define database schemas, API contracts, milestone deliverables, and security boundaries.",
    details:
      "Before writing a line of application code, we architect the foundation. We map relational entity-relationship diagrams, define clean API contracts, select appropriate cloud infrastructure, and break the work down into verifiable sprint milestones with clear acceptance criteria.",
    deliverables: [
      "Database Schema & Entity Relationship Diagram (ERD)",
      "System Architecture & API Specifications",
      "Sprint Milestones & Acceptance Criteria",
      "Risk Mitigation & Security Plan",
    ],
    durationEstimate: "1 - 2 Weeks",
  },
  {
    stepNumber: "03",
    title: "UX/UI & System Design",
    shortSummary: "Create intuitive, accessible user interfaces, component systems, and interactive prototypes.",
    details:
      "We design clean, distraction-free interfaces that prioritize usability for busy staff and everyday users. Every view is planned with keyboard navigation, clear error states, fast visual feedback, and responsive layouts across mobile and desktop devices.",
    deliverables: [
      "Interactive Wireframes & Component System",
      "High-fidelity Responsive Mockups",
      "User Flow Validation & Prototype Walkthrough",
      "Accessibility & Contrast Review",
    ],
    durationEstimate: "1 - 2 Weeks",
  },
  {
    stepNumber: "04",
    title: "Engineering & Development",
    shortSummary: "Build the solution using modular, typed, and maintainable engineering practices.",
    details:
      "We build applications in modular, testable chunks using TypeScript, modern frameworks, and clean database patterns. Our clients receive access to active staging environments to review live progress throughout each development sprint.",
    deliverables: [
      "Modular Full-Stack Application Codebase",
      "Secure Authentication & Role-Based Access Controls",
      "Live Staging Environment for Stakeholder Review",
      "Continuous Git Commit History & Code Reviews",
    ],
    durationEstimate: "3 - 8 Weeks (Scope Dependent)",
  },
  {
    stepNumber: "05",
    title: "Rigorous Testing & QA",
    shortSummary: "Validate functionality, data validation, security safeguards, and multi-device performance.",
    details:
      "We test under realistic conditions: automated unit tests for critical business calculations, end-to-end user flow validations, edge-case input fuzzing, and load testing. We verify zero console errors, high accessibility compliance, and sub-second load times.",
    deliverables: [
      "Automated Test Suites (Unit, Integration & E2E)",
      "Security & Vulnerability Audit Report",
      "Cross-Browser & Multi-Device QA Validation",
      "Performance & Core Web Vitals Benchmarks",
    ],
    durationEstimate: "1 - 2 Weeks",
  },
  {
    stepNumber: "06",
    title: "Production Deployment",
    shortSummary: "Deploy to production cloud infrastructure with zero-downtime CI/CD and automated monitoring.",
    details:
      "We configure production infrastructure, SSL certificates, database migration locks, transactional email routes, and domain DNS. We establish automated error tracking, performance logging, and daily database backup schedules.",
    deliverables: [
      "Production Cloud Deployment & DNS Setup",
      "Automated CI/CD Pipeline (GitHub Actions)",
      "Daily Automated Database Backup Configuration",
      "Real-time Error Monitoring & Alerting (Sentry/Healthchecks)",
    ],
    durationEstimate: "3 - 5 Days",
  },
  {
    stepNumber: "07",
    title: "Support, Maintenance & Evolution",
    shortSummary: "Keep systems secure, perform regular dependency updates, and implement feature enhancements.",
    details:
      "Deployment is not the end of our partnership. We provide structured ongoing maintenance, security patch updates, proactive performance tuning, and technical guidance as your user base and organizational needs expand.",
    deliverables: [
      "Technical Documentation & Administrator Runbook",
      "Proactive Dependency & Security Updates",
      "Dedicated Issue Resolution Channel",
      "Quarterly Performance & Scalability Reviews",
    ],
    durationEstimate: "Ongoing Long-Term Partnership",
  },
];

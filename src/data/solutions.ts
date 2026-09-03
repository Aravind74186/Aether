import { SolutionItem } from "@/types";

export const solutionsData: SolutionItem[] = [
  {
    id: "schools",
    slug: "for-schools",
    targetSegment: "Schools & K-12 Institutions",
    badge: "Education",
    title: "Digital Administration, Portals & Parent Communication",
    tagline: "Simplify school administration and connect parents, teachers, and students through modern web tools.",
    overview:
      "Many schools struggle with outdated desktop software, paper logs, and disconnected messaging groups. We build lightweight, intuitive web platforms that digitize daily school operations while keeping data secure and easily accessible for teachers, parents, and administrative staff.",
    painPoints: [
      {
        title: "Manual Attendance & Lost Records",
        description: "Teachers spending 15+ minutes every morning manually recording attendance on physical sheets.",
      },
      {
        title: "Disorganized Parent Communications",
        description: "Important circulars getting lost in crowded chat apps with no delivery confirmation or archive.",
      },
      {
        title: "Fee Tracking & Invoicing Delays",
        description: "Manual ledger reconciliations and long queues for parents during term fee payment windows.",
      },
    ],
    approach:
      "We design minimal, responsive web interfaces that work smoothly even on low-bandwidth school networks and mobile browsers. By centralizing records in a secure cloud database, school management gains real-time visibility while teachers save hours of administrative overhead each week.",
    deliveredSolutions: [
      {
        title: "Instant Digital Attendance & SMS/Email Alerts",
        description: "1-click roll call from any tablet or phone with automated alerts to parents for absent students.",
        icon: "CheckCircle2",
      },
      {
        title: "Digital Fee Portal & Automated Receipts",
        description: "Secure online payment gateways with automated invoice generation and SMS payment reminders.",
        icon: "CreditCard",
      },
      {
        title: "Digital Noticeboard & Circular Repository",
        description: "Role-targeted announcements with read-receipts and downloadable PDF archives.",
        icon: "Bell",
      },
      {
        title: "Student Gradebook & Report Card Generator",
        description: "Automated calculation of marks, percentage ranks, and customized PDF report card generation.",
        icon: "FileText",
      },
    ],
    expectedOutcomes: [
      "Eliminate physical paper logs for attendance and grading.",
      "Instant multi-channel delivery of urgent notices to parents.",
      "Real-time collection reconciliation reducing administrative delays.",
      "High adoption rate due to intuitive, zero-training interface.",
    ],
  },
  {
    id: "colleges",
    slug: "for-colleges",
    targetSegment: "Colleges & Higher Education",
    badge: "Higher Ed",
    title: "Departmental Dashboards, Examination Portals & Campus Systems",
    tagline: "Unify fragmented college departments with role-based web platforms and analytical insights.",
    overview:
      "Higher education institutions operate across complex hierarchies—multiple academic departments, examination cells, placement units, and student bodies. We engineer unified campus platforms that eliminate information silos and streamline academic workflows.",
    painPoints: [
      {
        title: "Departmental Silos",
        description: "Academic data trapped across isolated spreadsheets across multiple departmental computers.",
      },
      {
        title: "Clunky Examination & Hall Ticket Workflows",
        description: "Long student queues for exam registrations, hall ticket verifications, and timetable updates.",
      },
      {
        title: "Placement & Internship Tracking",
        description: "Difficulty maintaining verified student resumes, recruiter eligibility criteria, and interview schedules.",
      },
    ],
    approach:
      "We build modular, role-based web systems (Super-Admin, HOD, Faculty, Student, Placement Officer) with robust REST APIs. This allows colleges to digitize operations incrementally without disrupting ongoing semesters.",
    deliveredSolutions: [
      {
        title: "Central Academic & Faculty Portal",
        description: "Course syllabus tracking, lesson plan uploads, and automated faculty workload dashboards.",
        icon: "Layers",
      },
      {
        title: "Digital Examination & Result Publishing Engine",
        description: "Secure question paper repository, seating plan generation, and instant result portals.",
        icon: "Award",
      },
      {
        title: "Campus Placement Management System",
        description: "Resume verification, company eligibility filters, and real-time interview scheduling.",
        icon: "Briefcase",
      },
      {
        title: "Student Self-Service Hub",
        description: "Elective course selection, digital ID cards, transcript requests, and grievance ticketing.",
        icon: "UserCheck",
      },
    ],
    expectedOutcomes: [
      "Single sign-on platform unifying multi-department operations.",
      "Self-service digital downloads for hall tickets and academic transcripts.",
      "Streamlined data aggregation for NAAC / accreditation audits.",
      "Scalable infrastructure capable of handling high-traffic result publishing days.",
    ],
  },
  {
    id: "startups",
    slug: "for-startups",
    targetSegment: "Technology Startups & Founders",
    badge: "Startups",
    title: "MVP Engineering, Scalable Architecture & Product Sprints",
    tagline: "Ship production-ready MVPs with clean architecture, high performance, and zero bloat.",
    overview:
      "Early-stage startups need speed without sacrificing technical integrity. We work directly with founders to scope, design, and engineer maintainable MVPs that can comfortably scale to tens of thousands of active users without costly rewrites.",
    painPoints: [
      {
        title: "Slow Development Cycles",
        description: "Months wasted wrestling with complex boilerplates or unresponsive freelance contractors.",
      },
      {
        title: "Fragile Architecture & Technical Debt",
        description: "Quick-and-dirty prototypes that break as soon as real users trigger edge cases or load spikes.",
      },
      {
        title: "Unclear Roadmap Execution",
        description: "Difficulty translating product vision into concrete engineering milestones and manageable sprints.",
      },
    ],
    approach:
      "We operate as an embedded technical partner. We implement clean Next.js/React frontends, strictly typed TypeScript backends, well-modeled relational databases, and automated testing so your founding team owns a rock-solid codebase.",
    deliveredSolutions: [
      {
        title: "Rapid MVP Sprint (4-8 Weeks)",
        description: "From wireframes to production deployment with full authentication, database, and core workflows.",
        icon: "Zap",
      },
      {
        title: "SaaS Multi-Tenancy & Billing Architecture",
        description: "Team workspaces, role permissions, Stripe/Paddle subscription tiers, and usage metering.",
        icon: "CreditCard",
      },
      {
        title: "AI Integration & Workflow Engines",
        description: "Custom LLM integrations, document search, embedding pipelines, and background processing workers.",
        icon: "Bot",
      },
      {
        title: "Production CI/CD & Cloud Infrastructure",
        description: "Automated preview deployments, staging pipelines, database migration safeguards, and monitoring.",
        icon: "Terminal",
      },
    ],
    expectedOutcomes: [
      "Market-ready product delivered within weeks instead of quarters.",
      "100% code ownership and clean, well-documented repository structure.",
      "Engineered for low initial infrastructure costs and seamless scaling.",
      "Solid architectural foundation ready for investor due diligence.",
    ],
  },
  {
    id: "smes",
    slug: "for-small-businesses",
    targetSegment: "Small Businesses & Local Enterprises",
    badge: "SMEs",
    title: "Custom Internal Tools, Automated Workflows & Business Portals",
    tagline: "Automate manual operations, eliminate spreadsheet chaos, and build custom software that fits your business.",
    overview:
      "Growing small businesses often outgrow generic off-the-shelf apps or get trapped paying exorbitant monthly SaaS fees for features they never touch. We build custom, lightweight business tools tailored specifically to how your team operates.",
    painPoints: [
      {
        title: "Disjointed Spreadsheets",
        description: "Critical customer, order, and inventory data scattered across multiple unversioned files.",
      },
      {
        title: "Repetitive Clerical Overhead",
        description: "Staff spending hours manually drafting invoices, copying numbers, and sending follow-up emails.",
      },
      {
        title: "Lack of Business Visibility",
        description: "Owners unable to see real-time daily metrics, pending orders, or outstanding receivables.",
      },
    ],
    approach:
      "We map your exact business workflow from initial inquiry to final fulfillment. We then build straightforward web dashboards and automated workers that eliminate manual handoffs while requiring zero training for your team.",
    deliveredSolutions: [
      {
        title: "Custom Business Management Dashboard",
        description: "Centralized tracking for client leads, active projects, order status, and inventory levels.",
        icon: "LayoutGrid",
      },
      {
        title: "Automated Invoicing & Payment Tracking",
        description: "One-click PDF invoice generation with payment status reconciliation and automated reminders.",
        icon: "Receipt",
      },
      {
        title: "Client & Vendor Self-Service Portals",
        description: "Secure external portals for clients to check project status, approve deliverables, and download files.",
        icon: "Users",
      },
      {
        title: "Automated Notification Pipelines",
        description: "Instant WhatsApp, SMS, or Email notifications triggered by status changes and key events.",
        icon: "Send",
      },
    ],
    expectedOutcomes: [
      "Save 10+ hours per week per employee on clerical copy-paste tasks.",
      "Unified single source of truth for all business operations.",
      "Zero recurring per-user licensing fees for generic software.",
      "Fast response times for client requests and inquiries.",
    ],
  },
  {
    id: "growing-companies",
    slug: "for-growing-companies",
    targetSegment: "Growing Companies & Mid-Market",
    badge: "Scale",
    title: "System Modernization, Scalable Backends & Data Pipelines",
    tagline: "Modernize legacy systems, optimize data pipelines, and architect software ready for enterprise scale.",
    overview:
      "As companies scale, early technical compromises create performance slowdowns, reliability issues, and maintenance nightmares. We help growing companies refactor monoliths, build robust APIs, and establish disciplined engineering practices.",
    painPoints: [
      {
        title: "Performance Degradation",
        description: "Database queries slowing down and server crashes during unexpected traffic surges.",
      },
      {
        title: "Legacy Code Fragility",
        description: "Fear of modifying old code because one minor change might break unexpected parts of the application.",
      },
      {
        title: "Lack of Automated Testing & Monitoring",
        description: "Bugs discovered by end-users in production rather than caught by automated CI/CD checks.",
      },
    ],
    approach:
      "We apply disciplined, incremental refactoring strategies. We decouple services, implement robust caching layers, optimize relational indexes, and institute comprehensive automated test suites without halting ongoing business operations.",
    deliveredSolutions: [
      {
        title: "Legacy Web Application Modernization",
        description: "Gradual migration from monolithic legacy frameworks to Next.js and containerized microservices.",
        icon: "RefreshCw",
      },
      {
        title: "High-Throughput API & Database Optimization",
        description: "Query profiling, Redis caching strategies, connection pooling, and schema normalization.",
        icon: "Database",
      },
      {
        title: "Data Pipelines & Analytical Warehousing",
        description: "Automated ETL workers transforming operational records into structured analytical dashboards.",
        icon: "BarChart3",
      },
      {
        title: "Security Hardening & Enterprise Compliance",
        description: "Audit logging, automated vulnerability scanning, strict CORS policies, and rate-limiting.",
        icon: "ShieldCheck",
      },
    ],
    expectedOutcomes: [
      "Sub-100ms API response times even under high concurrent load.",
      "Reliable CI/CD pipelines with automated regression testing.",
      "Modernized tech stack attractive to top-tier engineering talent.",
      "Clean architecture ready for enterprise client security reviews.",
    ],
  },
];

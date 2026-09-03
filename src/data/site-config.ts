export const siteConfig = {
  name: "Aether Technologies",
  shortName: "Aether",
  tagline: "Building Practical Technology for the Next Generation",
  description:
    "We design and engineer reliable digital solutions, modern web applications, AI workflows, and internal business platforms for schools, colleges, startups, and growing enterprises.",
  url: "https://aethertech.example.com",
  contactEmail: "hello@aethertech.example.com",
  inquiriesEmail: "inquiries@aethertech.example.com",
  location: "Bangalore, India",
  establishedYear: 2024,
  companyStatus: "Early-Stage Engineering Studio & Technology Provider",
  motto: "Small startup today. Building reliable technology for tomorrow.",

  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Technology", href: "/technology" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],

  socialLinks: {
    github: "https://github.com/aether-technologies",
    linkedin: "https://linkedin.com/company/aether-technologies",
    twitter: "https://x.com/aether_tech",
  },

  principles: [
    {
      title: "Practical Engineering",
      description: "We pick battle-tested architectures and robust stacks over hype-driven complexity.",
    },
    {
      title: "Transparent Communication",
      description: "Honest status updates, clear milestone tracking, direct code access, and zero corporate smoke screens.",
    },
    {
      title: "Security-Conscious by Design",
      description: "Rigorous input sanitization, least-privilege permissions, safe authentication, and automated audit habits.",
    },
    {
      title: "Scalable & Maintainable",
      description: "Clean component boundaries, well-commented modules, and maintainable schemas designed for future teams.",
    },
    {
      title: "Long-Term Reliability",
      description: "We build systems that continue running smoothly long after initial delivery, with documented runbooks.",
    },
  ],

  targetAudiences: [
    {
      id: "schools",
      title: "Schools & K-12",
      badge: "Education",
      summary: "Modern administrative portals, student fee & attendance systems, and parental communication tools.",
      problem: "Fragmented paper records, disjointed SMS notifications, and clunky legacy software that teachers struggle to use.",
      solution: "Lightweight, responsive web portals with automated attendance, gradebooks, and instant parent communication.",
      href: "/solutions#schools",
    },
    {
      id: "colleges",
      title: "Colleges & Higher Ed",
      badge: "Academia",
      summary: "Departmental dashboards, digital event management, examination workflows, and campus portals.",
      problem: "Complex inter-departmental approvals, siloed student data, and outdated desktop software without mobile access.",
      solution: "Unified role-based campus platforms with API integrations, student self-service, and analytical dashboards.",
      href: "/solutions#colleges",
    },
    {
      id: "startups",
      title: "Tech Startups",
      badge: "Innovation",
      summary: "Rapid MVP engineering, scalable SaaS architectures, AI agent workflows, and developer APIs.",
      problem: "Tight launch windows, limited engineering bandwidth, and the risk of building unmaintainable technical debt.",
      solution: "Production-grade Next.js, Python/Node micro-services, clean database models, and rapid prototype sprints.",
      href: "/solutions#startups",
    },
    {
      id: "smes",
      title: "Small & Growing Businesses",
      badge: "Enterprise Readiness",
      summary: "Custom CRM/ERP tooling, automated invoice pipelines, inventory dashboards, and internal workflow tools.",
      problem: "Manual spreadsheet chaos, high licensing costs for rigid enterprise software, and repetitive clerical tasks.",
      solution: "Custom internal tools and automation scripts tailored directly to existing operational workflows.",
      href: "/solutions#smes",
    },
  ],
};

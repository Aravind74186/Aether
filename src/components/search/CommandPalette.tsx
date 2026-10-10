"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Command,
  FileText,
  Briefcase,
  Layers,
  Calculator,
  ShieldCheck,
  Code2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface SearchItem {
  title: string;
  category: "Navigation" | "Services" | "Case Studies" | "Tools & Simulators" | "Trust & Security" | "Preferences";
  href: string;
  description: string;
}

const searchItems: SearchItem[] = [
  // Navigation
  { title: "Home Page", category: "Navigation", href: "/", description: "Overview of Aether startup engineering capabilities." },
  { title: "About Us & Milestones", category: "Navigation", href: "/about", description: "Our story, mission, vision, and 5-stage roadmap." },
  { title: "Services Directory", category: "Navigation", href: "/services", description: "Web, software, AI, EdTech, MVP, and cloud engineering." },
  { title: "Solutions by Sector", category: "Navigation", href: "/solutions", description: "Tailored architectures for Schools, Colleges, Startups, and SMEs." },
  { title: "Case Studies Hub", category: "Navigation", href: "/case-studies", description: "Real-world engineering projects and architectural breakdowns." },
  { title: "Projects & Labs", category: "Navigation", href: "/projects", description: "Internal prototypes and open-source contributions." },
  { title: "7-Step Delivery Process", category: "Navigation", href: "/process", description: "Discovery, architecture, staging, and production handover." },
  { title: "Technology Ecosystem", category: "Navigation", href: "/technology", description: "Next.js, TypeScript, PostgreSQL, and pgvector stack." },
  { title: "Start a Project Wizard", category: "Navigation", href: "/start-a-project", description: "Interactive 4-step technical intake and scoping wizard." },
  { title: "Contact & Engineering Inquiries", category: "Navigation", href: "/contact", description: "Direct inquiry form and communication channels." },
  { title: "Engineering Blog", category: "Navigation", href: "/blog", description: "Articles on PostgreSQL, RAG systems, and EdTech architecture." },

  // Tools & Simulators
  { title: "Interactive Pitch Deck & Slides", category: "Tools & Simulators", href: "/slides", description: "Zero-dependency 8-slide architecture and capability presentation deck." },
  { title: "Institutional Proposal & SOW Builder", category: "Tools & Simulators", href: "/proposal-builder", description: "Generate formal print-ready technical proposals and milestone SOWs." },
  { title: "Master Services Agreement (MSA) Generator", category: "Tools & Simulators", href: "/msa-generator", description: "Generate formal contracts with 100% IP assignment and 30-day bug warranties." },
  { title: "Cloud Load & Benchmark Sizing Calculator", category: "Tools & Simulators", href: "/benchmark", description: "Estimate vCPU, RAM, connection pools, and VPS vs AWS hosting cost." },
  { title: "Client Onboarding & Kickoff Hub", category: "Tools & Simulators", href: "/onboarding", description: "5-Stage roadmap from contract execution to staging and DNS cutover." },
  { title: "Legacy Software & Architecture Audit Tool", category: "Tools & Simulators", href: "/audit-tool", description: "Diagnose performance bottlenecks and get an instant modernization roadmap." },
  { title: "Project Cost & Sprint Estimator", category: "Tools & Simulators", href: "/estimator", description: "Calculate development timelines and export SOW parameters." },
  { title: "Visual Cloud Architecture Designer", category: "Tools & Simulators", href: "/architecture-designer", description: "Design multi-tier cloud topologies and download SOW blueprint." },
  { title: "Client Experience & Portal Preview", category: "Tools & Simulators", href: "/client-portal-preview", description: "Explore sprint milestone tracking and live staging workflows." },
  { title: "Architectural Decision & ROI Matrix", category: "Tools & Simulators", href: "/compare", description: "Custom software vs. bloated SaaS and PostgreSQL vs. NoSQL." },
  { title: "Internal Lead Triage Dashboard", category: "Tools & Simulators", href: "/admin/leads", description: "Passphrase-secured internal lead management console." },

  // Trust & Security
  { title: "Security & Trust Center", category: "Trust & Security", href: "/trust", description: "Student privacy (FERPA), AES-256 encryption, and 99.9% uptime SLA." },
  { title: "Developer API & Architecture Docs", category: "Trust & Security", href: "/docs", description: "RESTful API standards, Zod validation schemas, and database runbooks." },
  { title: "Live System Health & Status Console", category: "Trust & Security", href: "/status", description: "Real-time service health, 90-day uptime bars, and latency metrics." },

  // Case Studies
  { title: "DocuPulse Intelligent RAG Pipeline", category: "Case Studies", href: "/case-studies/docupulse-intelligent-document-rag-pipeline", description: "Fast vector search over compliance PDFs with verified citations." },
  { title: "OpsForge Inventory & Dispatch System", category: "Case Studies", href: "/case-studies/opsforge-business-operations-and-dispatch-portal", description: "ACID transactions and row-level locking for multi-user inventory." },
  { title: "API Gateway & Connection Pool Hardening", category: "Case Studies", href: "/case-studies/cloud-infra-hardening-and-api-troubleshooting", description: "PgBouncer pooling, Redis caching, and connection leak elimination." },
  { title: "SaaS Launchpad Multi-Tenant MVP", category: "Case Studies", href: "/case-studies/saas-launchpad-multitenant-mvp-architecture", description: "Multi-tenant B2B SaaS boilerplate launched in 5 weeks." },

  // Appearance & Theme Preferences
  { title: "Switch to Dark Mode", category: "Preferences", href: "#theme:dark", description: "Toggle high-contrast obsidian dark theme." },
  { title: "Switch to Light Mode", category: "Preferences", href: "#theme:light", description: "Toggle clean studio light theme." },
  { title: "Use System Theme", category: "Preferences", href: "#theme:system", description: "Match device operating system appearance setting." },
];

export function CommandPalette() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Global Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Listen for custom trigger event
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener("open-command-palette", openHandler);
    return () => window.removeEventListener("open-command-palette", openHandler);
  }, []);

  const filteredItems = query.trim() === ""
    ? searchItems.slice(0, 8)
    : searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#theme:")) {
      const themeValue = href.replace("#theme:", "") as "light" | "dark" | "system";
      setTheme(themeValue);
      return;
    }
    router.push(href);
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems.length > 0) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].href);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-100">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-100">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, tools, case studies, or switch theme..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleListKeyDown}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.href + item.title}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-slate-900 dark:text-slate-100 shadow-2xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{item.title}</span>
                      <span className="text-[10px] font-mono text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.2 rounded-full border border-orange-200 dark:border-orange-800/60 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.description}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-orange-600 dark:text-orange-400 translate-x-0.5" : "text-slate-400"}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-[#0b101e] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 px-4">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Aether Spotlight</span>
        </div>
      </div>
    </div>
  );
}

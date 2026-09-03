import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Code,
  Globe,
  Bot,
  LayoutGrid,
  Layers,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Code,
      badge: "Core Engineering",
      title: "Custom Software Development",
      description:
        "Bespoke backend engines, automated workflow processors, and business logic pipelines designed to eliminate manual spreadsheet chores.",
      stack: ["Node.js", "TypeScript", "Python", "PostgreSQL"],
      href: "/services#software-development",
    },
    {
      icon: Globe,
      badge: "Full-Stack Web",
      title: "High-Performance Web Applications",
      description:
        "Blazing fast, responsive web applications, secure client portals, and administrative consoles built with Next.js 14 App Router and Tailwind CSS.",
      stack: ["Next.js 14", "React SSR", "Tailwind CSS", "Zod"],
      href: "/services#web-development",
    },
    {
      icon: Bot,
      badge: "Practical AI",
      title: "AI & Document RAG Pipelines",
      description:
        "Pragmatic AI integrations, vector embeddings search, page-level citation pipelines, and automated background document processors.",
      stack: ["pgvector", "FastAPI", "OpenAI / Claude", "LangChain"],
      href: "/services#ai-and-automation",
    },
    {
      icon: LayoutGrid,
      badge: "Operations Hub",
      title: "Internal Operations & Dispatch",
      description:
        "Custom administrative dashboards, field dispatch matrixes, inventory tracking, and PDF invoicing tools that keep your business organized.",
      stack: ["Redis Queue", "Prisma ORM", "Docker", "REST API"],
      href: "/services#software-development",
    },
    {
      icon: Layers,
      badge: "EdTech Systems",
      title: "Campus Academic Platforms",
      description:
        "Unified portals for schools and colleges: fast roll call, automated gradebook report card calculation, and WhatsApp parent notifications.",
      stack: ["IndexedDB PWA", "PostgreSQL", "WhatsApp API", "PDF Gen"],
      href: "/services#education-technology",
    },
    {
      icon: HelpCircle,
      badge: "System Design",
      title: "Architecture Auditing & Consulting",
      description:
        "Database schema optimization, API contract planning, cloud cost downsizing (VPS vs AWS), and technology modernization roadmaps.",
      stack: ["Database Sizing", "Security Audits", "CI/CD", "SLA Tuning"],
      href: "/services#cloud-and-backend",
    },
  ];

  return (
    <section className="py-24 bg-transparent relative">
      <Container size="xl">
        <SectionHeader
          badge="Engineering Capabilities"
          title="Engineered for Reliability, Built for Real Utility"
          description="We do not build speculative vanity projects. We engineer functional, maintainable digital products that solve operational bottlenecks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl studio-card p-7 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle brand tint on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl border border-orange-100 bg-orange-50/80 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-orange-500/25 transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-stone-600 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200/90">
                      {cap.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-stone-950 tracking-tight group-hover:text-orange-600 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {cap.stack.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-50 text-stone-600 border border-stone-200/80 group-hover:border-orange-200 group-hover:text-stone-800 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-5 border-t border-stone-100 relative">
                  <Link
                    href={cap.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Service Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

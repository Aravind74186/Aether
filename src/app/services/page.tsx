import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { servicesData } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import {
  Globe,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Database,
  Cloud,
} from "lucide-react";

export const metadata = createMetadata({
  title: "Engineering Services | Web, AI, EdTech & Cloud Architecture",
  description:
    "Explore Aether's core engineering services: custom web software, school management systems, verified AI RAG workflows, MVP prototyping, and database performance tuning.",
  path: "/services",
});

export default function ServicesPage() {
  const iconMap: Record<string, React.ElementType> = {
    Globe,
    GraduationCap,
    Sparkles,
    Layers,
    Database,
    Cloud,
  };

  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Services" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Our Capabilities</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Pragmatic Engineering Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              For Growing Organizations.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            We operate as your dedicated technology partner, designing and building maintainable digital platforms, internal tools, and AI workflows that solve operational bottlenecks.
          </p>
        </div>

        {/* Service Jump Links */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-200">
          {servicesData.map((s) => (
            <a
              key={s.id}
              href={`#${s.slug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 hover:bg-white transition-all shadow-2xs"
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* Detailed Service Blocks */}
        <div className="mt-16 space-y-16">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 rounded-3xl studio-card p-8 sm:p-10 transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Col: Header & Description */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100/90 border border-slate-200/90 flex items-center justify-center text-slate-800 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono uppercase text-slate-500 tracking-wider font-semibold">
                          Service 0{index + 1}
                        </span>
                        <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {service.longDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                        Target Organizations:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.targetAudience.map((aud, aIdx) => (
                          <span
                            key={aIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                        Primary Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-xs font-mono bg-orange-50 text-orange-700 border border-orange-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        href={`/start-a-project?service=${service.slug}`}
                        size="md"
                        variant="primary"
                        className="w-full sm:w-auto"
                      >
                        <span>{service.ctaText || "Start a Project"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Col: Problems Solved & Deliverables */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Problems Solved Box */}
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                        <AlertCircle className="w-4 h-4 text-slate-500" />
                        <span>Bottlenecks & Problems We Solve</span>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                        {service.problemsSolved.map((prob, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <span className="text-slate-400 font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables Box */}
                    <div className="rounded-2xl border border-orange-100 dark:border-orange-900/50 bg-orange-50/40 dark:bg-orange-950/25 p-6 space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-800 dark:text-orange-400 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span>Typical Concrete Deliverables</span>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {service.typicalDeliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <CTASection
        title="Ready to discuss your technology requirements?"
        description="We can help you scope the project, establish realistic milestones, and recommend the cleanest architecture."
      />
    </div>
  );
}

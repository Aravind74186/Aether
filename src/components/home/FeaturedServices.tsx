import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesData } from "@/data/services";
import { Globe, Cpu, Bot, GraduationCap, Rocket, Server, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedServices() {
  const iconMap: Record<string, React.ElementType> = {
    Globe,
    Cpu,
    Bot,
    GraduationCap,
    Rocket,
    Server,
  };

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-transparent border-t border-slate-200 dark:border-slate-800">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            badge="Featured Services"
            title="Core Engineering Services"
            description="We combine deep technical rigor with clean product execution to deliver high-utility solutions."
            align="left"
            className="mb-0"
          />
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>View All 6 Service Disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                className="group rounded-3xl studio-card p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50/80 dark:bg-orange-950/60 border border-orange-100 dark:border-orange-900/60 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-orange-500/25 transition-all duration-300 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-950 dark:text-white tracking-tight group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono text-stone-600 dark:text-slate-400 mb-2 uppercase font-medium">
                      Core Modules
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.typicalDeliverables.slice(0, 3).map((cap, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-stone-50 dark:bg-slate-800 border border-stone-200/80 dark:border-slate-700 text-stone-700 dark:text-slate-300 font-mono"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 group"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Production Grade
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

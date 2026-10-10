import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/site-config";
import { GraduationCap, Landmark, Rocket, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AudienceSegments() {
  const iconMap: Record<string, React.ElementType> = {
    schools: GraduationCap,
    colleges: Landmark,
    startups: Rocket,
    smes: Building2,
  };

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-transparent border-t border-slate-200 dark:border-slate-800">
      <Container size="xl">
        <SectionHeader
          badge="Who We Work With"
          title="Tailored Engineering for Organizations at Every Stage"
          description="From K-12 classrooms and college departments to fast-moving founders and established local enterprises, here is how we solve domain-specific challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.targetAudiences.map((aud) => {
            const Icon = iconMap[aud.id] || Building2;
            return (
              <div
                key={aud.id}
                className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-8 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 flex items-center justify-center text-orange-600 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {aud.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {aud.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {aud.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Common Operational Bottleneck</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {aud.problem}
                      </p>
                    </div>

                    <div className="bg-orange-50/50 dark:bg-orange-950/40 p-3.5 rounded-xl border border-orange-100 dark:border-orange-900/50">
                      <div className="text-[11px] font-mono uppercase text-orange-700 dark:text-orange-400 font-bold mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                        <span>Engineered Deliverable</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {aud.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/solutions#${aud.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 group"
                  >
                    <span>View Sector Blueprints</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                    Target Architecture
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

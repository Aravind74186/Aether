import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { caseStudiesData } from "@/data/case-studies";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export function FeaturedCaseStudies() {
  const featured = caseStudiesData.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            badge="Technical Case Studies"
            title="Deep Engineering Breakdowns"
            description="Explore our technical architecture decisions, trade-offs, and verified project deliverables."
            align="left"
            className="mb-0"
          />
          <Link
            href="/case-studies"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>Explore All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((study) => (
            <div
              key={study.id}
              className="group rounded-3xl studio-card p-7 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    {study.industry}
                  </span>
                  <Badge variant={study.isDemonstration ? "demo" : "success"}>
                    {study.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-950 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                    <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* Challenge Callout */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <div className="text-[11px] font-mono text-stone-700 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-stone-500" />
                    <span>Problem Solved:</span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {study.challenge}
                  </p>
                </div>

                {/* Verified Outcome */}
                <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/80 space-y-1">
                  <div className="text-[11px] font-mono text-orange-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                    <span>Verified Result:</span>
                  </div>
                  <p className="text-xs text-orange-950 font-medium line-clamp-2">
                    {study.verifiedOutcomes[0]}
                  </p>
                </div>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.technologies.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-50 text-stone-600 border border-stone-200/80 group-hover:border-orange-200 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  <span>Read Full Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] font-mono text-stone-600">
                  {study.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

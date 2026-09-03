import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { CampusFlowSimulator } from "@/components/demos/CampusFlowSimulator";
import { DocuPulseSimulator } from "@/components/demos/DocuPulseSimulator";
import { caseStudiesData } from "@/data/case-studies";
import { createMetadata } from "@/lib/metadata";
import {
  Layers,
  Cpu,
  Database,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowLeft,
  ArrowRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const study = caseStudiesData.find((s) => s.slug === params.slug);
  if (!study) return {};

  return createMetadata({
    title: `${study.title} | Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = caseStudiesData.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs
          items={[
            { name: "Case Studies", href: "/case-studies" },
            { name: study.title },
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all Case Studies</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brand">{study.industry}</Badge>
            <Badge variant={study.isDemonstration ? "demo" : "success"}>
              {study.status}
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Timeline: {study.timeline}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {study.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {study.summary}
          </p>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500">Client Context: </span>
              <strong className="text-slate-200">{study.clientType}</strong>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {study.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Left / Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Challenge Section */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>01 / The Challenge</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Operational Problem & Friction
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {study.challenge}
              </p>
            </section>

            {/* Objective Section */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold">
                <Target className="w-4 h-4" />
                <span>02 / The Objective</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Target Architecture & Requirements
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {study.objective}
              </p>
            </section>

            {/* Solution Section */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>03 / The Engineering Solution</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                System Implementation Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {study.solution}
              </p>
            </section>

            {/* Interactive Live Demo Sandbox (If available for case study) */}
            {study.slug === "campus-flow-academic-management-portal" && (
              <section className="space-y-4">
                <CampusFlowSimulator />
              </section>
            )}

            {study.slug === "docupulse-intelligent-document-rag-pipeline" && (
              <section className="space-y-4">
                <DocuPulseSimulator />
              </section>
            )}

            {/* Implementation Decisions */}
            <section className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-orange-400 font-semibold">
                  04 / Technical Trade-offs
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Major Implementation Decisions & Rationale
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Every engineering architecture involves conscious trade-offs. Here is why we made these key structural choices.
                </p>
              </div>

              <div className="space-y-4">
                {study.implementationDecisions.map((dec, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-white font-mono">
                        {dec.topic}
                      </h3>
                      <Badge variant="outline">Decision Note</Badge>
                    </div>
                    <div className="text-xs sm:text-sm text-orange-300 bg-orange-950/40 p-3 rounded-lg border border-orange-800/30">
                      <strong>Adopted Decision: </strong>
                      {dec.decision}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Rationale: </strong>
                      {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column / Architecture Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Architecture Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 sticky top-24">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Terminal className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Technical Architecture
                </h3>
              </div>

              {/* Presentation */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frontend / Presentation</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {study.architectureDetails.frontend.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-orange-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase text-orange-400 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Backend & Logic</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {study.architectureDetails.backend.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-orange-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Database */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Database & Storage</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {study.architectureDetails.database.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-cyan-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infrastructure */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Infrastructure & CI/CD</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {study.architectureDetails.infrastructure.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-slate-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Outcomes Box */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Outcomes</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {study.verifiedOutcomes.map((outc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{outc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  href="/start-a-project"
                  size="sm"
                  variant="primary"
                  className="w-full justify-center"
                >
                  <span>Build a Similar System</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <CTASection
        title="Ready to architect a reliable solution for your organization?"
        description="Let's review your exact operational requirements and build an actionable engineering plan."
      />
    </div>
  );
}

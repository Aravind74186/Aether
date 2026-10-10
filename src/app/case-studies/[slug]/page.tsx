import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { DocuPulseSimulator } from "@/components/demos/DocuPulseSimulator";
import { caseStudiesData } from "@/data/case-studies";
import { createMetadata } from "@/lib/metadata";
import {
  Layers,
  Cpu,
  Database,
  Server,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowLeft,
  ArrowRight,
  Terminal,
  Code2,
  BookOpen,
  UserCheck,
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
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all Case Studies</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brand">{study.industry}</Badge>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-900/50 font-semibold">
              {study.projectType}
            </span>
            <Badge variant={study.isDemonstration ? "demo" : "success"}>
              {study.status}
            </Badge>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Timeline: {study.timeline}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {study.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {study.summary}
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 shadow-2xs">
            <div className="space-y-1">
              <div>
                <span className="text-slate-500 dark:text-slate-400">My Technical Role: </span>
                <strong className="text-slate-900 dark:text-white">{study.myRole}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Engagement Context: </span>
                <span className="text-slate-800 dark:text-slate-200">{study.clientType}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {study.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs font-medium"
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
            <section className="space-y-4 rounded-3xl border border-red-200/80 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 p-7 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-700 dark:text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>01 / The Challenge</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Business Problem & Technical Bottlenecks
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {study.challenge}
              </p>
            </section>

            {/* Objective Section */}
            <section className="space-y-4 rounded-3xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 p-7 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>02 / The Objective</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Target Architecture & Requirements
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {study.objective}
              </p>
            </section>

            {/* My Actual Technical Contributions Section */}
            {study.technicalContributions && study.technicalContributions.length > 0 && (
              <section className="space-y-5 rounded-3xl border border-orange-200/80 dark:border-orange-900/60 bg-orange-50/30 dark:bg-orange-950/20 p-7 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-700 dark:text-orange-400 font-bold">
                  <Code2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>03 / My Technical Contributions</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Hands-On Engineering & Core Deliverables
                </h2>
                <div className="space-y-3 pt-1">
                  {study.technicalContributions.map((contrib, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-orange-100 dark:border-orange-900/40 flex items-start gap-3 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {contrib}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Solution Section */}
            <section className="space-y-4 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-7 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>04 / System Implementation Overview</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Architectural Approach & Implementation
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {study.solution}
              </p>
            </section>



            {study.slug === "docupulse-intelligent-document-rag-pipeline" && (
              <section className="space-y-4">
                <DocuPulseSimulator />
              </section>
            )}

            {/* Implementation Decisions */}
            <section className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-orange-600 dark:text-orange-400 font-semibold">
                  05 / Technical Trade-offs
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Major Implementation Decisions & Rationale
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Every engineering architecture involves conscious trade-offs. Here is why we made these key structural choices.
                </p>
              </div>

              <div className="space-y-4">
                {study.implementationDecisions.map((dec, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white font-mono">
                        {dec.topic}
                      </h3>
                      <Badge variant="outline">Decision Note</Badge>
                    </div>
                    <div className="text-xs sm:text-sm text-orange-950 dark:text-orange-200 bg-orange-50/80 dark:bg-orange-950/40 p-3.5 rounded-xl border border-orange-200/80 dark:border-orange-900/50">
                      <strong className="text-orange-900 dark:text-orange-300 font-bold">Adopted Decision: </strong>
                      {dec.decision}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white font-medium">Rationale: </strong>
                      {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Lessons Learned */}
            {study.lessonsLearned && study.lessonsLearned.length > 0 && (
              <section className="space-y-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-7 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                  <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>06 / Verified Lessons Learned</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Engineering Insights from Production Practice
                </h2>
                <div className="space-y-3">
                  {study.lessonsLearned.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs"
                    >
                      <span className="text-orange-500 font-bold text-sm shrink-0">✦</span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column / Architecture Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Architecture Card */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 p-6 space-y-6 sticky top-24 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Terminal className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
                  Technical Architecture
                </h3>
              </div>

              {/* Presentation */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-orange-700 dark:text-orange-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frontend / Presentation</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {study.architectureDetails.frontend.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-orange-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-mono uppercase text-orange-700 dark:text-orange-400 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Backend & Logic</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {study.architectureDetails.backend.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-orange-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Database */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-mono uppercase text-sky-700 dark:text-sky-400 font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Database & Storage</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {study.architectureDetails.database.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-sky-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infrastructure */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Infrastructure & CI/CD</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {study.architectureDetails.infrastructure.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-slate-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Outcomes Box */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Outcomes</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {study.verifiedOutcomes.map((outc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
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
                  <span>Discuss a Similar Architecture</span>
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

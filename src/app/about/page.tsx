import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { companyValues, companyMilestones } from "@/data/about-data";
import { createMetadata } from "@/lib/metadata";
import {
  Code2,
  Eye,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Handshake,
  CheckCircle2,
  Target,
  Compass,
} from "lucide-react";

export const metadata = createMetadata({
  title: "About Us | Our Story, Mission & Engineering Standards",
  description:
    "Learn about Aether Technologies: our gradual journey, core engineering values, commitment to transparency, and long-term vision.",
  path: "/about",
});

export default function AboutPage() {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Eye,
    ShieldCheck,
    Sparkles,
    BookOpen,
    Handshake,
  };

  return (
    <div className="py-12 sm:py-16 space-y-20 bg-white">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "About Us" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Our Identity & Philosophy</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Small startup today. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Building reliable technology for tomorrow.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Aether is an early-stage engineering studio founded on the principle of pragmatic craftsmanship. We reject inflated claims, superficial hype, and unnecessary complexity in favor of software that works reliably, every single day.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase text-orange-700 tracking-wider font-bold">
              Our Mission
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Build useful, reliable, and accessible technology that solves real problems.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We focus our energy on tangible bottlenecks: digitizing chaotic campus records, automating manual order pipelines, and building solid MVP foundations for founders who need to launch with confidence.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono uppercase text-orange-700 tracking-wider font-bold">
              Our Vision
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Become a trusted technology partner for organizations building their next digital product.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We are deliberately growing our capabilities step-by-step—advancing from targeted prototypes to comprehensive institutional platforms, with an unwavering commitment to maintainable code and customer trust.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-20 rounded-3xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-600" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
              Our Story & Realistic Positioning
            </h2>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Built Gradually, Engineered Rigorously
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <p>
              Aether did not begin with venture capital blitzscaling or speculative promises. It began with an engineering realization: most schools, colleges, small businesses, and early founders are poorly served by both overpriced enterprise software and rushed freelance code.
            </p>
            <p>
              We chose a different path. We are building this company deliberately, starting with focused modular software (like our <strong className="text-slate-900">CampusFlow</strong> academic prototype and <strong className="text-slate-900">DocuPulse</strong> verifiable RAG pipeline) and mastering each layer of system design before expanding.
            </p>
            <p>
              When you work with Aether, you speak directly with the engineers designing your schemas and writing your TypeScript interfaces. We don&apos;t hide behind layers of account executives or outsource your vision.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <SectionHeader
            badge="Guiding Principles"
            title="Core Engineering Values"
            description="These six values govern every technical decision, architecture trade-off, and client communication."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((val, idx) => {
              const Icon = iconMap[val.icon] || Code2;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 hover:border-orange-300 hover:shadow-md transition-all space-y-4 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Journey / Timeline */}
        <div className="mt-24">
          <SectionHeader
            badge="Company Roadmap"
            title="Our Growth Journey & Milestones"
            description="A transparent look at where we started, what we are building today, and where we are heading."
          />

          <div className="relative border-l border-slate-200 ml-4 sm:ml-8 space-y-12">
            {companyMilestones.map((m, idx) => {
              const isCompleted = m.status === "completed";
              const isCurrent = m.status === "current";
              return (
                <div key={idx} className="relative pl-8 sm:pl-10 group">
                  {/* Node Dot */}
                  <div
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-colors ${
                      isCompleted
                        ? "border-emerald-500 text-emerald-600"
                        : isCurrent
                        ? "border-orange-600 text-orange-600 ring-4 ring-orange-500/20"
                        : "border-slate-300 text-slate-400"
                    }`}
                  >
                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />}
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-orange-700 font-bold">
                          {m.stage}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          • {m.period}
                        </span>
                      </div>
                      <Badge
                        variant={
                          isCompleted ? "success" : isCurrent ? "brand" : "outline"
                        }
                      >
                        {isCompleted
                          ? "Achieved"
                          : isCurrent
                          ? "Current Focus"
                          : "Future Roadmap"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-mono text-slate-500 uppercase mb-2 font-medium">
                        Key Milestones:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {m.keyAchievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isCompleted
                                  ? "text-emerald-600"
                                  : isCurrent
                                  ? "text-orange-600"
                                  : "text-slate-400"
                              }`}
                            />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <CTASection
        title="Interested in partnering with a transparent technology studio?"
        description="Whether you have an upcoming project or need technical advisory on your architecture, let's connect."
      />
    </div>
  );
}

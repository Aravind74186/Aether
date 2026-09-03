import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { InteractiveArchitecture } from "@/components/technology/InteractiveArchitecture";
import { VisualSystemDiagram } from "@/components/architecture/VisualSystemDiagram";
import { technologiesData } from "@/data/technologies";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck, Cpu, Terminal } from "lucide-react";

export const metadata = createMetadata({
  title: "Technology Stack & Ecosystem | Aether",
  description:
    "Explore the battle-tested technologies we use across frontend engineering, backend APIs, relational databases, AI systems, and cloud infrastructure.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <Breadcrumbs items={[{ name: "Technology Stack" }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">Our Technology Ecosystem</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Battle-Tested Stacks, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Zero Unnecessary Complexity.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed pt-2">
            We pick technologies based on reliability, strong typing, long-term maintainability, and active community support. Here is the software stack we deploy.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              We only display technologies our engineers actively build with. No fake corporate partner claims.
            </span>
          </div>
        </div>

        {/* Easy-to-Understand Visual System Flow Diagram */}
        <div className="mt-12">
          <VisualSystemDiagram />
        </div>

        {/* Interactive Architecture Inspector */}
        <div className="mt-16">
          <InteractiveArchitecture />
        </div>

        {/* Technology Categories */}
        <div className="mt-16 space-y-12">
          {technologiesData.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 space-y-6"
            >
              <div className="border-b border-slate-800/80 pb-4">
                <div className="text-xs font-mono text-orange-400 uppercase font-semibold">
                  Category 0{idx + 1}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {cat.category}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-850 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-mono">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-850 text-orange-300 border border-slate-750">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CTASection
        title="Have questions about which stack is right for your project?"
        description="We can help you audit your technical requirements and choose the most reliable tools."
      />
    </div>
  );
}

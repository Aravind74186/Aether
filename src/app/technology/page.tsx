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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
            Battle-Tested Stacks, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Zero Unnecessary Complexity.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed pt-2">
            We pick technologies based on reliability, strong typing, long-term maintainability, and active community support. Here is the software stack we deploy.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-700 mt-2 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
        <div className="mt-16 space-y-10">
          {technologiesData.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 space-y-6 shadow-xs"
            >
              <div className="border-b border-stone-200 pb-5">
                <div className="text-xs font-mono text-orange-600 uppercase font-bold tracking-wider">
                  Category 0{idx + 1}
                </div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight mt-1">
                  {cat.category}
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {cat.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/90 flex flex-col justify-between gap-3 hover:border-orange-300 hover:bg-white hover:shadow-xs transition-all shadow-2xs group h-full"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-stone-900 font-mono group-hover:text-orange-600 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="shrink-0 text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200/80 font-bold whitespace-nowrap">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mt-auto">
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

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTASection({
  title = "Have an idea or a problem worth solving?",
  description = "Whether you are a school looking to digitize campus records, a startup founder building an MVP, or an SME seeking custom workflow tools, we are ready to discuss your requirements.",
  primaryButtonText = "Start a Project",
  primaryButtonHref = "/start-a-project",
  secondaryButtonText = "Contact Us",
  secondaryButtonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/40 to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative">
        <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 p-8 sm:p-12 lg:p-16 text-center shadow-lg shadow-orange-600/5 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-mono mb-6 font-medium">
            <Terminal className="w-3.5 h-3.5" />
            <span>Direct Engineering Engagement</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl mx-auto text-balance">
            {title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={primaryButtonHref} size="lg" variant="primary" className="w-full sm:w-auto">
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href={secondaryButtonHref} size="lg" variant="secondary" className="w-full sm:w-auto">
              <MessageSquare className="w-4 h-4" />
              <span>{secondaryButtonText}</span>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-mono">
            <span className="flex items-center gap-1.5 text-slate-700">✓ Fixed-scope & milestones</span>
            <span className="flex items-center gap-1.5 text-slate-700">✓ Direct developer communication</span>
            <span className="flex items-center gap-1.5 text-slate-700">✓ Complete code ownership</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

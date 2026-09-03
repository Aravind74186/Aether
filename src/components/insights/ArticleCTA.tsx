import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";

interface ArticleCTAProps {
  topic?: string;
}

export function ArticleCTA({ topic }: ArticleCTAProps) {
  return (
    <div className="my-12 rounded-2xl border border-orange-800/40 bg-gradient-to-r from-orange-950/40 via-slate-900/80 to-amber-950/40 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-orange-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Collaboration</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Building something similar{topic ? ` in ${topic}` : ""}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We partner with schools, startups, and growing enterprises to design, architect, and engineer reliable digital platforms. Let&apos;s evaluate your technical requirements.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
          <Link
            href="/start-a-project"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold font-mono transition-colors shadow-lg shadow-orange-600/20"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold font-mono border border-slate-700 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

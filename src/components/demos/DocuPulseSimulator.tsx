"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, FileText, CheckCircle2, Bookmark, Sparkles, Terminal } from "lucide-react";

interface QueryPreset {
  question: string;
  answer: string;
  sourceDoc: string;
  pageNumber: number;
  confidenceScore: string;
  quoteSnippet: string;
}

const sampleKnowledgeBase: QueryPreset[] = [
  {
    question: "What is the policy for fee refund during medical emergencies?",
    answer: "Full tuition refund is granted if withdrawal occurs within 14 days of term commencement with verified medical documentation. After 14 days, a pro-rata deduction of 15% per elapsed calendar week applies.",
    sourceDoc: "Institutional_Fee_Regulations_2025.pdf",
    pageNumber: 18,
    confidenceScore: "0.942 (Cosine Hybrid)",
    quoteSnippet: "Section 4.2(b): 'Medical withdrawals substantiated by certified hospital documentation within 14 calendar days receive 100% tuition refund...'",
  },
  {
    question: "How are departmental lab equipment items audited and checked out?",
    answer: "All equipment valued over $500 requires digital RFID logging in the central portal and dual-signoff from the Department Head and Faculty Advisor before physical release.",
    sourceDoc: "Laboratory_Safety_Standard_Operating_Procedures.pdf",
    pageNumber: 34,
    confidenceScore: "0.918 (Cosine Hybrid)",
    quoteSnippet: "Clause 9.1: 'Items registered in Category A ($500+) must be assigned via two-factor digital signoff prior to campus departure.'",
  },
  {
    question: "What is the maximum allowed cloud API budget for student hackathon teams?",
    answer: "Information not found in the verified knowledge base. The system refuses to fabricate speculative budget allowances without an authorized grant record.",
    sourceDoc: "System Safeguard: Refusal Triggered",
    pageNumber: 0,
    confidenceScore: "0.312 (Below Threshold)",
    quoteSnippet: "[Guardrail Active: Cosine retrieval similarity below 0.70 threshold. Strict hallucination refusal enacted.]",
  },
];

export function DocuPulseSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [activeResult, setActiveResult] = useState<QueryPreset>(sampleKnowledgeBase[0]);

  const handleSelectQuery = (index: number) => {
    setIsSearching(true);
    setTimeout(() => {
      setSelectedPreset(index);
      setActiveResult(sampleKnowledgeBase[index]);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase">
              RAG Pipeline Live Sandbox
            </span>
            <Badge variant="demo">Verifiable Citations</Badge>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">
            DocuPulse Citation & Ground Truth Search
          </h3>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850">
          pgvector • Hybrid BM25
        </div>
      </div>

      {/* Preset Query Buttons */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
          Select Sample Document Inquiries:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {sampleKnowledgeBase.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectQuery(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedPreset === idx
                  ? "border-orange-500 bg-orange-950/40 text-white font-semibold"
                  : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="truncate font-semibold">{item.question}</div>
              <div className="text-[10px] text-slate-500 mt-1 truncate">
                Doc: {item.sourceDoc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Result Display Box */}
      <div className="space-y-4 pt-2">
        {isSearching ? (
          <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-orange-400 animate-pulse">
            Computing vector embeddings & ranking semantic chunks...
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-5 space-y-4">
            {/* Generated Answer */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Synthesized Verified Answer</span>
                </span>
                <span className="text-[11px] text-orange-400 font-mono">
                  Similarity: {activeResult.confidenceScore}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                {activeResult.answer}
              </p>
            </div>

            {/* Source Grounding Quote Box */}
            <div className="p-3.5 rounded-lg bg-orange-950/20 border border-orange-800/40 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-orange-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Exact Source Bounding Box & Page Reference</span>
                </span>
                {activeResult.pageNumber > 0 && (
                  <span className="bg-orange-900/60 px-2 py-0.5 rounded text-white text-[10px]">
                    Page {activeResult.pageNumber}
                  </span>
                )}
              </div>
              <div className="text-slate-400 italic text-[11px] leading-relaxed">
                {activeResult.quoteSnippet}
              </div>
              <div className="text-[10px] text-slate-500 truncate pt-1 border-t border-orange-900/40">
                Source Document: {activeResult.sourceDoc}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/60">
        <span>// Verifiability Benchmark</span>
        <span className="text-emerald-400 font-semibold">0% Hallucination Rate Enforced</span>
      </div>
    </div>
  );
}

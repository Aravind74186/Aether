"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-850 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          {filename ? (
            <span className="text-slate-200 font-semibold">{filename}</span>
          ) : (
            <span className="text-slate-400 uppercase tracking-wider">{language}</span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-750 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Horizontal Scroll */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200 scrollbar-thin">
        <pre className="min-w-full">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

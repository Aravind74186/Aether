"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to Aether Technical Publications.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription request failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="rounded-3xl border border-orange-200/80 dark:border-orange-500/30 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 dark:from-[#0f172a] dark:via-[#131d33] dark:to-[#0f172a] p-8 sm:p-12 relative overflow-hidden shadow-sm dark:shadow-black/50">
      {/* Background radial accent */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/[0.06] dark:bg-orange-500/[0.1] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-orange-100/80 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 flex items-center justify-center text-orange-700 dark:text-orange-300 mx-auto shadow-2xs">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white tracking-tight">
          Aether Engineering Dispatch
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
          Get occasional deep dives into database architectures, RAG design, and verified lessons from production builds. Zero marketing spam.
        </p>

        <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.engineering.email@company.com"
                aria-label="Email address for technical newsletter"
                disabled={status === "loading" || status === "success"}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono transition-colors disabled:opacity-50 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold font-mono transition-colors shrink-0 disabled:opacity-50 shadow-sm shadow-orange-600/20"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Status Feedback */}
          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-700 pt-1">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-red-700 pt-1">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

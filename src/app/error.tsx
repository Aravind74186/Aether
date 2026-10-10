"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime error to console
    console.error("[Application Error Boundary caught error]:", error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 bg-white">
      <Container size="md">
        <div className="rounded-3xl border border-red-200/80 bg-red-50/40 p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 mx-auto shadow-2xs">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-red-100/80 border border-red-200 text-red-800">
            <span>Application Runtime Error</span>
            {error.digest && <span className="text-red-600">#{error.digest.slice(0, 8)}</span>}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Something unexpected occurred while rendering this page
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            An isolated component error was caught by the application safety boundary. You can attempt to re-render or return to the homepage.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold font-mono transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold font-mono border border-slate-300 transition-colors shadow-2xs"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

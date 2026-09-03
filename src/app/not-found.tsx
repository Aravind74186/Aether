import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32">
      <Container size="md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-center text-orange-400 mx-auto">
            <Terminal className="w-7 h-7" />
          </div>

          <Badge variant="warning">HTTP 404 / Route Not Found</Badge>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Requested Resource Does Not Exist
          </h1>

          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or is currently under active development.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/" size="md" variant="primary">
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Button>
            <Button href="/services" size="md" variant="outline">
              <span>Explore Services</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PresentationDeck } from "@/components/slides/PresentationDeck";
import { createMetadata } from "@/lib/metadata";
import { Presentation, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Interactive Pitch Deck & Capabilities Slides | Aether",
  description:
    "Explore Aether's interactive 8-slide architecture and capability deck. Zero-dependency viewport-safe presentation for schools, startups, and enterprise buyers.",
  path: "/slides",
});

export default function SlidesPage() {
  return (
    <div className="py-10 sm:py-14 space-y-8">
      <Container size="xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumbs items={[{ name: "Interactive Presentation Slides" }]} />
          <div className="flex items-center gap-3">
            <a
              href="/presentation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Standalone HTML Presentation</span>
            </a>
          </div>
        </div>

        {/* The Interactive Deck */}
        <div className="mt-4">
          <PresentationDeck />
        </div>
      </Container>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Terminal, Github, Linkedin, ArrowUpRight, Shield } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/90 bg-[#fafafc] text-slate-600 pt-16 pb-12">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-stone-950 font-bold text-lg tracking-tight group"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-600 border border-orange-500 flex items-center justify-center text-white group-hover:bg-orange-700 transition-all duration-300 shadow-sm shadow-orange-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight font-extrabold tracking-tight text-stone-950">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-stone-500 font-mono font-medium uppercase tracking-widest">
                  Engineering Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:border-slate-300 transition-colors shadow-2xs"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:border-slate-300 transition-colors shadow-2xs"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs text-slate-800 font-mono mt-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{siteConfig.motto}</span>
            </div>
          </div>

          {/* Navigation Links: Company & Work */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
              Company & Work
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-orange-600 transition-colors">
                  About Aether
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-orange-600 transition-colors">
                  Solutions by Sector
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-orange-600 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-orange-600 transition-colors">
                  Projects & Labs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-600 transition-colors text-orange-600 font-semibold">
                  Engineering Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering & Methodology */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
              Methodology
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/process" className="hover:text-orange-600 transition-colors">
                  7-Step Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-orange-600 transition-colors">
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-orange-600 transition-colors">
                  Security & Trust
                </Link>
              </li>
              <li>
                <Link href="/benchmark" className="hover:text-orange-600 transition-colors">
                  Cloud Load Benchmark
                </Link>
              </li>
              <li>
                <Link href="/audit-tool" className="hover:text-orange-600 transition-colors">
                  Architecture Audit Tool
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-orange-600 transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Legal */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
              Client Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/estimator" className="hover:text-orange-600 transition-colors">
                  Interactive Estimator
                </Link>
              </li>
              <li>
                <Link href="/proposal-builder" className="hover:text-orange-600 transition-colors">
                  Proposal Builder
                </Link>
              </li>
              <li>
                <Link href="/msa-generator" className="hover:text-orange-600 transition-colors">
                  MSA Contract Generator
                </Link>
              </li>
              <li>
                <Link href="/start-a-project" className="hover:text-orange-600 transition-colors text-orange-600 font-semibold">
                  Start a Project Wizard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 transition-colors">
                  Direct Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-mono">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-slate-900 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

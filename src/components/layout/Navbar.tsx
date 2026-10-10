"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, Search, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 shadow-xs py-3"
          : "bg-white/70 dark:bg-[#090d16]/75 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60 py-4.5"
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-stone-950 dark:text-stone-100 font-bold text-lg tracking-tight group focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded-xl p-1"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-600 border border-orange-500 flex items-center justify-center text-white group-hover:bg-orange-700 transition-all duration-300 shadow-sm shadow-orange-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold tracking-tight text-stone-950 dark:text-stone-100">
                {siteConfig.shortName}
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono font-medium uppercase tracking-widest">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/20",
                    isActive
                      ? "text-orange-950 dark:text-orange-300 font-semibold bg-orange-50/90 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/60 shadow-2xs"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-slate-800/60"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA, Search and Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Search Command Palette Trigger */}
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-command-palette"));
                }
              }}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
              title="Search (Cmd+K)"
              aria-label="Search pages and tools"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] font-medium">Search</span>
              <kbd className="hidden md:inline-block text-[9px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400 font-sans shadow-2xs">
                ⌘K
              </kbd>
            </button>

            <div className="hidden sm:block">
              <Button
                href="/start-a-project"
                size="sm"
                variant="primary"
                className="font-medium"
              >
                Start a Project
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 flex flex-col p-6 overflow-y-auto animate-page-reveal">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-3">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "text-orange-600 dark:text-orange-400 bg-orange-50/80 dark:bg-orange-950/40 font-semibold border border-orange-200/80 dark:border-orange-800/60"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  )}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Appearance
              </span>
              <ThemeToggle variant="segmented" />
            </div>

            <Button
              href="/start-a-project"
              size="lg"
              variant="primary"
              className="w-full justify-center"
            >
              Start a Project
            </Button>
            <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
              Direct Engineering Engagement • Zero Boilerplate
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

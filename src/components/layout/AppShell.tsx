"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/search/CommandPalette";
import { AmbientBackground } from "@/components/shared/AmbientBackground";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow min-h-screen">{children}</main>;
  }

  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="flex-grow pt-20 relative z-10 animate-page-reveal">{children}</main>
      <Footer />
      <CommandPalette />
    </>
  );
}

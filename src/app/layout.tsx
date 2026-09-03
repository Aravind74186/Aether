import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScopingAssistant } from "@/components/chat/ScopingAssistant";
import { CommandPalette } from "@/components/search/CommandPalette";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { siteConfig } from "@/data/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-x-hidden selection:bg-orange-600 selection:text-white">
        <AmbientBackground />
        <Navbar />
        <main className="flex-grow pt-20 relative z-10 animate-page-reveal">{children}</main>
        <Footer />
        <ScopingAssistant />
        <CommandPalette />
      </body>
    </html>
  );
}

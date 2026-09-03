"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll back to top of article"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-slate-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-slate-900/10"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

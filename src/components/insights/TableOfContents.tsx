"use client";

import React, { useEffect, useState } from "react";
import { ListTree, ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 90; // offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-2xs"
    >
      {/* Mobile Collapsible Header */}
      <button
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="w-full flex items-center justify-between lg:cursor-default"
        type="button"
        aria-expanded={isOpenMobile}
      >
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
          <ListTree className="w-4 h-4 text-orange-600" />
          <span>Table of Contents</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 transition-transform lg:hidden ${
            isOpenMobile ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* List Container (always visible on lg+, toggleable on mobile) */}
      <div className={`mt-4 space-y-1.5 ${isOpenMobile ? "block" : "hidden lg:block"}`}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`block text-xs transition-colors py-1 ${
                item.level === 3 ? "pl-4 text-stone-500" : "font-medium"
              } ${
                isActive
                  ? "text-orange-600 font-bold border-l-2 border-orange-600 pl-2 -ml-2"
                  : "text-stone-600 hover:text-stone-950"
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 font-mono mb-6">
      <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-300 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-slate-300 truncate max-w-xs">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

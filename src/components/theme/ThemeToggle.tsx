"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme, Theme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "segmented" | "compact";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by rendering a consistent placeholder until mounted
  if (!mounted) {
    if (variant === "segmented") {
      return (
        <div
          className={cn(
            "inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 opacity-60",
            className
          )}
        >
          <div className="px-2.5 py-1 text-xs font-mono">Light</div>
          <div className="px-2.5 py-1 text-xs font-mono">Dark</div>
          <div className="px-2.5 py-1 text-xs font-mono">Auto</div>
        </div>
      );
    }
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center opacity-60",
          className
        )}
        aria-hidden="true"
      >
        <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>
    );
  }

  // Segmented 3-state control (Light | Dark | System)
  if (variant === "segmented") {
    const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
      { value: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
      { value: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
      { value: "system", label: "Auto", icon: <Laptop className="w-3.5 h-3.5" /> },
    ];

    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors",
          className
        )}
        role="group"
        aria-label="Theme selector"
      >
        {options.map((opt) => {
          const isActive = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium font-mono transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500",
                isActive
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
              aria-pressed={isActive}
              title={`Switch to ${opt.label} mode`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact icon button for Navbar
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-2xs group cursor-pointer",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={cn(
            "w-4 h-4 text-amber-500 transition-all duration-300 transform",
            isDark
              ? "rotate-90 scale-0 opacity-0 absolute"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        {/* Moon Icon */}
        <Moon
          className={cn(
            "w-4 h-4 text-sky-400 transition-all duration-300 transform",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0 absolute"
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

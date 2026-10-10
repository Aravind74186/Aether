import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "brand" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:pointer-events-none rounded-xl text-center cursor-pointer select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/25 hover:shadow-md hover:shadow-orange-600/35 border border-orange-600 hover:border-orange-700 font-semibold",
      brand:
        "bg-orange-600 hover:bg-orange-700 text-white shadow-xs hover:shadow-md hover:shadow-orange-500/25 border border-orange-600 font-semibold",
      secondary:
        "bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-900 dark:text-stone-100 border border-stone-200/90 dark:border-slate-800 shadow-xs hover:shadow-sm hover:border-stone-300 dark:hover:border-slate-700 font-medium",
      outline:
        "bg-transparent hover:bg-orange-50/60 dark:hover:bg-orange-950/40 text-stone-800 dark:text-stone-200 hover:text-orange-700 dark:hover:text-orange-400 border border-stone-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 font-medium",
      ghost:
        "bg-transparent hover:bg-stone-100/70 dark:hover:bg-slate-800/70 text-stone-700 dark:text-stone-300 hover:text-orange-700 dark:hover:text-orange-400",
      danger:
        "bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-xs",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 rounded-md",
      md: "text-sm px-4 py-2.5 gap-2 rounded-lg",
      lg: "text-base px-6 py-3.5 gap-2.5 rounded-xl font-semibold",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

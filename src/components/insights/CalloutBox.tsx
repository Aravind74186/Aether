import React from "react";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";

interface CalloutBoxProps {
  type?: "tip" | "important" | "warning" | "note";
  title?: string;
  content: string;
}

export function CalloutBox({ type = "note", title, content }: CalloutBoxProps) {
  const configs = {
    tip: {
      border: "border-emerald-800/60",
      bg: "bg-emerald-950/20",
      text: "text-emerald-300",
      titleColor: "text-emerald-400",
      icon: CheckCircle2,
      defaultTitle: "Engineering Tip",
    },
    important: {
      border: "border-orange-800/60",
      bg: "bg-orange-950/20",
      text: "text-orange-200",
      titleColor: "text-orange-400",
      icon: ShieldAlert,
      defaultTitle: "Important Requirement",
    },
    warning: {
      border: "border-amber-800/60",
      bg: "bg-amber-950/25",
      text: "text-amber-200",
      titleColor: "text-amber-400",
      icon: AlertTriangle,
      defaultTitle: "Architecture Caveat",
    },
    note: {
      border: "border-orange-800/60",
      bg: "bg-orange-950/20",
      text: "text-orange-200",
      titleColor: "text-orange-400",
      icon: Info,
      defaultTitle: "Technical Note",
    },
  };

  const c = configs[type] || configs.note;
  const Icon = c.icon;

  return (
    <aside
      className={`my-6 rounded-xl border ${c.border} ${c.bg} p-5 space-y-2`}
      aria-label={title || c.defaultTitle}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${c.titleColor} shrink-0`} />
        <span className={`text-xs font-mono uppercase font-bold tracking-wider ${c.titleColor}`}>
          {title || c.defaultTitle}
        </span>
      </div>
      <p className={`text-xs sm:text-sm leading-relaxed ${c.text}`}>{content}</p>
    </aside>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  azure: "bg-azure-50 text-azure-700 border-azure-100",
  sage: "bg-sage-100 text-sage-700 border-sage-100",
  neutral: "bg-mist text-slate border-line",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Cartão base: branco, hairline, sombra difusa. O hover levanta 2px —
 * o suficiente para responder, nunca o suficiente para distrair.
 */
export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)]",
        hover && "hover:-translate-y-0.5 hover:shadow-lift hover:border-azure-200/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeRise, fadeIn, VIEWPORT_ONCE, EASE_CALM } from "@/lib/motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** "rise" (sobe suavemente) ou "fade" (só opacidade, para texto longo). */
  variant?: "rise" | "fade";
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Revela o conteúdo quando entra no viewport — uma vez, com calma.
 * Respeita prefers-reduced-motion automaticamente.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const variants = variant === "rise" ? fadeRise : fadeIn;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      transition={{ duration: 0.8, ease: EASE_CALM, delay }}
    >
      {children}
    </Comp>
  );
}

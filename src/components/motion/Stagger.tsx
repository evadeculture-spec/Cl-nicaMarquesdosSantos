"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeRise, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Grupo de elementos que entram em cascata suave (60–90ms de intervalo).
 * Usar StaggerItem para cada filho.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeRise}>
      {children}
    </motion.div>
  );
}

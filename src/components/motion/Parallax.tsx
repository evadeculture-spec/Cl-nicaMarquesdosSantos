"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Parallax subtil com GSAP ScrollTrigger — deslocamento máximo de 8%.
 * Carrega o GSAP apenas quando o componente é usado (dynamic import).
 */
export function Parallax({
  children,
  amount = 0.06,
  className,
}: {
  children: ReactNode;
  /** Fração da altura do viewport a deslocar (0.04–0.08 recomendado). */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !ref.current) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.fromTo(
        ref.current,
        { y: () => window.innerHeight * amount },
        {
          y: () => -window.innerHeight * amount,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

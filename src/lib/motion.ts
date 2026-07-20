/**
 * Tokens de movimento — a única fonte de verdade do ritmo do site.
 * Tudo respira ao mesmo tempo: durações longas, easings calmos,
 * deslocamentos curtos. Nada salta, tudo assenta.
 */
import type { Transition, Variants } from "motion/react";

export const EASE_CALM = [0.22, 1, 0.36, 1] as const;
export const EASE_GLIDE = [0.16, 1, 0.3, 1] as const;

export const transitionCalm: Transition = {
  duration: 0.8,
  ease: EASE_CALM,
};

export const transitionFast: Transition = {
  duration: 0.45,
  ease: EASE_CALM,
};

/** Entrada padrão: sobe 20px enquanto revela. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitionCalm },
};

/** Entrada discreta, sem deslocamento — para texto longo. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE_CALM } },
};

/** Contentor que orquestra filhos em cascata. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const VIEWPORT_ONCE = { once: true, margin: "-64px" } as const;

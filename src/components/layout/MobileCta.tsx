"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { CalendarPlus, PhoneCall } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { clinic } from "@/content/clinic";
import { EASE_CALM } from "@/lib/motion";

/**
 * Barra de conversão fixa no mobile: aparece após o primeiro scroll,
 * mantém "Marcar Consulta" sempre ao alcance do polegar.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Na página de marcação a barra seria redundante.
  if (pathname.startsWith("/marcar")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CALM }}
          className="glass fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-2xl p-3 shadow-lift lg:hidden"
        >
          <ButtonLink href="/marcar" className="h-12 flex-1">
            <CalendarPlus className="size-4" aria-hidden />
            Marcar Consulta
          </ButtonLink>
          <a
            href={`tel:${clinic.phoneHref}`}
            aria-label={`Ligar para a clínica: ${clinic.phone}`}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-white text-gold-700 shadow-soft transition-transform active:scale-95"
          >
            <PhoneCall className="size-5" aria-hidden />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

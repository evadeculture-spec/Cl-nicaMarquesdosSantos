"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { EASE_CALM } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="bg-mist py-24 lg:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title="Tudo o que costuma perguntar antes de marcar."
            lead="Não encontrou a resposta? Ligue-nos ou use o assistente no canto do ecrã — respondemos em minutos."
          />
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line bg-white shadow-soft">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left transition-colors duration-300 hover:bg-mist/60"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="font-medium tracking-tight text-ink">
                      {faq.question}
                    </span>
                    <Plus
                      className={cn(
                        "size-5 shrink-0 text-muted transition-transform duration-500 ease-[var(--ease-calm)]",
                        open && "rotate-45",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_CALM }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-7 text-[0.9375rem] leading-relaxed text-slate">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

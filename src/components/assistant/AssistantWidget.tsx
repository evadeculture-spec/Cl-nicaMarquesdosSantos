"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { EASE_CALM } from "@/lib/motion";
import { specialties } from "@/content/specialties";
import { clinic } from "@/content/clinic";
import { cn } from "@/lib/utils";

type Message = { role: "assistant" | "user"; text: string; cta?: { href: string; label: string } };

const RED_FLAGS = [
  "dor no peito", "peito aperta", "falta de ar", "desmaio", "desmaiei",
  "acidente grave", "perda de força súbita", "cara descaída", "febre alta",
];

const GREETING: Message = {
  role: "assistant",
  text: "Olá! Sou o assistente digital da clínica. Posso responder a dúvidas, fazer uma triagem inicial dos seus sintomas e ajudar a marcar consulta. Como se sente hoje?",
};

/** Triagem determinística: mapeia sintomas descritos a especialidades. */
function triage(input: string): Message {
  const t = input.toLowerCase();

  if (RED_FLAGS.some((f) => t.includes(f))) {
    return {
      role: "assistant",
      text: "Pelo que descreve, o mais indicado é uma avaliação médica urgente — ligue 112 ou dirija-se a uma urgência. A fisioterapia entra depois, quando for seguro. Se tiver dúvidas, ligue-nos.",
    };
  }

  const matches: { specialty: (typeof specialties)[number]; score: number }[] = [];
  const keywordMap: Record<string, string[]> = {
    "fisioterapia": ["lombar", "costas", "cervical", "pescoço", "pescoco", "joelho", "ombro", "entorse", "tendinite", "desporto", "corrida", "cirurgia", "operado", "prótese", "protese", "ligamento", "dor"],
    "osteopatia": ["osteopatia", "osteopata", "tensões", "tensoes", "corpo todo", "enxaqueca", "postural"],
    "reabilitacao-perineal": ["gravidez", "grávida", "gravida", "parto", "pélvica", "pelvica", "perineal", "incontinência", "incontinencia", "diástase", "diastase", "urina"],
    "reabilitacao-estetica": ["estética", "estetica", "cicatriz", "drenagem", "linfática", "linfatica", "edema", "pós-cirurgia estética"],
    "podoposturologia": ["pés", "pes", "pé", "palmilha", "apoio", "postura", "pisada"],
    "terapia-da-fala": ["fala", "linguagem", "gaguez", "engolir", "deglutição", "degluticao", "comunicação", "comunicacao"],
    "psicologia": ["ansiedade", "stress", "psicólogo", "psicologo", "psicologia", "emocional", "dormir", "depressão", "depressao"],
  };

  for (const s of specialties) {
    const keywords = keywordMap[s.slug] ?? [];
    const score = keywords.filter((k) => t.includes(k)).length;
    if (score > 0) matches.push({ specialty: s, score });
  }
  matches.sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const s = matches[0].specialty;
    return {
      role: "assistant",
      text: `Pelo que descreve, a área mais indicada parece ser ${s.name}. ${s.short} Importante: isto não é um diagnóstico — na avaliação inicial (60 minutos) confirmamos exatamente o que se passa e definimos o plano. Quer marcar?`,
      cta: { href: `/marcar?especialidade=${s.slug}`, label: `Marcar avaliação de ${s.name}` },
    };
  }

  if (t.includes("preço") || t.includes("preco") || t.includes("custa") || t.includes("valor")) {
    return {
      role: "assistant",
      text: "A avaliação inicial custa 40€ (60 minutos) e as sessões de fisioterapia 35€. Trabalhamos com os principais seguros e emitimos fatura-recibo para reembolso.",
      cta: { href: "/tratamentos", label: "Ver todos os preços" },
    };
  }

  if (t.includes("horário") || t.includes("horario") || t.includes("aberto") || t.includes("fecha")) {
    return {
      role: "assistant",
      text: `Estamos abertos de segunda a sexta das 09:00 às 20:00 e ao sábado das 09:00 às 13:00. Pode marcar online a qualquer hora — confirmamos em ${clinic.metrics.responseMinutes} minutos, em horário de clínica.`,
      cta: { href: "/marcar", label: "Marcar consulta" },
    };
  }

  return {
    role: "assistant",
    text: "Obrigado por partilhar. Para o ajudar melhor, diga-me: onde sente o desconforto (por exemplo, costas, pescoço, joelho) e há quanto tempo? Ou, se preferir, marque já uma avaliação — é o caminho mais rápido para respostas concretas.",
    cta: { href: "/marcar", label: "Marcar avaliação" },
  };
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, thinking, reduce]);

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);

    // Tenta o modo generativo (servidor); sem chave configurada usa triagem local.
    let reply: Message | null = null;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) {
        const data = (await res.json()) as { text?: string };
        if (data.text) reply = { role: "assistant", text: data.text };
      }
    } catch {
      // silencioso — fallback local
    }
    // Pausa breve: uma resposta instantânea parece robótica; 600ms parece atenta.
    await new Promise((r) => setTimeout(r, reply ? 0 : 600));
    setMessages((m) => [...m, reply ?? triage(text)]);
    setThinking(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? "Fechar assistente" : "Abrir assistente digital"}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gold-600 text-white shadow-lift transition-all duration-500 ease-[var(--ease-calm)] hover:scale-105 hover:bg-gold-700 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.25, ease: EASE_CALM }}
          >
            {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="assistant-panel"
            role="dialog"
            aria-label="Assistente digital da clínica"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE_CALM }}
            className="fixed bottom-24 right-5 z-50 flex max-h-[70svh] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift"
          >
            <div className="border-b border-line bg-mist/60 px-6 py-4">
              <p className="font-semibold tracking-tight text-ink">Assistente da clínica</p>
              <p className="text-xs text-muted">
                Triagem inicial e dúvidas · não substitui avaliação clínica
              </p>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-gold-600 text-white"
                        : "rounded-bl-md bg-mist text-ink",
                    )}
                  >
                    <p>{m.text}</p>
                    {m.cta && (
                      <Link
                        href={m.cta.href}
                        className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-gold-700 shadow-soft transition-transform hover:scale-[1.02]"
                      >
                        {m.cta.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-mist px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-slate/50"
                        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-line px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">
                Escreva a sua mensagem
              </label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva o que sente…"
                className="h-11 flex-1 rounded-full border border-line bg-mist/50 px-4 text-sm text-ink placeholder:text-muted/70 focus:border-gold-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Enviar mensagem"
                disabled={!input.trim() || thinking}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-600 text-white transition-all duration-300 hover:bg-gold-700 disabled:opacity-40"
              >
                <Send className="size-4" aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

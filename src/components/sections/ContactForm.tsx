"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { EASE_CALM } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-soft lg:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_CALM }}
            className="flex min-h-80 flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <CheckCircle2 className="size-7" aria-hidden />
            </span>
            <h3 className="mt-6 text-display text-2xl text-ink">Mensagem enviada.</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              Obrigado pelo contacto. Respondemos normalmente em menos de 15
              minutos, dentro do horário da clínica.
            </p>
            <Button
              variant="ghost"
              className="mt-6"
              onClick={() => setStatus("idle")}
            >
              Enviar outra mensagem
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            className="space-y-6"
            initial={false}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nome" htmlFor="contact-name">
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="O seu nome"
                />
              </Field>
              <Field label="Telefone" htmlFor="contact-phone">
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="9xx xxx xxx"
                />
              </Field>
            </div>
            <Field label="Email" htmlFor="contact-email">
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="o.seu@email.pt"
              />
            </Field>
            <Field
              label="Mensagem"
              htmlFor="contact-message"
              hint="Não partilhe dados clínicos sensíveis por este formulário — guardamos isso para a consulta."
            >
              <Textarea
                id="contact-message"
                name="message"
                required
                placeholder="Em que podemos ajudar?"
              />
            </Field>
            {status === "error" && (
              <p role="alert" className="text-sm text-red-600">
                Não foi possível enviar. Tente novamente ou ligue-nos diretamente.
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "A enviar…" : "Enviar mensagem"}
              <Send className="size-4" aria-hidden />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

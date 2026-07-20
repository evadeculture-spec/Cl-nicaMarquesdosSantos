"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarCheck2, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { treatments, type Treatment } from "@/content/treatments";
import { team, type Professional } from "@/content/team";
import { EASE_CALM } from "@/lib/motion";
import { cn, formatCurrencyPt, minutesToTime } from "@/lib/utils";

const STEPS = ["Tratamento", "Profissional", "Data e hora", "Confirmação"] as const;

const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"];
const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** Slots demo: seg–sex 8h–19h, sáb 9h–12h, de 60 em 60 minutos. */
function slotsFor(date: Date): number[] {
  const dow = date.getDay();
  if (dow === 0) return [];
  const [start, end] = dow === 6 ? [9 * 60, 12 * 60] : [8 * 60, 19 * 60];
  const slots: number[] = [];
  for (let m = start; m < end; m += 60) slots.push(m);
  // Simula ocupação determinística para o calendário parecer vivo.
  const seed = date.getDate() + date.getMonth();
  return slots.filter((_, i) => (i + seed) % 3 !== 0);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const clinicians = team.filter((m) => !m.role.includes("Assistente"));

export function BookingWizard({ initialSpecialty }: { initialSpecialty?: string }) {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<Treatment | null>(
    initialSpecialty ? (treatments.find((t) => t.id === "avaliacao-inicial") ?? null) : null,
  );
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => {
    const first = new Date(monthCursor);
    const startOffset = (first.getDay() + 6) % 7; // semana começa à segunda
    const total = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = Array.from({ length: startOffset }, () => null);
    for (let d = 1; d <= total; d++) {
      cells.push(new Date(first.getFullYear(), first.getMonth(), d));
    }
    return cells;
  }, [monthCursor]);

  const canNext =
    (step === 0 && !!treatment) ||
    (step === 1 && !!professional) ||
    (step === 2 && !!date && slot !== null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!treatment || !professional || !date || slot === null) return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatmentId: treatment.id,
          professionalId: professional.id,
          date: date.toISOString().slice(0, 10),
          time: minutesToTime(slot),
          ...data,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Não foi possível concluir a marcação. Tente novamente ou ligue-nos.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done && treatment && professional && date && slot !== null) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_CALM }}
        className="mx-auto max-w-lg rounded-3xl border border-line bg-white p-10 text-center shadow-soft"
        role="status"
      >
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <CalendarCheck2 className="size-8" aria-hidden />
        </span>
        <h2 className="mt-7 text-display text-3xl text-ink">Pedido recebido.</h2>
        <p className="mt-4 leading-relaxed text-slate">
          {treatment.name} com {professional.name.split(" ")[0]},{" "}
          {date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })} às{" "}
          {minutesToTime(slot)}.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Vai receber a confirmação por email nos próximos minutos. Se preferir,
          adicione ao calendário quando a confirmação chegar.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progresso */}
      <ol className="mb-12 flex items-center justify-center gap-2 sm:gap-3" aria-label="Progresso da marcação">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-500",
                i < step && "bg-sage-100 text-sage-700",
                i === step && "bg-gold-600 text-white shadow-soft",
                i > step && "bg-mist text-muted",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm sm:block",
                i === step ? "font-medium text-ink" : "text-muted",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-4 bg-line sm:w-8" aria-hidden />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE_CALM }}
        >
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Escolha o tratamento">
              {treatments.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={treatment?.id === t.id}
                  onClick={() => setTreatment(t)}
                  className={cn(
                    "rounded-2xl border p-6 text-left transition-all duration-300 ease-[var(--ease-calm)]",
                    treatment?.id === t.id
                      ? "border-gold-500 bg-gold-50/50 ring-4 ring-gold-100"
                      : "border-line bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold tracking-tight text-ink">{t.name}</h3>
                    <span className="text-sm font-medium text-gold-700">
                      {formatCurrencyPt(t.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {t.durationMinutes} minutos · sessão individual
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Escolha o profissional">
              {clinicians.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={professional?.id === m.id}
                  onClick={() => setProfessional(m)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-6 text-left transition-all duration-300 ease-[var(--ease-calm)]",
                    professional?.id === m.id
                      ? "border-gold-500 bg-gold-50/50 ring-4 ring-gold-100"
                      : "border-line bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl font-semibold",
                      m.accent === "gold" ? "bg-gold-50 text-gold-700" : "bg-sage-100 text-sage-700",
                    )}
                    aria-hidden
                  >
                    {m.initials}
                  </span>
                  <span>
                    <span className="block font-semibold tracking-tight text-ink">{m.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{m.focus.join(" · ")}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
                    className="flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist"
                    aria-label="Mês anterior"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <p className="font-medium capitalize text-ink" aria-live="polite">
                    {MONTHS[monthCursor.getMonth()]} {monthCursor.getFullYear()}
                  </p>
                  <button
                    type="button"
                    onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
                    className="flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist"
                    aria-label="Mês seguinte"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="grid grid-cols-7 text-center text-xs font-medium text-muted" aria-hidden>
                  {WEEKDAYS.map((d, i) => (
                    <span key={i} className="py-2">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((d, i) => {
                    if (!d) return <span key={`x-${i}`} />;
                    const past = d < today;
                    const closed = slotsFor(d).length === 0;
                    const selected = !!date && isSameDay(d, date);
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        disabled={past || closed}
                        onClick={() => {
                          setDate(d);
                          setSlot(null);
                        }}
                        aria-pressed={selected}
                        aria-label={d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}
                        className={cn(
                          "aspect-square rounded-xl text-sm transition-all duration-200",
                          selected
                            ? "bg-gold-600 font-semibold text-white shadow-soft"
                            : past || closed
                              ? "text-muted/40"
                              : "text-ink hover:bg-gold-50",
                          !selected && !past && !closed && isSameDay(d, today) && "font-semibold text-gold-700",
                        )}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-medium text-ink">
                  {date
                    ? `Horários para ${date.toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}`
                    : "Escolha primeiro um dia"}
                </p>
                {date && (
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Escolha o horário">
                    {slotsFor(date).map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={slot === m}
                        onClick={() => setSlot(m)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-sm tabular-nums transition-all duration-200",
                          slot === m
                            ? "border-gold-500 bg-gold-600 font-medium text-white shadow-soft"
                            : "border-line bg-white text-ink hover:border-gold-200 hover:bg-gold-50",
                        )}
                      >
                        {minutesToTime(m)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && treatment && professional && date && slot !== null && (
            <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="h-fit rounded-2xl border border-line bg-mist p-7">
                <h3 className="font-semibold tracking-tight text-ink">Resumo</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ["Tratamento", treatment.name],
                    ["Profissional", professional.name],
                    ["Data", date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })],
                    ["Hora", minutesToTime(slot)],
                    ["Valor", formatCurrencyPt(treatment.price)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-medium capitalize text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                  Pagamento na clínica. Desmarcação gratuita até 24h antes.
                </p>
              </div>
              <div className="space-y-5">
                <Field label="Nome completo" htmlFor="bk-name">
                  <Input id="bk-name" name="name" autoComplete="name" required placeholder="O seu nome" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" htmlFor="bk-email">
                    <Input id="bk-email" name="email" type="email" autoComplete="email" required placeholder="o.seu@email.pt" />
                  </Field>
                  <Field label="Telemóvel" htmlFor="bk-phone">
                    <Input id="bk-phone" name="phone" type="tel" autoComplete="tel" required placeholder="9xx xxx xxx" />
                  </Field>
                </div>
                <Field label="Notas (opcional)" htmlFor="bk-notes" hint="Ex.: motivo da consulta, seguro de saúde, necessidades de acesso.">
                  <Textarea id="bk-notes" name="notes" className="min-h-24" placeholder="Algo que devamos saber antes da consulta?" />
                </Field>
                {error && (
                  <p role="alert" className="text-sm text-red-600">{error}</p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "A confirmar…" : "Confirmar marcação"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navegação */}
      {step < 3 && (
        <div className="mt-12 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ArrowLeft className="size-4" aria-hidden />
            Anterior
          </Button>
          <Button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} size="lg">
            Continuar
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="mt-8">
          <Button variant="ghost" onClick={() => setStep(2)}>
            <ArrowLeft className="size-4" aria-hidden />
            Voltar ao calendário
          </Button>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, CalendarDays, Dumbbell, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { patientDemo as p } from "@/content/patient-demo";
import { formatDatePt } from "@/lib/utils";

export default function PatientHome() {
  const pct = Math.round((p.planProgress.done / p.planProgress.total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Olá, {p.name.split(" ")[0]}.</h1>
        <p className="mt-2 text-slate">
          Está no bom caminho — {p.planProgress.done} de {p.planProgress.total}{" "}
          sessões do plano concluídas.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold tracking-tight text-ink">
              <CalendarDays className="size-4 text-gold-600" aria-hidden />
              Próxima consulta
            </h2>
            <Badge tone="sage">Confirmada</Badge>
          </div>
          <p className="mt-5 text-display text-2xl text-ink">
            {formatDatePt(p.nextAppointment.date, { weekday: "long", day: "numeric", month: "long" })} · {p.nextAppointment.time}
          </p>
          <p className="mt-2 text-sm text-slate">
            {p.nextAppointment.treatment} com {p.nextAppointment.professional}
          </p>
          <Link
            href="/area-paciente/consultas"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-700"
          >
            Gerir consultas
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 font-semibold tracking-tight text-ink">
            <Dumbbell className="size-4 text-gold-600" aria-hidden />
            Plano de tratamento
          </h2>
          <p className="mt-5 text-sm text-slate">{p.planProgress.focus}</p>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-cloud"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso do plano"
          >
            <div
              className="h-full rounded-full bg-sage-600 transition-all duration-1000 ease-[var(--ease-calm)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {p.planProgress.done}/{p.planProgress.total} sessões · {pct}%
          </p>
          <Link
            href="/area-paciente/exercicios"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-700"
          >
            Ver exercícios de hoje
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Card>
      </div>

      <Card hover={false}>
        <h2 className="flex items-center gap-2 font-semibold tracking-tight text-ink">
          <FileText className="size-4 text-gold-600" aria-hidden />
          Documentos recentes
        </h2>
        <ul className="mt-4 divide-y divide-line">
          {p.documents.slice(0, 3).map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-ink">{d.name}</p>
                <p className="text-xs text-muted">{formatDatePt(d.date)}</p>
              </div>
              <Badge>{d.type}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/Card";
import { patientDemo as p } from "@/content/patient-demo";
import { formatDatePt } from "@/lib/utils";

export default function HistoricoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Histórico clínico</h1>
        <p className="mt-2 text-slate">Cada sessão registada, com as notas do seu fisioterapeuta.</p>
      </div>
      <Card hover={false}>
        <ol className="relative space-y-8 border-l border-line pl-6">
          {p.history.map((h) => (
            <li key={h.date + h.treatment} className="relative">
              <span
                className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full border-2 border-white bg-gold-500"
                aria-hidden
              />
              <time dateTime={h.date} className="text-xs font-medium uppercase tracking-wide text-muted">
                {formatDatePt(h.date)}
              </time>
              <p className="mt-1 font-semibold tracking-tight text-ink">{h.treatment}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate">{h.note}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CountUp } from "@/components/motion/CountUp";
import { adminDemo as a } from "@/content/admin-demo";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Bom dia.</h1>
        <p className="mt-2 text-slate">
          Segunda-feira, 20 de julho · {a.todayAppointments.length} consultas na agenda de hoje.
        </p>
      </div>

      <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {a.kpis.map((k) => (
          <Card key={k.label} hover={false}>
            <dt className="text-sm text-muted">{k.label}</dt>
            <dd className="mt-2 text-display text-3xl text-ink">
              <CountUp value={k.value} suffix={k.suffix ?? ""} />
            </dd>
            <p className="mt-2 text-xs font-medium text-sage-600">{k.delta}</p>
          </Card>
        ))}
      </dl>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold tracking-tight text-ink">Agenda de hoje</h2>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1.5 animate-pulse rounded-full bg-sage-600" aria-hidden />
              atualização em tempo real
            </span>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {a.todayAppointments.map((appt) => (
              <li key={appt.time + appt.patient} className="flex items-center gap-4 py-3.5">
                <span className="w-12 text-sm font-semibold tabular-nums text-ink">{appt.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{appt.patient}</p>
                  <p className="text-xs text-muted">
                    {appt.treatment} · {appt.professional}
                  </p>
                </div>
                <Badge tone={appt.status === "confirmada" ? "sage" : "neutral"} className="capitalize">
                  {appt.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card hover={false}>
          <h2 className="font-semibold tracking-tight text-ink">Ocupação da semana</h2>
          <ul className="mt-6 space-y-4">
            {a.weeklyLoad.map((d) => (
              <li key={d.day} className="flex items-center gap-4">
                <span className="w-8 text-sm text-muted">{d.day}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cloud">
                  <div
                    className="h-full rounded-full bg-azure-500 transition-all duration-1000 ease-[var(--ease-calm)]"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm tabular-nums text-ink">{d.pct}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Quinta-feira tem margem para encaixes. As marcações online novas
            aparecem aqui ao segundo, via Supabase Realtime.
          </p>
        </Card>
      </div>
    </div>
  );
}

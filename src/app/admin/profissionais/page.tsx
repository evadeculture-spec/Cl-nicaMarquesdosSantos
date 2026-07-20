import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { team } from "@/content/team";
import { cn } from "@/lib/utils";

export default function AdminProfissionais() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Profissionais</h1>
        <p className="mt-2 text-slate">
          Equipa, especialidades e disponibilidade. As janelas de horário definem os slots da marcação online.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {team.map((m) => (
          <Card key={m.id} hover={false} className="flex items-start gap-5">
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl font-semibold",
                m.accent === "gold" ? "bg-gold-50 text-gold-700" : "bg-sage-100 text-sage-700",
              )}
              aria-hidden
            >
              {m.initials}
            </span>
            <div className="flex-1">
              <p className="font-semibold tracking-tight text-ink">{m.name}</p>
              <p className="text-sm text-muted">{m.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {m.focus.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                {m.role.includes("Fisioterapeuta")
                  ? "Agenda: Seg–Sex 08h–20h · aceita marcações online"
                  : "Gestão de marcações e apoio ao paciente"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

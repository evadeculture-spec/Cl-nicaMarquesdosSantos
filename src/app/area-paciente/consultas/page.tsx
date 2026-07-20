import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { patientDemo as p } from "@/content/patient-demo";
import { formatDatePt } from "@/lib/utils";

export default function ConsultasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-display text-3xl text-ink">Consultas futuras</h1>
          <p className="mt-2 text-slate">Desmarcação gratuita até 24 horas antes.</p>
        </div>
        <ButtonLink href="/marcar">
          Nova marcação
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
      <div className="space-y-4">
        {p.appointments.map((a) => (
          <Card key={a.date} hover={false} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold tracking-tight text-ink">
                {formatDatePt(a.date, { weekday: "long", day: "numeric", month: "long" })} · {a.time}
              </p>
              <p className="mt-1 text-sm text-slate">
                {a.treatment} · {a.professional}
              </p>
            </div>
            <Badge tone="sage" className="capitalize">{a.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

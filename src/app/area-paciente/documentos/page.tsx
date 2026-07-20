import { Download, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { patientDemo as p } from "@/content/patient-demo";
import { formatDatePt } from "@/lib/utils";

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Documentos e relatórios</h1>
        <p className="mt-2 text-slate">
          Relatórios de progresso, planos e declarações — sempre disponíveis, sempre seus.
        </p>
      </div>
      <div className="space-y-4">
        {p.documents.map((d) => (
          <Card key={d.name} hover={false} className="flex items-center gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
              <FileText className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-semibold tracking-tight text-ink">{d.name}</p>
              <p className="mt-0.5 text-xs text-muted">{formatDatePt(d.date)}</p>
            </div>
            <Badge>{d.type}</Badge>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist hover:text-ink"
              aria-label={`Descarregar ${d.name}`}
            >
              <Download className="size-4" aria-hidden />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

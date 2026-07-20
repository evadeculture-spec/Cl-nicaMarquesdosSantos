import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { adminDemo as a } from "@/content/admin-demo";

export default function AdminConsultas() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Consultas</h1>
        <p className="mt-2 text-slate">
          Marcações de hoje. Pendentes exigem confirmação — o email automático já foi enviado.
        </p>
      </div>
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Consultas de hoje</caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="pb-3 pr-4 font-medium">Hora</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Paciente</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Tratamento</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Profissional</th>
                <th scope="col" className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {a.todayAppointments.map((appt) => (
                <tr key={appt.time + appt.patient} className="transition-colors hover:bg-mist/50">
                  <td className="py-3.5 pr-4 font-semibold tabular-nums text-ink">{appt.time}</td>
                  <td className="py-3.5 pr-4 font-medium text-ink">{appt.patient}</td>
                  <td className="py-3.5 pr-4 text-slate">{appt.treatment}</td>
                  <td className="py-3.5 pr-4 text-slate">{appt.professional}</td>
                  <td className="py-3.5">
                    <Badge tone={appt.status === "confirmada" ? "sage" : "neutral"} className="capitalize">
                      {appt.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

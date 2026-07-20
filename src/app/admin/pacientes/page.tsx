import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { adminDemo as a } from "@/content/admin-demo";
import { formatDatePt } from "@/lib/utils";

const tones = { ativo: "gold", novo: "sage", alta: "neutral" } as const;

export default function AdminPacientes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Pacientes</h1>
        <p className="mt-2 text-slate">
          {a.patients.length} pacientes com atividade recente.
        </p>
      </div>
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Lista de pacientes</caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="pb-3 pr-4 font-medium">Nome</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Especialidade</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Sessões</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Última visita</th>
                <th scope="col" className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {a.patients.map((p) => (
                <tr key={p.name} className="transition-colors hover:bg-mist/50">
                  <td className="py-3.5 pr-4 font-medium text-ink">{p.name}</td>
                  <td className="py-3.5 pr-4 text-slate">{p.specialty}</td>
                  <td className="py-3.5 pr-4 tabular-nums text-slate">{p.sessions}</td>
                  <td className="py-3.5 pr-4 text-slate">{formatDatePt(p.lastVisit)}</td>
                  <td className="py-3.5">
                    <Badge tone={tones[p.status]} className="capitalize">{p.status}</Badge>
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

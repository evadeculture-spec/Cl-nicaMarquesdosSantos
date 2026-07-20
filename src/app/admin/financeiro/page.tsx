import { Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { adminDemo as a } from "@/content/admin-demo";
import { formatCurrencyPt } from "@/lib/utils";

export default function AdminFinanceiro() {
  const total = a.revenueBySpecialty.reduce((s, r) => s + r.value, 0);
  const max = Math.max(...a.revenueBySpecialty.map((r) => r.value));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-display text-3xl text-ink">Financeiro</h1>
          <p className="mt-2 text-slate">Julho de 2026 · receita, distribuição e exportações.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="size-4" aria-hidden />
            Exportar CSV
          </Button>
          <Button variant="secondary">
            <Download className="size-4" aria-hidden />
            Exportar SAF-T
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card hover={false}>
          <p className="text-sm text-muted">Receita do mês</p>
          <p className="mt-2 text-display text-4xl text-ink">{formatCurrencyPt(total)}</p>
          <p className="mt-2 text-xs font-medium text-sage-600">+8% face a junho</p>
          <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Valor médio por sessão</dt>
              <dd className="font-medium tabular-nums text-ink">46 €</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Sessões faturadas</dt>
              <dd className="font-medium tabular-nums text-ink">618</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Faltas sem aviso</dt>
              <dd className="font-medium tabular-nums text-ink">1,9%</dd>
            </div>
          </dl>
        </Card>

        <Card hover={false}>
          <h2 className="font-semibold tracking-tight text-ink">Receita por especialidade</h2>
          <ul className="mt-6 space-y-4">
            {a.revenueBySpecialty.map((r) => (
              <li key={r.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-slate">{r.name}</span>
                  <span className="font-medium tabular-nums text-ink">
                    {formatCurrencyPt(r.value)}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cloud">
                  <div
                    className="h-full rounded-full bg-azure-500 transition-all duration-1000 ease-[var(--ease-calm)]"
                    style={{ width: `${(r.value / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

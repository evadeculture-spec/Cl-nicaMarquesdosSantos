import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { patientDemo as p } from "@/content/patient-demo";
import { formatCurrencyPt, formatDatePt } from "@/lib/utils";

export default function PagamentosPage() {
  const total = p.payments.reduce((sum, x) => sum + x.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Pagamentos</h1>
        <p className="mt-2 text-slate">
          Faturas-recibo emitidas na hora — prontas para o reembolso do seguro.
        </p>
      </div>
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Histórico de pagamentos</caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="pb-3 pr-4 font-medium">Data</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Descrição</th>
                <th scope="col" className="pb-3 pr-4 font-medium">Valor</th>
                <th scope="col" className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {p.payments.map((pay) => (
                <tr key={pay.date + pay.description}>
                  <td className="py-3.5 pr-4 text-slate">{formatDatePt(pay.date)}</td>
                  <td className="py-3.5 pr-4 font-medium text-ink">{pay.description}</td>
                  <td className="py-3.5 pr-4 tabular-nums text-ink">{formatCurrencyPt(pay.amount)}</td>
                  <td className="py-3.5">
                    <Badge tone="sage" className="capitalize">{pay.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-line">
                <td colSpan={2} className="pt-4 text-muted">Total este plano</td>
                <td className="pt-4 font-semibold tabular-nums text-ink">{formatCurrencyPt(total)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}

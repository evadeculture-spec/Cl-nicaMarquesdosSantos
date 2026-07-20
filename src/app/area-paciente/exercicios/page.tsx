import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { patientDemo as p } from "@/content/patient-demo";

export default function ExerciciosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Plano de exercícios</h1>
        <p className="mt-2 text-slate">{p.planProgress.focus}. Atualizado pelo seu fisioterapeuta a cada reavaliação.</p>
      </div>
      <div className="space-y-4">
        {p.exercises.map((e) => (
          <Card key={e.name} hover={false} className="flex items-center gap-5">
            {e.done ? (
              <CheckCircle2 className="size-6 shrink-0 text-sage-600" aria-label="Concluído esta semana" />
            ) : (
              <Circle className="size-6 shrink-0 text-line" aria-label="Por fazer" />
            )}
            <div className="flex-1">
              <p className="font-semibold tracking-tight text-ink">{e.name}</p>
              <p className="mt-0.5 text-sm text-slate">
                {e.sets} · {e.frequency}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted">
        Sentiu dor acima de 3/10 num exercício? Pare e fale connosco antes da
        próxima sessão — o plano ajusta-se a si, não o contrário.
      </p>
    </div>
  );
}

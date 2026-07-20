/** Dados de demonstração da área do paciente (substituídos por Supabase em produção). */

export const patientDemo = {
  name: "Margarida Silva",
  nextAppointment: {
    treatment: "Sessão de Fisioterapia",
    professional: "João Marques dos Santos",
    date: "2026-07-24",
    time: "18:00",
  },
  planProgress: { done: 9, total: 12, focus: "Dor lombar — fase de fortalecimento" },
  appointments: [
    { date: "2026-07-24", time: "18:00", treatment: "Sessão de Fisioterapia", professional: "João M. Santos", status: "confirmada" },
    { date: "2026-07-31", time: "18:00", treatment: "Sessão de Fisioterapia", professional: "João M. Santos", status: "confirmada" },
  ],
  history: [
    { date: "2026-07-17", treatment: "Sessão de Fisioterapia", note: "Aumento de carga no levantamento. Dor 1/10 pós-sessão." },
    { date: "2026-07-10", treatment: "Sessão de Fisioterapia", note: "Introduzido peso morto com kettlebell 12 kg." },
    { date: "2026-07-03", treatment: "Reavaliação", note: "Flexão lombar completa sem dor. Objetivo seguinte: carga." },
    { date: "2026-06-26", treatment: "Sessão de Fisioterapia", note: "Boa tolerância aos exercícios de ponte e prancha." },
    { date: "2026-06-19", treatment: "Avaliação Inicial", note: "Lombalgia mecânica. Plano de 12 sessões definido." },
  ],
  exercises: [
    { name: "Ponte de glúteos", sets: "3 × 12", frequency: "Dias alternados", done: true },
    { name: "Prancha frontal", sets: "3 × 40s", frequency: "Dias alternados", done: true },
    { name: "Peso morto com kettlebell", sets: "4 × 8 · 12 kg", frequency: "2× por semana", done: false },
    { name: "Caminhada rápida", sets: "30 min", frequency: "Diária", done: false },
  ],
  documents: [
    { name: "Relatório de progresso — julho", date: "2026-07-03", type: "Relatório" },
    { name: "Plano de exercícios — fase 3", date: "2026-07-03", type: "Plano" },
    { name: "Declaração para seguro", date: "2026-06-19", type: "Declaração" },
    { name: "Avaliação inicial", date: "2026-06-19", type: "Relatório" },
  ],
  payments: [
    { date: "2026-07-17", description: "Sessão de Fisioterapia", amount: 45, status: "pago" },
    { date: "2026-07-10", description: "Sessão de Fisioterapia", amount: 45, status: "pago" },
    { date: "2026-07-03", description: "Reavaliação", amount: 45, status: "pago" },
    { date: "2026-06-19", description: "Avaliação Inicial", amount: 55, status: "pago" },
  ],
} as const;

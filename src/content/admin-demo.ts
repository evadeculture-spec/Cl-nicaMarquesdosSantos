/** Dados de demonstração do painel admin (substituídos por Supabase + Realtime em produção). */

type Kpi = { label: string; value: number; suffix?: string; delta: string };
type Appointment = {
  time: string;
  patient: string;
  treatment: string;
  professional: string;
  status: "confirmada" | "pendente";
};
type PatientRow = {
  name: string;
  specialty: string;
  sessions: string;
  lastVisit: string;
  status: "ativo" | "novo" | "alta";
};

export const adminDemo = {
  kpis: [
    { label: "Consultas hoje", value: 22, delta: "+2 vs. média" },
    { label: "Taxa de ocupação", value: 87, suffix: "%", delta: "+4 pts este mês" },
    { label: "Novos pacientes (mês)", value: 41, delta: "+12% vs. junho" },
    { label: "Receita (mês)", value: 28450, suffix: " €", delta: "+8% vs. junho" },
  ] satisfies Kpi[] as Kpi[],
  todayAppointments: [
    { time: "09:00", patient: "Teresa Marques", treatment: "Sessão de Fisioterapia", professional: "João M. Santos", status: "confirmada" },
    { time: "10:00", patient: "Rui Carvalho", treatment: "Avaliação Inicial", professional: "Sofia Almeida", status: "confirmada" },
    { time: "11:00", patient: "Beatriz Sousa", treatment: "Fisioterapia Pélvica", professional: "Mariana Costa", status: "confirmada" },
    { time: "14:00", patient: "António Reis", treatment: "Consulta de Osteopatia", professional: "João M. Santos", status: "pendente" },
    { time: "15:00", patient: "Carla Mendes", treatment: "Pilates Clínico", professional: "Mariana Costa", status: "confirmada" },
    { time: "18:00", patient: "Margarida Silva", treatment: "Sessão de Fisioterapia", professional: "João M. Santos", status: "confirmada" },
  ] satisfies Appointment[] as Appointment[],
  patients: [
    { name: "Margarida Silva", specialty: "Fisioterapia", sessions: "9/12", lastVisit: "2026-07-17", status: "ativo" },
    { name: "Rui Carvalho", specialty: "Fisioterapia", sessions: "1/—", lastVisit: "2026-07-20", status: "novo" },
    { name: "Beatriz Sousa", specialty: "Reabilitação Perineal", sessions: "4/8", lastVisit: "2026-07-15", status: "ativo" },
    { name: "António Reis", specialty: "Osteopatia", sessions: "3/—", lastVisit: "2026-07-08", status: "ativo" },
    { name: "Carlos Antunes", specialty: "Fisioterapia", sessions: "34/—", lastVisit: "2026-07-18", status: "ativo" },
    { name: "Teresa Marques", specialty: "Osteopatia", sessions: "6/6", lastVisit: "2026-07-11", status: "alta" },
  ] satisfies PatientRow[] as PatientRow[],
  weeklyLoad: [
    { day: "Seg", pct: 92 },
    { day: "Ter", pct: 88 },
    { day: "Qua", pct: 95 },
    { day: "Qui", pct: 81 },
    { day: "Sex", pct: 90 },
    { day: "Sáb", pct: 64 },
  ],
  revenueBySpecialty: [
    { name: "Fisioterapia", value: 12400 },
    { name: "Osteopatia", value: 5900 },
    { name: "Reabilitação perineal", value: 4100 },
    { name: "Pilates clínico", value: 3250 },
    { name: "Outros serviços", value: 2800 },
  ],
};

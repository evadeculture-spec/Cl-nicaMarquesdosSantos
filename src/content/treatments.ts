export type Treatment = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  highlight?: boolean;
};

export const treatments: Treatment[] = [
  {
    id: "avaliacao-inicial",
    name: "Avaliação Inicial",
    description: "Uma hora inteira dedicada a perceber a sua história, avaliar com rigor e definir o plano. Sai da primeira sessão a saber o que tem e o que vamos fazer.",
    durationMinutes: 60,
    price: 55,
    highlight: true,
  },
  {
    id: "sessao-fisioterapia",
    name: "Sessão de Fisioterapia",
    description: "Sessão individual de 45 minutos com o seu fisioterapeuta: terapia manual, exercício terapêutico e reavaliação contínua.",
    durationMinutes: 45,
    price: 45,
  },
  {
    id: "sessao-osteopatia",
    name: "Consulta de Osteopatia",
    description: "Avaliação global e tratamento osteopático estrutural, integrado com o seu plano clínico quando existente.",
    durationMinutes: 50,
    price: 50,
  },
  {
    id: "pilates-clinico",
    name: "Pilates Clínico (grupo)",
    description: "Aula de 50 minutos em grupo de máximo 4 pessoas, conduzida por fisioterapeuta, com progressões individuais.",
    durationMinutes: 50,
    price: 20,
  },
  {
    id: "fisioterapia-pelvica",
    name: "Fisioterapia Pélvica",
    description: "Consulta individual de saúde da mulher em gabinete reservado, com fisioterapeuta especializada.",
    durationMinutes: 60,
    price: 60,
  },
  {
    id: "fisioterapia-domicilio",
    name: "Fisioterapia ao Domicílio",
    description: "Para quem não se pode deslocar: levamos a sessão a casa, na zona de Lisboa, com o mesmo rigor da clínica.",
    durationMinutes: 60,
    price: 65,
  },
];

export function getTreatment(id: string) {
  return treatments.find((t) => t.id === id);
}

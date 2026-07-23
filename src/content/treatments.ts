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
    price: 400,
    highlight: true,
  },
  {
    id: "sessao-fisioterapia",
    name: "Sessão de Fisioterapia",
    description: "Sessão individual com o seu fisioterapeuta: terapia manual, exercício terapêutico e reavaliação contínua.",
    durationMinutes: 50,
    price: 350,
  },
  {
    id: "sessao-osteopatia",
    name: "Consulta de Osteopatia",
    description: "Avaliação global e tratamento osteopático estrutural, integrado com o seu plano clínico quando existente.",
    durationMinutes: 50,
    price: 400,
  },
  {
    id: "reabilitacao-perineal",
    name: "Reabilitação Perineal",
    description: "Consulta individual de reabilitação do pavimento pélvico, no homem e na mulher, em gabinete reservado.",
    durationMinutes: 60,
    price: 450,
  },
  {
    id: "reabilitacao-estetica",
    name: "Reabilitação Estética",
    description: "Drenagem linfática, tratamento de cicatrizes e recuperação pós-cirúrgica, com rigor clínico.",
    durationMinutes: 50,
    price: 400,
  },
  {
    id: "podoposturologia",
    name: "Consulta de Podoposturologia",
    description: "Estudo do apoio plantar e da postura, com plano corretivo e palmilhas posturais quando indicado.",
    durationMinutes: 60,
    price: 450,
  },
  {
    id: "terapia-da-fala",
    name: "Terapia da Fala",
    description: "Avaliação e intervenção na comunicação, fala, linguagem e deglutição, para crianças e adultos.",
    durationMinutes: 45,
    price: 350,
  },
  {
    id: "psicologia",
    name: "Consulta de Psicologia",
    description: "Acompanhamento psicológico individual, para adultos e adolescentes, integrado com a equipa clínica.",
    durationMinutes: 50,
    price: 450,
  },
];

export function getTreatment(id: string) {
  return treatments.find((t) => t.id === id);
}

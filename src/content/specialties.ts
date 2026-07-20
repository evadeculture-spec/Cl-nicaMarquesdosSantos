export type Specialty = {
  slug: string;
  name: string;
  short: string;
  description: string;
  symptoms: string[];
  approach: string;
  sessions: string;
  icon: string; // nome do ícone lucide
};

/** Valências reais da Clínica Marques dos Santos (Castelo Branco). */
export const specialties: Specialty[] = [
  {
    slug: "fisioterapia",
    name: "Fisioterapia",
    short: "Recuperar o movimento, sem pressa e com plano.",
    description:
      "Da dor lombar e cervical às lesões desportivas e recuperação pós-operatória: avaliamos a origem real do problema e construímos um plano que combina terapia manual, exercício terapêutico e educação — com reavaliações objetivas ao longo do caminho.",
    symptoms: ["Dor lombar ou cervical", "Lesões desportivas e entorses", "Recuperação pós-cirúrgica", "Tendinopatias e dor articular"],
    approach: "Terapia manual, exercício terapêutico progressivo e reeducação do movimento, com reavaliações a cada 4 sessões.",
    sessions: "6–12 sessões, na maioria dos casos",
    icon: "Activity",
  },
  {
    slug: "osteopatia",
    name: "Osteopatia",
    short: "O corpo como um todo.",
    description:
      "Abordagem global que avalia como as diferentes regiões do corpo se influenciam entre si. Indicada para disfunções mecânicas persistentes que não respondem a abordagens localizadas.",
    symptoms: ["Dores recorrentes sem causa clara", "Tensões generalizadas", "Desconforto postural crónico", "Disfunções articulares"],
    approach: "Avaliação osteopática completa e técnicas manuais estruturais, integradas com o plano de fisioterapia quando indicado.",
    sessions: "Sessões espaçadas, reavaliadas caso a caso",
    icon: "Hand",
  },
  {
    slug: "reabilitacao-perineal",
    name: "Reabilitação Perineal",
    short: "No homem e na mulher, sem tabus.",
    description:
      "Reabilitação do pavimento pélvico para homens e mulheres: incontinência, dor pélvica, pós-parto, pós-cirurgia urológica. Um espaço reservado, com profissionais especializados e todo o tempo do mundo.",
    symptoms: ["Incontinência urinária", "Dor pélvica", "Recuperação pós-parto e diástase", "Pós-operatório urológico"],
    approach: "Avaliação especializada do pavimento pélvico, treino funcional específico e educação — sempre em consulta individual.",
    sessions: "6–10 sessões, na maioria dos casos",
    icon: "Heart",
  },
  {
    slug: "reabilitacao-estetica",
    name: "Reabilitação Estética",
    short: "Cuidar da pele e dos tecidos, com base clínica.",
    description:
      "Drenagem linfática, tratamento de cicatrizes, recuperação pós-cirurgia estética e cuidado dos tecidos — com o rigor clínico de uma equipa de saúde, não de um salão.",
    symptoms: ["Pós-operatório de cirurgia estética", "Cicatrizes e aderências", "Retenção de líquidos e edema", "Drenagem linfática"],
    approach: "Técnicas manuais especializadas e plano progressivo, em articulação com o cirurgião quando aplicável.",
    sessions: "Definido na avaliação inicial",
    icon: "Sparkles",
  },
  {
    slug: "podoposturologia",
    name: "Podoposturologia",
    short: "A postura começa nos pés.",
    description:
      "Estudo da relação entre o apoio dos pés e a postura de todo o corpo. Indicada para dores recorrentes de joelho, anca ou coluna com origem no apoio, e para otimização postural no desporto.",
    symptoms: ["Dores de joelho, anca ou coluna recorrentes", "Alterações do apoio plantar", "Desequilíbrios posturais", "Otimização no desporto"],
    approach: "Avaliação postural e do apoio plantar, com plano corretivo e palmilhas posturais quando indicado.",
    sessions: "Avaliação + acompanhamento periódico",
    icon: "Footprints",
  },
  {
    slug: "terapia-da-fala",
    name: "Terapia da Fala",
    short: "Comunicar é viver.",
    description:
      "Avaliação e intervenção em perturbações da comunicação, fala, linguagem e deglutição — em crianças e adultos, com planos individuais e envolvimento da família.",
    symptoms: ["Atrasos de linguagem na infância", "Alterações da fala e articulação", "Dificuldades de deglutição", "Reabilitação pós-AVC"],
    approach: "Avaliação formal, plano individual e trabalho próximo com a família e a escola quando aplicável.",
    sessions: "Programa contínuo com objetivos trimestrais",
    icon: "MessageSquareText",
  },
  {
    slug: "psicologia",
    name: "Psicologia",
    short: "Saúde também se trata por dentro.",
    description:
      "Acompanhamento psicológico para adultos e adolescentes: ansiedade, gestão de dor crónica, adaptação à lesão e à doença, e bem-estar emocional — integrado com as restantes valências da clínica.",
    symptoms: ["Ansiedade e stress", "Dor crónica e adaptação à doença", "Dificuldades emocionais", "Acompanhamento na reabilitação"],
    approach: "Consultas individuais com plano terapêutico definido em conjunto, em articulação com a equipa clínica quando útil.",
    sessions: "Sessões regulares, definidas em conjunto",
    icon: "Brain",
  },
];

export function getSpecialty(slug: string) {
  return specialties.find((s) => s.slug === slug);
}

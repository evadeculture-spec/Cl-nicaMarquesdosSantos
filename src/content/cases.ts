export type ClinicalCase = {
  id: string;
  title: string;
  specialty: string;
  age: string;
  duration: string;
  problem: string;
  intervention: string;
  outcome: string;
  metric: { label: string; before: string; after: string };
};

export const clinicalCases: ClinicalCase[] = [
  {
    id: "lombalgia-cronica",
    title: "Da dor diária à corrida de 10 km",
    specialty: "Fisioterapia",
    age: "42 anos",
    duration: "10 semanas",
    problem:
      "Lombalgia com 3 anos de evolução, dor diária 7/10, medo de movimento e abandono completo do exercício.",
    intervention:
      "Educação sobre dor, terapia manual nas primeiras semanas e um programa de exercício progressivo — do peso do corpo ao levantamento de cargas.",
    outcome:
      "Regresso à corrida sem dor, autonomia completa no ginásio e plano de manutenção autónomo.",
    metric: { label: "Dor média diária", before: "7/10", after: "0–1/10" },
  },
  {
    id: "lca-futebol",
    title: "Regresso à competição após rotura do LCA",
    specialty: "Fisioterapia",
    age: "24 anos",
    duration: "9 meses",
    problem:
      "Rotura completa do ligamento cruzado anterior num jogador federado, com ligamentoplastia realizada.",
    intervention:
      "Protocolo por fases com critérios objetivos: controlo de edema, força simétrica, pliometria, mudanças de direção e retorno gradual ao treino de equipa.",
    outcome:
      "Alta com simetria de força de 98% e regresso à competição sem episódios de instabilidade na época seguinte.",
    metric: { label: "Simetria de força", before: "54%", after: "98%" },
  },
  {
    id: "avc-marcha",
    title: "Voltar a caminhar até ao café",
    specialty: "Fisioterapia",
    age: "68 anos",
    duration: "6 meses",
    problem:
      "Hemiparesia esquerda pós-AVC, marcha apenas com apoio de terceiros e perda de confiança total.",
    intervention:
      "Treino intensivo orientado a tarefas, treino de equilíbrio com dupla tarefa e envolvimento da família no plano diário de casa.",
    outcome:
      "Marcha autónoma em exterior com bengala, incluindo o percurso diário de 400 metros até ao café do bairro.",
    metric: { label: "Marcha autónoma", before: "0 m", after: "400 m" },
  },
  {
    id: "pos-parto-diastase",
    title: "Recuperação funcional pós-parto",
    specialty: "Reabilitação Perineal",
    age: "34 anos",
    duration: "12 semanas",
    problem:
      "Diástase abdominal de 4 cm e incontinência urinária de esforço seis meses após o segundo parto.",
    intervention:
      "Reabilitação do pavimento pélvico, treino progressivo da parede abdominal e regresso gradual ao exercício de impacto.",
    outcome:
      "Continência total, diástase funcionalmente resolvida e regresso às aulas de grupo que tinha abandonado.",
    metric: { label: "Perdas de urina", before: "Diárias", after: "Zero" },
  },
];

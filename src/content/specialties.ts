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

export const specialties: Specialty[] = [
  {
    slug: "dor-lombar",
    name: "Dor Lombar",
    short: "Alívio duradouro para a dor mais comum do mundo.",
    description:
      "A dor lombar afeta 8 em cada 10 pessoas ao longo da vida. Avaliamos a origem real da dor — mecânica, postural ou neurológica — e construímos um plano que combina terapia manual, exercício terapêutico e educação para prevenir recidivas.",
    symptoms: ["Dor ao levantar ou sentar", "Rigidez matinal", "Dor que irradia para a perna", "Limitação nos movimentos do dia a dia"],
    approach: "Terapia manual, exercício terapêutico progressivo e reeducação postural, com reavaliações objetivas a cada 4 sessões.",
    sessions: "6–12 sessões, na maioria dos casos",
    icon: "Activity",
  },
  {
    slug: "dor-cervical",
    name: "Dor Cervical",
    short: "Pescoço livre, cabeça leve.",
    description:
      "Tensão cervical, cefaleias de origem cervical e limitações de mobilidade têm frequentemente origem em postura prolongada e stress. Tratamos a causa, não apenas o sintoma.",
    symptoms: ["Tensão no pescoço e trapézios", "Dores de cabeça frequentes", "Formigueiro nos braços", "Estalidos e rigidez"],
    approach: "Mobilização articular, técnicas de tecidos moles, fortalecimento profundo do pescoço e ergonomia do posto de trabalho.",
    sessions: "4–10 sessões, na maioria dos casos",
    icon: "Brain",
  },
  {
    slug: "lesoes-desportivas",
    name: "Lesões Desportivas",
    short: "Regressar ao desporto melhor do que antes.",
    description:
      "De entorses a roturas musculares, acompanhamos atletas amadores e federados com protocolos de retorno ao desporto baseados em critérios objetivos — não em datas no calendário.",
    symptoms: ["Entorses e distensões", "Tendinopatias", "Dor no joelho ou ombro do atleta", "Recuperação incompleta de lesão antiga"],
    approach: "Reabilitação por fases com testes de força e controlo motor, exposição gradual à carga e prevenção de recidiva.",
    sessions: "Programa por fases, definido na avaliação",
    icon: "Dumbbell",
  },
  {
    slug: "pos-operatorio",
    name: "Pós-Operatório",
    short: "Recuperação orientada, desde o primeiro dia.",
    description:
      "Depois de uma cirurgia ortopédica — prótese, ligamentoplastia, artroscopia — cada semana conta. Trabalhamos em articulação com o cirurgião para cumprir cada marco da recuperação com segurança.",
    symptoms: ["Prótese de anca ou joelho", "Ligamentoplastia (LCA)", "Cirurgia ao ombro ou coluna", "Rigidez e perda de força pós-cirúrgica"],
    approach: "Protocolos por fases alinhados com a equipa cirúrgica, controlo de dor e edema, e recuperação progressiva de mobilidade e força.",
    sessions: "Programa contínuo, tipicamente 8–24 semanas",
    icon: "HeartPulse",
  },
  {
    slug: "osteopatia",
    name: "Osteopatia",
    short: "O corpo como um todo.",
    description:
      "Abordagem global que avalia como as diferentes regiões do corpo se influenciam. Indicada para disfunções mecânicas persistentes que não respondem a abordagens localizadas.",
    symptoms: ["Dores recorrentes sem causa clara", "Tensões generalizadas", "Desconforto postural crónico", "Disfunções articulares"],
    approach: "Avaliação osteopática completa e técnicas manuais estruturais, com integração no plano de fisioterapia quando indicado.",
    sessions: "Sessões espaçadas, reavaliadas caso a caso",
    icon: "Hand",
  },
  {
    slug: "pilates-clinico",
    name: "Pilates Clínico",
    short: "Força de dentro para fora.",
    description:
      "Pilates conduzido por fisioterapeutas, em grupos de máximo 4 pessoas ou individual. Ideal para consolidar ganhos de tratamento, prevenir dor lombar e melhorar controlo postural.",
    symptoms: ["Prevenção de dor de costas", "Fraqueza do core", "Pós-tratamento de coluna", "Gravidez e pós-parto (adaptado)"],
    approach: "Aulas com progressões individualizadas, equipamento de estúdio e integração com o plano clínico de cada pessoa.",
    sessions: "Aulas regulares, 1–3× por semana",
    icon: "Flower2",
  },
  {
    slug: "atm",
    name: "ATM e Dor Orofacial",
    short: "Quando a mandíbula fala mais alto.",
    description:
      "Disfunções da articulação temporomandibular causam dor ao mastigar, estalidos, bruxismo e dores de cabeça. Tratamos em articulação com medicina dentária quando necessário.",
    symptoms: ["Dor ou estalidos ao abrir a boca", "Bruxismo", "Dor de cabeça e face", "Bloqueio mandibular"],
    approach: "Terapia manual intra e extra-oral, exercícios de controlo motor mandibular e gestão de hábitos parafuncionais.",
    sessions: "4–8 sessões, na maioria dos casos",
    icon: "Smile",
  },
  {
    slug: "neurologica",
    name: "Fisioterapia Neurológica",
    short: "Reaprender o movimento, passo a passo.",
    description:
      "Reabilitação após AVC, na doença de Parkinson, esclerose múltipla e outras condições neurológicas. Trabalho intensivo, funcional e centrado nos objetivos de vida de cada pessoa.",
    symptoms: ["Recuperação pós-AVC", "Doença de Parkinson", "Esclerose múltipla", "Alterações de equilíbrio e marcha"],
    approach: "Treino funcional intensivo orientado a tarefas, treino de equilíbrio e marcha, e envolvimento ativo da família.",
    sessions: "Programa contínuo com objetivos trimestrais",
    icon: "Sparkles",
  },
  {
    slug: "pediatrica",
    name: "Fisioterapia Pediátrica",
    short: "Crescer com confiança no movimento.",
    description:
      "Acompanhamento do desenvolvimento motor de bebés e crianças — do torcicolo congénito ao atraso de desenvolvimento — num ambiente pensado para os mais pequenos.",
    symptoms: ["Torcicolo congénito", "Atraso no desenvolvimento motor", "Alterações da marcha", "Postura na infância e adolescência"],
    approach: "Intervenção baseada no brincar, capacitação dos pais com planos para casa e articulação com pediatra.",
    sessions: "Definido na avaliação de desenvolvimento",
    icon: "Baby",
  },
  {
    slug: "saude-da-mulher",
    name: "Saúde da Mulher",
    short: "Cuidado especializado em cada fase.",
    description:
      "Fisioterapia pélvica e acompanhamento na gravidez, pós-parto e menopausa. Um espaço reservado, sem pressa e sem tabus, com fisioterapeutas especializadas.",
    symptoms: ["Incontinência urinária", "Dor pélvica", "Preparação para o parto", "Recuperação pós-parto e diástase"],
    approach: "Avaliação especializada do pavimento pélvico, treino funcional específico e educação — sempre em consulta individual.",
    sessions: "6–10 sessões, na maioria dos casos",
    icon: "Heart",
  },
];

export function getSpecialty(slug: string) {
  return specialties.find((s) => s.slug === slug);
}

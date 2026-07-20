export type Professional = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  focus: string[];
  bio: string;
  initials: string;
  accent: "azure" | "sage";
};

export const team: Professional[] = [
  {
    id: "joao-marques-santos",
    name: "João Marques dos Santos",
    role: "Fisioterapeuta · Diretor Clínico",
    credentials: "Cédula 1234 · MSc Fisioterapia Músculo-Esquelética",
    focus: ["Dor lombar", "Dor cervical", "Osteopatia"],
    bio: "Fundou a clínica em 2007 com uma convicção simples: cada pessoa merece uma hora inteira de atenção. Formação avançada em terapia manual ortopédica e 18 anos de prática clínica.",
    initials: "JM",
    accent: "azure",
  },
  {
    id: "sofia-almeida",
    name: "Sofia Almeida",
    role: "Fisioterapeuta",
    credentials: "Cédula 2345 · Pós-graduação em Fisioterapia Desportiva",
    focus: ["Lesões desportivas", "Pós-operatório"],
    bio: "Acompanhou equipas de competição durante oito anos antes de se dedicar à clínica. Especialista em retorno ao desporto com critérios objetivos de força e controlo motor.",
    initials: "SA",
    accent: "sage",
  },
  {
    id: "mariana-costa",
    name: "Mariana Costa",
    role: "Fisioterapeuta",
    credentials: "Cédula 3456 · Especialização em Saúde Pélvica",
    focus: ["Saúde da mulher", "Pilates clínico"],
    bio: "Dedica-se à fisioterapia pélvica e ao acompanhamento na gravidez e pós-parto. Conduz também as aulas de Pilates Clínico em pequenos grupos.",
    initials: "MC",
    accent: "azure",
  },
  {
    id: "pedro-lopes",
    name: "Pedro Lopes",
    role: "Fisioterapeuta",
    credentials: "Cédula 4567 · Formação em Reabilitação Neurológica",
    focus: ["Neurológica", "Equilíbrio e marcha"],
    bio: "Trabalhou seis anos em neurorreabilitação hospitalar. Traz para a clínica o treino intensivo orientado a tarefas e uma paciência inesgotável.",
    initials: "PL",
    accent: "sage",
  },
  {
    id: "ines-ferreira",
    name: "Inês Ferreira",
    role: "Fisioterapeuta",
    credentials: "Cédula 5678 · Especialização em ATM e Pediatria",
    focus: ["ATM", "Pediátrica"],
    bio: "Divide a semana entre a dor orofacial e os mais pequenos. Acredita que uma sessão de pediatria bem passada parece uma brincadeira — e é essa a intenção.",
    initials: "IF",
    accent: "azure",
  },
  {
    id: "carla-nunes",
    name: "Carla Nunes",
    role: "Assistente de Direção",
    credentials: "Gestão de marcações e acompanhamento de pacientes",
    focus: ["Marcações", "Apoio ao paciente"],
    bio: "É a primeira voz que ouve ao ligar-nos e a razão pela qual o tempo médio de resposta é de 15 minutos. Conhece cada paciente pelo nome.",
    initials: "CN",
    accent: "sage",
  },
];

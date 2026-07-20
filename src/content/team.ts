export type Professional = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  focus: string[];
  bio: string;
  initials: string;
  accent: "gold" | "sage";
};

/**
 * Equipa de demonstração — substituir por nomes, cédulas e biografias reais
 * antes da publicação (gestão em Supabase, tabela professionals).
 */
export const team: Professional[] = [
  {
    id: "joao-marques-santos",
    name: "João Marques dos Santos",
    role: "Fisioterapeuta · Diretor Clínico",
    credentials: "Fisioterapeuta · Osteopata",
    focus: ["Fisioterapia", "Osteopatia"],
    bio: "Fundou a clínica com uma convicção simples: cada pessoa merece tempo, rigor e um plano à medida. Uma nova perspectiva de cuidar, levada à letra todos os dias.",
    initials: "JM",
    accent: "gold",
  },
  {
    id: "sofia-almeida",
    name: "Sofia Almeida",
    role: "Fisioterapeuta",
    credentials: "Pós-graduação em Fisioterapia Desportiva",
    focus: ["Fisioterapia", "Lesões desportivas"],
    bio: "Acompanhou equipas de competição antes de se dedicar à clínica. Especialista em retorno ao desporto com critérios objetivos de força e controlo motor.",
    initials: "SA",
    accent: "sage",
  },
  {
    id: "mariana-costa",
    name: "Mariana Costa",
    role: "Fisioterapeuta",
    credentials: "Especialização em Reabilitação Perineal",
    focus: ["Reabilitação Perineal", "Reabilitação Estética"],
    bio: "Dedica-se à reabilitação do pavimento pélvico — no homem e na mulher — e à reabilitação estética pós-cirúrgica, sempre em gabinete reservado e sem pressa.",
    initials: "MC",
    accent: "gold",
  },
  {
    id: "pedro-lopes",
    name: "Pedro Lopes",
    role: "Podoposturologista",
    credentials: "Formação avançada em Podoposturologia",
    focus: ["Podoposturologia", "Postura"],
    bio: "Estuda a relação entre o apoio dos pés e a postura de todo o corpo. É a primeira paragem de muitas dores de joelho e coluna que andavam a ser tratadas no sítio errado.",
    initials: "PL",
    accent: "sage",
  },
  {
    id: "ines-ferreira",
    name: "Inês Ferreira",
    role: "Terapeuta da Fala",
    credentials: "Terapia da Fala · Crianças e adultos",
    focus: ["Terapia da Fala"],
    bio: "Trabalha a comunicação, a linguagem e a deglutição com crianças e adultos. Acredita que uma sessão bem passada com os mais pequenos parece uma brincadeira — e é essa a intenção.",
    initials: "IF",
    accent: "gold",
  },
  {
    id: "rita-goncalves",
    name: "Rita Gonçalves",
    role: "Psicóloga Clínica",
    credentials: "Membro efetivo da Ordem dos Psicólogos",
    focus: ["Psicologia", "Dor crónica"],
    bio: "Acompanha adultos e adolescentes, com especial atenção à gestão da dor crónica e à adaptação à lesão — em articulação próxima com o resto da equipa.",
    initials: "RG",
    accent: "sage",
  },
  {
    id: "carla-nunes",
    name: "Carla Nunes",
    role: "Assistente de Direção",
    credentials: "Gestão de marcações e acompanhamento de pacientes",
    focus: ["Marcações", "Apoio ao paciente"],
    bio: "É a primeira voz que ouve ao ligar-nos e a razão pela qual o tempo médio de resposta é de 15 minutos. Conhece cada paciente pelo nome.",
    initials: "CN",
    accent: "gold",
  },
];

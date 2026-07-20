export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  category: string;
  author: string;
  body: string[]; // parágrafos
};

export const posts: Post[] = [
  {
    slug: "dor-lombar-mitos",
    title: "5 mitos sobre dor lombar em que provavelmente ainda acredita",
    excerpt:
      "“Tenho as costas desalinhadas”, “o disco saiu do sítio”, “o melhor é repousar”. A ciência da dor evoluiu — as crenças é que ficaram para trás.",
    date: "2026-06-12",
    readingMinutes: 6,
    category: "Dor lombar",
    author: "João Marques dos Santos",
    body: [
      "A dor lombar é a principal causa de incapacidade no mundo — e também uma das condições mais rodeadas de mitos. Crenças erradas não são inofensivas: aumentam o medo, o medo aumenta a proteção muscular, e a proteção prolongada alimenta a própria dor.",
      "Mito 1: “A minha coluna está desalinhada.” As assimetrias são a norma, não a exceção. Estudos com imagem mostram alterações estruturais em pessoas sem qualquer dor. A coluna é robusta, adaptável e desenhada para o movimento.",
      "Mito 2: “O melhor é repousar.” O repouso prolongado é dos piores conselhos para a lombalgia comum. O movimento gradual e progressivo é, de forma consistente, o tratamento com melhor evidência.",
      "Mito 3: “Preciso de uma ressonância antes de tratar.” Na maioria dos casos, a imagem não muda o tratamento e pode até atrasá-lo. Reservamos exames para quando há sinais clínicos específicos.",
      "Mito 4: “Levantar pesos faz mal às costas.” Levantar pesos mal preparado pode irritar sintomas; levantar pesos com progressão adequada é dos melhores protetores da coluna que conhecemos.",
      "Mito 5: “Isto já é para o resto da vida.” A esmagadora maioria das lombalgias melhora significativamente com um plano ativo. O prognóstico é bom — sobretudo quando se troca o medo por conhecimento.",
      "Se a dor lombar faz parte do seu dia a dia, marque uma avaliação. Uma hora inteira para perceber o seu caso vale mais do que anos de conselhos genéricos.",
    ],
  },
  {
    slug: "regresso-ao-desporto",
    title: "Quando é seguro voltar ao desporto depois de uma lesão?",
    excerpt:
      "A resposta não está no calendário — está nos critérios. O que avaliamos antes de dar luz verde para o regresso à competição.",
    date: "2026-05-28",
    readingMinutes: 5,
    category: "Desporto",
    author: "Sofia Almeida",
    body: [
      "“Quando posso voltar a jogar?” é a primeira pergunta de quase todos os atletas que recebemos. A resposta honesta: quando o seu corpo cumprir os critérios — não quando o calendário disser.",
      "O regresso precoce é o maior fator de risco para nova lesão. Depois de uma rotura do LCA, por exemplo, regressar antes dos 9 meses e sem simetria de força aumenta drasticamente o risco de rotura do enxerto ou do joelho contrário.",
      "Na clínica usamos uma bateria de testes objetivos: força medida com dinamometria, testes de salto comparando os dois membros, controlo de mudanças de direção e — tantas vezes esquecida — a confiança do próprio atleta.",
      "O regresso também não é um interruptor: é uma rampa. Treino condicionado, treino completo, minutos limitados de jogo e só depois competição plena. Cada degrau confirma que o anterior estava consolidado.",
      "Se está a recuperar de uma lesão e não sabe em que degrau está, uma avaliação de retorno ao desporto dá-lhe um mapa claro — e a segurança de que o regresso é para ficar.",
    ],
  },
  {
    slug: "teletrabalho-pescoco",
    title: "Teletrabalho e dor cervical: o problema não é a cadeira",
    excerpt:
      "A melhor postura é a próxima postura. Como organizar o dia — e não apenas a secretária — para um pescoço sem queixas.",
    date: "2026-04-15",
    readingMinutes: 4,
    category: "Dor cervical",
    author: "João Marques dos Santos",
    body: [
      "Desde 2020 que a dor cervical associada ao trabalho ao computador disparou. A reação habitual é comprar uma cadeira melhor. Ajuda — mas raramente resolve, porque o problema principal não é a postura que adota: é o tempo que passa nela.",
      "O pescoço tolera praticamente qualquer posição durante 20 minutos. O que não tolera é a mesma posição durante 3 horas. Por isso, a regra mais eficaz que pode adotar é também a mais simples: mude de posição com frequência.",
      "Sugestões práticas: levante-se a cada 30–45 minutos, nem que seja por 30 segundos; alterne entre sentado e de pé se possível; suba o ecrã à altura dos olhos; e faça 2–3 pausas diárias com movimentos amplos de pescoço e ombros.",
      "O fortalecimento também protege: pescoços mais fortes queixam-se menos. Um programa simples de 10 minutos, três vezes por semana, reduz significativamente episódios de dor em trabalhadores de escritório.",
      "Se as dores de cabeça e a tensão cervical já se instalaram, não espere que passem sozinhas. Seis a oito sessões resolvem a maioria dos casos — e ensinam-lhe o plano para não voltarem.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

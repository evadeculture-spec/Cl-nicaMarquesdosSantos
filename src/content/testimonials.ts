export type Testimonial = {
  name: string;
  context: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Teresa M.",
    context: "Dor lombar crónica",
    quote:
      "Andei três anos de clínica em clínica. Aqui, na primeira sessão, explicaram-me finalmente o que tinha — e em dois meses voltei a pegar na minha neta ao colo sem medo.",
    rating: 5,
  },
  {
    name: "Ricardo F.",
    context: "Ligamentoplastia LCA",
    quote:
      "A Sofia acompanhou-me da segunda semana pós-cirurgia até ao regresso aos jogos. Nunca me deixou saltar etapas, e foi por isso que voltei sem recaídas.",
    rating: 5,
  },
  {
    name: "Ana Sofia P.",
    context: "Pós-parto",
    quote:
      "A consulta de saúde da mulher foi um espaço sem pressa e sem vergonhas. A Mariana devolveu-me a confiança no meu corpo. Recomendo a todas as mães.",
    rating: 5,
  },
  {
    name: "Carlos A.",
    context: "Recuperação pós-AVC",
    quote:
      "O Pedro nunca desistiu de mim, mesmo quando eu já tinha desistido. Hoje volto a caminhar até ao café todos os dias. Não há palavras.",
    rating: 5,
  },
  {
    name: "Marta L.",
    context: "Dor cervical e enxaquecas",
    quote:
      "Marquei online num domingo à noite e na segunda de manhã já tinha confirmação. As dores de cabeça que me acompanhavam há anos desapareceram ao fim de seis sessões.",
    rating: 5,
  },
  {
    name: "José E.",
    context: "Prótese total do joelho",
    quote:
      "Aos 74 anos pensei que ia ficar dependente. A equipa tratou-me com uma paciência e um profissionalismo que nunca tinha visto. Estou-lhes muito grato.",
    rating: 5,
  },
];

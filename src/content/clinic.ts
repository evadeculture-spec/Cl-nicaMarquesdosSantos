export const clinic = {
  name: "Clínica Marques dos Santos",
  shortName: "Marques dos Santos",
  tagline: "Uma nova perspectiva de cuidar.",
  subtitle: "Fisioterapia, Osteopatia e outras especialidades médicas",
  description:
    "Fisioterapia, osteopatia e outras especialidades médicas em Castelo Branco. Mais de vinte consultas e serviços, médico fisiatra para reembolsos ADSE/SAMS e acompanhamento próximo — do primeiro dia à última sessão.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinicamarquesdossantos.pt",
  phone: "+351 939 966 174",
  phoneHref: "+351939966174",
  email: "geral@clinicamarquesdossantos.pt",
  instagram: "https://www.instagram.com/clinicamarquesdossantos",
  address: {
    street: "Rua Doutor Francisco Robalo Guedes, R/C LT D4",
    locality: "Castelo Branco",
    postalCode: "6000-050",
    country: "PT",
  },
  geo: { latitude: 39.8222, longitude: -7.4931 },
  openingHours: [
    { days: "Segunda a Sexta", hours: "09:00 – 20:00", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { days: "Sábado", hours: "09:00 – 13:00", dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  metrics: {
    rating: 4.9,
    reviews: 187,
    responseMinutes: 15,
    yearsExperience: 15,
    patientsPerYear: 2400,
    successRate: 96,
  },
  social: {
    instagram: "https://www.instagram.com/clinicamarquesdossantos",
    facebook: "https://www.facebook.com/p/Cl%C3%ADnica-Marques-Dos-Santos-61553876952591/",
  },
} as const;

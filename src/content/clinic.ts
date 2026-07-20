export const clinic = {
  name: "Clínica Marques dos Santos",
  shortName: "Marques dos Santos",
  tagline: "Fisioterapia com tempo, ciência e cuidado.",
  description:
    "Clínica de fisioterapia em Lisboa. Avaliação rigorosa, planos de tratamento personalizados e acompanhamento próximo — do primeiro dia à última sessão.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinicamarquesdossantos.pt",
  phone: "+351 21 000 00 00",
  phoneHref: "+351210000000",
  email: "ola@clinicamarquesdossantos.pt",
  address: {
    street: "Av. da República 42, 3.º Esq.",
    locality: "Lisboa",
    postalCode: "1050-194",
    country: "PT",
  },
  geo: { latitude: 38.7436, longitude: -9.1467 },
  openingHours: [
    { days: "Segunda a Sexta", hours: "08:00 – 20:00", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
    { days: "Sábado", hours: "09:00 – 13:00", dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  metrics: {
    rating: 4.9,
    reviews: 312,
    responseMinutes: 15,
    yearsExperience: 18,
    patientsPerYear: 3200,
    successRate: 96,
  },
  social: {
    instagram: "https://instagram.com/clinicamarquesdossantos",
    facebook: "https://facebook.com/clinicamarquesdossantos",
    linkedin: "https://linkedin.com/company/clinicamarquesdossantos",
  },
} as const;

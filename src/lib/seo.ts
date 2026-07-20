import { clinic } from "@/content/clinic";
import { faqs } from "@/content/faqs";
import type { Post } from "@/content/posts";
import type { Specialty } from "@/content/specialties";

/** Schema global: MedicalBusiness + LocalBusiness (PhysicalTherapy). */
export function medicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physiotherapy", "LocalBusiness"],
    "@id": `${clinic.url}/#clinic`,
    name: clinic.name,
    description: clinic.description,
    url: clinic.url,
    telephone: clinic.phone,
    email: clinic.email,
    priceRange: "€€",
    medicalSpecialty: "PhysicalTherapy",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.latitude,
      longitude: clinic.geo.longitude,
    },
    openingHoursSpecification: clinic.openingHours.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.dayOfWeek,
      opens: o.opens,
      closes: o.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.metrics.rating,
      reviewCount: clinic.metrics.reviews,
      bestRating: 5,
    },
    sameAs: Object.values(clinic.social),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function specialtySchema(s: Specialty) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: s.name,
    description: s.description,
    url: `${clinic.url}/especialidades/${s.slug}`,
    provider: { "@id": `${clinic.url}/#clinic` },
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${clinic.url}/#clinic` },
    mainEntityOfPage: `${clinic.url}/blog/${post.slug}`,
    inLanguage: "pt-PT",
  };
}

/** Componente utilitário para injetar JSON-LD. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}

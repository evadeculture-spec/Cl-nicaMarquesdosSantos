import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { specialties } from "@/content/specialties";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/sobre",
    "/equipa",
    "/especialidades",
    "/tratamentos",
    "/tecnologia",
    "/casos-clinicos",
    "/faq",
    "/blog",
    "/contacto",
    "/marcar",
  ].map((path) => ({
    url: `${clinic.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/marcar" ? 0.9 : 0.7,
  }));

  const specialtyPages = specialties.map((s) => ({
    url: `${clinic.url}/especialidades/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postPages = posts.map((p) => ({
    url: `${clinic.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...specialtyPages, ...postPages];
}

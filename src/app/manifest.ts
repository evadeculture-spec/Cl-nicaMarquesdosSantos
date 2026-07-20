import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: clinic.shortName,
    description: clinic.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

import type { MetadataRoute } from "next";

const siteUrl = "https://generador-pagares.vercel.app";

const routes = [
  "",
  "/que-es-un-pagare",
  "/como-llenar-un-pagare",
  "/pagare-en-mexico",
  "/pagare-ejemplo",
  "/preguntas-frecuentes",
  "/privacidad",
  "/terminos",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

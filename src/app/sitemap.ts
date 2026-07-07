import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/products", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | Smart Biomedical Solutions Sri Lanka`,
    short_name: SITE_NAME,
    description:
      "Sri Lanka's leading importer and distributor of biomedical devices, dialysis consumables, rehabilitation aids, and surgical equipment.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c19530",
    lang: "en-LK",
    categories: ["medical", "health", "business"],
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

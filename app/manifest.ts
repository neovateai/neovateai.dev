import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neovate",
    short_name: "Neovate",
    icons: [],
    theme_color: "#fff",
    background_color: "#fff",
    display: "standalone",
  };
}

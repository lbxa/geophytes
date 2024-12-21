import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://geophytes.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },
  integrations: [
    tailwind(),
    react(),
    solidJs(),
    icon({ iconDir: "src/assets/icons" }),
    mdx(),
  ],
});

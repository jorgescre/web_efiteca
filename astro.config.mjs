import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.efiteca.com",
  integrations: [mdx()],
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});

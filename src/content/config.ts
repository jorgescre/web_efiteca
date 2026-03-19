import { defineCollection, z } from "astro:content";

const seoSchema = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(160)
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    lang: z.enum(["es", "en"]),
    market: z.string().optional(),
    title: z.string().min(10).max(80),
    excerpt: z.string().min(80).max(220),
    publishedAt: z.string().date(),
    updatedAt: z.string().date().optional(),
    category: z.enum(["corporate", "market", "insight"]),
    featured: z.boolean().default(false),
    seo: seoSchema
  })
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    seo: seoSchema
  })
});

const markets = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    lang: z.enum(["es", "en"]),
    seo: seoSchema
  })
});

export const collections = {
  news,
  pages,
  markets
};

import { getCollection } from "astro:content";
import type { Lang } from "@/data/locales";

export async function getNewsForLang(lang: Lang) {
  const entries = await getCollection("news", ({ data }) => data.lang === lang);
  return entries.sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));
}

export async function getLatestNews(lang: Lang, limit = 3) {
  const entries = await getNewsForLang(lang);
  return entries.slice(0, limit);
}

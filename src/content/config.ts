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

const buttonSchema = z.object({
  label: z.string(),
  href: z.string()
});

const locationItemSchema = z.object({
  city: z.string(),
  address: z.string(),
  image: z.string(),
  summary: z.string().optional(),
  seoLabel: z.string().optional(),
  cta: buttonSchema
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    seo: seoSchema,
    // Estructura de la Home
    hero: z.object({
      title_part1: z.string(),
      title_part2: z.string(),
      description: z.string(),
      cta: buttonSchema,
      images: z.array(z.string()).optional()
    }).optional(),
    services: z.object({
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        button: buttonSchema,
        image: z.string()
      }))
    }).optional(),
    whoIsItFor: z.object({
      title: z.string(),
      items: z.array(z.object({
        title: z.string(),
        image: z.string()
      }))
    }).optional(),
    steps: z.object({
      title: z.string(),
      image: z.string(),
      items: z.array(z.object({
        number: z.number(),
        title: z.string(),
        description: z.string()
      }))
    }).optional(),
    benefits: z.object({
      title: z.string(),
      description: z.string().optional(),
      ctaText: z.string().optional(),
      ctaLink: z.string().optional(),
      items: z.array(z.object({
        text: z.string()
      }))
    }).optional(),
    metrics: z.object({
        title: z.string(),
        items: z.array(z.object({
            title: z.string(),
            value: z.string(),
        }))
    }).optional(),
    testimonials: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(z.object({
            name: z.string(),
            role: z.string(),
            text: z.string(),
            image: z.string(),
            stars: z.number().default(5)
        }))
    }).optional(),
    partners: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(z.object({
            name: z.string()
        }))
    }).optional(),
    faq: z.object({
      title: z.string(),
      items: z.array(z.object({
        question: z.string(),
        answer: z.string()
      }))
    }).optional(),
    locations: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(locationItemSchema)
    }).optional(),
    blog: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        cta: buttonSchema
      })),
      cta: buttonSchema
    }).optional(),
    newsletter: z.object({
      title: z.string(),
      description: z.string(),
      button: buttonSchema,
      emailPlaceholder: z.string().optional()
    }).optional(),
    contact: z.object({
      title: z.string(),
      description: z.string(),
      highlights: z.array(z.string()).optional(),
      form: z.object({
        name_label: z.string(),
        lastname_label: z.string(),
        email_label: z.string(),
        phone_label: z.string(),
        role_label: z.string().optional(),
        role_placeholder: z.string().optional(),
        message_label: z.string(),
        terms_label: z.string(),
        submit_label: z.string()
      })
    }).optional(),
    footer: z.object({
      services_title: z.string(),
      links: z.array(buttonSchema)
    }).optional()
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

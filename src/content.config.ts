import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Dmytro Yemelianov'),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.string().optional(),
    order: z.number().default(999),
    icon: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    icon: z.string().optional(),
    github: z.string().optional(),
    order: z.number().default(999),
    version: z.string().optional(),
  }),
});

export const collections = { blog, docs, products };

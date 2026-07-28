import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    canonical: z.string().optional(),
    metaDescription: z.string(),
    focusKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    author: z.string().default('LuHao Mobiliza'),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    ctaBanner: z.string().optional(),
  }),
});

export const collections = { blog };

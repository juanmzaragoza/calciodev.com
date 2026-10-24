import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Case Studies Collection
 * B2B success stories with structured data for rich results.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      client: z.string(),
      industry: z.string(),
      results: z
        .array(
          z.object({
            metric: z.string(),
            value: z.string(),
            description: z.string().optional(),
          })
        )
        .optional(),
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          role: z.string(),
          avatar: image().optional(),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

/**
 * Authors Collection
 * Author profiles for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).
 */
const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      avatar: image().optional(),
      credentials: z.array(z.string()).default([]),
      social: z
        .object({
          twitter: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          github: z.string().url().optional(),
          website: z.string().url().optional(),
        })
        .optional(),
    }),
});

export const collections = { 'case-studies': caseStudies, authors };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pioneers = defineCollection({
	loader: glob({ pattern: '*.mdoc', base: './src/content/pioneers' }),
	schema: z.object({
		title: z.string(),
		intro: z.string(),
		image: z.string(),
		homepage: z.string().url(),
	}),
});

export const collections = { pioneers };

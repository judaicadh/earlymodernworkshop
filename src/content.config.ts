// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
// If you really use Starlight pages, keep the next line; otherwise remove both docs import & collection.
import { docsSchema } from '@astrojs/starlight/schema';

// Years (JSON)
const years = defineCollection({
    loader: file('src/content/years.json'),
    schema: z.object({
        year: z.string(),
        title: z.string(),
        description: z.string().optional(),
        slug: z.string(),
        thumbnail: z.string().optional(),
        credit: z.string().optional(),
    }),
});

// Documents (Markdown)
const documents = defineCollection({
    loader: glob({ base: 'src/content/documents', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),

        volume: z.union([z.number(), z.string()]).optional(),
        institution: z.string().optional(),
        event: z
            .object({
                name: z.string(),
                theme: z.string().optional(),
            })
            .optional(),
        language: z.array(z.string()).optional(),
        publication_location: z.array(z.string()).optional(),
        original_language_body: z.string().optional(),
        resource_link: z.array(z.string()).optional(),
        author: z.string().optional(),
        year: z.string(),
        slug: z.string(),
        tags: z.array(z.string()).optional(),
        location: z.string().optional(),
        primarysourceinfo: z.string().optional(),
        thumbnail: z.string().optional(),
        file: z.string().optional(),
        text_location: z.array(z.string()).optional(),

        sections: z
            .array(
                z.object({
                    title: z.string().optional(),
                    content: z.string().optional(), // markdown
                })
            )
            .optional(),



        bibliography: z
            .array(
                z.object({
                    author: z.string().optional(),
                    title: z.string().optional(),
                    type: z.string().optional(),
                    institution: z.string().optional(),
                    year: z.string().optional(),
                    pages: z.string().optional(),
                })
            )
            .optional(),
    }),
});

// Export collections
export const collections = {
    years,
    documents,

    // Keep this only if you’re actually rendering Starlight docs pages from the same folder.
    docs: defineCollection({
        loader: glob({
            base: 'src/content/documents',
            pattern: '**/*.{md,mdx,markdoc}',
        }),
        schema: docsSchema(),
    }),
};
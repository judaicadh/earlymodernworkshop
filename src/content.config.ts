import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Collection for years (using JSON file)
const years = defineCollection({
    loader: file("src/content/years.json"), // Load data from JSON
    schema:
        z.object({
            year: z.string(), // Year as a string
            title: z.string(),
            description: z.string().optional(),
            slug: z.string(), // Ensure slug is unique
            thumbnail: z.string().optional(), // Optional thumbnail
        }
    ),
});

// Collection for documents (Markdown files)
const documents = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/documents" }), // Load all Markdown files
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        author: z.string().optional(),
        year: z.string(), // Match year with JSON slug
        slug: z.string(), // Required slug field
        tags: z.array(z.string()).optional(),
        location: z.string().optional(),
        primarysourceinfo: z.string().optional(),
        thumbnail: z.string().optional(),
        file: z.string().optional(),
        publication_location: z.array(z.string()).optional(),
    }),
});

// Export the collections
export const collections = {
    years, // Collection for year metadata
    documents, // Collection for individual documents
};
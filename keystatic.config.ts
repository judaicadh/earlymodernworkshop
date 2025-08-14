// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
    // Local while developing; GitHub in production
    storage: process.env.NODE_ENV === 'production'
        ? {
            kind: 'github',
            repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },
            branch: 'main',
            // You’ll add GitHub OAuth env vars in Netlify (see notes below)
        }
        : { kind: 'local' },

    collections: {
        documents: collection({
            label: 'Documents',
            // Save files under a year folder with the post slug as filename
            path: 'src/content/documents/{year}/{slug}.md',
            // Tell Keystatic which field provides the slug
            slugField: 'title',
            format: { contentField: 'content' },

            schema: {
                // Year used in the folder path
                year: fields.integer({
                    label: 'Year',
                    validation: { isRequired: true, min: 1500, max: 2100 },
                }),

                // Slug field provides both a Title (human) and a slug (file name)
                title: fields.slug({
                    name: { label: 'Title', description: 'Shown on the site; slug derived from this' },
                    slug: { label: 'Slug', description: 'Filename part; auto-generated, editable' },
                }),

                // Use Markdown so footnotes like [^1] are preserved
                content: fields.markdown({
                    label: 'Content',
                    description: 'Markdown supported (GFM + your Astro footnotes plugin)',
                }),
            },
        }),

        // Optional: simple pages collection
        pages: collection({
            label: 'Pages',
            path: 'src/content/pages/{slug}.md',
            slugField: 'title',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({
                    name: { label: 'Title' },
                    slug: { label: 'Slug' },
                }),
                content: fields.markdown({ label: 'Content' }),
            },
        }),
    },
});
// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

// List your years and sort DESC so newest shows first in the sidebar
const YEARS = [
    2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
    // …add the rest (e.g., 2013–2025)
].sort((a, b) => b - a);

const schema = {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),

// content.config.ts types these as z.string().optional() → keep them as frontmatter
// strings, not externalized markdoc:
    description: fields.text({ label: 'Description', multiline: true }),
    original_language_body: fields.text({ label: 'Original Language', multiline: true }),
    primarysourceinfo: fields.text({ label: 'Primary Source Info', multiline: true }),

    bibliography: fields.array(
        fields.object({
            author: fields.text({ label: 'Author' }),
            title: fields.text({ label: 'Title' }),
            type: fields.text({ label: 'Type' }),
            institution: fields.text({ label: 'Institution' }),
            year: fields.text({ label: 'Publication Year' }),
            pages: fields.text({ label: 'Pages' }),
        }),
        { label: 'Bibliography', itemLabel: (p) => p.fields.title.value || 'Reference' }
    ),

    content: fields.markdoc({ label: 'Content', extension: 'md' }),
};

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },

    },
    // Build one collection per year; object key order = sidebar order
    collections: Object.fromEntries(
        YEARS.map((year) => [
            `${year}`,
            collection({
                label: String(year),
                path: `src/content/documents/${year}/*`,
                slugField: 'slug',
                format: { contentField: 'content'   },
                schema,
            }),
        ])
    ),
});
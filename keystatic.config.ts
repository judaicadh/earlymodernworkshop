// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

// List your years and sort DESC so newest shows first in the sidebar
const YEARS = [
    2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
    // …add the rest (e.g., 2013–2025)
].sort((a, b) => b - a);

const schema = {
    year: fields.integer({ label: 'Year', validation: { isRequired: true } }),
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    slug: fields.text({
        label: 'Slug',
        validation: { isRequired: true },
        description: 'Filename without extension (e.g. my-post-title)',
    }),
    content: fields.markdoc({ label: 'Content' }),
};

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },

    },
    // Build one collection per year; object key order = sidebar order
    collections: Object.fromEntries(
        YEARS.map((year) => [
            `docs_${year}`,
            collection({
                label: String(year),
                path: `src/content/documents/${year}/*`,
                slugField: 'slug',
                format: { contentField: 'content', contentExtension: 'md' },
                schema,
            }),
        ])
    ),
});
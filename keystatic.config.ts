// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

const YEARS = [
    2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012,
    // add more years here…
];

// Shared schema for each year’s collection
const docSchema = {
    // You can keep `year` in frontmatter (nice for summaries),
    // but it's not required because the folder path already encodes it.
    year: fields.integer({ label: 'Year', validation: { isRequired: true } }),
    title: fields.slug({
        name: { label: 'Title' },
        slug: { label: 'Slug' }, // filename; editable
    }),
    content: fields.markdoc({ label: 'Content' }),
};

// Build one collection per year, each pointing to its own folder
const yearCollections = Object.fromEntries(
    YEARS.map((y) => [
        `documents_${y}`,
        collection({
            label: String(y),
            path: `src/content/documents/${y}/*`, // files live under that year folder
            slugField: 'title',                    // '*' comes from the slug inside `title`
            format: { contentField: 'content', contentExtension: 'md' },
            schema: docSchema,
        }),
    ])
);

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },
        branch: 'main',
    },
    collections: {
        ...yearCollections,
    },
});
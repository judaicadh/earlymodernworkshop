import { config, fields, collection } from '@keystatic/core';
import fs from 'node:fs';
import path from 'node:path';

// Auto-detect existing year folders so Keystatic doesn't 404 on missing dirs
const DOCS_ROOT = path.join(process.cwd(), 'src/content/documents');
const YEARS = fs.existsSync(DOCS_ROOT)
    ? fs.readdirSync(DOCS_ROOT)
        .filter((d) => /^\d{4}$/.test(d) && fs.statSync(path.join(DOCS_ROOT, d)).isDirectory())
        .map((y) => Number(y))
        .sort((a, b) => b - a) // newest → oldest
    : [];

// Schema that matches your current frontmatter exactly
const schema = {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    author: fields.text({ label: 'Author', validation: { isRequired: false } }),
    volume: fields.integer({ label: 'Volume', validation: { isRequired: false } }),
    // you have year quoted as a string; keep it as text so existing files validate
    year: fields.text({ label: 'Year', validation: { isRequired: true } }),
    slug: fields.text({
        label: 'Slug',
        description: 'Filename (no .md), e.g. messengers-to-themselves',
        validation: { isRequired: true },
    }),

    event: fields.object(
        {
            name: fields.text({ label: 'Event Name' }),
            theme: fields.text({ label: 'Theme', validation: { isRequired: false } }),
            date: fields.object(
                {
                    start: fields.text({ label: 'Start (YYYY-MM-DD)' }),
                    end: fields.text({ label: 'End (YYYY-MM-DD)', validation: { isRequired: false } }),
                },
                { label: 'Dates', validation: { isRequired: false } }
            ),
        },
        { label: 'Event', validation: { isRequired: false } }
    ),

    tags: fields.array(fields.text({ label: 'Tag' }), {
        label: 'Tags',
        itemLabel: (v) => v ?? 'Tag',
        validation: { isRequired: false },
    }),

    description: fields.text({
        label: 'Description',
        multiline: true,
        validation: { isRequired: false },
    }),

    sections: fields.array(
        fields.object(
            {
                heading: fields.text({ label: 'Heading', validation: { isRequired: false } }),
                body: fields.text({ label: 'Body (optional)', multiline: true }),
            },
            { label: 'Section' }
        ),
        { label: 'Sections', validation: { isRequired: false } }
    ),

    footnotes: fields.array(
        fields.object(
            {
                // minimal shape—expand as you standardize
                label: fields.text({ label: 'Label/Marker', validation: { isRequired: false } }),
                text: fields.text({ label: 'Footnote text', multiline: true }),
            },
            { label: 'Footnote' }
        ),
        { label: 'Footnotes', validation: { isRequired: false } }
    ),

    bibliography: fields.array(
        fields.object(
            {
                author: fields.text({ label: 'Author' }),
                title: fields.text({ label: 'Title', multiline: true }),
                year: fields.text({ label: 'Year' }),
                pages: fields.text({ label: 'Pages', validation: { isRequired: false } }),
            },
            { label: 'Entry' }
        ),
        { label: 'Bibliography', validation: { isRequired: false } }
    ),

    // Body content lives after frontmatter; keeps your footnotes in Markdown
    content: fields.markdoc({ label: 'Content', extension: 'md' }),
} as const;

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },
    },
    collections: Object.fromEntries(
        YEARS.map((year) => [
            `docs_${year}`,
            collection({
                label: String(year),
                // each year collection looks only in its own folder
                path: `src/content/documents/${year}/*`,
                slugField: 'slug', // use your existing string slug
                format: { contentField: 'content' },
                schema,
            }),
        ])
    ),
});
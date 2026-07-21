// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

// List your years and sort DESC so newest shows first in the sidebar
const YEARS = [
    2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
].sort((a, b) => b - a);

const schema = {
    // changed: was fields.markdoc({ extension: 'md' }) → externalized to a sibling file
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),

    // changed: content.config.ts types these as z.string().optional() → keep as frontmatter strings
    description: fields.text({ label: 'Description', multiline: true }),

    author: fields.text({ label: 'Author' }),

    // present in 13 entries; Keystatic rejects unknown frontmatter keys, so it must be declared
    presenter: fields.text({ label: 'Presenter' }),

    year: fields.text({ label: 'Year', validation: { isRequired: true } }),
    volume: fields.integer({ label: 'Volume' }),
    slug: fields.slug({ name: { label: 'Slug' } }),

    source_author: fields.text({ label: 'Source Author' }),

    // changed: markdoc → text
    original_language_body: fields.text({ label: 'Original Language', multiline: true }),

    resource_link: fields.array(
        fields.url({ label: 'Resource Link(s)' }),
        { label: 'Resource Link (s)' }
    ),
    publication_location: fields.array(
        fields.text({ label: 'Primary Location(s)' }),
        { label: 'Primary Location(s)', itemLabel: props => props.value }
    ),
    text_location: fields.array(
        fields.text({ label: 'Secondary Location(s)' }),
        { label: 'Secondary Location(s)', itemLabel: props => props.value }
    ),
    language: fields.array(
        fields.text({ label: 'Language(s)' }),
        { label: 'Language(s)', itemLabel: props => props.value }
    ),
    tags: fields.array(
        fields.text({ label: 'Tag' }),
        { label: 'Tag(s)', itemLabel: props => props.value }
    ),

    institution: fields.text({ label: 'Institution' }),
    event: fields.object({
        name: fields.text({ label: 'Event Name' }),
        theme: fields.text({ label: 'Theme' }),
        Date: fields.object({
            start: fields.date({ label: 'Start Date' }),
            end: fields.date({ label: 'End Date' }),
        }),
    }),

    // changed: was fields.object(...) → content.config.ts (and your 13 other docs) use an array
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

    // present in 10 entries; shape mirrors content.config.ts (title + markdown string)
    sections: fields.array(
        fields.object({
            title: fields.text({ label: 'Title' }),
            content: fields.text({ label: 'Content', multiline: true }),
        }),
        { label: 'Sections', itemLabel: (p) => p.fields.title.value || 'Section' }
    ),

    // present in 13 entries; shape mirrors content.config.ts
    footnotes: fields.array(
        fields.object({
            ref: fields.text({ label: 'Ref' }),
            text: fields.text({ label: 'Text', multiline: true }),
        }),
        { label: 'Footnotes', itemLabel: (p) => p.fields.ref.value || 'Footnote' }
    ),

    // changed: markdoc → text
    primarysourceinfo: fields.text({ label: 'Primary Source Info', multiline: true }),

    content: fields.markdoc({
        label: 'Content',
        extension: 'md',
        components: {
            // Renders via the remark-align plugin in astro.config.mjs
            Align: wrapper({
                label: 'Align',
                schema: {
                    alignment: fields.select({
                        label: 'Alignment',
                        options: [
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' },
                        ],
                        defaultValue: 'center',
                    }),
                },
            }),
        },
    }),
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
                entryLayout: 'content',
                format: {
                    contentField: 'content',
                },

                schema,
            }),
        ])
    ),
});
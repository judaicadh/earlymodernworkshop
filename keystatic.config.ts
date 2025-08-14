// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

// List your years and sort DESC so newest shows first in the sidebar
const YEARS = [
    2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
    // …add the rest (e.g., 2013–2025)
].sort((a, b) => b - a);

const schema = {
    title: fields.markdoc({ label: 'Title' }),
    description: fields.markdoc({ label: 'Description' }),
    author: fields.text({ label: 'Author' }),
    year: fields.text({ label: 'Year', validation: { isRequired: true } }),
    volume: fields.integer({ label: 'Volume' }),
    slug:fields.slug({ name: 'Slug' }),

    source_author: fields.text({ label: 'Source Author' }),

    original_language_body: fields.array(
        fields.text({ label: 'Original Language' }),
        // Labelling options
        {
            label: 'Original Langugage',
            itemLabel: props => props.value
        }
    ),

    resource_link: fields.array(
        fields.url({ label: 'Resource Link(s)' }),
        // Labelling options
        {
            label: 'Resource Link (s)',
        }
    ),
    publication_location: fields.array(
        fields.text({ label: 'Primary Location(s)' }),
        // Labelling options
        {
            label: 'Primary Location(s)',
            itemLabel: props => props.value
        }
    ),
    text_location: fields.array(
        fields.text({ label: 'Secondary Location(s)' }),
        // Labelling options
        {
            label: 'Secondary Location(s)',
            itemLabel: props => props.value
        }
    ),
    language: fields.array(
        fields.text({ label: 'Language(s)' }),
        // Labelling options
        {
            label: 'Language(s)',
            itemLabel: props => props.value
        }
    ),

    tags: fields.array(
        fields.text({ label: 'Tag' }),
        // Labelling options
        {
            label: 'Tag(s)',
            itemLabel: props => props.value
        }
    ),

    institution: fields.text({ label: 'Institution' }),
    event: fields.object({
        name: fields.text({label: 'Event Name'}),
        theme: fields.text({label: 'Theme'}),
        Date: fields.object({
            start: fields.date({label: 'Start Date'}),
            end: fields.date({label: 'End Date'}),
        }),
    }),
    bibliography: fields.object({
        title: fields.text({ label: 'Title' }),
        author: fields.text({ label: 'Author' }),
        publication: fields.text({ label: 'Publication' }),
        type: fields.text({ label: 'Type' }),
        institution: fields.text({ label: 'Institution' }),
        year: fields.text({ label: 'Publication Year' }),
        pages: fields.text({ label: 'Pages' }),

    }),
    primarysourceinfo: fields.markdoc({ label: 'Primary Source Info' }),

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
// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },
        // Keystatic uses the repo’s default branch
    },

    // One collection spanning all years (files live in per-year folders)
    collections: {
        documents: collection({
            label: 'Documents',
            // Folder per year; filename comes from the slug field (no extension here)
            path: 'src/content/documents/{year}/*',
            slugField: 'slug',

            // Write/read the body content from the same file, with .md extension
            format: { contentField: 'content'},

            schema: {
                // Basics
                title: fields.text({ label: 'Title', validation: { isRequired: true } }),
                author: fields.text({ label: 'Author' }),
                institution: fields.text({ label: 'Institution' }),
                volume: fields.integer({ label: 'Volume' }),
                year: fields.text({
                    label: 'Year',
                    // you currently store year as a string in frontmatter; keep it as text to match
                    validation: { isRequired: true },
                }),
                slug: fields.text({
                    label: 'Slug',
                    description: 'Filename without extension (e.g. messengers-to-themselves)',
                    validation: { isRequired: true },
                }),

                // Event
                event: fields.object(
                    {
                        name: fields.text({ label: 'Event Name' }),
                        theme: fields.text({ label: 'Theme' }),
                        date: fields.object(
                            {
                                start: fields.text({ label: 'Start Date (YYYY-MM-DD)' }),
                                end: fields.text({ label: 'End Date (YYYY-MM-DD)' }),
                            },
                            { label: 'Date' }
                        ),
                    },
                    { label: 'Event' }
                ),

                // Lists
                language: fields.array(fields.text({ label: 'Language' }), {
                    label: 'Language',
                    itemLabel: ({ value }) => value ?? 'Language',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: ({ value }) => value ?? 'Tag',
                }),
                publication_location: fields.array(fields.text({ label: 'Primary Location' }), {
                    label: 'Primary Location',
                    itemLabel: ({ value }) => value ?? 'Primary Location',
                }),
                text_location: fields.array(fields.text({ label: 'Secondary Location' }), {
                    label: 'Secondary Location(s)',
                    itemLabel: ({ value }) => value ?? 'Secondary Location',
                }),
                resource_link: fields.array(fields.text({ label: 'URL' }), {
                    label: 'URL to resource',
                    itemLabel: ({ value }) => value ?? 'URL',
                }),

                // Misc text
                source_author: fields.text({ label: 'Source Author' }),
                primarysourceinfo: fields.text({ label: 'Primary Source Information' }),

                // Rich text / long text
                description: fields.markdoc({
                    label: 'Description',
                    extension: "md",

                }),

                // Sections (list of rich sections)
                sections: fields.array(
                    fields.object(
                        {
                            title: fields.text({ label: 'Section Title' }),
                            content: fields.markdoc({
                                label: 'Section Content',
                                extension: 'md',

                            }),
                        },
                        { label: 'Section' }
                    ),
                    { label: 'Sections' }
                ),



                // Bibliography (list of objects)
                bibliography: fields.array(
                    fields.object(
                        {
                            author: fields.text({ label: 'Author' }),
                            title: fields.text({ label: 'Title' }),
                            publication: fields.text({ label: 'Publication' }),
                            type: fields.text({ label: 'Type' }),
                            institution: fields.text({ label: 'Institution' }),
                            year: fields.text({ label: 'Year' }),
                            pages: fields.text({ label: 'Pages' }),
                        },
                        { label: 'Bibliography Entry' }
                    ),
                    { label: 'Bibliography' }
                ),

                // Body fields
                body: fields.markdoc({
                    label: 'Body',
                    extension: "md",
                }), // <- this is the file body (contentField)

                original_language_body: fields.text({
                    label: 'Original Language Body',

                }),

                // Extra free text
                test: fields.text({ label: 'test' }),

                // Optional: attachments (PDFs, docs, images). Uncomment if you want uploads here.
                // attachments: fields.array(
                //   fields.file({
                //     label: 'Attachment',
                //     // Store under /public/assets so they serve at /assets/...
                //     directory: 'public/assets',
                //   }),
                //   { label: 'Attachments' }
                // ),
            },
        }),
    },
});
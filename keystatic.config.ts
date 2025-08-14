import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: { owner: 'judaicadh', name: 'earlymodernworkshop' },
    },
    collections: {
        documents: collection({
            label: 'Documents',
            path: 'src/content/documents/{year}/{slug}.md',
            slugField: 'slug',
            format: { contentField: 'content' },
            schema: {
                year: fields.integer({
                    label: 'Year',
                    validation: { isRequired: true },
                }),
                title: fields.text({
                    label: 'Title',
                    validation: { isRequired: true },
                }),
                slug: fields.slug({
                    name: { label: 'Slug' },
                    from: 'title', // auto-generate slug from title
                }),
                content: fields.markdoc({
                    label: 'Content',
                }),
            },
        }),
    },
});
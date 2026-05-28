import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const documents = await getCollection('documents');
    return rss({
        title: 'Early Modern Workshop',
        description: 'Resources in Jewish History from the Early Modern Workshop',
        site: context.site,
        items: documents.map((doc) => ({
            title: doc.data.title,
            description: doc.data.description,
            link: `/resources/${doc.data.year}/${doc.data.slug}/`,
        })),
    });
}

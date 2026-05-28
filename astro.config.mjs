// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import partytown from '@astrojs/partytown';
import collectionSearch from 'astro-collection-search';

import citePlugin from '@benrbray/remark-cite';
import readingTime from 'astro-reading-time';
import remarkIns from 'remark-ins';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeMeta from 'rehype-meta';
import remarkLint from 'remark-lint';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import netlify from '@astrojs/netlify';



import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://earlymodernworkshop.judaicadhpenn.org',

  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'toc', maxDepth: 3 }],
      remarkGfm,
      citePlugin,
      remarkLint,
      remarkIns,
    ],
    rehypePlugins: [
      rehypeMeta,
      rehypeHeadingIds,
    ],
  },

  build: { format: 'file' },

  integrations: [
    react(),
    mdx(),
    pagefind(),
    sitemap(),
    partytown(),
    collectionSearch(),
    readingTime(),
    markdoc(),
  ],

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },
});
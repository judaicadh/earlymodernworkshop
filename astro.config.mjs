// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import partytown from '@astrojs/partytown';
import collectionSearch from 'astro-collection-search';
import markdoc from '@astrojs/markdoc';
import citePlugin from '@benrbray/remark-cite';
import remarkIns from 'remark-ins';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import remarkAlign from './src/plugins/remark-align.mjs';
import rehypeMeta from 'rehype-meta';
import remarkLint from 'remark-lint';
import netlify from '@astrojs/netlify';


export default defineConfig({
  site: 'https://earlymodernworkshop.judaicadhpenn.org',

  markdown: {
    processor: unified({

      remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }], remarkGfm, citePlugin, remarkLint, remarkIns, remarkAlign],
      rehypePlugins: [
        rehypeMeta,
        rehypeHeadingIds,
      ],
    }),
  },

  build: { format: 'file' },

  integrations: [
    react(),
    markdoc(),

    pagefind(),
    sitemap(),
    partytown(),
    collectionSearch()

  ],

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },
});
// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from 'astro-pagefind'; // pick ONE Pagefind integration
// import itsmatteomanfpagefind from '@itsmatteomanf/astro-pagefind'; // ← remove or comment out

import markdoc from '@astrojs/markdoc';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import partytown from '@astrojs/partytown';
import collectionSearch from 'astro-collection-search';
import citePlugin from '@benrbray/remark-cite';
import readingTime from 'astro-reading-time';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeMeta from 'rehype-meta';
import remarkLint from 'remark-lint';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import netlify from '@astrojs/netlify';


export default defineConfig({
  site: 'https://earlymodernworkshop.judaicadhpenn.org',

  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'toc', maxDepth: 3 }],
      remarkGfm,
      citePlugin,
      remarkLint,
    ],
    rehypePlugins: [
      rehypeMeta,
      rehypeHeadingIds,

    ],
  },

  build: { format: 'file' },

  integrations: [
    react(),
    tailwind(),

    // Content / docs integrations
    markdoc(),
    mdx(),

    // Choose ONE Pagefind integration (using core here)
    pagefind(),
    // itsmatteomanfpagefind(),

    sitemap(),
    partytown(),
    collectionSearch(),
    readingTime(),

    // Starlight can live after mdx(); if Starlight complains, move it before mdx()

  ],

  adapter: netlify(),
});
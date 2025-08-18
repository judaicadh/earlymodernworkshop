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
import starlightScrollToTop from 'starlight-scroll-to-top'

// ⭐ NEW: expressive code — MUST come before mdx()
import expressiveCode from 'astro-expressive-code';

// Optional: Starlight (uses MDX under the hood)
import starlight from '@astrojs/starlight';

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
    starlight({ title: 'Early Modern Workshop',
      customCss: [
        // Relative path to your custom CSS file
        '/src/styles/global.css',
      ],
      // Set English as the default language for this site.
      tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 6 },
      expressiveCode: {


      },
      components: {
        // Override the default `SocialIcons` component.


      },
      // Optional: group sidebar by year from the file path
      plugins: [starlightScrollToTop({showTooltip: true, smoothScroll: true, svgStrokeWidth: 1, })],
    }),
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
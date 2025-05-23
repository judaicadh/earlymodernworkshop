// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from "astro-pagefind";

import markdoc from '@astrojs/markdoc';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

import partytown from '@astrojs/partytown';

import collectionSearch from 'astro-collection-search';
import citePlugin from "@benrbray/remark-cite";
import readingTime from 'astro-reading-time';

import itsmatteomanfpagefind from '@itsmatteomanf/astro-pagefind';
import remarkToc from "remark-toc";

import remarkGfm from "remark-gfm";
import rehypeMeta from "rehype-meta";

import remarkLint from "remark-lint";
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';


// https://astro.build/config
export default defineConfig({

  site: 'https://earlymodernworkshop.judaicadhpenn.org', // The full URL to your site
  markdown: {
    remarkPlugins: [
       [ remarkToc, { heading: 'toc', maxDepth: 3 }],
        remarkGfm,
        citePlugin,
        remarkLint,

    ],
    rehypePlugins: [
        rehypeMeta,
      rehypeHeadingIds,

    ]
  },
  build: {
    format: "file",
  },
  integrations: [
    react(),
    tailwind(),
    pagefind(),
    markdoc(),
    mdx(),
    sitemap(),
    partytown(),
    collectionSearch(),
    readingTime(),
    itsmatteomanfpagefind()
  ]
});
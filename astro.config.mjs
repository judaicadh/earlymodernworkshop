// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pagefind from "astro-pagefind";

import markdoc from '@astrojs/markdoc';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import collectionSearch from 'astro-collection-search';

import readingTime from 'astro-reading-time';

import itsmatteomanfpagefind from '@itsmatteomanf/astro-pagefind';

// https://astro.build/config
export default defineConfig({

  site: 'https://earlymodernworkshop.judaicadhpenn.org', // The full URL to your site

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
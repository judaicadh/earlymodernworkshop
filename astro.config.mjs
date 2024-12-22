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

// https://astro.build/config
export default defineConfig({
  output: 'static', // Ensures static files are generated

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
    collectionSearch()
  ]
});
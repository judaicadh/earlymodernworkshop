[![Netlify Status](https://api.netlify.com/api/v1/badges/95adabf9-c20b-40f5-961b-ed9697a9729a/deploy-status)](https://app.netlify.com/projects/earlymodernworkshop/deploys)

# Early Modern Workshop: Resources in Jewish History

A digital archive built by [Judaica Digital Humanities at Penn](https://judaicadhpenn.org/), collecting primary-source documents and scholarly introductions from the annual Early Modern Workshop conference (2004–present).

**Live site:** https://earlymodernworkshop.judaicadhpenn.org

---

## What it is

Each year of the workshop produces a set of documents — translations, introductions, and primary sources — organized around a theme. This site makes them freely searchable and browsable, with:

- Full-text search (Pagefind)
- Tag browsing
- IIIF viewer embeds for manuscript sources
- Zotero-compatible citation metadata (Highwire Press tags + Schema.org JSON-LD)
- RTL support for Hebrew and Aramaic text
- RSS feed at `/rss.xml`

## Tech stack

| Layer | Tool |
|---|---|
| Framework | [Astro 6](https://astro.build) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Search | [Pagefind](https://pagefind.app) |
| Deployment | [Netlify](https://netlify.com) |
| Content | Markdown files in `src/content/documents/` |
| CMS | [Pages CMS](https://pagescms.org) |

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the build locally
```

Node 18+ required.

## Project structure

```
src/
  components/       # Astro components (Nav, Footer, Search, SmartToc…)
  content/
    documents/      # Markdown document files, organized by year
      2004/
      2005/
      …
    years.json      # Year-level metadata (title, description, thumbnail)
  layouts/
    Layout.astro    # Root layout (head slot, nav, footer)
  pages/
    index.astro
    resources/
      index.astro           # Year grid
      [year]/
        index.astro         # Documents for a year
        [slug].astro        # Individual document page
    tags/
      index.astro           # All tags
      [tag].astro           # Documents for a tag
    rss.xml.js
  styles/
    global.css
  utils/            # slugifyTag, frontmatter helpers, etc.
```

## Documentation

- [USAGE.md](USAGE.md) — adding and editing content
- [CONTRIBUTING.md](CONTRIBUTING.md) — developer setup and code guidelines
- [CHANGELOG.md](CHANGELOG.md) — version history

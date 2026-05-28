# Changelog

All notable changes to the Early Modern Workshop site are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-05-28

### Fixed
- `Layout.astro` referenced `extraHeadings` (a variable only defined on document pages), crashing every other page at build time
- RSS feed (`rss.xml.js`) was broken: referenced a non-existent `blog` collection, used the deprecated `get()` export name, and pointed links at the wrong URL structure — rewritten to use the `documents` collection with correct `/resources/<year>/<slug>/` links
- Heading anchor `#` links were appended twice to every heading on document pages (two separate scripts both ran the same loop); removed the redundant first block
- `<section id="original-language-body">` had malformed HTML — `mt-10">` appeared outside the closing quote of the `class` attribute
- `resource_link` Zod schema was typed as `z.array(z.string())` but the template handled both strings and `{ url, label }` objects; schema updated to accept both
- `<Fragment slot="head">` in the document page (containing the page title, description meta, and Schema.org JSON-LD) was silently ignored because `Layout.astro` had no `<slot name="head">` — wired through `Head.astro` so it now renders correctly
- Stray `</div>` in `[year]/index.astro` produced invalid HTML

### Added
- Highwire Press citation meta tags (`citation_title`, `citation_author`, `citation_publication_date`, `citation_journal_title`) on every document page — enables one-click save from the Zotero browser extension

### Changed
- Footer made more compact: reduced vertical padding, logo scaled from `h-14` to `h-8`, border thinned, layout aligned to the same `max-w-7xl` container as the nav
- Removed broken "Contact Us" footer link (pointed to `#`)

### Removed
- Unused `Header.astro` component (superseded by `Nav.astro`)
- Dead `docs` collection and `docsSchema` import from `content.config.ts` (Starlight schema was imported but no Starlight routes existed)
- `console.log("Generated Paths:", paths)` debug statement from `[year]/index.astro`
- ~50 lines of commented-out "What We Do" and "Recent Resources" sections from `index.astro`

---

## 2026-05-19

### Added
- Underline (`<ins>`) support in Markdown via `remark-ins`

### Changed
- Layout and Hebrew/RTL text rendering improvements

---

## 2026-05-13

### Added
- Slug-based file rename utility (`src/utils/renamebyslug.js`)
- Additional document files

### Changed
- `years.json` updated

---

## 2025-09-17

### Changed
- Description accordion now opens by default on document pages
- Original-language body moved to below the translated text

---

## 2025-08-25

### Added
- Table of contents for documents that use raw HTML headings rather than Markdown headings (non-Markdown TOC support)

---

## 2025-08-18

### Added
- [Keystatic CMS](https://keystatic.com/) integration for browser-based content editing
- Updated Astro config with additional remark/rehype plugins

### Changed
- Package updates across dependencies

---

## 2025-08-14

### Added
- Initial Keystatic CMS configuration (`keystatic.config.ts`)

---

## 2024-12-20 — Initial release

### Added
- Astro project scaffolding
- Document collection with Markdown content files (2004–2024 workshop years)
- Year index and individual document pages
- Pagefind full-text search
- Tag browsing (`/tags/`)
- Sitemap and RSS feed stubs
- Netlify deployment via GitHub Actions (`astro.yml`)
- Tailwind CSS styling with dark mode
- IIIF viewer embed support

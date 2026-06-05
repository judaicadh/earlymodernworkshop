# Usage Guide

This guide covers adding new workshop years and documents to the site. No coding required — everything is plain Markdown with a YAML frontmatter block at the top.

---

## Adding a new workshop year

Two steps: add a row to `years.json`, then add the document files.

### 1. Register the year in `src/content/years.json`

```json
{
  "year": "2026",
  "slug": "2026",
  "title": "Workshop Theme Title Here",
  "description": "A short paragraph describing the year's theme.",
  "thumbnail": "/Year%20images/2026.png",
  "credit": "Image courtesy of Example Institution"
}
```

| Field | Required | Notes |
|---|---|---|
| `year` | ✅ | Four-digit string |
| `slug` | ✅ | Usually the same as `year` |
| `title` | ✅ | The workshop theme |
| `description` | | Shown on the resources index card |
| `thumbnail` | | Path under `public/Year images/` |
| `credit` | | Image credit shown over the hero |

### 2. Add a hero image

Place a `.png` named after the year in `public/Year images/` (e.g. `2026.png`). Recommended size: 1200 × 675 px (16:9).

---

## Adding a document

Create a `.md` file inside `src/content/documents/<year>/`. The filename becomes part of nothing structural — the `slug` field in frontmatter controls the URL.

**URL pattern:** `/resources/<year>/<slug>`

### Frontmatter reference

```yaml
---
title: "The Title of the Document"
slug: the-title-of-the-document
year: "2026"
author: "Scholar Name"
description: |
  One or more paragraphs introducing the document. Markdown is supported here.
  This appears in the collapsible Description panel on the document page.
tags:
  - legal history
  - Amsterdam
  - Sephardic diaspora
language:
  - en
  - he
original_language_body: |
  Optional. Markdown text of the primary source in its original language.
  Renders below the translated/main body with a divider and its own TOC entry.
resource_link:
  - url: "https://example.com/iiif/manifest.json"
    label: "View Manuscript"
  - url: "https://example.com/some-page"
    label: "External Resource"
institution: "University of Pennsylvania"
location: "Amsterdam"
publication_location:
  - Amsterdam
  - Venice
volume: 2026
---

Document body in Markdown goes here.
```

### Field notes

**`resource_link`** accepts two forms:
- A plain string URL (label is auto-derived from the hostname)
- An object with `url` and optional `label`

IIIF manifest URLs (`.json` ending, or containing `/iiif/presentation/`) are automatically wrapped in the Universal Viewer and rendered as an embedded iframe.

Raw `<iframe>` HTML strings are also accepted and rendered directly.

**`original_language_body`** renders as a separate section below the main body, separated by a horizontal rule, with its own "Primary Source in Original Language" TOC entry. Use `.rtl` in your Markdown for Hebrew/Aramaic blocks:

```html
<div class="rtl">
  כאן הטקסט בעברית
</div>
```

**`bepress_id`** is the numeric ID of the document in Fordham's Digital Commons repository (`research.library.fordham.edu/emw/emw{year}/emw{year}/{id}`). When present, a PlumX metrics widget appears in the sidebar (desktop) and below the title metadata (mobile), showing citation, usage, capture, and social activity counts. If omitted, no widget is shown. Example:

```yaml
bepress_id: 15
```

**`tags`** drive the `/tags/` index. Use existing tags where possible to avoid near-duplicates. Tags are slugified for URLs (spaces → hyphens, special characters stripped) but display with their original capitalization.

**`description`** supports full Markdown, including bold, italics, links, and footnotes.

### Filename conventions

- Use lowercase kebab-case: `my-document-title.md`
- Avoid spaces (the placeholder files `slug here 2022.md` are templates — rename them before publishing)

---

## Editing existing documents

Open the relevant `.md` file in `src/content/documents/<year>/` and edit either the frontmatter or the body. The Pages CMS at `/cms` provides a browser-based editor if you prefer not to edit files directly.

Changes pushed to `main` deploy automatically via Netlify (typically under 2 minutes).

---

## Search

Pagefind indexes the site at build time. Search covers document titles, descriptions, body text, and tags. No configuration needed — it rebuilds automatically with every deploy.

---

## RSS feed

The RSS feed at `/rss.xml` lists all documents site-wide. Subscribe with any feed reader or import into a reference manager. Each item links directly to the document page.

---

## Zotero / citation managers

Every document page includes Highwire Press meta tags (`citation_title`, `citation_author`, `citation_publication_date`, `citation_journal_title`) and Schema.org JSON-LD. The Zotero browser extension will detect these automatically and offer a one-click save.

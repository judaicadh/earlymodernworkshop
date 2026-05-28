# Contributing

Thanks for helping maintain the Early Modern Workshop site. This guide covers local setup, the project conventions, and how to submit changes.

---

## Prerequisites

- **Node.js 18+** (20 LTS recommended)
- **npm** (comes with Node)
- A GitHub account with access to the `judaicadh/earlymodernworkshop` repository

---

## Local setup

```bash
git clone https://github.com/judaicadh/earlymodernworkshop.git
cd earlymodernworkshop
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`. Changes to `.astro`, `.ts`, `.md`, and `.css` files hot-reload automatically.

To test a production build locally:

```bash
npm run build
npm run preview   # http://localhost:4321
```

> **Note:** Pagefind search only works in the production preview (`npm run preview`), not the dev server.

---

## Project conventions

### Adding pages

All routes live under `src/pages/`. Astro's file-based router maps the file path to the URL. Dynamic routes (`[year]`, `[slug]`, `[tag]`) use `getStaticPaths()` to enumerate their paths at build time.

### Styling

Tailwind CSS 4 utility classes are used throughout. Avoid writing custom CSS unless something genuinely can't be expressed with utilities. When you do add CSS, put it in `src/styles/global.css` with a comment explaining why.

Dark mode is handled via the `dark:` Tailwind variant. Every new UI element should include dark-mode variants.

### Components

Shared UI lives in `src/components/`. Components are Astro files (`.astro`) unless they need client-side interactivity, in which case React (`.tsx`) is used. Keep components focused — if a component file exceeds ~150 lines, consider splitting it.

### Inline scripts

Astro's `<script is:inline>` tag is used for small client-side scripts. Keep these minimal. If logic grows beyond ~30 lines, extract it into a separate `.ts` file and import it.

### Content schema

The Zod schema for document frontmatter lives in `src/content.config.ts`. If you add a new frontmatter field to any document, add it to the schema first. The build will fail if frontmatter doesn't match the schema, which is intentional.

---

## Making changes

1. **Branch** off `main` for anything beyond a typo fix:
   ```bash
   git checkout -b your-feature-name
   ```

2. **Test** your changes with `npm run build` before pushing. The build catches type errors, missing content schema fields, and broken imports.

3. **Commit** with a short, descriptive message:
   ```
   add reading-time estimate to document pages
   fix: broken IIIF embed when manifest URL contains query params
   content: add 2026 foodways documents
   ```

4. **Push** and open a pull request against `main`.

Netlify will automatically build a deploy preview for every pull request. The preview URL appears in the PR checks.

---

## Deployment

Merging to `main` triggers an automatic Netlify deploy. No manual steps needed. Build status is shown in the README badge.

The build command is `astro build`. Output goes to `dist/`. The `netlify.toml` handles redirects and headers.

---

## Content-only changes

For adding or editing documents without touching code, the Pages CMS is available at `/cms` on the live site. Changes made through the CMS are committed directly to `main` and deploy automatically.

See [USAGE.md](USAGE.md) for the full content authoring guide.

---

## Questions

Open an issue on GitHub or contact the Judaica DH team at [judaicadhpenn.org](https://judaicadhpenn.org/).

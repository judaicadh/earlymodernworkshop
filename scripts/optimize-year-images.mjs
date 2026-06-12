// One-time / re-runnable image optimizer for the year thumbnails & heroes.
//
//   node scripts/optimize-year-images.mjs
//
// Reads the full-resolution PNGs in `public/Year images/` and writes
// width-capped, compressed WebP versions into `public/Year images/opt/`.
// The originals are left untouched (kept for any full-resolution use).
//
// The same optimized file is used for both the resources-index card
// thumbnail (~400px) and the per-year full-bleed hero (sits behind a 50%
// black overlay, so it doesn't need to be pristine). 1600px wide @ q78 is a
// good balance — typically a few hundred KB vs. tens of MB.

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const SRC_DIR = join(process.cwd(), "public", "Year images");
const OUT_DIR = join(SRC_DIR, "opt");
const MAX_WIDTH = 1600;
const QUALITY = 78;

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter(
  (f) => extname(f).toLowerCase() === ".png"
);

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const inPath = join(SRC_DIR, file);
  const outPath = join(OUT_DIR, basename(file, extname(file)) + ".webp");

  const input = sharp(inPath);
  const meta = await input.metadata();

  const info = await input
    .resize({ width: Math.min(MAX_WIDTH, meta.width ?? MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const inSize = (await sharp(inPath).metadata()).size ?? 0;
  totalIn += inSize;
  totalOut += info.size;

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(
    `${file}  ${mb(inSize)}MB -> ${mb(info.size)}MB  (${info.width}x${info.height})`
  );
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\nTotal: ${mb(totalIn)}MB -> ${mb(totalOut)}MB`);

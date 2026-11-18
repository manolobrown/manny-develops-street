#!/usr/bin/env node
// Builds content/photos.generated.json from the files in public/images/work.
//
// For every JPG it records the real pixel dimensions (so layouts never crop or
// shift), a tiny blurred placeholder, and the file's mtime. Editorial fields
// (alt, caption, place, year) live in content/series.tsx — this file is purely
// derived and safe to regenerate. Runs automatically before `next build`.
//
//   node scripts/build-photos.mjs

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "public/images/work");
const OUT = path.join(ROOT, "content/photos.generated.json");
const MAX_EDGE = 2400;

const manifest = {};
const warnings = [];

const seriesDirs = (await fs.readdir(SRC_DIR, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const series of seriesDirs) {
  const files = (await fs.readdir(path.join(SRC_DIR, series)))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  for (const file of files) {
    const abs = path.join(SRC_DIR, series, file);
    const src = `/images/work/${series}/${file}`;
    const [meta, stat, blur] = await Promise.all([
      sharp(abs).rotate().metadata(),
      fs.stat(abs),
      sharp(abs).rotate().resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer(),
    ]);

    if (Math.max(meta.width, meta.height) > MAX_EDGE) {
      warnings.push(`${src} is ${meta.width}×${meta.height}; export at ≤${MAX_EDGE}px on the long edge`);
    }
    if (stat.size > 1.5 * 1024 * 1024) {
      warnings.push(`${src} is ${(stat.size / 1024 / 1024).toFixed(1)} MB; consider a lighter export`);
    }

    manifest[src] = {
      width: meta.width,
      height: meta.height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      modified: stat.mtime.toISOString().slice(0, 10),
    };
  }
}

await fs.writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(`photos: wrote ${Object.keys(manifest).length} entries → ${path.relative(ROOT, OUT)}`);
for (const w of warnings) console.warn(`  ! ${w}`);

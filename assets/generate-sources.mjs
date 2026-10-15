// Generates PNG source files for @capacitor/assets from the SVG artwork.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));

const jobs = [
  ['icon.svg', 'icon-only.png', 1024],
  ['icon-foreground.svg', 'icon-foreground.png', 1024],
  ['icon-background.svg', 'icon-background.png', 1024],
  ['splash.svg', 'splash.png', 2732],
  ['splash.svg', 'splash-dark.png', 2732],
];

for (const [src, dest, size] of jobs) {
  const svg = readFileSync(join(dir, src));
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(dir, dest));
  console.log(`wrote ${dest}`);
}

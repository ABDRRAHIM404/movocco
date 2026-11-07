/**
 * Restore the Movocco brand PNGs from the committed base64 copy.
 *
 * Why this exists: the brand files live in main at
 * `public/fav-icon/Neon Roadmap M Icon.png`,
 * `public/header/logo-dark.png` and `public/header/logo-light.png`.
 * They were copied unchanged into this branch as base64 text
 * (`assets/brand/brand-assets.base64.json`) because the GitHub connector
 * used to push this branch cannot transfer binary files. This script writes
 * the exact original bytes back to `assets/brand/*.png` and verifies them
 * against the recorded SHA-256 hashes.
 *
 * Usage: `node scripts/restore-brand-assets.js` (or `npm run assets:restore`)
 * Run it once after checkout, before building or exporting the app.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const brandDir = path.join(__dirname, '..', 'assets', 'brand');
const manifestPath = path.join(brandDir, 'brand-assets.base64.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let failed = false;
for (const [name, entry] of Object.entries(manifest.files)) {
  const raw = Buffer.from(entry.base64, 'base64');
  const sha256 = crypto.createHash('sha256').update(raw).digest('hex');
  if (sha256 !== entry.sha256) {
    console.error(`SHA-256 mismatch for ${name}: got ${sha256}, expected ${entry.sha256}`);
    failed = true;
    continue;
  }
  if (raw.length !== entry.bytes) {
    console.error(`Size mismatch for ${name}: got ${raw.length}, expected ${entry.bytes}`);
    failed = true;
    continue;
  }
  const outPath = path.join(brandDir, name);
  fs.writeFileSync(outPath, raw);
  console.log(`Restored ${name} (${raw.length} bytes, sha256 ${sha256.slice(0, 16)}…)`);
}

if (failed) {
  console.error('Brand asset restore FAILED — see mismatches above.');
  process.exit(1);
}
console.log('Brand assets restored and verified.');

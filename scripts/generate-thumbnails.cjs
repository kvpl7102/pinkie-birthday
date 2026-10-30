const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IN_DIR = path.resolve('public', 'img', '2026');
const THUMBS_DIR = path.resolve(IN_DIR, 'thumbs');

if (!fs.existsSync(THUMBS_DIR)) {
  fs.mkdirSync(THUMBS_DIR, { recursive: true });
}

async function processAll() {
  const files = fs.readdirSync(IN_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`Generating optimized thumbnails for ${imageFiles.length} images...`);
  let processed = 0;
  let totalSavedBytes = 0;

  for (const file of imageFiles) {
    const srcPath = path.join(IN_DIR, file);
    const parsed = path.parse(file);
    const outPath = path.join(THUMBS_DIR, `${parsed.name}.webp`);

    try {
      const origSize = fs.statSync(srcPath).size;
      await sharp(srcPath)
        .rotate()
        .resize(720, 960, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(outPath);

      const newSize = fs.statSync(outPath).size;
      totalSavedBytes += (origSize - newSize);
      processed++;
    } catch (err) {
      console.warn(`Failed to process ${file}:`, err.message);
    }
  }

  console.log(`Successfully generated ${processed} WebP thumbnails!`);
  console.log(`Saved ${(totalSavedBytes / (1024 * 1024)).toFixed(1)} MB of image payload for grid scrolling!`);
}

processAll().catch(err => {
  console.error('Error generating thumbnails:', err);
  process.exit(1);
});

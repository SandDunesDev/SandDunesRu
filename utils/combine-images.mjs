// combine-images.js
// ES module utility to combine every image from two folders into a single image (horizontal merge)

import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// Determine __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Combine two image buffers into one horizontal image buffer.
 * @param {Buffer} bufferA - Buffer of the first image.
 * @param {Buffer} bufferB - Buffer of the second image.
 * @param {number} width - Total width of final image.
 * @param {number} height - Height of final image.
 * @returns {Promise<Buffer>} - Combined image buffer.
 */
async function mergeBuffers(bufferA, bufferB, width, height) {
  const halfWidth = Math.floor(width / 2);
  return sharp({
    create: { width, height, channels: 3, background: '#ffffff' }
  })
    .composite([
      { input: bufferA, left: 0, top: 0 },
      { input: bufferB, left: halfWidth, top: 0 }
    ])
    .png()
    .toBuffer();
}

/**
 * Generates all combinations of images from two directories.
 * @param {string} leftDir - Path to the folder with left-side images.
 * @param {string} rightDir - Path to the folder with right-side images.
 * @param {string} outputDir - Path to output combined images; will be created if missing.
 * @param {Object} [options] - Optional settings.
 * @param {number} [options.width] - Final image width. Defaults to 515.
 * @param {number} [options.height] - Final image height. Defaults to 792.
 */
export async function combineFolders(leftDir, rightDir, outputDir, options = {}) {
  const width = options.width || 792;
  const height = options.height || 515;
  await fs.mkdir(outputDir, { recursive: true });

  const leftFiles = await fs.readdir(leftDir);
  const rightFiles = await fs.readdir(rightDir);

  for (const leftFile of leftFiles) {
    const leftPath = path.join(leftDir, leftFile);
    const statA = await fs.stat(leftPath);
    if (!statA.isFile()) continue;

    for (const rightFile of rightFiles) {
      const rightPath = path.join(rightDir, rightFile);
      const statB = await fs.stat(rightPath);
      if (!statB.isFile()) continue;

      const bufferA = await sharp(leftPath)
        .resize(Math.floor(width / 2), height, { fit: 'cover' })
        .toBuffer();
      const bufferB = await sharp(rightPath)
        .resize(width - Math.floor(width / 2), height, { fit: 'cover' })
        .toBuffer();

      const combinedBuffer = await mergeBuffers(bufferA, bufferB, width, height);

      const baseA = path.basename(leftFile, path.extname(leftFile)).toLowerCase();
      const baseB = path.basename(rightFile, path.extname(rightFile)).toLowerCase();
      const outName = `${baseA}-${baseB}.png`;
      const outPath = path.join(outputDir, outName);
      await fs.writeFile(outPath, combinedBuffer);
      console.log(`Created ${outName}`);
    }
  }
}

// CLI usage: node combine-images.js <leftFolder> <rightFolder> [outputFolder]
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      const [, , leftFolder, rightFolder, outFolder, userWidth, userHeight] = process.argv;
      if (!leftFolder || !rightFolder) {
        console.error('Usage: node combine-images.js <leftFolder> <rightFolder> [outputFolder]');
        process.exit(1);
      }
      const leftDir = path.isAbsolute(leftFolder)
        ? leftFolder
        : path.join(__dirname, leftFolder);
      const rightDir = path.isAbsolute(rightFolder)
        ? rightFolder
        : path.join(__dirname, rightFolder);
      const outputDir = outFolder
        ? (path.isAbsolute(outFolder) ? outFolder : path.join(__dirname, outFolder))
        : path.join(__dirname, 'combined');

      await combineFolders(leftDir, rightDir, outputDir, { width: Number(userWidth), height: Number(userHeight) });
      console.log('All combinations generated in', outputDir);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}

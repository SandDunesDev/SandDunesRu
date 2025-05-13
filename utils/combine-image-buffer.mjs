// combine-images.js
// Node.js module exporting function to combine two images into a single image horizontally without using attachments

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Combines two images from the static directory into a single image and returns a Buffer.
 * @param {string} img1Name - Filename of the first image (e.g., 'first.png').
 * @param {string} img2Name - Filename of the second image (e.g., 'second.jpg').
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.staticDir] - Path to the static images folder. Defaults to './static'.
 * @param {number} [options.width] - Final image width. Defaults to 515.
 * @param {number} [options.height] - Final image height. Defaults to 792.
 * @returns {Promise<Buffer>} - Resolves with a Buffer of the combined image.
 */
export async function combineImagesBuffer(img1Name, img2Name, options = {}) {
  const staticDir = options.staticDir || path.join(__dirname, '../public');
  const width = options.width || 792;
  const height = options.height || 515;
  const halfWidth = Math.floor(width / 2);

  const img1Path = path.join(staticDir, img1Name);
  const img2Path = path.join(staticDir, img2Name);

  if (!fs.existsSync(img1Path)) throw new Error(`File not found: ${img1Path}`);
  if (!fs.existsSync(img2Path)) throw new Error(`File not found: ${img2Path}`);

  // Resize with "contain" to preserve entire image, letterboxing as needed
  const [bufferA, bufferB] = await Promise.all([
    sharp(img1Path)
      .resize(halfWidth, height, { fit: 'cover', background: { r: 255, g: 255, b: 255 } })
      .toBuffer(),
    sharp(img2Path)
      .resize(width - halfWidth, height, { fit: 'cover', background: { r: 255, g: 255, b: 255 } })
      .toBuffer(),
  ]);

  // Compose final image and output PNG buffer
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
    .composite([
      { input: bufferA, left: 0, top: 0 },
      { input: bufferB, left: halfWidth, top: 0 }
    ])
    .png()
    .toBuffer();
}
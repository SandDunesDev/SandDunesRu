import Jimp from 'jimp';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email, selectedImageA, selectedImageB } = req.body;

  if (!email || !selectedImageA || !selectedImageB) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    // Decode base64 images
    const imageA = await Jimp.read(Buffer.from(selectedImageA.split(',')[1], 'base64'));
    const imageB = await Jimp.read(Buffer.from(selectedImageB.split(',')[1], 'base64'));

    // Resize to same height if needed
    const height = Math.max(imageA.getHeight(), imageB.getHeight());
    imageA.resize(Jimp.AUTO, height);
    imageB.resize(Jimp.AUTO, height);

    // Combine images side-by-side
    const combined = new Jimp(imageA.getWidth() + imageB.getWidth(), height);
    combined.composite(imageA, 0, 0).composite(imageB, imageA.getWidth(), 0);

    // Get base64
    const combinedBase64 = await combined.getBase64Async(Jimp.MIME_JPEG);

    // Email HTML with embedded base64 image
    const htmlBody = `
      <div style="text-align:center;font-family:Inter,sans-serif;">
        <h2>Ваша открытка!</h2>
        <img src="${combinedBase64}" alt="Postcard" style="max-width:100%;" />
      </div>
    `;

    // Send via Unisender
    const response = await fetch('https://api.unisender.com/ru/api/sendEmail?format=json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: '6j14uqghxqgibky6njc6rzngbtgubnj9nmhic65y',
        email: email,
        sender_name: 'Sand Dunes',
        sender_email: 'love@sanddunes.ru',
        subject: 'Ваша открытка',
        body: htmlBody,
      }),
    });

    const result = await response.json();

    if (result.result) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: result.error || 'Unisender failed' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
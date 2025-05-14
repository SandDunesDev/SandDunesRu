// /api/send-card.js
// Vercel API route: handles POST requests to send a formatted email via UniSender

/**
 * Required environment variables:
 *   - UNISENDER_API_KEY: Obtain from your UniSender account > API Keys (https://www.unisender.com/ru/account/api/)
 *   - UNISENDER_SENDER_EMAIL: A verified sender email configured in UniSender
 *   - SENDER_NAME: (optional) Display name for the sender
 *
 * UniSender API parameters used:
 *   - api_key: Your API key
 *   - email: Recipient email address
 *   - sender_name: Sender name displayed
 *   - sender_email: Sender email address
 *   - subject: Email subject line
 *   - body: HTML content of the email
 *   - lang: Language code ('ru' or 'en')
 *
 * For a full list of available parameters (e.g., tags, tracking settings), see:
 * https://www.unisender.com/ru/help/api/sendEmail/
 */
import * as path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, selectedImageA, selectedImageB } = req.body;
  if (!email || !selectedImageA || !selectedImageB) {
    return res.status(400).json({ error: 'Request body must include `email`, `selectedImageA`, and `selectedImageB`.' });
  }

  const apiKey = process.env.UNISENDER_API_KEY;
  const senderEmail = process.env.UNISENDER_SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME || 'No-Reply';

  // Validate essential configuration
  if (!apiKey || !senderEmail) {
    console.error('Missing UNISENDER_API_KEY or UNISENDER_SENDER_EMAIL environment variable.');
    return res.status(500).json({ error: 'Server configuration error: missing API key or sender email.' });
  }

  const img1Name = selectedImageA;
  const img2Name = selectedImageB;
  const subject = 'Ваша открытка от нас';
  const apiUrl = 'https://api.unisender.com/ru/api/sendEmail?format=json';

  // derive filename from input names (lowercased, without extension)
  const baseName1 = path.basename(img1Name, path.extname(img1Name)).toLowerCase();
  const baseName2 = path.basename(img2Name, path.extname(img2Name)).toLowerCase();
  const filename = `${baseName1}-${baseName2}.png`;

  // Construct publicly accessible URL to the image
  const host = process.env.VERCEL_URL || 'sand-dunes-ru.vercel.app';
  const baseUrl = `https://${host}`;
  const imageUrl = `${baseUrl}/images/combined/${filename}`;

  // Build HTML body with two images
  const htmlBody = `
    <div style="font-family: Helvetica, sans-serif; text-align: center;">
        <img style="margin-top: 80px" src="${baseUrl}/images/logo.png"/>
        <h2 style="font-size: 16px; margin-top: 16px">Join the SAND DUNES community</h2>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
          <tr>
            <td align="center">
                <img style="display:block; width:100%; max-width:792px; height:auto; margin:0;" src="${imageUrl}" alt="Card Image" />
            </td>
          </tr>
        </table>
        <a
        href="${imageUrl}"
        target="_blank"
        style="
            display: inline-block;
            padding: 14px 22px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: white !important;
            text-decoration: none;
            background-color: #202020;
            text-transform: uppercase;
            margin-top: 94px;
        ">
            Скачать
        </a>
    </div>
  `;

  // Prepare parameters as form data
  // NOTE: The sendEmail endpoint does NOT accept `list_id`. Remove any `list_id` parameter to avoid invalid_arg errors.
  const params = new URLSearchParams();
  params.append('api_key', apiKey);
  params.append('email', email);
  params.append('sender_name', senderName);
  params.append('sender_email', senderEmail);
  params.append('subject', subject);
  params.append('body', htmlBody);
  params.append('lang', 'ru');
  params.append('list_id', 1);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const result = await response.json();
    if (result.result) {
      return res.status(200).json({ message: 'Email sent successfully', result });
    } else {
      return res.status(500).json({ error: result.error, details: result });
    }
  } catch (error) {
    console.error('UniSender API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
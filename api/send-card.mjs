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
import { stripHash } from '../utils/strip-hash.mjs';

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
  const senderName = process.env.SENDER_NAME || 'Sand Dunes';

  // Validate essential configuration
  if (!apiKey || !senderEmail) {
    console.error('Missing UNISENDER_API_KEY or UNISENDER_SENDER_EMAIL environment variable.');
    return res.status(500).json({ error: 'Server configuration error: missing API key or sender email.' });
  }

  const img1Name = stripHash(selectedImageA);
  const img2Name = stripHash(selectedImageB);
  const subject = 'Ваша открытка от нас';
  const apiUrl = 'https://api.unisender.com/ru/api/sendEmail?format=json';

  // derive filename from input names (lowercased, without extension)
  const baseName1 = path.basename(img1Name, path.extname(img1Name)).toLowerCase();
  const baseName2 = path.basename(img2Name, path.extname(img2Name)).toLowerCase();
  const filename = `${baseName1}-${baseName2}.png`;

  // Construct publicly accessible URL to the image
  const host = process.env.VERCEL_URL || 'sand-dunes-ru.vercel.app';
  const baseUrl = `https://${host}`;
  const imageUrl = `${baseUrl}/images/1x/combined/${filename}`;
  const downloadImageUrl = `${baseUrl}/images/2x/combined/${filename}`;

  // Build HTML body with two images
  const htmlBody = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Рассылка</title>
  <style type="text/css">
    /* Переключение изображений header в зависимости от темы */
    @media (prefers-color-scheme: dark) {
      .header-light { display: none !important; }
      .header-dark  { display: block !important; }
    }
    @media (prefers-color-scheme: light) {
      .header-light { display: block !important; }
      .header-dark  { display: none !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f2;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0;padding:0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
               style="max-width:580px;width:100%;background-color:#ffffff;border:2px solid #000000;margin:10px auto;"
               bgcolor="#ffffff">
          <!-- Header (две версии) -->
          <tr>
            <td style="padding:0;">
              <!-- Светлая тема -->
              <img src="${baseUrl}/images/header-light.png"
                   alt=""
                   width="100%"
                   class="header-light"
                   style="display:block;width:100%;height:auto;max-height:167px;margin:-10px 0;" />
              <!-- Тёмная тема -->
              <img src="https://placecats.com/300/200"
                   alt=""
                   width="100%"
                   class="header-dark"
                   style="display:none;width:100%;height:auto;max-height:167px;margin:-10px 0;" />
            </td>
          </tr>

          <!-- Контент -->
          <tr>
            <td align="center" style="padding:0 64px;">
              <h2 style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:32px;color:#000000;margin:55px 0 0 0;line-height:1.2;">Cеанс fashion–терапии скоро начнётся</h2>

              <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#000000;margin:32px 0 0 0;line-height:1.4;">В мире, где все хотят быть успешными, самое трудное — двигаться со своей скоростью. Все хотят быть уникальными, но самое страшное — стать обычным.</p>
              <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#000000;margin:18px 0 0 0;line-height:1.4;">Песчаные барханы — самое обычное явление пустыни.<br />Но каждый из них — с уникальным узором. Случайная комбинация миллионов песчинок, от которой невозможно оторвать взгляд.</p>
              <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#000000;margin:18px 0 0 0;line-height:1.4;">Прямо как от твоего тела.</p>
              <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#000000;margin:18px 0 0 0;line-height:1.4;">Выдохни. Украшай рутину. Полюби человека в зеркале.</p>
              <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#000000;margin:18px 0 0 0;line-height:1.4;">Летом выйдет первая коллекция Sand Dunes — бренда, вдохновлённого разнообразием и красотой обычных явлений природы. Эта открытка — твоё преимущество в 10% на первый сеанс эмоциональной fashion–терапии.</p>

              <img src="${imageUrl}" alt="Card Image" style="display:block;width:100%;max-width:453px;height:auto;margin:64px auto 0 auto;box-shadow:7px 7px 0 0 #000000;" />

              <a href="${downloadImageUrl}" target="_blank"
                 style="display:inline-block;font-family:'HelveticaNeue-CondensedBold','Helvetica Neue',sans-serif;font-weight:bold;font-size:16px;color:#ffffff;text-decoration:none;background-color:#202020;text-transform:uppercase;padding:14px 22px;margin:24px auto 0 auto;">Скачать</a>
            </td>
          </tr>

          <!-- Нижняя часть -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
                     style="background-color:#000000;margin-top:80px;"
                     bgcolor="#000000">
                <tr>
                  <td align="center" style="padding:0 64px;">
                    <img src="${baseUrl}/images/logo.png" alt="Logo" width="94" style="display:block;width:94px;height:auto;margin:80px auto 0 auto;" />
                    <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:15px;color:#ffffff;margin:30px 0 0 0;line-height:1.4;">Меня зовут Ив. Я креативный директор Sand Dunes. Если хочешь, приходи в телеграм-канал, расскажу тебе историю про создание нашего логотипа — символа принятия и безусловной любви.</p>
                    <a href="${downloadImageUrl}" target="_blank"
                       style="display:block;font-family:'HelveticaNeue-CondensedBold','Helvetica Neue',sans-serif;font-weight:bold;font-size:16px;color:#181818;text-decoration:none;background-color:#FFB2DB;text-transform:uppercase;padding:30px 0;margin:56px auto 0 auto;width:60%;max-width:200px;text-align:center;">Почему щенок?</a>
                    <div style="height:80px;line-height:0;font-size:0;">&nbsp;</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Финальный футер -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
                     style="background-color:#000000;border-top:1px solid #ffffff;"
                     bgcolor="#000000">
                <tr>
                  <td align="center" style="padding:0 64px;">
                    <a href="https://sanddunes.ru" target="_blank"
                       style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:12px;color:#ffffff;text-decoration:none;margin:64px 0 4px 0;display:block;">sanddunes.ru</a>
                    <p style="font-family:'Helvetica Neue',Helvetica,sans-serif;font-size:12px;color:#ffffff;margin:0;">2025</p>
                    <p style="margin:32px 0 32px 0;font-size:0;line-height:0;">
                      <a href="${downloadImageUrl}" target="_blank"
                         style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#8b8b8b;text-decoration:none;padding-right:36px;border-right:1px solid #8b8b8b;">privacy policy</a>
                      <a href="${downloadImageUrl}" target="_blank"
                         style="font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#8b8b8b;text-decoration:none;padding-left:36px;">unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>



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
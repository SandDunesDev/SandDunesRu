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
        <table style="width: 100%">
        <tr>
            <td align="center">
                <table
                    style="width: 580px; font-family: Helvetica Neue, Helvetica, sans-serif; text-align: center; background-color: white; border: 2px solid black; margin: 10px"
                    cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td>
                            <table style="width: 100%; background-color: white; border-bottom: 2px solid black;"
                                cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <img src="${baseUrl}/images/header.png"
                                            style="display: block; width: auto; height: 167px; margin-top: -10px; margin-bottom: -10px;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table style="width: 100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <table style="width: 452px" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td align="center">
                                                    <h2
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 32px; margin-bottom: 0px; margin-top: 55px">
                                                        Cеанс fashion–терапии скоро начнётся
                                                    </h2>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 15px; margin-bottom: 0px; margin-top: 32px">
                                                        В мире, где все хотят быть успешными, самое трудное — двигаться
                                                        со своей
                                                        скоростью. Все хотят быть уникальными, но самое страшное — стать
                                                        обычным.
                                                    </p>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 15px; margin-bottom: 0px; margin-top: 18px">
                                                        Песчаные барханы — самое обычное явление пустыни. </br> Но
                                                        каждый из них — с
                                                        уникальным узором. Случайная комбинация миллионов песчинок, от
                                                        которой
                                                        невозможно оторвать взгляд.
                                                    </p>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 15px; margin-bottom: 0px; margin-top: 18px">
                                                        Прямо как от твоего тела.
                                                    </p>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 15px; margin-bottom: 0px; margin-top: 18px">
                                                        Выдохни. Украшай рутину. Полюби человека в зеркале.
                                                    </p>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: black; font-size: 15px; margin-bottom: 0px; margin-top: 18px">
                                                        Летом выйдет первая коллекция Sand Dunes — бренда,
                                                        вдохновлённого
                                                        разнообразием и красотой обычных явлений природы. Эта открытка —
                                                        твоё
                                                        преимущество в 10% на первый сеанс эмоциональной
                                                        fashion–терапии.
                                                    </p>
                                                    <img style="display:block; width:100%; max-width:453px; height:auto; margin:0; margin-top: 64px; box-shadow: 7px 7px 0 0 black;"
                                                        src="${imageUrl}" alt="Card Image" />
                                                    <a href="${downloadImageUrl}" target="_blank" style="
                display: inline-block;
                padding: 14px 22px;
                font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue', sans-serif;
                font-weight: bold;
                font-size: 16px;
                color: white !important;
                text-decoration: none;
                background-color: #202020;
                text-transform: uppercase;
                margin-top: 24px;
            ">
                                                        Скачать
                                                    </a>
                                                </td>
                                            </tr>
                                    </td>
                                </tr>
                            </table>
                    </tr>
                    <tr>
                        <td>
                            <table style="width: 100%; margin-top: 80px; background-color: black;" cellspacing="0"
                                cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <table style="width: 452px; background-color: black;" cellspacing="0"
                                            cellpadding="0" border="0">
                                            <tr>
                                                <td align="center">
                                                    <img style="display: block; width: 94px; margin-top: 80px;"
                                                        src="${baseUrl}/images/logo.png" />
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: white; font-size: 15px; margin-bottom: 0px; margin-top: 30px">
                                                        Песчаные барханы — самое обычное явление пустыни. </br> Но
                                                        каждый из них — с
                                                        уникальным узором. Случайная комбинация миллионов песчинок, от
                                                        которой
                                                        невозможно оторвать взгляд.
                                                    </p>
                                                    <a href="${downloadImageUrl}" target="_blank" style="
                                                    display: block;
                                                    padding: 14px 22px;
                                                    font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue', sans-serif;
                                                    font-weight: bold;
                                                    font-size: 16px;
                                                    color: #181818 !important;
                                                    text-decoration: none;
                                                    background-color: #FFB2DB;
                                                    text-transform: uppercase;
                                                    margin-top: 56px;
                                                    padding: 30px 0;
                                                    text-align: center;
                                                ">Почему щенок?</a>
                                                    <div style="width: 100%; height: 80px; background-color: black;">&nbsp;</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width: 100%; background-color: black; border-top: 1px solid white;"
                                cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <table style="width: 452px; background-color: black;" cellspacing="0"
                                            cellpadding="0" border="0">
                                            <tr>
                                                <td align="center">
                                                    <div style="width: 100%; height: 80px; background-color: black;">&nbsp;</div>
                                                    <a href="${downloadImageUrl}" target="_blank" style="
                                                    display: block;
                                                    font-family: 'Helvetica Neue', sans-serif;
                                                    font-size: 12px;
                                                    color: white !important;
                                                    text-decoration: none;
                                                    ">
                                                        sanddunes.ru
                                                    </a>
                                                    <p
                                                        style="font-family: 'Helvetica Neue', Helvetica, sans-serif; color: white; font-size: 12px; margin-bottom: 0px; margin-top: 4px">
                                                        2025
                                                    </p>
                                                    <table
                                                        style="margin-top: 80px; margin-bottom: 16px;"
                                                        cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td align="center">
                                                                <a href="${downloadImageUrl}" target="_blank" style="
                                                                display: inline-block;
                                                                font-family: 'Helvetica Neue', sans-serif;
                                                                font-size: 12px;
                                                                color: #8b8b8b !important;
                                                                text-decoration: none;
                                                                border-right: 1px solid #8b8b8b;
                                                                padding-right: 36px;
                                                                ">privacy policy</a>
                                                                <a href="${downloadImageUrl}" target="_blank" style="
                                                                display: inline-block;
                                                                font-family: 'Helvetica Neue', sans-serif;
                                                                font-size: 12px;
                                                                color: #8b8b8b !important;
                                                                text-decoration: none;
                                                                padding-left: 36px
                                                                ">unsubscribe</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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
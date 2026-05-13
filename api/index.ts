import { Resend } from 'resend';

// --- TEMPLATES INLINED TO AVOID VERCEL MODULE RESOLUTION ERRORS ---
const getNotificationTemplate = (name: string, email: string, subject: string, message: string) => {
  const initial = name.charAt(0).toUpperCase();
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Nova Mensagem</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; background-color: #121212; border-radius: 30px; border-collapse: separate; overflow: hidden; border: 1px solid #262626;">
              <tr>
                <td align="center" style="padding: 40px 20px 20px 20px;">
                  <div style="width: 90px; height: 90px; border-radius: 45px; overflow: hidden; margin-bottom: 15px; border: 2px solid #262626; padding: 3px;">
                     <div style="width: 84px; height: 84px; background-color: #3797f0; border-radius: 42px; text-align: center; line-height: 84px; color: #ffffff; font-weight: bold; font-size: 32px;">${initial}</div>
                  </div>
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">${name}</h1>
                  <p style="color: #a8a8a8; font-size: 14px; margin: 5px 0 20px 0;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <div style="background-color: #262626; color: #ffffff; padding: 16px; border-radius: 22px; font-size: 15px; line-height: 1.4;">
                    <div style="font-weight: 800; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 8px; color: #3797f0;">Assunto: ${subject}</div>
                    ${message}
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 20px 30px 20px;">
                  <a href="mailto:${email}" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">Responder</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const getAutoReplyTemplate = (name: string) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Obrigado pelo contacto</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; background-color: #121212; border-radius: 30px; border-collapse: separate; overflow: hidden; border: 1px solid #262626;">
              <tr>
                <td align="center" style="padding: 40px 20px 20px 20px;">
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">Miguel Santos <span style="color: #3797f0;">&#10003;</span></h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <div style="background-color: #3797f0; color: #ffffff; padding: 12px 18px; border-radius: 22px; font-size: 15px; line-height: 1.5;">
                    Olá <strong>${name}</strong>! Recebi a tua mensagem. Responderei o mais breve possível. &#128640;
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// --- HANDLER ---
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Debug route for GET
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'API is Live', 
      env: process.env.RESEND_API ? 'CONFIGURED' : 'MISSING_API_KEY' 
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!process.env.RESEND_API) {
    return res.status(500).json({ success: false, error: 'RESEND_API key is missing' });
  }

  const resend = new Resend(process.env.RESEND_API);

  try {
    const notification = await resend.emails.send({
      from: 'Portfolio <contacto@miguelweb.dev>',
      to: 'migasmps2005@gmail.com',
      subject: subject || `Nova interacção: ${name}`,
      html: getNotificationTemplate(name, email, subject, message),
      replyTo: email,
    });

    if (notification.error) {
      return res.status(400).json({ success: false, error: notification.error.message });
    }

    try {
      await resend.emails.send({
        from: 'Miguel Santos <contacto@miguelweb.dev>',
        to: email,
        subject: 'Confirmação de contacto - Miguel Santos',
        html: getAutoReplyTemplate(name),
      });
    } catch (e) {}

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

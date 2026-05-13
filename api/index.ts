import { Resend } from 'resend';
import { getNotificationTemplate, getAutoReplyTemplate } from './templates';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Options request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!process.env.RESEND_API) {
    return res.status(500).json({ success: false, error: 'RESEND_API key is missing' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Preencha todos os campos obrigatórios.' });
  }

  const resend = new Resend(process.env.RESEND_API);

  try {
    // 1. Enviar notificação para ti
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

    // 2. Enviar Auto-Reply (Opcional - não bloqueia o sucesso se falhar)
    try {
      await resend.emails.send({
        from: 'Miguel Santos <contacto@miguelweb.dev>',
        to: email,
        subject: 'Confirmação de contacto - Miguel Santos',
        html: getAutoReplyTemplate(name),
      });
    } catch (e) {
      console.error('Erro no auto-reply:', e);
    }

    return res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error: any) {
    console.error('Fatal Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Erro interno no servidor.' });
  }
}

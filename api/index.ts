import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { getNotificationTemplate, getAutoReplyTemplate } from './templates';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.RESEND_API ? 'API_KEY_PRESENT' : 'API_KEY_MISSING'
  });
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!process.env.RESEND_API) {
    console.error('RESEND_API is missing in environment variables');
    return res.status(500).json({ success: false, error: 'Configuração do servidor incompleta (API Key).' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Por favor, preencha todos os campos.' });
  }

  const resend = new Resend(process.env.RESEND_API);

  try {
    // 1. Send notification to YOU (the owner)
    const notification = await resend.emails.send({
      from: 'Portfolio <contacto@miguelweb.dev>',
      to: 'migasmps2005@gmail.com',
      subject: subject || `Nova interacção: ${name}`,
      html: getNotificationTemplate(name, email, subject, message),
      replyTo: email,
    });

    if (notification.error) {
      console.error('Erro Resend (Notificação):', notification.error);
      return res.status(400).json({ success: false, error: notification.error.message });
    }

    // 2. Send Auto-Reply to the VISITOR
    const autoReply = await resend.emails.send({
      from: 'Miguel Santos <contacto@miguelweb.dev>',
      to: email,
      subject: 'Confirmação de contacto - Miguel Santos',
      html: getAutoReplyTemplate(name),
    });

    if (autoReply.error) {
      console.error('Erro Resend (Auto-Reply):', autoReply.error);
    }

    res.status(200).json({ success: true, message: 'Processamento de emails concluído!' });
  } catch (error: any) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro interno no servidor.' });
  }
});

// Export the app for Vercel
export default app;

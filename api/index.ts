import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getNotificationTemplate, getAutoReplyTemplate } from '../server/templates.ts';

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API);

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Por favor, preencha todos os campos.' });
  }

  try {
    console.log(`Tentando enviar emails para: ${email} e migasmps2005@gmail.com`);

    // 1. Send notification to YOU (the owner)
    const notification = await resend.emails.send({
      from: 'Portfolio <contacto@miguelweb.dev>',
      to: 'migasmps2005@gmail.com',
      subject: subject || `Nova interacção: ${name}`,
      html: getNotificationTemplate(name, email, subject, message),
      replyTo: email,
    });

    if (notification.error) {
      console.error('Erro na Notificação:', notification.error);
    }

    // 2. Send Auto-Reply to the VISITOR
    const autoReply = await resend.emails.send({
      from: 'Miguel Santos <contacto@miguelweb.dev>',
      to: email,
      subject: 'Confirmação de contacto - Miguel Santos',
      html: getAutoReplyTemplate(name),
    });

    if (autoReply.error) {
      console.error('Erro no Auto-Reply:', autoReply.error);
    }

    res.status(200).json({ success: true, message: 'Processamento de emails concluído!' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, error: 'Ocorreu um erro ao processar o email.' });
  }
});

// Export the app for Vercel
export default app;

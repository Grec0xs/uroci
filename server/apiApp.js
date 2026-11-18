import express from 'express';
import cors from 'cors';
import { gmailService } from './gmail.js';
import { initialMockEmails } from './mockData.js';

export const apiApp = express();

apiApp.use(cors());
apiApp.use(express.json());

// In-memory store
let mockEmails = [...initialMockEmails];

// Status
apiApp.get('/api/status', (req, res) => {
  res.json({
    connected: gmailService.isConnected,
    email: gmailService.email || null,
    mode: gmailService.isConnected ? 'live' : 'demo',
    unreadCount: mockEmails.filter(e => e.unread).length,
  });
});

// Connect to Gmail
apiApp.post('/api/connect', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Debes proporcionar tu correo de Gmail y la contraseña de aplicación de 16 letras' });
  }

  try {
    gmailService.setCredentials(email, password);
    await gmailService.testConnection();
    res.json({
      success: true,
      message: '¡Conectado exitosamente con Gmail!',
      email: gmailService.email,
    });
  } catch (error) {
    res.status(401).json({ error: error.message || 'No se pudo conectar a Gmail' });
  }
});

// Disconnect from Gmail
apiApp.post('/api/disconnect', (req, res) => {
  gmailService.setCredentials('', '');
  gmailService.isConnected = false;
  res.json({ success: true, message: 'Desconectado. Ahora en modo demostración.' });
});

// Get emails
apiApp.get('/api/emails', async (req, res) => {
  const folder = (req.query.folder || 'inbox').toLowerCase();
  const search = (req.query.search || '').toLowerCase().trim();

  try {
    if (gmailService.isConnected) {
      let imapFolder = 'INBOX';
      if (folder === 'starred') imapFolder = '[Gmail]/Starred';
      else if (folder === 'sent') imapFolder = '[Gmail]/Sent Mail';
      else if (folder === 'drafts') imapFolder = '[Gmail]/Drafts';
      else if (folder === 'trash') imapFolder = '[Gmail]/Trash';
      else if (folder === 'spam') imapFolder = '[Gmail]/Spam';

      try {
        const liveEmails = await gmailService.fetchEmails({ folder: imapFolder, limit: 30 });
        if (liveEmails) {
          let filtered = liveEmails;
          if (search) {
            filtered = filtered.filter(e => 
              e.subject.toLowerCase().includes(search) ||
              e.from.name.toLowerCase().includes(search) ||
              e.from.email.toLowerCase().includes(search)
            );
          }
          return res.json({
            mode: 'live',
            email: gmailService.email,
            emails: filtered,
          });
        }
      } catch (liveErr) {
        console.error('Error fetching live emails, fallback to demo:', liveErr.message);
      }
    }

    // Demo mode fallback
    let list = mockEmails;
    if (folder === 'starred') {
      list = list.filter(e => e.starred);
    } else if (folder !== 'all') {
      list = list.filter(e => e.folder === folder);
    }

    if (search) {
      list = list.filter(e => 
        e.subject.toLowerCase().includes(search) ||
        e.from.name.toLowerCase().includes(search) ||
        e.from.email.toLowerCase().includes(search) ||
        e.snippet.toLowerCase().includes(search)
      );
    }

    res.json({
      mode: 'demo',
      email: 'demo.usuario@gmail.com',
      emails: list,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single email details
apiApp.get('/api/emails/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (gmailService.isConnected) {
      const email = await gmailService.getEmailContent(id);
      if (email) {
        return res.json(email);
      }
    }

    const email = mockEmails.find(e => e.id === id);
    if (!email) {
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    // Auto mark as read in mock
    email.unread = false;
    res.json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Star/Unstar
apiApp.post('/api/emails/:id/star', (req, res) => {
  const { id } = req.params;
  const email = mockEmails.find(e => e.id === id);
  if (email) {
    email.starred = !email.starred;
    return res.json({ success: true, starred: email.starred });
  }
  res.json({ success: true, starred: true });
});

// Mark as read/unread
apiApp.post('/api/emails/:id/read', (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  const email = mockEmails.find(e => e.id === id);
  if (email) {
    email.unread = read === undefined ? !email.unread : !read;
    return res.json({ success: true, unread: email.unread });
  }
  res.json({ success: true });
});

// Delete email
apiApp.delete('/api/emails/:id', (req, res) => {
  const { id } = req.params;
  const index = mockEmails.findIndex(e => e.id === id);
  if (index !== -1) {
    mockEmails.splice(index, 1);
  }
  res.json({ success: true });
});

// Send email
apiApp.post('/api/send', async (req, res) => {
  const { to, subject, body } = req.body;
  if (!to || !subject) {
    return res.status(400).json({ error: 'Destinatario y asunto requeridos' });
  }

  try {
    if (gmailService.isConnected) {
      await gmailService.sendEmail({
        to,
        subject,
        html: `<div style="font-family: sans-serif; line-height: 1.6;">${body.replace(/\n/g, '<br/>')}</div>`,
        text: body,
      });
      return res.json({ success: true, message: 'Correo enviado vía Gmail con éxito' });
    }

    const newSentEmail = {
      id: `sent-${Date.now()}`,
      from: { name: 'Tú', email: 'demo.usuario@gmail.com' },
      to: [{ name: to, email: to }],
      subject,
      date: new Date().toISOString(),
      unread: false,
      starred: false,
      folder: 'sent',
      category: 'primary',
      snippet: body.substring(0, 100),
      text: body,
      html: `<div style="font-family: sans-serif;">${body.replace(/\n/g, '<br/>')}</div>`,
    };

    mockEmails.unshift(newSentEmail);
    res.json({ success: true, message: 'Correo enviado (Modo Demostración)', email: newSentEmail });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al enviar el correo' });
  }
});

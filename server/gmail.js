import { ImapFlow } from 'imapflow';
import nodemailer from 'nodemailer';
import { simpleParser } from 'mailparser';

class GmailService {
  constructor() {
    this.email = process.env.GMAIL_USER || '';
    this.password = process.env.GMAIL_APP_PASSWORD || '';
    this.isConnected = false;
    this.client = null;
    this.transporter = null;
  }

  setCredentials(email, password) {
    this.email = email.trim();
    this.password = password.trim().replace(/\s+/g, ''); // Google app passwords usually have spaces like "abcd efgh ijkl mnop"
    this.isConnected = false;
  }

  async testConnection() {
    if (!this.email || !this.password) {
      throw new Error('Email y contraseña de aplicación requeridos');
    }

    const testClient = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
        user: this.email,
        pass: this.password,
      },
      logger: false,
    });

    try {
      await testClient.connect();
      await testClient.logout();
      this.isConnected = true;
      this.setupTransporter();
      return { success: true, email: this.email };
    } catch (error) {
      this.isConnected = false;
      throw new Error(`Error de autenticación con Gmail: ${error.message || error}`);
    }
  }

  setupTransporter() {
    if (this.email && this.password) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.email,
          pass: this.password,
        },
      });
    }
  }

  async getImapClient() {
    const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
        user: this.email,
        pass: this.password,
      },
      logger: false,
    });
    await client.connect();
    return client;
  }

  async fetchEmails({ folder = 'INBOX', limit = 25 } = {}) {
    if (!this.isConnected || !this.email || !this.password) {
      return null; // Signals controller to fallback to demo or indicate not connected
    }

    const client = await this.getImapClient();
    try {
      const lock = await client.getMailboxLock(folder);
      const emails = [];

      try {
        const mailbox = client.mailbox;
        if (!mailbox || mailbox.exists === 0) {
          return [];
        }

        const total = mailbox.exists;
        const startSeq = Math.max(1, total - limit + 1);
        const seqRange = `${startSeq}:${total}`;

        for await (const message of client.fetch(seqRange, {
          envelope: true,
          flags: true,
          bodyStructure: true,
          source: false,
        })) {
          emails.push({
            id: message.uid.toString(),
            seq: message.seq,
            from: {
              name: message.envelope.from?.[0]?.name || message.envelope.from?.[0]?.address || 'Desconocido',
              email: message.envelope.from?.[0]?.address || '',
            },
            to: message.envelope.to?.map(t => ({ name: t.name, email: t.address })) || [],
            subject: message.envelope.subject || '(Sin Asunto)',
            date: message.envelope.date ? new Date(message.envelope.date).toISOString() : new Date().toISOString(),
            unread: !message.flags.has('\\Seen'),
            starred: message.flags.has('\\Flagged'),
            hasAttachment: !!message.bodyStructure?.childNodes?.some(part => part.disposition === 'attachment'),
            snippet: message.envelope.subject || 'Mensaje de Gmail',
            folder: folder.toLowerCase(),
          });
        }
      } finally {
        lock.release();
      }

      await client.logout();
      // Return sorted newest first
      return emails.reverse();
    } catch (err) {
      try { await client.logout(); } catch (_) {}
      console.error('Error fetching emails from Gmail:', err);
      throw err;
    }
  }

  async getEmailContent(uid, folder = 'INBOX') {
    if (!this.isConnected || !this.email || !this.password) {
      return null;
    }

    const client = await this.getImapClient();
    try {
      const lock = await client.getMailboxLock(folder);
      let parsed = null;

      try {
        const message = await client.fetchOne(uid.toString(), { source: true, uid: true });
        if (message && message.source) {
          parsed = await simpleParser(message.source);
        }
      } finally {
        lock.release();
      }

      await client.logout();

      if (!parsed) return null;

      return {
        id: uid.toString(),
        from: {
          name: parsed.from?.value?.[0]?.name || parsed.from?.value?.[0]?.address || 'Desconocido',
          email: parsed.from?.value?.[0]?.address || '',
        },
        to: parsed.to?.value?.map(t => ({ name: t.name, email: t.address })) || [],
        subject: parsed.subject || '(Sin Asunto)',
        date: parsed.date ? new Date(parsed.date).toISOString() : new Date().toISOString(),
        text: parsed.text || '',
        html: parsed.html || (parsed.textAsHtml || parsed.text || ''),
        attachments: parsed.attachments?.map(a => ({
          filename: a.filename || 'adjunto',
          contentType: a.contentType,
          size: a.size,
        })) || [],
      };
    } catch (err) {
      try { await client.logout(); } catch (_) {}
      throw err;
    }
  }

  async sendEmail({ to, subject, html, text }) {
    if (!this.isConnected || !this.transporter) {
      throw new Error('Servicio de correo no conectado a Gmail');
    }

    const mailOptions = {
      from: `"${this.email.split('@')[0]}" <${this.email}>`,
      to,
      subject,
      text,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const gmailService = new GmailService();

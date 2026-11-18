import dotenv from 'dotenv';
import { apiApp } from './apiApp.js';
import { gmailService } from './gmail.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

// Auto-connect if environment variables exist
if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
  gmailService.setCredentials(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);
  gmailService.testConnection().catch(err => {
    console.log('Aviso: Variables de entorno de Gmail no válidas o no conectadas todavía:', err.message);
  });
}

apiApp.listen(PORT, () => {
  console.log(`🚀 Servidor de correo Uroci escuchando en http://localhost:${PORT}`);
});

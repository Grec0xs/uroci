export const initialMockEmails = [
  {
    id: "demo-1",
    from: {
      name: "Google Security Alert",
      email: "no-reply@accounts.google.com"
    },
    to: [{ name: "Tú", email: "usuario@gmail.com" }],
    subject: "Alerta de seguridad crítica: Nuevo inicio de sesión detectado",
    date: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    unread: true,
    starred: true,
    folder: "inbox",
    category: "primary",
    hasAttachment: false,
    snippet: "Detectamos un nuevo inicio de sesión en tu cuenta de Google desde Mac OS X en Ciudad de México...",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid rgba(120, 120, 140, 0.2); border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-size: 20px; margin-top: 10px;">Nuevo inicio de sesión en Mac OS X</h2>
        </div>
        <p style="font-size: 14px; line-height: 1.6;">
          Hola, detectamos que tu cuenta de Google ha iniciado sesión recientemente desde un nuevo dispositivo o navegador:
        </p>
        <div style="padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed; background: rgba(124, 58, 237, 0.08);">
          <p style="margin: 4px 0; font-size: 13px;"><strong>Dispositivo:</strong> Mac OS X (Apple Silicon)</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Ubicación:</strong> México</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Hora:</strong> Justo ahora</p>
        </div>
        <p style="font-size: 12px; opacity: 0.8;">
          Si fuiste tú, no tienes que realizar ninguna acción. Si no reconoces esta actividad, revisa tus dispositivos vinculados.
        </p>
      </div>
    `,
    text: "Detectamos un nuevo inicio de sesión en tu cuenta de Google desde Mac OS X."
  },
  {
    id: "demo-2",
    from: {
      name: "Yahoo News Digest",
      email: "news@mail.yahoo.com"
    },
    to: [{ name: "Tú", email: "usuario@gmail.com" }],
    subject: "Lo más destacado de hoy: Nuevos avances en Inteligencia Artificial y Diseño Web",
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    unread: true,
    starred: false,
    folder: "inbox",
    category: "primary",
    hasAttachment: true,
    snippet: "Descubre las últimas tendencias en interfaces minimalistas, diseño inspirado en los clásicos de la web...",
    html: `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; line-height: 1.6;">
        <div style="background: linear-gradient(135deg, #5b13df, #8e3af6); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: white !important;">Yahoo! Style Briefing</h1>
          <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 13px; color: white !important;">Tu resumen visual y tecnológico del día</p>
        </div>
        <h3 style="font-size: 17px;">El renacimiento del diseño estético en clientes de correo</h3>
        <p style="font-size: 14px;">
          Los usuarios buscan interfaces fluidas, limpias y rápidas. La nostalgia combinada con micro-interacciones modernas crea experiencias irresistibles de uso diario.
        </p>
        <div style="display: flex; gap: 12px; margin: 20px 0;">
          <div style="background: rgba(124, 58, 237, 0.15); padding: 10px 16px; border-radius: 8px; color: #8b5cf6; font-weight: 600; font-size: 13px;">
            ✨ Animaciones fluidas
          </div>
          <div style="background: rgba(124, 58, 237, 0.15); padding: 10px 16px; border-radius: 8px; color: #8b5cf6; font-weight: 600; font-size: 13px;">
            ⚡ Conexión instantánea a Gmail
          </div>
        </div>
      </div>
    `,
    attachments: [
      { filename: "resumen-tendencias-2026.pdf", contentType: "application/pdf", size: 2450000 }
    ],
    text: "Lo más destacado de hoy: Nuevos avances en Inteligencia Artificial y Diseño Web."
  },
  {
    id: "demo-3",
    from: {
      name: "GitHub Notifications",
      email: "notifications@github.com"
    },
    to: [{ name: "Tú", email: "usuario@gmail.com" }],
    subject: "[uroci/mail-client] Nuevo Pull Request: Interfaz inspirada en Yahoo Mail con animaciones",
    date: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    unread: false,
    starred: true,
    folder: "inbox",
    category: "updates",
    hasAttachment: false,
    snippet: "@gera ha abierto un nuevo PR: 'Implementación de UI moderna con temas púrpura Yahoo Mail y sincronización Gmail'...",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 10px;">
        <h3 style="margin-top: 0; font-size: 17px;">🚀 Pull Request #1: Interfaz Moderna Yahoo Mail</h3>
        <p style="font-size: 13.5px; line-height: 1.6;"><strong>@gera</strong> desea fusionar 12 commits en <code>main</code> desde <code>feature/yahoo-client-ui</code></p>
        <ul style="line-height: 1.8; font-size: 13.5px;">
          <li>Componente de bandeja de entrada con animaciones suaves (Framer Motion).</li>
          <li>Ventana modal flotante para redactar correo.</li>
          <li>Conexión IMAP y SMTP lista para cuentas <code>@gmail.com</code>.</li>
        </ul>
      </div>
    `,
    text: "Nuevo Pull Request en uroci/mail-client: Interfaz moderna inspirada en Yahoo Mail."
  },
  {
    id: "demo-4",
    from: {
      name: "Spotify Playlist Updates",
      email: "no-reply@spotify.com"
    },
    to: [{ name: "Tú", email: "usuario@gmail.com" }],
    subject: "Tu radar de novedades semanal ya está listo 🎧",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: false,
    starred: false,
    folder: "inbox",
    category: "promotions",
    hasAttachment: false,
    snippet: "Descubre nuevos lanzamientos de tus artistas favoritos seleccionados exclusivamente para ti...",
    html: `
      <div style="background: #121212; color: #ffffff; padding: 22px; border-radius: 12px; font-family: sans-serif;">
        <h2 style="color: #1ed760 !important; margin-top: 0; font-size: 18px;">Tu radar de novedades semanal</h2>
        <p style="color: #b3b3b3 !important; font-size: 13px;">Hemos añadido 30 canciones nuevas basadas en tu historial de escucha.</p>
        <button style="background: #1ed760; color: #000; border: none; padding: 10px 20px; border-radius: 99px; font-weight: bold; cursor: pointer; margin-top: 10px; font-size: 12px;">
          Escuchar ahora
        </button>
      </div>
    `,
    text: "Tu radar de novedades semanal ya está listo en Spotify."
  },
  {
    id: "demo-5",
    from: {
      name: "Amazon Compras",
      email: "auto-confirm@amazon.com"
    },
    to: [{ name: "Tú", email: "usuario@gmail.com" }],
    subject: "Confirmación de pedido #702-8394120-192849",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    unread: false,
    starred: false,
    folder: "archive",
    category: "orders",
    hasAttachment: true,
    snippet: "Gracias por tu compra. Tu paquete llegará el próximo jueves antes de las 8:00 PM...",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 15px;">
        <h3 style="font-size: 17px;">¡Gracias por tu pedido!</h3>
        <p style="font-size: 13px;">Tu paquete está en camino y llegará muy pronto.</p>
        <p style="font-size: 13px;"><strong>Total pagado:</strong> $499.00 MXN</p>
      </div>
    `,
    attachments: [
      { filename: "Factura_Electronica.pdf", contentType: "application/pdf", size: 120000 }
    ],
    text: "Confirmación de pedido Amazon #702-8394120-192849."
  }
];

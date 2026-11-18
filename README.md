# ✉️ Uroci Mail

Cliente de correo electrónico web moderno, simple y elegante inspirado en la clásica y nostálgica estética de **Yahoo! Mail**, con animaciones fluidas y conexión a cuentas de `@gmail.com`.

---

## ✨ Características Principales

- **Estética Inspirada en Yahoo! Mail**:
  - Paleta de color púrpura emblemática con degradados refinados (`#6001d2`).
  - Barra superior con búsqueda global instantánea, selector de tema claro/oscuro y estado en tiempo real.
  - Barra lateral con el clásico botón **Redactar**, carpetas organizadas (*Bandeja de entrada*, *Destacados*, *Enviados*, *Borradores*, *Archivo*, *Spam*, *Papelera*) y accesos directos por etiquetas.
  - **Ventana de redacción flotante**: Se abre en la esquina inferior derecha como en Yahoo Mail, con opciones para minimizar a una barra discreta, maximizar a pantalla completa o descartar, además de barra de herramientas (negrita, cursiva, emojis, adjuntos).
- **Animaciones y Micro-interacciones**:
  - Transiciones suaves construidas con **Framer Motion**.
  - Acciones rápidas al pasar el cursor sobre cada correo (destacar con destello dorado, marcar leído/no leído, eliminar).
  - Animación suave de actualización y notificaciones flotantes (Toasts).
- **Conexión Real con @gmail.com**:
  - Sincronización IMAP para recibir y leer correos reales.
  - Envío mediante SMTP seguro de Gmail.
  - **Modo Demostración Interactivo**: Si no se configuran credenciales, incluye correos simulados interactivos para poder probar toda la interfaz de inmediato.

---

## 🚀 Inicio Rápido

### 1. Iniciar el proyecto

```bash
# Inicia tanto el backend Express como el cliente Vite
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

---

## 🔐 Conectar una Cuenta de Gmail (@gmail.com)

Para que tus correos reales de Google lleguen a este cliente, Google requiere una **Contraseña de Aplicación** (código seguro de 16 caracteres):

1. Ve a tu cuenta de Google: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) *(asegúrate de tener activada la Verificación en 2 pasos)*.
2. Crea una nueva contraseña de aplicación escribiendo de nombre `Uroci Mail`.
3. Google te dará una contraseña de 16 letras (por ejemplo: `abcd efgh ijkl mnop`).
4. Haz clic en el botón **"Conectar @gmail.com"** en la parte superior derecha de Uroci Mail e ingresa tu correo y esa contraseña de 16 letras.

*También puedes configurarlo en un archivo `.env`:*
```env
GMAIL_USER=tu-cuenta@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
PORT=3001
```

---

## 🛠️ Tecnologías

- **React 19** + **Vite 6**
- **Tailwind CSS 3**
- **Framer Motion** (Animaciones fluidas)
- **Lucide Icons**
- **Express 4** (Node.js)
- **ImapFlow** & **MailParser** (Recepción de correos IMAP de Gmail)
- **Nodemailer** (Envío de correos SMTP de Gmail)

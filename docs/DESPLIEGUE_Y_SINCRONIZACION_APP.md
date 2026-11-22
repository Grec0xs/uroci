# 🌐 Guía de Despliegue en Internet y Sincronización con la App de iPhone

Esta guía explica en detalle cómo subir **Uroci Mail** a internet (con su servidor de correo activo) y cómo mantener la app de iPhone instalada sin romper nada y con sincronización automática.

---

## 🧭 1. ¿Cómo Funciona la Arquitectura Web + iPhone?

Para entender cómo funciona todo junto sin confusiones:

```text
┌────────────────────────────────────────────────────────┐
│               1. SERVIDOR EN LA NUBE                  │
│       (Render.com / Railway / Servidor Propio)        │
│                                                        │
│   • Interfaz Web (React + Vite)                       │
│   • API Backend (Express + IMAP / SMTP)                │
│   • Conexión segura con los servidores de Google:      │
│     - IMAP (imap.gmail.com:993)  --> Recibir correos  │
│     - SMTP (smtp.gmail.com:465)  --> Enviar correos   │
│                                                        │
│   URL Pública segura: https://tu-urocimail.onrender.com │
└───────────────────────┬────────────────────────────────┘
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
┌───────────────────────────┐     ┌───────────────────────────┐
│     NAVEGADOR WEB         │     │     APP NATIVA IPHONE     │
│   (Chrome, Safari, PC)    │     │       (Xcode / iOS)       │
│                           │     │                           │
│ Abre la URL pública       │     │ Corre en tu iPhone con:   │
│ en cualquier computadora  │     │ • Gestos nativos de iOS   │
│ o tablet en el mundo.     │     │ • Barra inferior táctil   │
│                           │     │ • Safe Area (Isla Dinámica)│
└───────────────────────────┘     └───────────────────────────┘
```

---

## 🚀 2. Cómo Subir la Web a Internet Gratis (Paso a Paso en Render)

El servicio recomendado es **[Render.com](https://render.com)** porque permite ejecutar el backend de Node.js (necesario para Gmail) junto con el frontend de React, con HTTPS y dominio gratis.

### Pasos:
1. **Sube tus cambios a tu repositorio de GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete mobile UI and iOS Xcode project"
   git push origin main
   ```
2. Entra a **[Render.com](https://render.com)** y crea una cuenta gratuita con tu cuenta de GitHub.
3. En el panel de Render, pulsa **New + > Web Service**.
4. Conecta tu repositorio de GitHub `uroci`.
5. Configura los siguientes campos:
   * **Name:** `uroci-mail` (o el nombre que elijas).
   * **Language / Environment:** `Node`.
   * **Branch:** `main`.
   * **Build Command:**
     ```bash
     npm install && npm run build
     ```
   * **Start Command:**
     ```bash
     npm run server
     ```
   * **Plan:** `Free`.
6. *(Opcional)* En la sección **Environment Variables**, puedes agregar tus credenciales si quieres que se conecte solo:
   * `GMAIL_USER` = `tu-correo@gmail.com`
   * `GMAIL_APP_PASSWORD` = `xxxx xxxx xxxx xxxx` (Contraseña de aplicación de 16 letras de Google).
   *(Si no las agregas aquí, puedes conectarlas visualmente desde la propia página en cualquier momento).*
7. Haz clic en **Deploy Web Service**.
8. Render compilará tu aplicación y en 2 minutos te dará una dirección pública con candado verde SSL, por ejemplo:
   👉 **`https://uroci-mail.onrender.com`**

---

## 📱 3. Cómo Conectar la App de tu iPhone a la Web sin Romper Nada

Tienes **dos formas** de usar la app en tu iPhone. Ambas están integradas en el código que preparamos:

### Opción A: Sincronización en Vivo Instantánea (Recomendada)
**La gran ventaja:** Cualquier cambio que hagas en GitHub y se suba a Render se reflejará en tu iPhone **al instante**, sin tener que volver a abrir Xcode ni conectar el cable USB.

1. Abre **Uroci Mail** en tu iPhone.
2. **Agita tu iPhone** físicamente (*shake gesture*).
3. Se abrirá la pantalla de **Ajustes de Servidor**.
4. Activa la opción **"Conectar a Servidor / Wi-Fi"**.
5. Escribe la URL de tu web en Render:
   `https://tu-urocimail.onrender.com`
6. Toca **Guardar**.
7. ¡Listo! La app en tu iPhone ahora cargará siempre la versión en vivo de tu web, permitiéndote recibir y enviar correos de Gmail reales desde cualquier lugar del mundo (con datos móviles o Wi-Fi).

---

### Opción B: Modo Empaquetado Local (100% Offline)
Si prefieres que la app funcione siempre desde los archivos locales dentro del teléfono (sin depender de que el servidor web esté encendido):

1. Cada vez que hagas un cambio visual en el código de tu Mac, corre en la terminal:
   ```bash
   npm run ios:sync
   ```
2. Este comando ejecuta `npm run build` y copia automáticamente los archivos compilados dentro de la carpeta `ios-app/UrociMail/www/`.
3. Abre Xcode (`npm run ios:open`) y presiona el botón **Play (▶️ Run)** para reinstalar la app actualizada en tu teléfono.

---

## 🛡️ 4. ¿Cómo Asegurarse de que Nada se Rompa?

* **Rutas Relativas (`base: './'`):**
  Ya configuramos Vite para que todas las rutas de archivos CSS y JS sean relativas (`./assets/...`). Esto asegura que funcionen tanto en internet (`https://...`) como dentro del esquema local de iOS (`app://localhost/`).
* **Manejo de Errores de Red:**
  Si el iPhone pierde conexión a internet o el servidor está en reposo, Uroci Mail no se congela: muestra un aviso amigable y conserva los correos en pantalla.
* **Seguridad de Google:**
  Tu contraseña normal de Google **nunca** se almacena. Solo se utiliza la Contraseña de Aplicación de 16 caracteres, la cual puedes revocar en cualquier segundo desde tu cuenta de Google si quisieras.
* **Actualizaciones Futuras:**
  Si editas la interfaz en tu computadora, la interfaz de escritorio (`>= 768px`) y la interfaz móvil (`< 768px`) comparten exactamente la misma lógica y estado, por lo que nunca tendrás discrepancias entre ambas.

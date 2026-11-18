# 🎨 Guía de Personalización y Estilos: Uroci Mail

Esta guía está diseñada para que puedas modificar fácilmente el aspecto visual, colores, animaciones, tipografías y contenido de **Uroci Mail** cuando quieras en el futuro.

---

## 🧭 Mapa de Archivos Visuales

Toda la interfaz está construida con **React** y estilizada con **Tailwind CSS**. Cada componente tiene una función clara y aislada:

```text
uroci/
├── src/
│   ├── index.css                   # Variables globales, tipografía, degradados y modo oscuro
│   ├── App.jsx                     # Layout principal (une Navbar, Sidebar, Lista y Lector)
│   └── components/
│       ├── Navbar.jsx              # Barra superior: logo, título, buscador y avatar
│       ├── ThemeSwitcher.jsx       # Interruptor desplegable estilo AirPods (Claro/Auto/Oscuro)
│       ├── Sidebar.jsx             # Barra lateral: botón Redactar, carpetas y estado
│       ├── EmailList.jsx           # Bandeja de entrada, pestañas y animación de colapso
│       ├── EmailReader.jsx         # Visor de correos, cuerpo HTML y respuesta rápida
│       ├── ComposeModal.jsx        # Ventana flotante estilo macOS/Yahoo para redactar
│       └── GmailConnectModal.jsx   # Modal de conexión a @gmail.com
├── server/
│   └── mockData.js                 # Correos y datos de prueba que aparecen en el modo demo
└── tailwind.config.js              # Paleta de colores primarios y sombras personalizadas
```

---

## 1. 🌈 Cómo cambiar los Colores y Degradados

### A) El degradado emblemático (Yahoo / Apple Hybrid)
El degradado morado que usan el botón **Redactar**, el logotipo y los acentos se define en dos archivos:

1. **[`src/index.css`](../src/index.css):**
   Busca la clase `.yahoo-apple-gradient`:
   ```css
   .yahoo-apple-gradient {
     background: linear-gradient(135deg, #5b13df 0%, #7822f3 60%, #8e3af6 100%);
   }
   ```
   * **¿Quieres un azul estilo macOS/iOS?** Cámbialo por:
     `linear-gradient(135deg, #007aff 0%, #0056b3 100%)`
   * **¿Quieres un verde esmeralda o menta?**
     `linear-gradient(135deg, #10b981 0%, #059669 100%)`
   * **¿Quieres un rojo o magenta vibrante?**
     `linear-gradient(135deg, #ec4899 0%, #be185d 100%)`

2. **[`tailwind.config.js`](../tailwind.config.js):**
   Aquí se definen los tonos de la escala `yahoo`:
   ```javascript
   colors: {
     yahoo: {
       600: '#6001d2', // Color principal de selección y botones
     }
   }
   ```

---

## 2. 🔤 Cómo cambiar la Tipografía

La tipografía predeterminada está configurada en [`src/index.css`](../src/index.css):
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Plus Jakarta Sans", sans-serif;
}
```
* Si deseas usar una fuente de Google Fonts (por ejemplo *Inter*, *Outfit* o *Geist*):
  1. Abre [`index.html`](../index.html) y agrega el enlace `<link href="https://fonts.googleapis.com/..." rel="stylesheet">`.
  2. En `src/index.css`, colócala al inicio del `font-family`: `font-family: 'Inter', -apple-system, ...`.

---

## 3. 📂 Agregar o Cambiar Carpetas en la Barra Lateral

Abre [`src/components/Sidebar.jsx`](../src/components/Sidebar.jsx):
Busca la lista `folders`:
```javascript
const folders = [
  { id: 'inbox', label: 'Bandeja de entrada', icon: Inbox, count: unreadCount },
  { id: 'starred', label: 'Destacados', icon: Star },
  { id: 'sent', label: 'Enviados', icon: Send },
  { id: 'drafts', label: 'Borradores', icon: FileText },
  { id: 'archive', label: 'Archivo', icon: Archive },
  { id: 'spam', label: 'Spam', icon: AlertOctagon },
  { id: 'trash', label: 'Papelera', icon: Trash2 },
];
```
* **Para renombrar:** Modifica el texto en `label` (ejemplo: `'Favoritos'` en vez de `'Destacados'`).
* **Para agregar un nuevo buzón:** Añade una línea con el icono de Lucide que desees (ej: `{ id: 'receipts', label: 'Recibos', icon: Receipt }`).

---

## 4. 🎬 Ajustar la Animación de Colapso de Correos

Abre [`src/components/EmailList.jsx`](../src/components/EmailList.jsx):
Busca la propiedad `transition` del elemento `motion.div`:
```javascript
transition={{ 
  opacity: { duration: 0.16 },
  height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  layout: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
}}
```
* **Si quieres que colapse más rápido:** Cambia `duration: 0.22` a `duration: 0.15`.
* **Si quieres que sea más dramática y lenta:** Sube a `duration: 0.35`.
* `ease: [0.16, 1, 0.3, 1]` es la curva de desaceleración estándar de Apple (inicia rápido y frena con suavidad).

---

## 5. 🎧 Modificar el Interruptor estilo AirPods

Abre [`src/components/ThemeSwitcher.jsx`](../src/components/ThemeSwitcher.jsx):
* La física de resorte (*spring physics*) se ajusta en:
  ```javascript
  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
  ```
  * `stiffness` (rigidez): valores más altos (ej. 600) hacen el rebote más rápido; valores más bajos (ej. 300) más suave.
  * `damping` (amortiguación): controla cuánto rebota al detenerse.
* Si deseas cambiar el tiempo que tarda en cerrarse tras elegir una opción, ajusta el `setTimeout(() => setIsOpen(false), 220);`.

---

## 6. 📧 Editar los Correos de Demostración

Abre [`server/mockData.js`](../server/mockData.js):
Cada correo es un objeto simple:
```javascript
{
  id: "demo-1",
  from: { name: "Google Security Alert", email: "no-reply@accounts.google.com" },
  subject: "Alerta de seguridad crítica...",
  unread: true,
  starred: true,
  folder: "inbox",
  snippet: "Detectamos un nuevo inicio de sesión...",
  html: `...código HTML con el diseño del correo...`,
  attachments: [{ filename: "archivo.pdf", size: 102400 }]
}
```
Puedes añadir nuevos correos, cambiar los remitentes, el texto o las fechas libremente.

---

## 7. 📏 Modificar Anchos y Proporciones de las Columnas

* **Barra lateral izquierda:** En [`src/components/Sidebar.jsx`](../src/components/Sidebar.jsx), cambia `w-56 min-w-[210px]`.
* **Lista de correos central:** En [`src/components/EmailList.jsx`](../src/components/EmailList.jsx), cambia `w-full md:w-80 lg:w-[380px]`.
* **Lector de correos derecho:** Ocupa automáticamente todo el espacio restante (`flex-1`) en [`src/components/EmailReader.jsx`](../src/components/EmailReader.jsx).

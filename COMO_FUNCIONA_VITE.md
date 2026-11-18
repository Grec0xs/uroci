# ⚡ Guía Completa: ¿Cómo Funciona Vite en Uroci Mail?

Bienvenido a la guía explicativa sobre **Vite**, el motor y servidor de desarrollo que hace funcionar **Uroci Mail**.

---

## 🧐 ¿Qué es Vite y por qué es tan rápido?

En el desarrollo web tradicional (por ejemplo con *Webpack* o *Create-React-App*), cada vez que hacías un cambio en un archivo, el servidor tenía que empaquetar y procesar **todo** tu proyecto antes de que pudieras verlo en pantalla. Si el proyecto crecía, tardaba 5, 10 o 20 segundos en recargar.

**Vite** (que significa *"rápido"* en francés) funciona de una manera totalmente diferente:

1. **Módulos ES Nativos del Navegador (ESM):**
   Vite no empaqueta tu código en desarrollo. Cuando abres la página, el navegador pide únicamente los archivos que necesita ver en ese instante exacto (`src/App.jsx`, `src/components/Navbar.jsx`).
2. **Pre-empaquetado con esbuild:**
   Las librerías pesadas (como `react`, `framer-motion`, `lucide-react`) se procesan una sola vez al inicio utilizando **esbuild** (escrito en lenguaje Go), el cual es de **10 a 100 veces más rápido** que herramientas basadas en JavaScript.
3. **Hot Module Replacement (HMR) Instantáneo:**
   Cuando editas una línea en `src/components/Sidebar.jsx` y guardas (`⌘ + S` / `Ctrl + S`), Vite solo envía esa pequeña parte cambiada al navegador vía WebSockets en menos de **50 milisegundos**, sin recargar toda la página y sin perder el estado de lo que estabas haciendo.

---

## 🛠️ ¿Cómo está configurado Vite en este proyecto?

Normalmente, una aplicación de correo requeriría encender **dos servidores diferentes** en dos terminales separadas:
1. Un servidor para la interfaz visual (React en el puerto `5173`).
2. Un servidor backend para conectarse a Gmail (Express en el puerto `3001`).

Sin embargo, para hacerte la vida mucho más fácil, en este proyecto integramos el backend **directamente dentro del servidor de Vite** mediante un *Middleware* en el archivo [`vite.config.js`](./vite.config.js):

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { apiApp } from './server/apiApp.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'uroci-api-middleware',
      configureServer(server) {
        // Vite atiende las peticiones a /api/... directamente en memoria
        server.middlewares.use(apiApp);
      },
    },
  ],
  server: {
    port: 5173,
  },
});
```

### ¿Qué ventaja tiene esto para ti?
* **Un solo comando:** Solo tienes que ejecutar `npm run dev` y todo funciona: tanto la interfaz como la conexión a Gmail.
* **Cero problemas de puertos o permisos:** No hay servidores separados intentando comunicarse entre sí por sockets locales, eliminando errores de red y proxies.

---

## 🚀 Guía de Comandos para Probar Uroci Mail

Abre una terminal en la carpeta del proyecto (`/Users/gera/Documents/uroci`) y usa estos comandos:

### 1. Iniciar el servidor de desarrollo
```bash
npm run dev
```
* **¿Qué hace?** Enciende el servidor de Vite con recarga en vivo y la API de Gmail en segundo plano.
* **¿Dónde lo ves?** Abre tu navegador en: [http://localhost:5173/](http://localhost:5173/)

### 2. Probarlo desde tu celular o tablet en la misma red Wi-Fi
Si quieres abrir Uroci Mail desde tu teléfono o iPad conectado al mismo Wi-Fi de tu casa:
```bash
npx vite --host
```
Vite te mostrará en la terminal una dirección IP de tu red local, por ejemplo:
```text
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.15:5173/
```
Escribe esa dirección `Network` en el navegador de tu celular y verás Uroci Mail funcionando al instante.

### 3. Detener el servidor
Para apagar el servidor cuando termines de probar:
* Presiona `Control + C` (o `Cmd + C`) en la terminal donde está corriendo.

### 4. Probar la versión de producción
Para ver cómo se comportaría la web ya compilada y optimizada al máximo:
```bash
npm run build
npm run preview
```
* `npm run build`: Minifica todo el código CSS y JavaScript en la carpeta `dist/`.
* `npm run preview`: Lanza un servidor ligero para ver el resultado final de producción.

---

## 🧭 Mapa de Archivos para Experimentar

Si quieres hacer cambios y ver cómo Vite los actualiza en vivo al instante:

| Archivo | ¿Qué controla? |
| :--- | :--- |
| [`src/components/Navbar.jsx`](./src/components/Navbar.jsx) | Barra superior, logo, buscador y botones de modo oscuro/Gmail. |
| [`src/components/Sidebar.jsx`](./src/components/Sidebar.jsx) | Botón morado de Redactar y las carpetas de la izquierda. |
| [`src/components/EmailList.jsx`](./src/components/EmailList.jsx) | La lista de mensajes y las pestañas *Todos / No leídos / Destacados*. |
| [`src/components/EmailReader.jsx`](./src/components/EmailReader.jsx) | El lector del correo y la caja de respuesta rápida. |
| [`src/components/ComposeModal.jsx`](./src/components/ComposeModal.jsx) | La ventana flotante estilo macOS/Yahoo para redactar. |
| [`server/mockData.js`](./server/mockData.js) | Los correos que aparecen en el Modo Demostración. |

¡Disfruta probando y personalizando Uroci Mail!

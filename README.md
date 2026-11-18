# ✉️ Uroci Mail

Cliente de correo electrónico web moderno, simple y elegante que fusiona la estética nostálgica de **Yahoo! Mail** con el minimalismo y precisión de **Apple Mail**, con animaciones fluidas a 60 fps y conexión a cuentas de `@gmail.com`.

---

## 📚 Documentación y Guías

En la carpeta [`docs/`](./docs) encontrarás guías completas para entender y personalizar el proyecto:

- 🎨 [**Guía de Personalización y Estilos**](./docs/GUIA_DE_PERSONALIZACION.md): Cómo modificar colores, degradados, fuentes, animaciones, carpetas y correos de prueba.
- ⚡ [**¿Cómo funciona Vite en este proyecto?**](./docs/COMO_FUNCIONA_VITE.md): Explicación técnica para principiantes, comandos para probarlo en celular y arquitectura del servidor.

---

## ✨ Características Principales

- **Fusión Estética Yahoo! Mail + Apple Mail**:
  - Paleta de color púrpura emblemática con degradados refinados (`#5b13df` a `#8e3af6`).
  - Líneas divisorias ultrafinas de 1px semitransparentes, fondos sutiles en `#f5f5f7` (modo claro) y `#161618` (modo oscuro).
  - Barra superior con buscador centrado, atajos y **selector de tema desplegable estilo AirPods (Claro, Dispositivo/Auto, Oscuro)**.
  - Barra lateral con el clásico botón **Redactar**, carpetas organizadas (*Bandeja de entrada*, *Destacados*, *Enviados*, *Borradores*, *Archivo*, *Spam*, *Papelera*).
  - **Ventana de redacción flotante**: Se abre en la esquina inferior derecha con los tres botones característicos de ventana macOS (rojo, amarillo y verde) para minimizar, maximizar o cerrar.
- **Animaciones Pulidas (Framer Motion)**:
  - **Animación física de colapso tipo acordeón** al filtrar o eliminar correos, sin saltos bruscos ni tirones.
  - Expansión elástica con física de resorte (*spring physics*) en el selector de tema estilo AirPods.
- **Modo Oscuro con Corrección de Contraste**:
  - Detección inteligente de estilos inline para garantizar que los correos de remitentes externos (como alertas de Google, GitHub o Spotify) siempre tengan texto claro de alto contraste y 100% legible.
- **Conexión Real con @gmail.com**:
  - Sincronización IMAP para recibir correos y SMTP para enviarlos.
  - **Modo Demostración Interactivo**: Incluye correos de muestra interactivos listos para usar de inmediato.

---

## 🚀 Inicio Rápido

```bash
# Inicia el cliente con la API integrada en un solo comando
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)

Para abrirlo desde tu celular en la misma red Wi-Fi:
```bash
npx vite --host
```

---

## 🔐 Conectar una Cuenta de Gmail (@gmail.com)

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) *(con Verificación en 2 pasos activa)*.
2. Genera una contraseña para `Uroci Mail` (código de 16 letras, ej. `abcd efgh ijkl mnop`).
3. Haz clic en **"Conectar @gmail.com"** en Uroci Mail e ingresa tu correo y esa clave de 16 caracteres.

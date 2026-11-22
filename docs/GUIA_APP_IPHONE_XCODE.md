# 📱 Guía: Cómo ejecutar Uroci Mail en iPhone usando Xcode

Esta guía te explica detalladamente cómo compilar e instalar **Uroci Mail** como una aplicación nativa en tu iPhone o en el Simulador de iOS usando **Xcode** en tu Mac.

El proyecto nativo de Xcode está listo en la carpeta [`ios-app/`](../ios-app).

---

## 🏗️ ¿Cómo está construida la versión de iPhone?

La app para iOS está desarrollada en **Swift + SwiftUI** utilizando **WebKit (`WKWebView`)**:
1. **Rendimiento Nativo:** Utiliza el motor WebKit acelerado por hardware de iOS con soporte para gestos táctiles nativos, rebote (*bounce* de inercia de iOS), gestos de navegación atrás/adelante deslizando desde el borde de la pantalla, y recarga hacia abajo (*Pull-to-refresh*).
2. **Safe Area Insets:** Se ajusta automáticamente al **Dynamic Island**, notch y la barra inferior de inicio (*Home Indicator*) de cualquier modelo de iPhone.
3. **Carga Segura de Módulos (Custom Scheme Handler):** Los archivos web están empaquetados dentro del binario de la app (`ios-app/UrociMail/www/`) y se sirven mediante un esquema personalizado `app://localhost/` con tipos MIME nativos, permitiendo que la interfaz funcione **100% offline**.
4. **Selector de Servidor Integrado:** Agitando el iPhone (*shake gesture*), se abre una ventana para conectarse a la IP de tu Mac o servidor en la nube para usar Gmail en tiempo real.

---

## 🚀 Pasos para Abrir y Probar en Xcode

### 1. Abrir el proyecto
Desde la terminal en la raíz de `uroci`:
```bash
npm run ios:open
```
*(O abre Finder, ve a la carpeta `ios-app` y haz doble clic sobre `UrociMail.xcodeproj`).*

---

### 2. Ejecutar en el Simulador de iOS
1. En la barra superior de Xcode, verás `UrociMail > [Dispositivo]`. Haz clic en el dispositivo y elige cualquier simulador de iPhone (ejemplo: **iPhone 16 Pro**).
2. Haz clic en el botón de **Play (▶️ Run)** o presiona `⌘ + R`.
3. Xcode compilará el código Swift y levantará el simulador con la app lista para usar.

---

### 3. Instalar en tu iPhone físico (Gratis con tu Apple ID)

No necesitas pagar una cuenta de desarrollador para instalar y usar tu propia app en tu teléfono:

1. **Conecta tu iPhone** a tu Mac con el cable USB.
2. Abre **Xcode**, haz clic en el proyecto **UrociMail** (icono azul a la izquierda).
3. Entra a la pestaña **Signing & Capabilities**.
4. En **Team**:
   * Si no tienes una cuenta vinculada, presiona **Add an Account...** e ingresa con tu cuenta de Apple (tu Apple ID personal).
   * Elige tu equipo: `Tu Nombre (Personal Team)`.
5. En **Bundle Identifier**:
   * Cámbialo si está en uso por algo propio, ej: `com.tu-nombre.urocimail`.
6. En el selector de dispositivos de Xcode, selecciona **tu iPhone**.
7. Pulsa **Play (▶️ Run)**.

#### ⚠️ Confianza del desarrollador en iOS:
Cuando la app termine de instalarse en tu iPhone, al intentar abrirla iOS mostrará un aviso de seguridad. Para autorizarla:
1. En tu iPhone, entra a: **Ajustes > General > VPN y gestión de dispositivos**.
2. Toca tu Apple ID y pulsa **"Confiar en [Tu Correo]"**.
3. ¡Listo! Ya puedes abrir y usar **Uroci Mail** desde tu pantalla de inicio.

---

## 🔄 Cómo Sincronizar Cambios de la Web con la App

Si haces modificaciones en el diseño, colores o componentes en React y quieres actualizarlos en la app de iOS:
```bash
npm run ios:sync
```
Este comando compilará el proyecto web con Vite y copiará automáticamente los nuevos archivos a la carpeta interna de la app de iOS.

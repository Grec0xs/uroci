# 📱 Uroci Mail para iOS (Xcode)

Esta carpeta contiene el proyecto nativo de **Xcode (Swift + SwiftUI + WKWebView)** para compilar y ejecutar **Uroci Mail** como una aplicación nativa en tu iPhone o en el Simulador de iOS.

---

## 🚀 Cómo Abrir y Ejecutar el Proyecto en Xcode

### Paso 1: Abrir en Xcode
En la terminal, ejecuta desde la raíz del proyecto:
```bash
npm run ios:open
```
*(O simplemente haz doble clic en el archivo [`UrociMail.xcodeproj`](./UrociMail.xcodeproj) en Finder).*

---

### Paso 2: Probar en el Simulador de iOS
1. En la barra superior de Xcode, haz clic en el selector de dispositivo (al lado de **UrociMail**).
2. Selecciona cualquier simulador de iPhone (por ejemplo, **iPhone 16 Pro** o **iPhone 15**).
3. Presiona el botón de **Play (▶️ Run)** o el atajo `⌘ + R`.
4. ¡El simulador se encenderá y verás Uroci Mail ejecutándose como una aplicación nativa!

---

### Paso 3: Instalar en tu iPhone Físico (Paso a Paso)

Apple te permite instalar tus propias apps en tu iPhone de forma **100% gratuita** con tu cuenta estándar de Apple ID (no necesitas pagar la cuenta de desarrollador de $99 USD):

1. **Conecta tu iPhone** a tu Mac mediante cable USB (o por Wi-Fi si tienes activada la sincronización de Xcode).
2. En Xcode, ve al panel izquierdo y selecciona el proyecto **UrociMail** (icono azul).
3. Selecciona la pestaña **Signing & Capabilities**.
4. En la sección **Team**:
   - Si no has agregado tu Apple ID, haz clic en **Add an Account...** e inicia sesión con tu cuenta de Apple (la misma de tu iPhone).
   - Selecciona tu equipo personal: `Tu Nombre (Personal Team)`.
5. Si Xcode te muestra un error en **Bundle Identifier**, simplemente cámbialo a algo único, por ejemplo: `com.tudominio.urocimail`.
6. En el selector superior de dispositivos de Xcode, selecciona **tu iPhone físico**.
7. Presiona **Play (▶️ Run)**.

#### ⚠️ Primer inicio en el iPhone (Confianza de Desarrollador):
La primera vez que instales la app, iOS te pedirá confirmar que confías en tu propia cuenta:
1. En tu iPhone, ve a **Ajustes > General > VPN y gestión de dispositivos** (o *Administración de dispositivos*).
2. Verás tu cuenta de Apple ID debajo de "App de desarrollador".
3. Toca tu cuenta y pulsa **"Confiar en [Tu Correo]"**.
4. ¡Listo! Abre el icono de **Uroci Mail** en la pantalla de inicio de tu iPhone y úsalo con total normalidad.

---

## ⚡ Modos de Funcionamiento: Local Offline vs. Servidor en Vivo

Uroci Mail para iOS cuenta con un sistema inteligente de carga:

1. **Modo Nativo Offline (Predeterminado):**
   * Todos los archivos de la interfaz están empaquetados directamente dentro de la app (`UrociMail/www/`).
   * No requiere conexión a internet para cargar la interfaz, navegar o ver los correos del Modo Demostración.
2. **Modo Conectado a Servidor (Para sincronizar con Gmail):**
   * **Agita tu iPhone** mientras usas la app para abrir el menú secreto de ajustes.
   * Activa **"Conectar a Servidor / Wi-Fi"** e introduce la IP de tu Mac en la red local (ejemplo: `http://192.168.1.15:5173` obtenida con `npx vite --host`) o la URL pública de tu backend (por ejemplo en Render).
   * Al guardar, la app se conectará automáticamente a tu servidor para recibir y enviar correos reales de Gmail.

---

## 🔄 Cómo Actualizar la App tras Hacer Cambios Web

Si modificas algún archivo de React o CSS en la web y quieres que se refleje en tu iPhone:
```bash
npm run ios:sync
```
Este comando reconstruye la versión optimizada de Vite y actualiza automáticamente los archivos dentro del proyecto de Xcode.

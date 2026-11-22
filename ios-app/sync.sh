#!/bin/bash
set -e

# Directorio base del proyecto
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "📦 1. Compilando Uroci Mail para producción con Vite..."
cd "$PROJECT_ROOT"
npm run build

echo "📲 2. Sincronizando archivos con el proyecto Xcode de iOS..."
rm -rf "$PROJECT_ROOT/ios-app/UrociMail/www"/*
cp -R "$PROJECT_ROOT/dist"/* "$PROJECT_ROOT/ios-app/UrociMail/www/"

echo "✅ ¡Listo! Los archivos web de Uroci Mail se han actualizado en el proyecto de Xcode."
echo "👉 Ahora abre o compila el proyecto en Xcode:"
echo "   open ios-app/UrociMail.xcodeproj"

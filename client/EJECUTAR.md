# 🌐 Ejecutar Frontend (Cliente Web)

## Instalación y Ejecución Rápida

### 1. Navegar al directorio del cliente

```bash
cd client
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor web

```bash
# Servidor HTTP básico
npm start

# Desarrollo (con live-reload)
npm run dev
```

## ✅ Verificación

- ✅ El cliente web está disponible en: `http://localhost:3000`
- ✅ Se abre automáticamente en el navegador
- ✅ La interfaz del chat está lista para usar

## ⚠️ Requisito Previo

**IMPORTANTE**: El backend debe estar ejecutándose en `ws://localhost:8080` antes de usar el frontend.

Si no tienes el backend ejecutándose:

```bash
# En otra terminal, ejecutar:
cd server
npm install
npm start
```

## 🔧 Configuración

- **Puerto HTTP**: 3000 (configurable)
- **WebSocket Backend**: ws://localhost:8080 (configurado en script.js)
- **Dependencias**: http-server, live-server

## 🧪 Usar la Aplicación

1. Abrir `http://localhost:3000` en el navegador
2. Introducir nombre de usuario
3. Hacer clic en "Unirse al Chat"
4. ¡Empezar a chatear!

## 🔄 Prueba con Multiple Usuarios

- Abrir múltiples pestañas/navegadores en `http://localhost:3000`
- Usar diferentes nombres de usuario
- Probar el chat en tiempo real entre "usuarios"

---

**Requisito**: Asegurar que el backend esté ejecutándose en `server/`.

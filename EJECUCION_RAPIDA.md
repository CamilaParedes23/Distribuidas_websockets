# 🚀 Guía de Ejecución Rápida - Chat WebSocket

## 🎯 Ejecución en 3 Pasos

### 1. 🔌 Iniciar Backend (Terminal 1)

```bash
cd server
npm install
npm start
```

➡️ **Resultado**: Servidor WebSocket ejecutándose en `ws://localhost:8080`

### 2. 🌐 Iniciar Frontend (Terminal 2)

```bash
cd client
npm install
npm start
```

➡️ **Resultado**: Cliente web disponible en `http://localhost:3000`

### 3. 💬 Usar el Chat

- Abrir navegador en `http://localhost:3000`
- Introducir nombre de usuario
- ¡Empezar a chatear!

## 🔧 Scripts Desde la Raíz (Alternativo)

```bash
# Instalar todas las dependencias
npm run install:all

# Terminal 1: Backend
npm run start:backend

# Terminal 2: Frontend
npm run start:frontend
```

## ✅ Verificación Rápida

### Backend ✓

- [ ] Consola muestra: "🔌 Servidor WebSocket ejecutándose en ws://localhost:8080"
- [ ] No hay errores en la terminal

### Frontend ✓

- [ ] Navegador abre automáticamente en `http://localhost:3000`
- [ ] Interfaz del chat se carga correctamente
- [ ] Puedes introducir nombre de usuario

### Conexión ✓

- [ ] Al unirse al chat, aparece mensaje "Conectado al servidor"
- [ ] Estado muestra "Conectado" en verde
- [ ] Puedes enviar mensajes

## 🧪 Prueba Múltiples Usuarios

1. Abrir varias pestañas en `http://localhost:3000`
2. Usar nombres de usuario diferentes
3. Chatear entre las pestañas
4. Verificar indicadores de escritura

## 🐛 Solución de Problemas

**❌ Error: "No se pudo conectar al servidor"**

- Verificar que el backend esté ejecutándose en puerto 8080
- Revisar que no haya errores en la terminal del backend

**❌ Frontend no carga**

- Verificar que esté ejecutándose en puerto 3000
- Probar abrir manualmente `http://localhost:3000`

**❌ Mensajes no se envían**

- Verificar estado de conexión (debe estar en verde)
- Revisar consola del navegador (F12) para errores

## 📋 Puertos Utilizados

- **Backend WebSocket**: 8080
- **Frontend HTTP**: 3000

---

### 🎉 ¡Listo para chatear en tiempo real!

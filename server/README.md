# 🔌 Backend - Servidor WebSocket

Servidor backend independiente para el sistema de mensajería en tiempo real usando WebSocket.

## 🚀 Características

- ✅ Servidor WebSocket puro (sin Express)
- ✅ Manejo de múltiples conexiones simultáneas
- ✅ Broadcasting de mensajes en tiempo real
- ✅ Notificaciones de conexión/desconexión
- ✅ Validación de mensajes y manejo de errores
- ✅ Indicadores de escritura en tiempo real
- ✅ CORS habilitado para desarrollo

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **ws** - Librería WebSocket para Node.js
- **cors** - Manejo de CORS para desarrollo

## 📦 Instalación

```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias
npm install

# Iniciar servidor
npm start

# O para desarrollo con auto-reload
npm run dev
```

## 🔧 Configuración

### Variables de Entorno

```bash
WS_PORT=8080    # Puerto del servidor WebSocket (por defecto: 8080)
```

### Configuración de CORS

El servidor está configurado para aceptar conexiones desde cualquier origen durante el desarrollo. Para producción, modificar la configuración en `server.js`:

```javascript
cors: {
    origin: "http://localhost:3000", // URL específica del frontend
    methods: ["GET", "POST"]
}
```

## 🔌 Protocolo WebSocket

### Puerto por Defecto

- **WebSocket**: `ws://localhost:8080`

### Tipos de Mensajes Soportados

#### Cliente → Servidor

```javascript
// Mensaje de chat
{
  "type": "chat",
  "username": "nombreUsuario",
  "content": "mensaje del usuario"
}

// Indicador de escritura
{
  "type": "typing",
  "username": "nombreUsuario"
}

// Parar de escribir
{
  "type": "stop_typing",
  "username": "nombreUsuario"
}
```

#### Servidor → Cliente

```javascript
// Mensaje de chat distribuido
{
  "type": "chat",
  "username": "nombreUsuario",
  "content": "mensaje",
  "timestamp": "2024-11-03T...",
  "clientId": "client_1"
}

// Notificación de usuario conectado
{
  "type": "user_joined",
  "username": "nombreUsuario",
  "message": "nombreUsuario se ha unido al chat",
  "timestamp": "2024-11-03T...",
  "clientsCount": 3
}

// Notificación de usuario desconectado
{
  "type": "user_left",
  "username": "nombreUsuario",
  "message": "nombreUsuario ha abandonado el chat",
  "timestamp": "2024-11-03T...",
  "clientsCount": 2
}

// Mensaje del sistema
{
  "type": "system",
  "message": "Conectado al servidor de chat",
  "timestamp": "2024-11-03T...",
  "clientId": "client_1"
}

// Error
{
  "type": "error",
  "message": "Descripción del error",
  "timestamp": "2024-11-03T..."
}
```

## 🔒 Validaciones

### Validaciones de Mensaje

- **Formato JSON**: Estructura válida requerida
- **Campos obligatorios**: `type`, `username`, `content`
- **Tipos soportados**: `chat`, `typing`, `stop_typing`

### Manejo de Errores

- Conexiones perdidas se detectan automáticamente
- Mensajes malformados generan respuestas de error
- Limpieza automática de clientes desconectados

## 📊 Logs del Servidor

```bash
🔌 Servidor WebSocket ejecutándose en ws://localhost:8080
📊 Estadísticas del servidor:
   - Puerto: 8080
   - Protocolo: WebSocket
   - Modo: Backend independiente
🚀 Servidor listo para recibir conexiones...

🔗 Nueva conexión: client_1 desde ::1
💬 nombreUsuario: mensaje del usuario
❌ Cliente desconectado: client_1 (nombreUsuario)
```

## 🧪 Testing

### Prueba de Conexión WebSocket

```javascript
// Usando JavaScript en el navegador o Node.js
const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("Conectado al servidor");

  // Enviar mensaje de prueba
  ws.send(
    JSON.stringify({
      type: "chat",
      username: "TestUser",
      content: "Mensaje de prueba",
    })
  );
};

ws.onmessage = (event) => {
  console.log("Mensaje recibido:", JSON.parse(event.data));
};
```

## 🔧 Desarrollo

### Estructura del Código

- **Gestión de clientes**: Map() para almacenar información de conexiones
- **Broadcasting**: Envío eficiente a múltiples clientes
- **Validación**: Verificación de formato y contenido de mensajes
- **Limpieza**: Eliminación automática de conexiones cerradas

### Funciones Principales

- `broadcast()`: Envía mensajes a todos los clientes conectados
- `validateMessage()`: Valida formato de mensajes entrantes
- `getServerStats()`: Obtiene estadísticas del servidor

## 🚀 Producción

### Recomendaciones

1. **Variables de entorno**: Configurar `WS_PORT` apropiadamente
2. **CORS**: Restringir orígenes permitidos
3. **Rate limiting**: Implementar límites de mensajes por cliente
4. **Logging**: Usar librería de logging profesional
5. **Monitoring**: Implementar métricas y alertas

### Ejemplo de Configuración de Producción

```javascript
const wss = new WebSocket.Server({
  port: process.env.WS_PORT || 8080,
  cors: {
    origin: process.env.FRONTEND_URL || "https://tu-frontend.com",
    methods: ["GET", "POST"],
  },
});
```

## 📝 Notas

- Este servidor funciona independientemente del frontend
- Compatible con cualquier cliente WebSocket
- Diseñado para escalabilidad horizontal
- Listo para integración con bases de datos
- Soporta extensión para autenticación

---

### 🔌 ¡Servidor WebSocket listo para conectar!

Para conectar un cliente, usar: `ws://localhost:8080`

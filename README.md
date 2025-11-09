# 💬 Sistema de Mensajería en Tiempo Real con WebSocket

Un chat distribuido que permite comunicación instantánea entre múltiples usuarios usando WebSocket para aplicaciones distribuidas. **Backend y Frontend completamente separados.**

## 🚀 Características

- ✅ **Backend independiente** - Servidor WebSocket puro
- ✅ **Frontend independiente** - Cliente web que se conecta al backend
- ✅ **Comunicación en tiempo real** entre múltiples usuarios
- ✅ **Conexiones simultáneas** de múltiples clientes
- ✅ **Notificaciones** de conexión/desconexión de usuarios
- ✅ **Indicador de escritura** en tiempo real
- ✅ **Interfaz web responsiva** y moderna
- ✅ **Validación de mensajes** y manejo de errores
- ✅ **Limpieza de sesión** y desconexión segura
- ✅ **Información completa** de usuario, hora y contenido

## 🛠️ Tecnologías Utilizadas

### Backend (server/)

- **Node.js** - Entorno de ejecución
- **WebSocket (ws)** - Comunicación bidireccional en tiempo real
- **CORS** - Habilitado para desarrollo

### Frontend (client/)

- **HTML5** - Estructura de la aplicación
- **CSS3** - Estilos responsivos y modernos
- **JavaScript ES6+** - Lógica del cliente y manejo de WebSocket
- **HTTP Server** - Servidor de desarrollo para archivos estáticos

## 📁 Estructura del Proyecto (Separado)

```
PROYECTO/
├── .github/
│   └── copilot-instructions.md    # Instrucciones para GitHub Copilot
├── server/                        # 🔌 BACKEND INDEPENDIENTE
│   ├── server.js                  # Servidor WebSocket puro
│   ├── package.json               # Dependencias del backend
│   └── README.md                  # Documentación del backend
├── client/                        # 🌐 FRONTEND INDEPENDIENTE
│   ├── index.html                 # Interfaz principal
│   ├── styles.css                 # Estilos CSS
│   ├── script.js                  # Lógica del cliente
│   ├── package.json               # Dependencias del frontend
│   └── README.md                  # Documentación del frontend
├── package.json                   # Scripts principales del proyecto
└── README.md                      # Esta documentación
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

### 🚀 Opción 1: Instalación Rápida (Todo junto)

```bash
# Instalar todas las dependencias de una vez
npm run install:all

# Iniciar backend
npm run start:backend

# En otra terminal, iniciar frontend
npm run start:frontend
```

### 🔧 Opción 2: Instalación Separada

#### Backend (Servidor WebSocket)

```bash
# 1. Navegar al directorio del servidor
cd server

# 2. Instalar dependencias del backend
npm install

# 3. Iniciar servidor WebSocket
npm start
# O para desarrollo con auto-reload:
npm run dev
```

#### Frontend (Cliente Web)

```bash
# 1. Navegar al directorio del cliente (nueva terminal)
cd client

# 2. Instalar dependencias del frontend
npm install

# 3. Iniciar servidor web
npm start
# O para desarrollo con live-reload:
npm run dev
```

### 🌐 Acceso a la Aplicación

- **Frontend**: `http://localhost:3001`
- **Backend WebSocket**: `ws://localhost:8080`

> **Nota**: El backend debe estar ejecutándose antes de usar el frontend.

## 🚀 Uso de la Aplicación

### Para Usuarios

1. **Acceder al chat**

   - Ingresar nombre de usuario (máximo 20 caracteres)
   - Hacer clic en \"Unirse al Chat\"

2. **Enviar mensajes**

   - Escribir mensaje en el campo de texto (máximo 500 caracteres)
   - Presionar Enter o hacer clic en \"📤 Enviar\"

3. **Funciones adicionales**
   - **🗑️ Limpiar**: Borra todos los mensajes localmente
   - **🚪 Salir**: Desconecta del chat
   - **Indicador de escritura**: Muestra cuando otros usuarios están escribiendo

### Para Desarrolladores

#### Scripts Disponibles

```bash
# Scripts principales (desde la raíz del proyecto)
npm run start:backend          # Iniciar solo el backend
npm run start:frontend         # Iniciar solo el frontend
npm run dev:backend           # Backend con auto-reload
npm run dev:frontend          # Frontend con live-reload
npm run install:all           # Instalar todas las dependencias

# Scripts del backend (desde server/)
cd server
npm start                     # Iniciar servidor WebSocket
npm run dev                   # Desarrollo con nodemon

# Scripts del frontend (desde client/)
cd client
npm start                     # Servidor HTTP en puerto 3001
npm run dev                   # Desarrollo con live-reload
```

#### Puertos y Servicios

- **Backend WebSocket**: Puerto 8080 (`ws://localhost:8080`)
- **Frontend HTTP**: Puerto 3001 (`http://localhost:3001`)

## 📚 Documentación Detallada

### 🔌 Backend

Ver [server/README.md](server/README.md) para:

- Configuración específica del servidor WebSocket
- Protocolo de mensajes detallado
- Configuraciones de producción
- Testing del backend

### 🌐 Frontend

Ver [client/README.md](client/README.md) para:

- Configuración de la interfaz web
- Personalización de estilos
- Funcionalidades del cliente
- Deployment del frontend

## 🔌 Protocolo WebSocket

### Tipos de Mensajes

#### Cliente → Servidor

```javascript
// Mensaje de chat
{
  \"type\": \"chat\",
  \"username\": \"nombreUsuario\",
  \"content\": \"mensaje del usuario\"
}

// Indicador de escritura
{
  \"type\": \"typing\",
  \"username\": \"nombreUsuario\"
}

// Parar de escribir
{
  \"type\": \"stop_typing\",
  \"username\": \"nombreUsuario\"
}
```

#### Servidor → Cliente

```javascript
// Mensaje de chat
{
  \"type\": \"chat\",
  \"username\": \"nombreUsuario\",
  \"content\": \"mensaje\",
  \"timestamp\": \"2024-11-03T...\",
  \"clientId\": \"client_1\"
}

// Usuario se unió
{
  \"type\": \"user_joined\",
  \"username\": \"nombreUsuario\",
  \"message\": \"nombreUsuario se ha unido al chat\",
  \"timestamp\": \"2024-11-03T...\",
  \"clientsCount\": 3
}

// Usuario se fue
{
  \"type\": \"user_left\",
  \"username\": \"nombreUsuario\",
  \"message\": \"nombreUsuario ha abandonado el chat\",
  \"timestamp\": \"2024-11-03T...\",
  \"clientsCount\": 2
}

// Mensaje del sistema
{
  \"type\": \"system\",
  \"message\": \"Conectado al servidor de chat\",
  \"timestamp\": \"2024-11-03T...\",
  \"clientId\": \"client_1\"
}

// Error
{
  \"type\": \"error\",
  \"message\": \"Descripción del error\",
  \"timestamp\": \"2024-11-03T...\"
}
```

## 🔒 Seguridad y Validación

### Validaciones Implementadas

- **Nombres de usuario**: Máximo 20 caracteres, no vacío
- **Mensajes**: Máximo 500 caracteres, no vacío
- **Formato JSON**: Validación estricta de estructura
- **Escape HTML**: Prevención de inyección de código
- **Manejo de errores**: Respuestas controladas para errores

### Manejo de Errores

- Conexiones perdidas se detectan automáticamente
- Mensajes malformados generan respuestas de error
- Desconexiones inesperadas se notifican a otros usuarios
- Validación en cliente y servidor

## ⚡ Rendimiento

### Características de Escalabilidad

- **Conexiones concurrentes**: Sin límite teórico (limitado por recursos del sistema)
- **Latencia**: < 1 segundo para entrega de mensajes
- **Memoria**: Uso eficiente con Map() para almacenar clientes
- **CPU**: Procesamiento asíncrono no bloqueante

### Optimizaciones

- Broadcasting eficiente a múltiples clientes
- Limpieza automática de conexiones cerradas
- Indicadores de escritura con timeout automático
- Throttling en eventos de escritura

## 🐛 Troubleshooting

### Problemas Comunes

**❌ "Error de conexión"**

- Verificar que el servidor esté ejecutándose
- Comprobar puertos 3001 (HTTP) y 8080 (WebSocket)
- Revisar firewall/antivirus

**❌ \"No se pudo conectar al servidor\"**

- Verificar URL del WebSocket en `script.js`
- Comprobar configuración de red
- Verificar que Node.js esté instalado

**❌ Mensajes no se envían**

- Verificar estado de conexión
- Comprobar formato de mensajes
- Revisar consola del navegador para errores

### Logs del Servidor

```bash
🌐 Servidor HTTP ejecutándose en http://localhost:3001
🔌 Servidor WebSocket ejecutándose en ws://localhost:8080
🔗 Nueva conexión: client_1 desde ::1
💬 nombreUsuario: mensaje del usuario
❌ Cliente desconectado: client_1 (nombreUsuario)
```

## 🔧 Configuración Avanzada

### Variables de Entorno

```bash
PORT=3001          # Puerto del servidor HTTP
WS_PORT=8080       # Puerto del servidor WebSocket
```

### Personalización

- Modificar límites en `server.js`
- Cambiar estilos en `styles.css`
- Ajustar timeouts en `script.js`

## 📊 Monitoreo

### Estadísticas del Servidor

Acceder a `http://localhost:3001/stats` para obtener:

```json
{
  \"connectedClients\": 3,
  \"uptime\": 3600,
  \"memory\": { \"rss\": 50331648, \"heapTotal\": 25165824 },
  \"timestamp\": \"2024-11-03T...\"
}
```

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado para el curso de Sistemas Distribuidos.

---

### 🚀 ¡Disfruta chateando en tiempo real!

Para soporte técnico o preguntas, revisar la documentación o crear un issue en el repositorio.

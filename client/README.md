# 🌐 Frontend - Cliente Web

Cliente web independiente para el sistema de mensajería en tiempo real usando WebSocket.

## 🚀 Características

- ✅ **Interfaz web moderna** y responsiva
- ✅ **Conexión WebSocket** al servidor backend
- ✅ **Chat en tiempo real** con múltiples usuarios
- ✅ **Indicadores de escritura** dinámicos
- ✅ **Notificaciones** de eventos del sistema
- ✅ **Validación** de entrada de usuario
- ✅ **Manejo de errores** y reconexión

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsivos
- **JavaScript ES6+** - Lógica de cliente y WebSocket
- **WebSocket API** - Comunicación en tiempo real

## 📦 Instalación y Ejecución

### Opción 1: Servidor HTTP Simple

```bash
# Navegar al directorio del cliente
cd client

# Instalar dependencias
npm install

# Iniciar servidor en puerto 3000
npm start
```

### Opción 2: Servidor de Desarrollo con Live Reload

```bash
# Para desarrollo con recarga automática
npm run dev
```

### Opción 3: Abrir Directamente

```bash
# Simplemente abrir index.html en el navegador
# (Funciona para la mayoría de navegadores modernos)
```

## 🔧 Configuración

### Configuración del Servidor Backend

Por defecto, el cliente se conecta a:

- **WebSocket**: `ws://localhost:8080`

Para cambiar la URL del servidor, editar en `script.js`:

```javascript
// Línea ~67 en script.js
this.ws = new WebSocket("ws://localhost:8080");

// Cambiar por tu servidor:
this.ws = new WebSocket("ws://tu-servidor.com:8080");
```

### Configuración de Puertos

- **Frontend**: `http://localhost:3000` (configurable)
- **Backend**: `ws://localhost:8080` (debe coincidir con el servidor)

## 📁 Estructura de Archivos

```
client/
├── index.html          # Página principal del chat
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica del cliente WebSocket
├── package.json        # Dependencias y scripts
└── README.md          # Esta documentación
```

## 🎨 Interfaz de Usuario

### Pantalla de Login

- Campo para nombre de usuario (máximo 20 caracteres)
- Botón para unirse al chat
- Validación en tiempo real

### Pantalla Principal del Chat

- **Área de mensajes**: Historial de chat con scroll automático
- **Indicador de escritura**: Muestra cuando otros usuarios escriben
- **Campo de entrada**: Máximo 500 caracteres por mensaje
- **Botones de acción**:
  - 📤 **Enviar**: Envía el mensaje
  - 🗑️ **Limpiar**: Borra mensajes localmente
  - 🚪 **Salir**: Desconecta del chat

### Estados de Conexión

- 🟢 **Conectado**: Verde cuando está conectado al servidor
- 🔴 **Desconectado**: Rojo cuando no hay conexión
- **Contador de usuarios**: Muestra usuarios conectados en tiempo real

## 🔌 Funcionalidades WebSocket

### Conexión Automática

- Conexión al servidor cuando el usuario se une
- Reconexión automática en caso de pérdida de conexión
- Manejo de errores de red

### Tipos de Mensajes

- **Chat**: Mensajes entre usuarios
- **Sistema**: Notificaciones del servidor
- **Usuario conectado/desconectado**: Estado de otros usuarios
- **Indicadores de escritura**: Tiempo real

### Validaciones del Cliente

- **Nombre de usuario**: No vacío, máximo 20 caracteres
- **Mensajes**: No vacío, máximo 500 caracteres
- **Escape HTML**: Prevención de inyección de código

## 🎨 Estilos y Diseño

### Diseño Responsivo

- **Desktop**: Experiencia completa
- **Tablet**: Adaptación a pantallas medianas
- **Mobile**: Interfaz optimizada para móviles

### Temas de Colores

- **Primario**: Gradiente azul-morado (#667eea → #764ba2)
- **Fondo**: Transparencias y efectos glassmorphism
- **Estados**: Verde (éxito), Rojo (error), Naranja (advertencia)

### Animaciones

- **Slide-in**: Animación de entrada para mensajes
- **Slide-right**: Notificaciones desde la derecha
- **Hover effects**: Efectos en botones y elementos interactivos

## 📱 Compatibilidad

### Navegadores Soportados

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Funcionalidades Requeridas

- **WebSocket API**: Nativo en navegadores modernos
- **ES6+**: Clases, arrow functions, template literals
- **CSS Grid/Flexbox**: Layout moderno

## 🧪 Testing

### Prueba Local

1. Asegurar que el servidor backend esté ejecutándose en `ws://localhost:8080`
2. Abrir `http://localhost:3000` en múltiples pestañas/navegadores
3. Probar chat entre diferentes "usuarios"

### Casos de Prueba

- ✅ Conexión exitosa al servidor
- ✅ Envío y recepción de mensajes
- ✅ Indicadores de escritura
- ✅ Notificaciones de conexión/desconexión
- ✅ Validación de entrada
- ✅ Manejo de errores de conexión

## 🔧 Desarrollo

### Estructura del Código JavaScript

#### Clase Principal: `ChatClient`

```javascript
class ChatClient {
    constructor()           // Inicialización
    initializeElements()    // Referencias DOM
    setupEventListeners()   // Eventos de interfaz
    connectToServer()       // Conexión WebSocket
    handleMessage()         // Procesamiento de mensajes
    sendMessage()           // Envío de mensajes
    // ... más métodos
}
```

#### Métodos Principales

- **`joinChat()`**: Proceso de conexión
- **`sendMessage()`**: Envío de mensajes
- **`handleTyping()`**: Indicadores de escritura
- **`displayMessage()`**: Renderizado de mensajes
- **`showNotification()`**: Sistema de notificaciones

### Personalización

#### Cambiar Estilos

Editar `styles.css` para modificar:

- Colores del tema
- Tamaños de fuente
- Espaciado y layout
- Animaciones

#### Modificar Funcionalidad

Editar `script.js` para:

- Agregar nuevos tipos de mensaje
- Cambiar validaciones
- Añadir funcionalidades extra

## 🚀 Producción

### Optimizaciones

1. **Minificación**: Usar herramientas para comprimir CSS/JS
2. **CDN**: Servir archivos estáticos desde CDN
3. **Compresión**: Habilitar gzip en el servidor web
4. **Cache**: Configurar headers de cache apropiados

### Deployment

```bash
# Opción 1: Servidor estático (nginx, Apache)
# Copiar archivos del directorio client/ al servidor web

# Opción 2: Netlify/Vercel
# Subir directorio client/ directamente

# Opción 3: GitHub Pages
# Push a repositorio y habilitar Pages
```

### Variables de Entorno (Producción)

Crear `config.js` para manejar URLs dinámicas:

```javascript
const config = {
  WS_URL:
    process.env.NODE_ENV === "production"
      ? "wss://tu-servidor.com:443"
      : "ws://localhost:8080",
};
```

## 🐛 Troubleshooting

### Problemas Comunes

**❌ "No se pudo conectar al servidor"**

- Verificar que el backend esté ejecutándose en puerto 8080
- Comprobar URL de WebSocket en `script.js`
- Revisar CORS del servidor backend

**❌ "Mensajes no se envían"**

- Verificar estado de conexión (indicador en la interfaz)
- Revisar consola del navegador para errores
- Comprobar validación de mensajes

**❌ "Interfaz no se ve correctamente"**

- Verificar que `styles.css` se carga correctamente
- Comprobar compatibilidad del navegador
- Revisar consola para errores de CSS

### Debug

Abrir DevTools del navegador:

```javascript
// Acceder a la instancia global del cliente
console.log(window.chatClient);

// Ver estado de la conexión WebSocket
console.log(window.chatClient.ws.readyState);

// Enviar mensaje de prueba
window.chatClient.sendToServer({
  type: "chat",
  username: "test",
  content: "mensaje de prueba",
});
```

## 📝 Notas

- Este frontend funciona independientemente del backend
- Compatible con cualquier servidor WebSocket que implemente el protocolo definido
- Listo para extensión con frameworks como React, Vue, etc.
- Diseñado para ser PWA-friendly

---

### 🌐 ¡Cliente web listo para chatear!

Acceder en: `http://localhost:3000`

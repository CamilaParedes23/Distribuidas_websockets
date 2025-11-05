## Sistema de Mensajería en Tiempo Real con WebSocket

Este proyecto implementa un chat distribuido que permite comunicación instantánea entre múltiples usuarios usando WebSocket.

### Estructura del Proyecto

- **server/**: Contiene el servidor WebSocket backend independiente
- **client/**: Contiene la interfaz web frontend independiente
- **package.json**: Scripts principales y gestión de workspaces

### Tecnologías Utilizadas

- **Backend**: Node.js con WebSocket (librería 'ws')
- **Frontend**: HTML, CSS, JavaScript vanilla
- **Protocolo**: WebSocket para comunicación bidireccional

### Funcionalidades Implementadas

- Conexiones simultáneas de múltiples clientes
- Envío/recepción de mensajes en tiempo real
- Notificaciones de conexión/desconexión
- Información de usuario, hora y contenido en mensajes
- Interfaz web simple e intuitiva
- Backend y Frontend completamente separados

### Requerimientos No Funcionales

- Escalabilidad: Manejo de múltiples conexiones concurrentes
- Eficiencia: Latencia mínima de 1 segundo
- Seguridad: Validación de mensajes y manejo de errores

### Ejecución Rápida

1. Backend: `cd server && npm install && npm start`
2. Frontend: `cd client && npm install && npm start`
3. Acceder a: `http://localhost:3000`

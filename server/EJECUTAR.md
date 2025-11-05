# 🔌 Ejecutar Backend (Servidor WebSocket)

## Instalación y Ejecución Rápida

### 1. Navegar al directorio del servidor

```bash
cd server
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor

```bash
# Producción
npm start

# Desarrollo (con auto-reload)
npm run dev
```

## ✅ Verificación

- ✅ El servidor WebSocket está ejecutándose en: `ws://localhost:8080`
- ✅ Ver logs en la consola para confirmar conexiones
- ✅ El servidor está listo para recibir clientes WebSocket

## 🔧 Configuración

- **Puerto WebSocket**: 8080 (configurable con variable `WS_PORT`)
- **CORS**: Habilitado para desarrollo
- **Dependencias**: ws, cors

## 🧪 Probar Conexión

```javascript
// Desde la consola del navegador:
const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => console.log("Conectado al servidor");
ws.onmessage = (e) => console.log("Mensaje:", e.data);
```

---

**Siguiente paso**: Ejecutar el frontend desde `client/` para tener la interfaz completa.

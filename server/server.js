const WebSocket = require('ws');
const os = require('os');

// Función para obtener la IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    
    // Buscar específicamente la interfaz Wi-Fi
    for (const name of Object.keys(interfaces)) {
        if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wireless')) {
            for (const interface of interfaces[name]) {
                if (interface.family === 'IPv4' && !interface.internal) {
                    return interface.address;
                }
            }
        }
    }
    
    // Si no encuentra Wi-Fi, buscar cualquier interfaz no interna
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    
    return 'localhost';
}

// Configuración del servidor
const WS_PORT = process.env.WS_PORT || 8080;
const WS_HOST = process.env.WS_HOST || '0.0.0.0'; // Escuchar en todas las interfaces

// Crear servidor WebSocket
const wss = new WebSocket.Server({ 
    port: WS_PORT,
    host: WS_HOST, // Permite conexiones desde cualquier IP de la red
    cors: {
        origin: "*", // Permitir conexiones desde cualquier origen (para desarrollo)
        methods: ["GET", "POST"]
    }
});

// Almacén de clientes conectados
const clients = new Map();
let clientCounter = 0;

// Paleta de colores para los usuarios
const colorPalette = [
    '#e53e3e', // Rojo
    '#3182ce', // Azul
    '#38a169', // Verde
    '#d69e2e', // Dorado
    '#805ad5', // Púrpura
    '#dd6b20', // Naranja
    '#319795', // Turquesa
    '#e91e63', // Rosa
    '#7c3aed', // Violeta
    '#059669', // Verde esmeralda
    '#dc2626', // Rojo intenso
    '#2563eb'  // Azul intenso
];
let nextColorIndex = 0;

// Función para enviar mensaje a todos los clientes conectados
function broadcast(message, excludeClient = null) {
    const messageString = JSON.stringify(message);
    
    const allClients = Array.from(wss.clients);
    const connectedClients = allClients.filter(client => client.readyState === WebSocket.OPEN);
    const targetClients = excludeClient ? 
        connectedClients.filter(client => client !== excludeClient) : 
        connectedClients;
    
    console.log(`📡 Clientes totales: ${allClients.length}, Conectados: ${connectedClients.length}, Objetivo: ${targetClients.length}`);
    
    targetClients.forEach(client => {
        try {
            client.send(messageString);
        } catch (error) {
            console.error('❌ Error enviando mensaje a cliente:', error);
        }
    });
}

// Función para limpiar clientes desconectados
function cleanupDisconnectedClients() {
    let removedCount = 0;
    wss.clients.forEach(client => {
        if (client.readyState !== WebSocket.OPEN) {
            removedCount++;
        }
    });
    
    if (removedCount > 0) {
        console.log(`🧹 Limpieza: Removidos ${removedCount} clientes desconectados`);
    }
    
    return wss.clients.size; // Retorna el número real de clientes conectados
}

// Función para obtener conteo real de usuarios
function getRealUserCount() {
    const realCount = Array.from(wss.clients).filter(client => 
        client.readyState === WebSocket.OPEN
    ).length;
    
    console.log(`📊 Conteo real: ${realCount} usuarios activos`);
    return realCount;
}

// Función para enviar contador de usuarios a todos
function broadcastUserCount() {
    const connectedCount = getRealUserCount(); // Usar conteo real
    const updateMessage = {
        type: 'user_count_update',
        clientsCount: connectedCount,
        timestamp: new Date().toISOString()
    };
    
    console.log(`📊 Enviando contador REAL a ${connectedCount} clientes: ${connectedCount} usuarios`);
    
    // Enviar solo a clientes realmente conectados
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(updateMessage));
        }
    });
}

// Función para validar mensaje
function validateMessage(data) {
    try {
        const message = JSON.parse(data);
        // Validación básica: tipo y username siempre requeridos
        if (!message.type || !message.username) {
            return false;
        }
        
        // Para mensajes de chat, el content es requerido
        if (message.type === 'chat' && !message.content) {
            return false;
        }
        
        return true;
    } catch (error) {
        return false;
    }
}

// Manejar conexiones WebSocket
wss.on('connection', (ws, req) => {
    clientCounter++;
    const clientId = `client_${clientCounter}`;
    const clientIP = req.socket.remoteAddress;
    
    const color = colorPalette[nextColorIndex % colorPalette.length];
    nextColorIndex++;

    console.log(`🔗 Nueva conexión: ${clientId} desde ${clientIP} con color ${color}`);
    
    // Almacenar información del cliente
    clients.set(ws, {
        id: clientId,
        ip: clientIP,
        connectedAt: new Date(),
        username: null,
        color: color // Guardar el color del usuario
    });

    // Enviar mensaje de bienvenida al cliente con contador real
    const currentConnectedCount = getRealUserCount();
    ws.send(JSON.stringify({
        type: 'system',
        message: 'Conectado al servidor de chat',
        timestamp: new Date().toISOString(),
        clientId: clientId,
        clientsCount: currentConnectedCount
    }));
    
    console.log(`📊 Cliente ${clientId} informado de ${currentConnectedCount} usuarios conectados (REAL)`);

    // Manejar mensajes recibidos
    ws.on('message', (data) => {
        try {
            console.log(`📩 Mensaje recibido:`, data.toString());
            
            // Validar mensaje
            if (!validateMessage(data)) {
                console.log(`❌ Mensaje inválido:`, data.toString());
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Formato de mensaje inválido',
                    timestamp: new Date().toISOString()
                }));
                return;
            }

            const message = JSON.parse(data);
            const client = clients.get(ws);
            
            // Actualizar nombre de usuario si es la primera vez
            if (!client.username && message.username) {
                client.username = message.username;
                
                const realCount = getRealUserCount();
                
                // Notificar a TODOS los clientes (incluyendo el nuevo) sobre la nueva conexión
                broadcast({
                    type: 'user_joined',
                    username: message.username,
                    message: `${message.username} se ha unido al chat`,
                    timestamp: new Date().toISOString(),
                    clientsCount: realCount
                }); // Sin excluir a nadie
                
                // Enviar contador actualizado a TODOS los clientes
                setTimeout(() => {
                    broadcastUserCount();
                }, 100);
                
                console.log(`👤 Usuario ${message.username} registrado. Total REAL: ${realCount} usuarios`);
            }

            // Procesar diferentes tipos de mensajes
            switch (message.type) {
                case 'chat':
                    // Reenviar mensaje de chat a todos los clientes
                    broadcast({
                        type: 'chat',
                        username: message.username,
                        content: message.content,
                        color: client.color, // Incluir el color del usuario
                        timestamp: new Date().toISOString(),
                        clientId: client.id
                    });
                    
                    console.log(`💬 ${message.username}: ${message.content}`);
                    break;

                case 'typing':
                    // Notificar que el usuario está escribiendo
                    broadcast({
                        type: 'typing',
                        username: message.username,
                        timestamp: new Date().toISOString()
                    }, ws);
                    break;

                case 'stop_typing':
                    // Notificar que el usuario dejó de escribir
                    broadcast({
                        type: 'stop_typing',
                        username: message.username,
                        timestamp: new Date().toISOString()
                    }, ws);
                    break;

                case 'ping':
                    // Comando especial para diagnóstico
                    ws.send(JSON.stringify({
                        type: 'system',
                        message: `Pong! Usuarios conectados: ${wss.clients.size}`,
                        timestamp: new Date().toISOString(),
                        clientsCount: wss.clients.size
                    }));
                    console.log(`🏓 Ping recibido de ${message.username}, respondiendo con ${wss.clients.size} usuarios`);
                    break;

                default:
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Tipo de mensaje no reconocido',
                        timestamp: new Date().toISOString()
                    }));
            }

        } catch (error) {
            console.error('Error procesando mensaje:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Error interno del servidor',
                timestamp: new Date().toISOString()
            }));
        }
    });

    // Manejar desconexión
    ws.on('close', () => {
        const client = clients.get(ws);
        if (client) {
            console.log(`❌ Cliente desconectado: ${client.id} (${client.username || 'Anónimo'})`);
            
            // Eliminar cliente ANTES de calcular el nuevo conteo
            clients.delete(ws);
            
            // Notificar a otros clientes sobre la desconexión
            if (client.username) {
                // Obtener conteo real DESPUÉS de eliminar el cliente
                const realCount = getRealUserCount();
                
                broadcast({
                    type: 'user_left',
                    username: client.username,
                    message: `${client.username} ha abandonado el chat`,
                    timestamp: new Date().toISOString(),
                    clientsCount: realCount
                });
                
                // Enviar contador actualizado a todos los clientes restantes
                setTimeout(() => {
                    broadcastUserCount();
                }, 100);
                
                console.log(`📉 Usuario ${client.username} desconectado. Quedan ${realCount} usuarios`);
            }
        }
    });

    // Manejar errores
    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
        const client = clients.get(ws);
        if (client) {
            console.log(`⚠️ Error en cliente ${client.id}:`, error.message);
            clients.delete(ws);
        }
    });
});

// Endpoint para estadísticas (opcional)
function getServerStats() {
    return {
        connectedClients: wss.clients.size,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    };
}

// Iniciar servidor WebSocket
const localIP = getLocalIP();
console.log(`🔌 Servidor WebSocket ejecutándose en:`);
console.log(`   Local:  ws://localhost:${WS_PORT}`);
console.log(`   Red:    ws://${localIP}:${WS_PORT}`);
console.log(`📊 Estadísticas del servidor:`);
console.log(`   - Puerto: ${WS_PORT}`);
console.log(`   - Host: ${WS_HOST} (todas las interfaces)`);
console.log(`   - Protocolo: WebSocket`);
console.log(`   - Modo: Backend independiente`);
console.log(`🚀 Servidor listo para recibir conexiones...`);
console.log(`\n📱 Para conectar otros dispositivos:`);
console.log(`   Frontend: http://${localIP}:3001`);
console.log(`   Backend:  ws://${localIP}:${WS_PORT}`);

// Manejo de cierre limpio
process.on('SIGTERM', () => {
    console.log('🛑 Cerrando servidor...');
    wss.close(() => {
        console.log('✅ Servidor WebSocket cerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 Interrupción recibida, cerrando servidor...');
    wss.close(() => {
        console.log('✅ Servidor WebSocket cerrado');
        process.exit(0);
    });
});

module.exports = { wss, getServerStats };
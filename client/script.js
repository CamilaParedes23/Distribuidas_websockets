class ChatClient {
    constructor() {
        this.ws = null;
        this.username = '';
        this.isConnected = false;
        this.typingTimer = null;
        this.isTyping = false;
        
        // Sistema de colores para usuarios
        this.userColors = {}; // username -> color hex
        this.colorPalette = [
            '#e53e3e', '#3182ce', '#38a169', '#d69e2e', 
            '#805ad5', '#dd6b20', '#319795', '#e91e63',
            '#7c3aed', '#059669', '#dc2626', '#2563eb'
        ];
        this.nextColorIndex = 0;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    getNextColor() {
        const color = this.colorPalette[this.nextColorIndex % this.colorPalette.length];
        this.nextColorIndex++;
        return color;
    }

    initializeElements() {
        // Pantallas
        this.loginScreen = document.getElementById('loginScreen');
        this.chatScreen = document.getElementById('chatScreen');
        
        // Elementos de login
        this.usernameInput = document.getElementById('usernameInput');
        this.joinButton = document.getElementById('joinButton');
        
        // Elementos del chat
        this.messagesArea = document.getElementById('messagesArea');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearButton = document.getElementById('clearButton');
        this.disconnectButton = document.getElementById('disconnectButton');
        
        // Elementos de estado
        this.connectionStatus = document.getElementById('connectionStatus');
        this.clientsCount = document.getElementById('clientsCount');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.notifications = document.getElementById('notifications');
        
        // Validar elemento crítico
        if (!this.clientsCount) {
            console.error('❌ Elemento clientsCount no encontrado!');
        } else {
            console.log('✅ Elemento clientsCount encontrado:', this.clientsCount);
            console.log('✅ Valor inicial:', this.clientsCount.textContent);
        }
    }

    setupEventListeners() {
        // Eventos de login
        this.joinButton.addEventListener('click', () => this.joinChat());
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinChat();
        });

        // Eventos del chat
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Indicador de escritura
        this.messageInput.addEventListener('input', () => this.handleTyping());
        
        // Botones de acción
        this.clearButton.addEventListener('click', () => this.clearMessages());
        this.disconnectButton.addEventListener('click', () => this.disconnect());

        // Evento para manejar cierre de página
        window.addEventListener('beforeunload', () => this.disconnect());
    }

    joinChat() {
        const username = this.usernameInput.value.trim();
        
        if (!username) {
            this.showNotification('Por favor ingresa un nombre de usuario', 'error');
            return;
        }

        if (username.length > 20) {
            this.showNotification('El nombre de usuario debe tener máximo 20 caracteres', 'error');
            return;
        }

        this.username = username;
        this.connectToServer();
    }

    connectToServer() {
        try {
            // Detectar la URL del WebSocket basada en la ubicación actual
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const hostname = window.location.hostname;
            const wsUrl = `${protocol}//${hostname}:8080`;
            
            console.log(`🌐 Hostname detectado: ${hostname}`);
            console.log(`🔌 Conectando a: ${wsUrl}`);
            
            // Conectar al servidor WebSocket
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                this.isConnected = true;
                this.updateConnectionStatus(true);
                this.showChatScreen();
                this.showNotification(`Conectado como ${this.username}`, 'success');
                
                // Enviar información inicial del usuario
                this.sendToServer({
                    type: 'chat',
                    username: this.username,
                    content: 'Se ha unido al chat'
                });
            };

            this.ws.onmessage = (event) => {
                this.handleMessage(event.data);
            };

            this.ws.onclose = () => {
                this.isConnected = false;
                this.updateConnectionStatus(false);
                this.showNotification('Conexión cerrada', 'warning');
                this.showLoginScreen();
            };

            this.ws.onerror = (error) => {
                console.error('Error de WebSocket:', error);
                this.showNotification('Error de conexión', 'error');
                this.updateConnectionStatus(false);
            };

        } catch (error) {
            console.error('Error al conectar:', error);
            this.showNotification('No se pudo conectar al servidor', 'error');
        }
    }

    handleMessage(data) {
        try {
            const message = JSON.parse(data);
            console.log('📨 Mensaje recibido:', message);
            console.log('🔍 Tipo de mensaje:', message.type);
            console.log('🔍 Tipo de tipo:', typeof message.type);
            if (message.clientsCount !== undefined) {
                console.log('📊 Contador en mensaje:', message.clientsCount);
            }
            
            // VERIFICAR SI VIENE COLOR EN MENSAJE DE CHAT
            if (message.type === 'chat') {
                console.log(`🎨 COLOR EN MENSAJE: ${message.color || 'NO VIENE'}`);
                console.log(`👤 USUARIO EN MENSAJE: ${message.username || 'NO VIENE'}`);
            }
            
            // Debug específico para user_count_update
            if (message.type === 'user_count_update') {
                console.log('🎯 DETECTADO user_count_update - procesando...');
            }
            
            switch (message.type) {
                case 'chat':
                    console.log('✅ Procesando caso: chat');
                    this.displayMessage(message, 'chat');
                    break;
                
                case 'system':
                    console.log('✅ Procesando caso: system');
                    this.displayMessage(message, 'system');
                    // Actualizar contador si viene en el mensaje del sistema
                    if (message.clientsCount !== undefined) {
                        console.log(`🔄 Contador del sistema: ${message.clientsCount}`);
                        this.updateClientsCount(message.clientsCount);
                    }
                    break;
                
                case 'user_joined':
                    console.log('✅ Procesando caso: user_joined');
                    this.displayMessage(message, 'user-joined');
                    if (message.clientsCount !== undefined) {
                        console.log(`👤 Usuario se unió, contador: ${message.clientsCount}`);
                        this.updateClientsCount(message.clientsCount);
                    }
                    break;
                
                case 'user_left':
                    console.log('✅ Procesando caso: user_left');
                    this.displayMessage(message, 'user-left');
                    if (message.clientsCount !== undefined) {
                        console.log(`👋 Usuario se fue, contador: ${message.clientsCount}`);
                        this.updateClientsCount(message.clientsCount);
                    }
                    break;
                
                case 'user_count_update':
                    console.log('✅ Procesando caso: user_count_update');
                    // Actualización de contador sin mostrar mensaje
                    console.log(`🔄 RECIBIDA Actualización de contador: ${message.clientsCount}`);
                    console.log(`🔄 APLICANDO updateClientsCount(${message.clientsCount})`);
                    this.updateClientsCount(message.clientsCount);
                    break;
                
                case 'typing':
                    this.showTypingIndicator(message.username);
                    break;
                
                case 'stop_typing':
                    this.hideTypingIndicator(message.username);
                    break;
                
                case 'error':
                    this.showNotification(message.message, 'error');
                    break;
                
                default:
                    console.warn('Tipo de mensaje desconocido:', message.type);
            }
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
        }
    }



    displayMessage(message, type) {
        console.log(`🎨 displayMessage - type: ${type}, username: ${message.username}, color: ${message.color}`);
        
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${type}`;
        
        const timestamp = new Date(message.timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        if (type === 'chat' && message.username) {
            // Obtener color del mensaje
            let userColor = message.color || '#4a5568'; // Gris por defecto
            
            // Guardar color para uso futuro
            if (message.color) {
                this.userColors[message.username] = message.color;
            } else if (this.userColors[message.username]) {
                userColor = this.userColors[message.username];
            } else {
                userColor = this.getNextColor();
                this.userColors[message.username] = userColor;
            }
            
            console.log(`🎨 COLOR FINAL: ${userColor} para ${message.username}`);
            
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-username" style="color: ${userColor} !important; font-weight: bold;">${this.escapeHtml(message.username)}</span>
                    <span class="message-timestamp">${timestamp}</span>
                </div>
                <div class="message-content">${this.escapeHtml(message.content)}</div>
            `;
            
            // Aplicar borde de color al mensaje
            messageElement.style.borderLeft = `4px solid ${userColor}`;
            messageElement.style.background = `linear-gradient(90deg, ${userColor}10 0%, #ffffff 100%)`;
            
        } else {
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-timestamp">${timestamp}</span>
                </div>
                <div class="message-content">${this.escapeHtml(message.message || message.content)}</div>
            `;
        }

        // Agregar animación para nuevos mensajes
        if (type === 'chat') {
            messageElement.classList.add('message-new');
            // Remover la clase después de la animación
            setTimeout(() => {
                messageElement.classList.remove('message-new');
            }, 600);
        }

        this.messagesArea.appendChild(messageElement);
        this.scrollToBottom();
    }

    sendMessage() {
        const content = this.messageInput.value.trim();
        
        if (!content) return;
        
        if (!this.isConnected) {
            this.showNotification('No estás conectado al servidor', 'error');
            return;
        }

        if (content.length > 500) {
            this.showNotification('El mensaje es demasiado largo (máximo 500 caracteres)', 'error');
            return;
        }

        this.sendToServer({
            type: 'chat',
            username: this.username,
            content: content
        });

        this.messageInput.value = '';
        this.stopTyping();
    }

    handleTyping() {
        if (!this.isConnected) return;

        if (!this.isTyping) {
            this.isTyping = true;
            this.sendToServer({
                type: 'typing',
                username: this.username
            });
        }

        // Reiniciar timer
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.stopTyping();
        }, 1000);
    }

    stopTyping() {
        if (this.isTyping) {
            this.isTyping = false;
            if (this.isConnected) {
                this.sendToServer({
                    type: 'stop_typing',
                    username: this.username
                });
            }
        }
        clearTimeout(this.typingTimer);
    }

    showTypingIndicator(username) {
        if (username !== this.username) {
            this.typingIndicator.textContent = `${username} está escribiendo...`;
        }
    }

    hideTypingIndicator(username) {
        if (this.typingIndicator.textContent.includes(username)) {
            this.typingIndicator.textContent = '';
        }
    }

    // Función de emergencia para forzar actualización del contador
    forceUpdateCounter() {
        console.log('🔄 Forzando actualización del contador...');
        this.sendToServer({
            type: 'ping',
            username: this.username || 'Usuario'
        });
    }

    sendToServer(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('📤 Enviando al servidor:', data);
            this.ws.send(JSON.stringify(data));
        } else {
            console.error('❌ WebSocket no está abierto. Estado:', this.ws?.readyState);
        }
    }

    clearMessages() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los mensajes?')) {
            this.messagesArea.innerHTML = '';
            this.showNotification('Mensajes limpiados', 'success');
        }
    }

    disconnect() {
        if (this.ws) {
            this.stopTyping();
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.updateConnectionStatus(false);
        this.showLoginScreen();
    }

    showLoginScreen() {
        this.loginScreen.classList.remove('hidden');
        this.chatScreen.classList.add('hidden');
        this.usernameInput.value = '';
        this.usernameInput.focus();
    }

    showChatScreen() {
        this.loginScreen.classList.add('hidden');
        this.chatScreen.classList.remove('hidden');
        this.messageInput.focus();
    }

    updateConnectionStatus(connected) {
        if (connected) {
            this.connectionStatus.textContent = 'Conectado';
            this.connectionStatus.className = 'status-connected';
        } else {
            this.connectionStatus.textContent = 'Desconectado';
            this.connectionStatus.className = 'status-disconnected';
            this.updateClientsCount(0);
        }
    }

    updateClientsCount(count) {
        console.log(`🔧 updateClientsCount llamada con: ${count}, tipo: ${typeof count}`);
        
        const actualCount = count || 0;
        const currentText = this.clientsCount.textContent;
        
        console.log(`🔧 Valor actual en DOM: "${currentText}"`);
        console.log(`🔧 Nuevo valor a establecer: "Usuarios: ${actualCount}"`);
        
        this.clientsCount.textContent = `Usuarios: ${actualCount}`;
        
        // Verificar que se aplicó el cambio
        const newText = this.clientsCount.textContent;
        console.log(`🔧 Valor después del cambio: "${newText}"`);
        
        // Animación visual para indicar cambio
        this.clientsCount.style.transform = 'scale(1.1)';
        this.clientsCount.style.transition = 'transform 0.2s ease';
        this.clientsCount.style.backgroundColor = '#ffeb3b'; // Amarillo para debug
        
        setTimeout(() => {
            this.clientsCount.style.transform = 'scale(1)';
            this.clientsCount.style.backgroundColor = '';
        }, 500);
        
        console.log(`👥 Usuarios conectados: ${actualCount}`);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        this.notifications.appendChild(notification);
        
        // Remover notificación después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    scrollToBottom() {
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const chatClient = new ChatClient();
    
    // Hacer la instancia global para debugging y funciones de emergencia
    window.chatClient = chatClient;
    
    // Función global para forzar actualización del contador
    window.forceUpdateCounter = () => chatClient.forceUpdateCounter();
    
    console.log('🚀 Cliente de chat inicializado');
    console.log('💡 Para forzar actualización del contador: forceUpdateCounter()');
});
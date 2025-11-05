# 🧪 INSTRUCCIONES DE PRUEBA - Contador en Tiempo Real

## 📋 Pasos para Probar el Contador Corregido

### 🔄 **Orden de Conexión para la Prueba:**

1. **📱 Celular** - Conectar PRIMERO

   - Abrir: `http://10.211.226.163:3001`
   - Nombre: "Celular"
   - ✅ Debería mostrar: "Usuarios: 1"

2. **💻 Laptop** - Conectar SEGUNDO

   - Abrir: `http://10.211.226.163:3001`
   - Nombre: "Laptop"
   - ✅ Debería mostrar: "Usuarios: 2"
   - ✅ Celular debería actualizarse a: "Usuarios: 2"

3. **🖥️ PC Host** - Conectar ÚLTIMO (TU PC)
   - Abrir: `http://127.0.0.1:3001`
   - Nombre: "Host"
   - ✅ **IMPORTANTE**: Debería mostrar: "Usuarios: 3" (NO 0)
   - ✅ Todos los dispositivos deberían mostrar: "Usuarios: 3"

### 🔍 **Qué Verificar en el Host:**

1. **En la consola del navegador** (F12):

   ```
   🌐 Hostname detectado: 127.0.0.1
   🔌 Conectando a: ws://127.0.0.1:8080
   🔄 Contador del sistema: 3
   👤 Usuario se unió, contador: 3
   🔄 Actualización de contador: 3
   👥 Usuarios conectados: 3
   ```

2. **En el terminal del backend**:
   ```
   🔗 Nueva conexión: client_3 desde 127.0.0.1
   📊 Cliente client_3 informado de 3 usuarios conectados
   👤 Usuario Host registrado. Total: 3 usuarios
   📊 Enviando contador a 3 clientes: 3 usuarios
   ```

### 🧪 **Comando de Diagnóstico:**

Si el contador sigue mostrando 0 en el host:

1. **Abrir consola del navegador** en el host (F12)
2. **Ejecutar**:
   ```javascript
   window.chatClient.sendToServer({
     type: "ping",
     username: "Host",
   });
   ```
3. **Verificar respuesta**: Debería mostrar el número correcto de usuarios

### 🔄 **Prueba de Desconexión:**

1. **Cerrar el celular** (cerrar pestaña o navegador)
2. **Verificar**: Laptop y Host deberían mostrar "Usuarios: 2"
3. **Cerrar la laptop**
4. **Verificar**: Host debería mostrar "Usuarios: 1"

### ❌ **Si el Problema Persiste:**

1. **Verificar que el firewall esté configurado**:

   - Ejecutar `configurar-firewall.bat` como administrador

2. **Revisar logs del backend** para ver si:

   - Las conexiones se registran correctamente
   - Los contadores se están enviando
   - No hay errores de WebSocket

3. **Verificar en cada dispositivo**:
   - Que la URL sea exactamente: `http://10.211.226.163:3001`
   - Que estén en la misma red Wi-Fi
   - Que no haya errores en la consola (F12)

### 🎯 **Resultado Esperado:**

- **✅ Todos los dispositivos muestran el mismo número de usuarios**
- **✅ El contador se actualiza inmediatamente cuando alguien se conecta/desconecta**
- **✅ El host ve el número correcto, NO cero**
- **✅ Animación visual cuando cambia el contador**

---

## 📞 URLs para la Prueba:

- **Celular/Laptop**: `http://10.211.226.163:3001`
- **PC Host**: `http://127.0.0.1:3001`

¡El contador debería funcionar perfectamente en tiempo real en todos los dispositivos!

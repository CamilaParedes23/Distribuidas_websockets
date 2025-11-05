@echo off
echo ===============================================
echo   CONFIGURAR FIREWALL PARA CHAT WEBSOCKET
echo ===============================================
echo.

REM Detectar IP actual automáticamente
echo Detectando IP de red local...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set "IP=%%b"
        echo IP detectada: %%b
    )
)

echo Agregando reglas de firewall...
echo.

REM Agregar regla para el backend (puerto 8080)
netsh advfirewall firewall add rule name="Chat WebSocket Backend" dir=in action=allow protocol=TCP localport=8080
if %errorlevel% equ 0 (
    echo ✅ Regla agregada para puerto 8080 (Backend)
) else (
    echo ❌ Error agregando regla para puerto 8080
)

REM Agregar regla para el frontend (puerto 3001)
netsh advfirewall firewall add rule name="Chat WebSocket Frontend" dir=in action=allow protocol=TCP localport=3001
if %errorlevel% equ 0 (
    echo ✅ Regla agregada para puerto 3001 (Frontend)
) else (
    echo ❌ Error agregando regla para puerto 3001
)

echo.
echo ===============================================
echo   CONFIGURACIÓN COMPLETADA
echo ===============================================
echo.
echo Ahora otros dispositivos pueden conectarse a:
echo Frontend: http://%IP%:3001
echo Backend:  ws://%IP%:8080
echo.
echo ===============================================
echo   INSTRUCCIONES PARA USAR EL CHAT
echo ===============================================
echo.
echo 1. Compartir esta URL con otros usuarios: http://%IP%:3001
echo 2. Todos deben estar en la misma red Wi-Fi
echo 3. Cada persona debe usar un nombre diferente
echo 4. El contador de usuarios se actualiza en tiempo real
echo 5. Los mensajes aparecen instantaneamente en todos los dispositivos
echo.
pause
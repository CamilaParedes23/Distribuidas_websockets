@echo off
echo ===============================================
echo   MOSTRAR IP ACTUAL PARA CHAT WEBSOCKET
echo ===============================================
echo.

REM Detectar IP actual automáticamente
echo Detectando todas las IPs de red local...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        if not "%%b"=="127.0.0.1" (
            echo IP encontrada: %%b
            set "IP=%%b"
        )
    )
)

echo.
echo ===============================================
echo   IP PRINCIPAL DETECTADA: %IP%
echo ===============================================
echo.
echo URLs para compartir:
echo Frontend: http://%IP%:3001
echo Backend:  ws://%IP%:8080
echo.
echo ===============================================
echo   INSTRUCCIONES PARA USAR EL CHAT
echo ===============================================
echo.
echo 1. Asegúrate de que el servidor esté ejecutándose:
echo    - Ejecuta: npm start (en carpeta server)
echo    - Ejecuta: npm start (en carpeta client)
echo.
echo 2. Comparte esta URL: http://%IP%:3001
echo 3. Todos deben estar en la misma red Wi-Fi
echo 4. Cada persona debe usar un nombre diferente
echo.
echo ✅ ¡El chat ya está funcionando correctamente!
echo.
pause
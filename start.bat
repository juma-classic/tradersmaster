@echo off
echo Starting Trading Bot Application...
echo.
echo Choose your preferred method:
echo 1. Node.js server (recommended)
echo 2. Python server
echo 3. Open in default browser (may not work due to CORS)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting Node.js server...
    node server.js
) else if "%choice%"=="2" (
    echo Starting Python server...
    python server.py
) else if "%choice%"=="3" (
    echo Opening in browser...
    start bot.html
) else (
    echo Invalid choice. Starting Node.js server by default...
    node server.js
)

pause
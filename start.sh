#!/bin/bash

echo "Starting Trading Bot Application..."
echo ""
echo "Choose your preferred method:"
echo "1. Node.js server (recommended)"
echo "2. Python server"
echo "3. Open in default browser (may not work due to CORS)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "Starting Node.js server..."
        node server.js
        ;;
    2)
        echo "Starting Python server..."
        python3 server.py
        ;;
    3)
        echo "Opening in browser..."
        if command -v xdg-open > /dev/null; then
            xdg-open bot.html
        elif command -v open > /dev/null; then
            open bot.html
        else
            echo "Please open bot.html in your browser manually"
        fi
        ;;
    *)
        echo "Invalid choice. Starting Node.js server by default..."
        node server.js
        ;;
esac
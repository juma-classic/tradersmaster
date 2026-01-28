# Trading Bot Application

This is a scraped and modified version of a trading platform interface.

## Files Structure

- `bot.html` - Main HTML file (modified to work with local assets)
- `css/` - Stylesheets directory
- `js/` - JavaScript files directory
- `public/` - Static assets directory
- `manifest.json` - Web app manifest
- `favicon.ico` - Site icon

## How to Run

### Option 1: Using Node.js
```bash
# Make sure you have Node.js installed
node server.js
# or
npm start
```

### Option 2: Using Python
```bash
# Make sure you have Python 3 installed
python server.py
# or
npm run serve
```

### Option 3: Using any HTTP server
You can use any local HTTP server. For example:
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js http-server (install with: npm install -g http-server)
http-server -p 8000

# Using PHP's built-in server
php -S localhost:8000
```

## Access the Application

After starting the server, open your browser and go to:
- http://localhost:8000

## Notes

- The application has been modified to work with local files instead of absolute paths
- Some external dependencies (like Google Tag Manager and external scripts) have been commented out
- The app may not be fully functional as it depends on backend services that are not included
- This is primarily the frontend interface - actual trading functionality would require proper backend integration

## Troubleshooting

1. **Files not loading**: Make sure all CSS and JS files are in their respective directories
2. **CORS errors**: Use one of the provided servers instead of opening the HTML file directly
3. **Missing assets**: Some images and icons may be missing - this is normal for a scraped version

## Security Warning

This is a scraped version of a trading platform. Do not use this for actual trading or enter real credentials. It's for educational/development purposes only.
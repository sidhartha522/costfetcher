# Deployment Guide for Furniture Price Calculator PWA

## Option 1: Free Web Hosting (Recommended)

### Using Netlify (Free):
1. Create account at https://netlify.com
2. Drag and drop your entire project folder to Netlify
3. Get a free URL like: `your-app-name.netlify.app`
4. Users can visit this URL and install the app

### Using Vercel (Free):
1. Create account at https://vercel.com
2. Connect your GitHub repo or upload files
3. Get a free URL like: `your-app-name.vercel.app`

### Using GitHub Pages (Free):
1. Create a GitHub repository
2. Upload all your files
3. Enable GitHub Pages in repository settings
4. Get URL like: `username.github.io/repository-name`

## Option 2: Custom Domain
- Buy a domain (like `furniturepricalc.com`)
- Point it to your hosting service
- Users visit your custom domain

## Option 3: Local Network Sharing
```bash
# Start the local server
python3 server.py

# Share the IP address with others on your network
# They can visit: http://YOUR_IP:8000
```

## Installation Instructions for Users

### Mobile Installation:
1. **Android**: Visit the website → Chrome will show "Add to Home Screen" → Tap it
2. **iOS**: Visit in Safari → Share button → "Add to Home Screen"

### Desktop Installation:
1. **Chrome/Edge**: Visit website → Click install icon in address bar
2. **Or**: Menu → "Install App Name"

## Features After Installation:
✅ Works offline (except currency rates)
✅ Appears in app drawer/home screen
✅ Fullscreen experience
✅ Push notifications (if added)
✅ Fast loading with caching
✅ Automatic updates when you update the website

## QR Code for Easy Sharing
Generate a QR code with your website URL so users can quickly scan and install.

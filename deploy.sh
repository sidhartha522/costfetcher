#!/bin/bash

# Simple deployment script for Furniture Price Calculator PWA

echo "🚀 Preparing Furniture Price Calculator for deployment..."

# Create a deployment package
echo "📦 Creating deployment package..."
rm -rf deploy/
mkdir deploy/

# Copy all necessary files
cp index.html deploy/
cp manifest.json deploy/
cp styles.css deploy/
cp script.js deploy/
cp sw.js deploy/
cp server.py deploy/
cp -r icons/ deploy/

echo "✅ Deployment package created in 'deploy' folder"
echo ""
echo "📋 Next steps:"
echo "1. Upload the 'deploy' folder contents to your web hosting service"
echo "2. Or zip the deploy folder and upload to Netlify/Vercel"
echo "3. Share the URL with users for installation"
echo ""
echo "🌐 For testing locally:"
echo "   cd deploy && python3 server.py"
echo ""
echo "📱 Users can install by:"
echo "   • Android: Chrome → Add to Home Screen"
echo "   • iOS: Safari → Share → Add to Home Screen" 
echo "   • Desktop: Browser → Install App icon"

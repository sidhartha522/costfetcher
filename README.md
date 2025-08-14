# Furniture Price Calculator PWA

A Progressive Web App (PWA) to calculate furniture costs from China to India with real-time exchange rates. This app can be installed on mobile devices like a native app and works offline.

## Features

✅ **Real-time CNY to INR exchange rates**  
✅ **Offline functionality** (except currency conversion)  
✅ **Installable on mobile devices** (like an APK)  
✅ **Responsive design** for all screen sizes  
✅ **Auto-calculation** with breakdown  
✅ **10% excise duty** included  
✅ **Cached exchange rates** for offline use  

## How to Install on Your Phone

### Android (Chrome):
1. Open Chrome browser
2. Visit your app URL
3. Tap the "Install" prompt or menu → "Add to Home Screen"
4. The app will appear on your home screen like a native app

### iPhone (Safari):
1. Open Safari browser
2. Visit your app URL
3. Tap the Share button (square with arrow)
4. Select "Add to Home Screen"
5. Tap "Add" to install

## Local Testing

1. **Start the server:**
   ```bash
   python3 server.py
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Test PWA features:**
   - Open Chrome DevTools → Application → Manifest
   - Check if manifest loads correctly
   - Test offline functionality (DevTools → Network → Offline)

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your app will be available at: `https://yourusername.github.io/repositoryname`

### Option 2: Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant URL like: `https://randomname.netlify.app`

### Option 3: Vercel (Free)
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployment with custom domain

### Option 4: Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## File Structure

```
pricecalculator/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── script.js           # App logic and PWA functionality
├── manifest.json       # PWA manifest for installation
├── sw.js              # Service Worker for offline functionality
├── server.py          # Local development server
├── generate_icons.py  # Icon generator script
└── icons/             # App icons for all sizes
    ├── icon-32x32.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## API Information

The app uses free exchange rate APIs:
- Primary: [exchangerate-api.com](https://exchangerate-api.com)
- Fallback: [fxratesapi.com](https://fxratesapi.com)

## Calculation Formula

```
Transportation Cost = Transport Charge per m³ × Furniture Volume
Subtotal (CNY) = Furniture Price + Transportation Cost
Subtotal (INR) = Subtotal (CNY) × Exchange Rate
Excise Duty = Subtotal (INR) × 10%
Total Price = Subtotal (INR) + Excise Duty
```

## Browser Support

- ✅ Chrome (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Firefox (with limited PWA features)
- ✅ Edge (Windows/Android)

## Troubleshooting

**PWA not installing?**
- Ensure HTTPS connection (required for PWA)
- Check manifest.json is loading correctly
- Verify service worker is registered

**Exchange rate not loading?**
- Check internet connection
- API might have rate limits
- App will use cached rates offline

**Icons not showing?**
- Regenerate icons: `python3 generate_icons.py`
- Ensure all icon files are in `/icons/` folder

## Customization

### Change Colors:
Edit `styles.css` - look for color variables at the top

### Modify Exchange Rate Source:
Edit `script.js` - update the API URL in `fetchExchangeRate()`

### Adjust Excise Duty:
Edit `script.js` - change `0.10` (10%) to your desired percentage

## License

Free to use and modify for personal and commercial purposes.

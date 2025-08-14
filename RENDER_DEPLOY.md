# Deploy to Render - Step by Step Guide

## 🚀 Deploying Your Furniture Price Calculator to Render

### Prerequisites:
- A GitHub account
- Your project files ready

### Step 1: Prepare Your Project for Render

First, let's create a simple build script and ensure everything is ready:

```bash
# Make sure all files are in place
ls -la
```

### Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name it: `furniture-price-calculator`
4. Make it public
5. Don't initialize with README (we'll upload our files)

### Step 3: Push Your Code to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Furniture Price Calculator PWA"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/furniture-price-calculator.git

# Push to GitHub
git push -u origin main
```

### Step 4: Deploy on Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Static Site"**
4. **Connect your GitHub repository**: `furniture-price-calculator`
5. **Configure the deployment:**
   - **Name**: `furniture-price-calculator` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Build Command**: (leave blank - it's a static site)
   - **Publish Directory**: `.` (current directory)
6. **Click "Create Static Site"**

### Step 5: Your App is Live! 🎉

After deployment (usually 2-3 minutes), you'll get a URL like:
```
https://furniture-price-calculator.onrender.com
```

### Step 6: Test Installation

1. **Visit your Render URL**
2. **On mobile**: Browser will show "Add to Home Screen"
3. **On desktop**: Look for install icon in address bar

### Step 7: Update Your App

Whenever you make changes:
```bash
git add .
git commit -m "Update app"
git push
```
Render will automatically redeploy your app!

## 📱 Sharing Your App

Share this URL with users:
```
https://your-app-name.onrender.com
```

Users can install it as an app on their devices!

## 🔧 Troubleshooting

### If deployment fails:
- Check that all files are committed to Git
- Ensure manifest.json and all icons exist
- Verify no syntax errors in HTML/CSS/JS

### For custom domain:
- Go to Render dashboard → Settings → Custom Domains
- Add your domain (requires paid plan or bring your own domain)

## 💡 Pro Tips

1. **Free tier limitations**: Sites sleep after 15 minutes of inactivity
2. **Keep it awake**: Use a service like UptimeRobot to ping your site
3. **HTTPS included**: Render provides free SSL certificates
4. **Auto-deploy**: Every git push triggers a new deployment

Your PWA will work perfectly on Render and users can install it like a native app!

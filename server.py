#!/usr/bin/env python3
"""
Simple HTTP server to test the PWA locally
Run this script and open http://localhost:8000 in your browser
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Change to the app directory
os.chdir(Path(__file__).parent)

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers for PWA
        self.send_header('Cache-Control', 'no-cache')
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.json'):
            self.send_header('Content-Type', 'application/json')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.webmanifest') or path.endswith('manifest.json'):
            return 'application/manifest+json'
        return mimetype

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Starting server at http://localhost:{PORT}")
        print(f"📱 Open this URL in Chrome/Safari to test PWA installation")
        print(f"💡 Use Chrome DevTools > Application > Manifest to debug PWA")
        print(f"⏹️  Press Ctrl+C to stop the server")
        
        # Auto-open browser
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
            
        httpd.serve_forever()

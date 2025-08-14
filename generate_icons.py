#!/usr/bin/env python3
"""
Simple icon generator for the PWA
Creates placeholder icons with gradient background and furniture emoji
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_icon(size, filename):
        # Create image with gradient-like background
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Add simple furniture-like design
        # Background circle
        margin = size // 8
        draw.ellipse([margin, margin, size-margin, size-margin], fill='#764ba2')
        
        # Inner circle
        inner_margin = size // 4
        draw.ellipse([inner_margin, inner_margin, size-inner_margin, size-inner_margin], fill='white')
        
        # Simple chair representation
        chair_size = size // 3
        chair_x = (size - chair_size) // 2
        chair_y = (size - chair_size) // 2
        
        # Chair back
        draw.rectangle([chair_x, chair_y, chair_x + chair_size, chair_y + chair_size//3], fill='#667eea')
        # Chair seat
        draw.rectangle([chair_x, chair_y + chair_size//3, chair_x + chair_size, chair_y + chair_size//2], fill='#667eea')
        # Chair legs
        leg_width = chair_size // 8
        draw.rectangle([chair_x, chair_y + chair_size//2, chair_x + leg_width, chair_y + chair_size], fill='#667eea')
        draw.rectangle([chair_x + chair_size - leg_width, chair_y + chair_size//2, chair_x + chair_size, chair_y + chair_size], fill='#667eea')
        
        # Save icon
        img.save(f'icons/{filename}')
        print(f'Created {filename}')
    
    # Create icons directory
    os.makedirs('icons', exist_ok=True)
    
    # Generate all required icon sizes
    sizes = [32, 72, 96, 128, 144, 152, 192, 384, 512]
    
    for size in sizes:
        create_icon(size, f'icon-{size}x{size}.png')
    
    print("All icons generated successfully!")
    
except ImportError:
    print("PIL (Pillow) not installed. Creating simple colored rectangles instead...")
    
    # Fallback: create simple SVG icons
    def create_svg_icon(size, filename):
        svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="{size}" height="{size}" fill="url(#grad1)" rx="{size//8}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-size="{size//2}" fill="white">🪑</text>
</svg>'''
        
        with open(f'icons/{filename}', 'w') as f:
            f.write(svg_content)
        print(f'Created {filename}')
    
    import os
    os.makedirs('icons', exist_ok=True)
    
    # For web use, we can use SVG
    sizes = [32, 72, 96, 128, 144, 152, 192, 384, 512]
    for size in sizes:
        create_svg_icon(size, f'icon-{size}x{size}.svg')
    
    print("SVG icons created! For PNG icons, install Pillow: pip install Pillow")

# Image Optimization Script

This script optimizes all images in `public/assets` by converting them to high-quality JPG format.

## Installation

Install the required dependency:

```bash
pnpm add -D sharp
```

## Usage

Run the optimization script:

```bash
pnpm run optimize-images
```

Or directly:

```bash
node scripts/optimize-images.js
```

## What it does

1. **Scans** all images in `public/assets` (recursively)
2. **Converts** PNG, WebP, and JPEG files to high-quality JPG (mozjpeg quality 90)
3. **Resizes** images wider than 2560px to 2560px (maintains aspect ratio)
4. **Updates** all code references in `src` folder (`.tsx`, `.ts`, `.css`, `.json` files)
5. **Deletes** original files after successful conversion
6. **Logs** all changes to console

## Safety Features

- Skips files that are already JPG
- Logs every action for transparency
- Only processes images in `public/assets`
- Updates code references automatically
- Provides detailed statistics at the end

## Example Output

```
🚀 Starting image optimization...

📁 Scanning: /path/to/public/assets

📸 Found 55 image files

🔄 Processing: /public/assets/hero-image.png
  📏 Resizing: 3840px → 2560px
  ✅ Converted: 2887.05KB → 1245.32KB (56.9% reduction)
  🔍 Searching for references in code...
  📝 Updated: src/sections/home/HeroSection.tsx (1 replacements)
  ✅ Total code replacements: 1
  🗑️  Deleted: /public/assets/hero-image.png

📊 OPTIMIZATION SUMMARY
============================================================
✅ Processed: 45
🔄 Converted: 45
📏 Resized: 12
⏭️  Skipped: 10
📝 Code updates: 127
🗑️  Files deleted: 45
❌ Errors: 0

💾 Size reduction:
   Before: 280.45 MB
   After: 125.32 MB
   Savings: 155.13 MB (55.3%)
============================================================
```

#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
const SRC_DIR = path.join(process.cwd(), 'src');
const MAX_WIDTH = 2560;
const JPEG_QUALITY = 90;
const FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
const CODE_EXTENSIONS = ['.tsx', '.ts', '.css', '.json'];

// Statistics
const stats = {
    processed: 0,
    converted: 0,
    resized: 0,
    skipped: 0,
    errors: 0,
    codeUpdates: 0,
    filesDeleted: 0,
    totalSizeBefore: 0,
    totalSizeAfter: 0,
};

/**
 * Get all image files recursively
 */
async function getAllImageFiles(dir, fileList = []) {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dir, file.name);
        const ext = path.extname(file.name).toLowerCase();

        if (file.isDirectory()) {
            await getAllImageFiles(filePath, fileList);
        } else if (FILE_EXTENSIONS.includes(ext)) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

/**
 * Get all code files recursively
 */
async function getAllCodeFiles(dir, fileList = []) {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dir, file.name);
        const ext = path.extname(file.name).toLowerCase();

        if (file.isDirectory()) {
            // Skip node_modules and .next
            if (!file.name.startsWith('.') && file.name !== 'node_modules') {
                await getAllCodeFiles(filePath, fileList);
            }
        } else if (CODE_EXTENSIONS.includes(ext)) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

/**
 * Convert image to JPG with optimization
 * Handles overwriting safely by processing to buffer first
 */
async function optimizeImage(inputPath, outputPath) {
    try {
        const metadata = await sharp(inputPath).metadata();
        const originalSize = (await fs.stat(inputPath)).size;
        stats.totalSizeBefore += originalSize;

        const isOverwrite = inputPath === outputPath;
        let image = sharp(inputPath);

        // Resize if width > MAX_WIDTH
        if (metadata.width && metadata.width > MAX_WIDTH) {
            image = image.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside',
            });
            stats.resized++;
            console.log(`  📏 Resizing: ${metadata.width}px → ${MAX_WIDTH}px`);
        }

        // Process to buffer first (safe for overwriting)
        const buffer = await image
            .jpeg({
                quality: JPEG_QUALITY,
                mozjpeg: true,
            })
            .toBuffer();

        // Write buffer to file (safe overwrite)
        await fs.writeFile(outputPath, buffer);

        const newSize = buffer.length;
        stats.totalSizeAfter += newSize;
        const savings = ((originalSize - newSize) / originalSize) * 100;

        const action = isOverwrite ? 'Optimized' : 'Converted';
        console.log(
            `  ✅ ${action}: ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${savings.toFixed(1)}% reduction)`
        );

        return true;
    } catch (error) {
        console.error(`  ❌ Error processing ${inputPath}:`, error.message);
        stats.errors++;
        return false;
    }
}

/**
 * Find and replace file references in code and JSON files
 */
async function updateCodeReferences(oldPath, newPath) {
    const oldFileName = path.basename(oldPath);
    const newFileName = path.basename(newPath);
    const oldRelativePath = oldPath.replace(process.cwd(), '').replace(/\\/g, '/');
    const newRelativePath = newPath.replace(process.cwd(), '').replace(/\\/g, '/');

    // Get relative paths from public/assets (with leading slash)
    const oldPublicPath = oldRelativePath.replace('/public', '');
    const newPublicPath = newRelativePath.replace('/public', '');

    // Also get paths without leading slash for JSON arrays
    const oldPublicPathNoSlash = oldPublicPath.startsWith('/') ? oldPublicPath.slice(1) : oldPublicPath;
    const newPublicPathNoSlash = newPublicPath.startsWith('/') ? newPublicPath.slice(1) : newPublicPath;

    const codeFiles = await getAllCodeFiles(SRC_DIR);
    let totalReplacements = 0;

    for (const codeFile of codeFiles) {
        try {
            let content = await fs.readFile(codeFile, 'utf8');
            let modified = false;
            let fileReplacements = 0;

            // Replace various possible reference formats
            const replacements = [
                // Full public path with quotes: "/assets/image.png" or '/assets/image.png'
                { old: `"${oldPublicPath}"`, new: `"${newPublicPath}"` },
                { old: `'${oldPublicPath}'`, new: `'${newPublicPath}'` },
                // Full public path without quotes (for JSON arrays): /assets/image.png
                { old: oldPublicPath, new: newPublicPath },
                // Path without leading slash (for some JSON formats): "assets/image.png"
                { old: `"${oldPublicPathNoSlash}"`, new: `"${newPublicPathNoSlash}"` },
                { old: `'${oldPublicPathNoSlash}'`, new: `'${newPublicPathNoSlash}'` },
                // Just filename with quotes: "image.png" or 'image.png'
                { old: `"${oldFileName}"`, new: `"${newFileName}"` },
                { old: `'${oldFileName}'`, new: `'${newFileName}'` },
                // Just filename without quotes: image.png
                { old: oldFileName, new: newFileName },
            ];

            for (const { old, new: newVal } of replacements) {
                // Use global regex to replace all occurrences
                const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                const matches = content.match(regex);
                if (matches && matches.length > 0) {
                    content = content.replace(regex, newVal);
                    modified = true;
                    fileReplacements += matches.length;
                }
            }

            if (modified) {
                await fs.writeFile(codeFile, content, 'utf8');
                totalReplacements += fileReplacements;
                console.log(`  📝 Updated: ${codeFile.replace(process.cwd(), '')} (${fileReplacements} replacements)`);
            }
        } catch (error) {
            console.error(`  ⚠️  Error updating ${codeFile}:`, error.message);
        }
    }

    if (totalReplacements > 0) {
        stats.codeUpdates += totalReplacements;
        console.log(`  ✅ Total code replacements: ${totalReplacements}`);
    }

    return totalReplacements;
}

/**
 * Main optimization function
 */
async function optimizeImages() {
    console.log('🚀 Starting image optimization...\n');
    console.log(`📁 Scanning: ${ASSETS_DIR}\n`);

    // Check if assets directory exists
    try {
        await fs.access(ASSETS_DIR);
    } catch (error) {
        console.error(`❌ Assets directory not found: ${ASSETS_DIR}`);
        process.exit(1);
    }

    // Get all image files
    const imageFiles = await getAllImageFiles(ASSETS_DIR);
    console.log(`📸 Found ${imageFiles.length} image files\n`);

    if (imageFiles.length === 0) {
        console.log('✅ No images to process.');
        return;
    }

    // Process each image
    for (const imagePath of imageFiles) {
        const ext = path.extname(imagePath).toLowerCase();
        const dir = path.dirname(imagePath);
        const nameWithoutExt = path.basename(imagePath, ext);

        // Determine output path (always JPG)
        const newPath = path.join(dir, `${nameWithoutExt}.jpg`);
        const relativePath = imagePath.replace(process.cwd(), '');
        const isOverwrite = imagePath === newPath;

        console.log(`\n🔄 Processing: ${relativePath}${isOverwrite ? ' (optimizing existing JPG)' : ''}`);

        // Optimize image
        const success = await optimizeImage(imagePath, newPath);

        if (success) {
            stats.processed++;

            // Only count as "converted" if file extension changed
            if (!isOverwrite) {
                stats.converted++;
            }

            // Update code references only if filename changed
            if (!isOverwrite) {
                console.log(`  🔍 Searching for references in code and JSON files...`);
                await updateCodeReferences(imagePath, newPath);
            } else {
                console.log(`  ℹ️  Skipping code updates (filename unchanged)`);
            }

            // Delete old file only if it's different from new file
            if (!isOverwrite) {
                try {
                    await fs.unlink(imagePath);
                    stats.filesDeleted++;
                    console.log(`  🗑️  Deleted: ${relativePath}`);
                } catch (error) {
                    console.error(`  ⚠️  Error deleting ${imagePath}:`, error.message);
                }
            }
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Processed: ${stats.processed}`);
    console.log(`🔄 Converted: ${stats.converted}`);
    console.log(`📏 Resized: ${stats.resized}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`📝 Code updates: ${stats.codeUpdates}`);
    console.log(`🗑️  Files deleted: ${stats.filesDeleted}`);
    console.log(`❌ Errors: ${stats.errors}`);
    console.log(`\n💾 Size reduction:`);
    console.log(`   Before: ${(stats.totalSizeBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   After: ${(stats.totalSizeAfter / 1024 / 1024).toFixed(2)} MB`);
    const totalSavings = ((stats.totalSizeBefore - stats.totalSizeAfter) / stats.totalSizeBefore) * 100;
    console.log(`   Savings: ${(stats.totalSizeBefore - stats.totalSizeAfter) / 1024 / 1024} MB (${totalSavings.toFixed(1)}%)`);
    console.log('='.repeat(60));
}

// Run the script
optimizeImages().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});


const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const outDir = path.join(root, 'dist');

function cleanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (['node_modules', '.git', 'dist'].includes(path.basename(src))) return;
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else if (stats.isFile()) {
        const parent = path.dirname(dest);
        if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
        fs.copyFileSync(src, dest);
    }
}

try {
    console.log('Cleaning dist/');
    cleanDir(outDir);
    console.log('Copying files...');
    copyRecursive(root, outDir);
    console.log('Build complete. Output in dist/');
} catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
}

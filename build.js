const fs = require('fs');
const path = require('path');

const srcFiles = [
    'index.html', 'styles.css', 'script.js', 
    'favicon.svg', 'favicon-32x32.png', 'favicon-16x16.png', 
    'apple-touch-icon.png', 'site.webmanifest', 
    'UnitySMPLogo.png', 'robots.txt', 'sitemap.xml', 
    '404.html', '_headers'
];
const srcDirs = ['Images', 'Streamer Logos'];
const dist = path.join(__dirname, 'dist');

if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

srcFiles.forEach(file => {
    if (fs.existsSync(file)) fs.copyFileSync(file, path.join(dist, file));
});

srcDirs.forEach(dir => {
    if (fs.existsSync(dir)) fs.cpSync(dir, path.join(dist, dir), { recursive: true });
});

console.log('Build complete. Files copied to dist/ directory.');

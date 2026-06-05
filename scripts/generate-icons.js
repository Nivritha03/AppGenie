const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="40" fill="#4f46e5"/>
  <path d="M60 96 L96 52 L132 96 L114 96 L114 140 L78 140 L78 96 Z" fill="white"/>
  <circle cx="96" cy="155" r="8" fill="white" opacity="0.6"/>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#4f46e5"/>
  <path d="M160 256 L256 140 L352 256 L304 256 L304 372 L208 372 L208 256 Z" fill="white"/>
  <circle cx="256" cy="410" r="22" fill="white" opacity="0.6"/>
</svg>`;

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.svg'), svg192);
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.svg'), svg512);

console.log('PWA SVG icons created in public/icons/');

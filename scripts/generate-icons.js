const sharp = require('sharp');
const fs = require('fs');

// Create a simple icon with the text "TQ"
async function generateIcons() {
  const svgString = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#22c55e" rx="64"/>
      <text x="256" y="280" font-family="Arial, sans-serif" font-size="180" font-weight="bold" fill="white" text-anchor="middle">TQ</text>
      <path d="M140 400 L256 340 L372 400" stroke="white" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="256" cy="340" r="25" fill="white"/>
      <path d="M256 300 L256 340" stroke="white" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `;

  // Create 192x192 icon
  await sharp(Buffer.from(svgString))
    .resize(192, 192)
    .png()
    .toFile('public/icon-192.png');

  // Create 512x512 icon
  await sharp(Buffer.from(svgString))
    .resize(512, 512)
    .png()
    .toFile('public/icon-512.png');

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);
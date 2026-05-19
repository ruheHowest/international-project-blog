const fs   = require('fs');
const path = require('path');

const dir    = path.join(__dirname, 'assets/images/general-images');
const output = path.join(dir, 'manifest.json');

const images = fs.readdirSync(dir)
  .filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
  .sort();

fs.writeFileSync(output, JSON.stringify(images, null, 2) + '\n');
console.log(`manifest.json updated with ${images.length} images`);

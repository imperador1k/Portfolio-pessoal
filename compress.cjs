const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);

async function compressImages() {
  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const filePath = path.join(publicDir, file);
      const tempPath = path.join(publicDir, 'temp_' + file);
      
      const originalSize = fs.statSync(filePath).size;
      
      console.log('Compressing', file, '...');
      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        // Resize if too large
        if (metadata.width > 1920) {
          image.resize({ width: 1920, withoutEnlargement: true });
        }

        if (file.toLowerCase().endsWith('.png')) {
          await image.png({ quality: 60, compressionLevel: 9 }).toFile(tempPath);
        } else {
          await image.jpeg({ quality: 60, progressive: true }).toFile(tempPath);
        }
        
        const newSize = fs.statSync(tempPath).size;
        
        // Only replace if it's actually smaller
        if (newSize < originalSize) {
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Done ${file}: ${(originalSize/1024/1024).toFixed(2)}MB -> ${(newSize/1024/1024).toFixed(2)}MB`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`⏭️ Skipped ${file}: New size was not smaller.`);
        }
      } catch (err) {
        console.error('❌ Failed to compress', file, err);
      }
    }
  }
}

compressImages();

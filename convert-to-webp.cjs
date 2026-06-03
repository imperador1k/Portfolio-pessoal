const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');

async function convertToWebP() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dir, baseName + '.webp');
      
      try {
        const metadata = await sharp(filePath).metadata();
        const isIcon = file === 'icon.png' || file === 'whatsapp.png' || file === 'youtube.png' || file === 'git.png';
        const maxWidth = isIcon ? 256 : 1600;

        let s = sharp(filePath);
        if (metadata.width > maxWidth) {
          s = s.resize({ width: maxWidth, withoutEnlargement: true });
        }

        await s
          .webp({ quality: 85, effort: 6 }) // High quality WebP conversion
          .toFile(webpPath);
          
        const oldSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(webpPath).size;
        
        console.log(`Convertido ${file} -> ${baseName}.webp: ${(oldSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB`);
      } catch (err) {
        console.error(`Erro ao converter ${file}:`, err);
      }
    }
  }
}

convertToWebP();

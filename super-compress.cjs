const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');

async function processImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const isIcon = file === 'icon.png' || file === 'whatsapp.png' || file === 'youtube.png' || file === 'git.png';
      const maxWidth = isIcon ? 256 : 1600; // Profile pictures/icons can be much smaller
      
      const tempPath = filePath + '.tmp' + ext;
      
      try {
        const metadata = await sharp(filePath).metadata();
        
        let s = sharp(filePath);
        
        if (metadata.width > maxWidth) {
          s = s.resize({ width: maxWidth, withoutEnlargement: true });
        }

        if (ext === '.jpg' || ext === '.jpeg') {
          s = s.jpeg({ quality: 85, progressive: true });
        } else if (ext === '.png') {
          s = s.png({ quality: 85, compressionLevel: 9 });
        }
        
        await s.toFile(tempPath);
        
        const oldSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(tempPath).size;
        
        fs.renameSync(tempPath, filePath);
        
        console.log(`Esmagado ${file}: ${(oldSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB (-${((1 - newSize/oldSize)*100).toFixed(0)}%)`);
      } catch (err) {
        console.error(`Erro ao processar ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

processImages();

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Regex that matches internal paths: e.g. "/icon.png", "/motorcycle.jpg"
    // We only want to replace local paths (starting with / or ./ or ../) ending in .jpg/.jpeg/.png
    content = content.replace(/(['"])((\/|\.\/|\.\.\/)[^'"]+)\.(jpg|jpeg|png)\1/gi, (match, quote, pathWithoutExt, start, ext) => {
      return `${quote}${pathWithoutExt}.webp${quote}`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Atualizado:', filePath);
    }
  }
});

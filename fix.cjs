const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('src/components', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        let updated = content.replace(/\/\s*(loading="lazy"[^>]*?)>/g, '$1 />');
        
        if (content !== updated) {
            fs.writeFileSync(filePath, updated);
            console.log('Fixed:', filePath);
        }
    }
});

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
        
        let updated = content.replace(/<img([^>]*)(\/?)>/g, (match, attrs, slash) => {
            // Ignore the Hero LCP image which already has fetchPriority
            if (attrs.includes('fetchPriority')) return match;
            
            let newAttrs = attrs;
            if (!newAttrs.includes('loading=')) {
                newAttrs = newAttrs.replace(/(\s*)$/, ' loading="lazy"$1');
            }
            if (!newAttrs.includes('decoding=')) {
                newAttrs = newAttrs.replace(/(\s*)$/, ' decoding="async"$1');
            }
            if (!newAttrs.includes('alt=')) {
                newAttrs = newAttrs.replace(/(\s*)$/, ' alt=""$1');
            }
            
            return `<img${newAttrs}${slash ? '/' : ''}>`;
        });
        
        if (content !== updated) {
            fs.writeFileSync(filePath, updated);
            console.log('Updated:', filePath);
        }
    }
});

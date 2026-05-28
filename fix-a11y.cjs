const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, regex, replacement) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = content.replace(regex, replacement);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated);
      console.log(`Updated ${filePath}`);
    }
  }
}

const dir = path.join(__dirname, 'src', 'components');

// 1. SpotifyProfile.tsx - Buttons, Inputs
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button\s+onClick=\{\(\) => setView\('home'\)\}/g,
  '<button aria-label="Go home" onClick={() => setView(\'home\')}'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button className="p-1\.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">/g,
  '<button aria-label="Navigate" className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button\s+onClick=\{togglePlay\}/g,
  '<button aria-label="Toggle Play" onClick={togglePlay}'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button onClick=\{playPrev\}/g,
  '<button aria-label="Previous Track" onClick={playPrev}'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button onClick=\{playNext\}/g,
  '<button aria-label="Next Track" onClick={playNext}'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); toggleFavorite\(track\); \}\}/g,
  '<button aria-label="Toggle Favorite" onClick={(e) => { e.stopPropagation(); toggleFavorite(track); }}'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button onClick=\{\(\) => toggleFavorite/g,
  '<button aria-label="Toggle Favorite" onClick={() => toggleFavorite'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button className="absolute bottom-2 right-2/g,
  '<button aria-label="Play Playlist" className="absolute bottom-2 right-2'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button className="w-14 h-14 bg-\[#1DB954\]/g,
  '<button aria-label="Play Music" className="w-14 h-14 bg-[#1DB954]'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<button className="text-slate-400 hover:text-slate-900 transition-colors">\s*<MoreHorizontal/g,
  '<button aria-label="More Options" className="text-slate-400 hover:text-slate-900 transition-colors">\n<MoreHorizontal'
);
replaceInFile(
  path.join(dir, 'SpotifyProfile.tsx'),
  /<input\s+type="range"/g,
  '<input aria-label="Slider" type="range"'
);

// 2. LinkedInProfile.tsx - Buttons, Inputs
replaceInFile(
  path.join(dir, 'LinkedInProfile.tsx'),
  /<button\s+className="w-14 h-14 bg-white/g,
  '<button aria-label="Action" className="w-14 h-14 bg-white'
);
replaceInFile(
  path.join(dir, 'LinkedInProfile.tsx'),
  /<button className="p-2 rounded-xl/g,
  '<button aria-label="Menu" className="p-2 rounded-xl'
);
replaceInFile(
  path.join(dir, 'LinkedInProfile.tsx'),
  /<h4\s+className="text-slate-900 font-black text-xl/g, // LICENCIATURA (IPT)
  '<h3 className="text-slate-900 font-black text-xl'
);
replaceInFile(
  path.join(dir, 'LinkedInProfile.tsx'),
  /<\/h4>/g, 
  // careful here, maybe we should just replace LICENCIATURA exactly
  (match, offset, string) => string.substring(offset - 25, offset).includes('LICENCIATURA (IPT)') ? '</h3>' : match
);


// 3. GithubProfile.tsx - Buttons, Headings
replaceInFile(
  path.join(dir, 'GithubProfile.tsx'),
  /<button className="hover:text-white transition-colors">/g,
  '<button aria-label="Settings" className="hover:text-white transition-colors">'
);
replaceInFile(
  path.join(dir, 'GithubProfile.tsx'),
  /<h4 className="text-white font-bold text-base/g, // Kotlin Proficiência
  '<h3 className="text-white font-bold text-base'
);

// 4. Hero.tsx - Buttons, Links, Headings
replaceInFile(
  path.join(dir, 'Hero.tsx'),
  /<motion\.button\s+whileTap=\{\{\s*scale:\s*0\.9\s*\}\}\s+onClick=\{\(e\) => \{\s*e\.stopPropagation\(\);\s*setIsMenuOpen\(!isMenuOpen\);\s*\}\}/g,
  '<motion.button aria-label="Toggle Menu" whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}'
);
replaceInFile(
  path.join(dir, 'Hero.tsx'),
  /<motion\.button\s+whileTap=\{\{\s*scale:\s*0\.9\s*\}\}\s+onClick=\{\(\) => setEmulatorTab\('me'\)\}/g,
  '<motion.button aria-label="Open Profile" whileTap={{ scale: 0.9 }} onClick={() => setEmulatorTab(\'me\')}'
);
replaceInFile(
  path.join(dir, 'Hero.tsx'),
  /<button\s+onClick=\{\(\) => setIsMenuOpen\(false\)\}/g,
  '<button aria-label="Close Menu" onClick={() => setIsMenuOpen(false)}'
);
replaceInFile(
  path.join(dir, 'Hero.tsx'),
  /<h4\s+className={`text-xs font-bold/g,
  '<h3 className={`text-xs font-bold'
);
replaceInFile(
  path.join(dir, 'Hero.tsx'),
  /<\/h4>/g,
  '</h3>' // We'll just change all h4 to h3 in Hero since it has no valid h4 anyway
);

// 5. Footer.tsx - Contrast, Links, Buttons
replaceInFile(
  path.join(dir, 'Footer.tsx'),
  /<h4\s+className="text-\[10px\] font-black text-slate-400 uppercase/g,
  '<h3 className="text-[10px] font-black text-slate-500 uppercase'
);
replaceInFile(
  path.join(dir, 'Footer.tsx'),
  /<\/h4>/g,
  '</h3>'
);
replaceInFile(
  path.join(dir, 'Footer.tsx'),
  /text-\[#FC4C02\]/g,
  'text-[#E03C00]' // slightly darker orange for better contrast
);
replaceInFile(
  path.join(dir, 'Footer.tsx'),
  /<a href="([^"]+)"\s+target="_blank"\s+rel="noopener noreferrer"\s+className="w-12 h-12/g,
  '<a aria-label="Social Link" href="$1" target="_blank" rel="noopener noreferrer" className="w-12 h-12'
);

// 6. CareerMarathon.tsx - Headings, Contrast
replaceInFile(
  path.join(dir, 'CareerMarathon.tsx'),
  /<h5\s+className="text-\[10px\] lg:text-xs font-black text-slate-400/g, // A EVOLUÇÃO DESTE SPLIT
  '<h4 className="text-[10px] lg:text-xs font-black text-slate-500' // Better contrast and h4 instead of h5
);
replaceInFile(
  path.join(dir, 'CareerMarathon.tsx'),
  /<\/h5>/g,
  '</h4>'
);

// 7. LocationMap.tsx - Contrast
replaceInFile(
  path.join(dir, 'LocationMap.tsx'),
  /text-\[#FC4C02\]/g,
  'text-[#E03C00]' // Better contrast
);
replaceInFile(
  path.join(dir, 'Navbar.tsx'),
  /text-\[#FC4C02\]/g,
  'text-[#E03C00]' // Better contrast
);

// Generic inputs everywhere
let allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
allFiles.forEach(file => {
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  let up = content.replace(/<input(?![^>]*aria-label)([^>]*)type="range"/g, '<input aria-label="Slider" $1 type="range"');
  if (up !== content) {
    fs.writeFileSync(p, up);
    console.log(`Updated inputs in ${file}`);
  }
});

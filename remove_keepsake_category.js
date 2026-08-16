const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(html|js|md)$/.test(entry.name) ? [full] : [];
  });
}

let changed = 0;
for (const file of walk('.')) {
  if (file === 'products/interactive-packaging.html') continue;
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Remove the retired category from repeated product menus and footer lists.
  content = content.replace(/^\s*<a href="(?:\.\.\/|\.\.\/\.\.\/|)?products\/keepsake-boxes\.html" class="block px-6 py-2\.5[^\n]*>Keepsake Boxes<\/a>\s*\n/gm, '');
  content = content.replace(/^\s*<li><a href="(?:\.\.\/|\.\.\/\.\.\/|)?products\/keepsake-boxes\.html"[^\n]*>Keepsake Boxes<\/a><\/li>\s*\n/gm, '');
  content = content.replace(/^\s*<a href="\$\{relativePath\}products\/keepsake-boxes\.html"[^\n]*>Keepsake Boxes<\/a>\s*\n/gm, '');
  content = content.replace(/^\s*<li><a href="\$\{relativePath\}products\/keepsake-boxes\.html"[^\n]*>Keepsake Boxes<\/a><\/li>\s*\n/gm, '');

  // Preserve contextual recommendations by pointing them to the merged collection.
  content = content
    .replaceAll('../products/interactive-packaging.html', '../products/interactive-packaging.html')
    .replaceAll('../../products/interactive-packaging.html', '../../products/interactive-packaging.html')
    .replaceAll('products/interactive-packaging.html', 'products/interactive-packaging.html')
    .replaceAll('Explore video and interactive packaging', 'Explore video and interactive packaging')
    .replaceAll('Explore video and interactive packaging', 'Explore video and interactive packaging');

  if (content !== original) {
    fs.writeFileSync(file, content);
    changed++;
  }
}

console.log(`Updated ${changed} files and removed Keepsake Boxes navigation references.`);

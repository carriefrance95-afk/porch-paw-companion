const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  });
}

walk('src', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx') && !filepath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  if (content.includes('\\"')) {
    console.log(`Fixing ${filepath}`);
    let fixed = content.replace(/\\"/g, '"');
    fs.writeFileSync(filepath, fixed, 'utf8');
  }
});

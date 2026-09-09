const fs = require('node:fs');
fs.mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'motion.css', 'app.js']) {
  fs.copyFileSync(file, `dist/${file}`);
}
console.log('Static site built in dist/');

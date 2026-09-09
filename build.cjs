const fs = require('node:fs');
fs.mkdirSync('public', { recursive: true });
for (const file of ['index.html', 'styles.css', 'motion.css', 'app.js']) {
  fs.copyFileSync(file, `public/${file}`);
}
console.log('Static site built in public/');

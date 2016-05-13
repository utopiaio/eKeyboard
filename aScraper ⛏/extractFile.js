/*eslint no-console: ["allow"]*/

const fs = require('fs');

const train = JSON.parse(fs.readFileSync('./train.json', { encoding: 'utf8' }));
console.log(`⛏  extracting from '${process.argv[2]}'...`);
const file = fs.readFileSync(process.argv[2], { encoding: 'utf8' });

const words = file.replace(/[\u135D-\u137C፡]/g, ' ') // some use :: instead of ።
                  .match(/[\u1200-\u137C]{2,}/g); // ignoring single letter words

words.forEach((word) => {
  train[word] = train.hasOwnProperty(word) ? ++train[word] : 1;
});

fs.writeFileSync('./train.txt', Object.keys(train).join('\n'), { encoding: 'utf8' });
fs.writeFileSync('./train.json', JSON.stringify(train), { encoding: 'utf8' });

console.log('✅  extraction completed');

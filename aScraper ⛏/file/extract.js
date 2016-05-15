/*eslint no-console: ["allow"]*/

const fs = require('fs');
const path = require('path');
const extractor = require('./../a');
const TRAIN_PATH = path.join(path.resolve('./../../'), 'ቃሎች 📖', 'train');

const train = JSON.parse(fs.readFileSync(`${TRAIN_PATH}.json`, { encoding: 'utf8' }));
console.log(`⛏  extracting from '${process.argv[2]}'...`);
const file = fs.readFileSync(process.argv[2], { encoding: 'utf8' });

const words = extractor(file, { selector: null });

words.forEach((word) => {
  train[word] = train.hasOwnProperty(word) ? ++train[word] : 1;
});

fs.writeFileSync(`${TRAIN_PATH}.txt`, Object.keys(train).join('\n'), { encoding: 'utf8' });
fs.writeFileSync(`${TRAIN_PATH}.json`, JSON.stringify(train), { encoding: 'utf8' });

console.log('✅  extraction completed');

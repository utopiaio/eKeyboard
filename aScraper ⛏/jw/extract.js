/*eslint no-console: ["allow"]*/

const fs = require('fs');
const path = require('path');
const async = require('async');
const contentLinks = require('./util').contentLinks;
const extractor = require('./../a');
const TRAIN_PATH = path.join(path.resolve('./../../'), 'ቃሎች 📖', 'train');

const WORKERS = 32;
console.log('⏲  processing...');
const train = JSON.parse(fs.readFileSync(`${TRAIN_PATH}.json`, { encoding: 'utf8' }));

const extractorQueue = async.queue((link, callback) => {
  console.log(`⛏  extracting ${decodeURI(link)}...`);
  extractor(link, { selector: '#bibleText' })
    .then((words) => {
      for (const word in words) {
        if ({}.hasOwnProperty.call(words, word) === true) {
          train[word] = train.hasOwnProperty(word) ? train[word] + words[word] : words[word];
        }
      }

      console.log(`✅  done extracting from ${decodeURI(link)}`);
      callback();
    })
    .catch((err) => {
      callback(err);
    });
}, WORKERS);

extractorQueue.drain = () => {
  fs.writeFile(`${TRAIN_PATH}.txt`, Object.keys(train).join('\n'), (err) => {
    if (err) console.error(err);
  });

  fs.writeFile(`${TRAIN_PATH}.json`, JSON.stringify(train), (err) => {
    if (err) console.error(err);
  });
};

// queue for extracting content links from `pageLink`
const CONTENT_LINKS = [];
const contentLinkQueue = async.queue((pageLink, callback) => {
  contentLinks(pageLink, 'https://www.jw.org')
    .then((cLinks) => {
      cLinks.forEach((cLink) => {
        CONTENT_LINKS.push(cLink);
      });

      callback();
    })
    .catch((err) => {
      callback(err);
    });
}, WORKERS);

contentLinkQueue.drain = () => {
  // this makes sure we're dispatching all loads at once
  // else the whole thing becomes `async` and things start to fall apart
  CONTENT_LINKS.forEach((cLink) => {
    extractorQueue.push(cLink);
  });
};

contentLinkQueue.push('https://www.jw.org/am/የሕትመት-ውጤቶች/መጽሐፍ-ቅዱስ/bi12/መጻሕፍት/');

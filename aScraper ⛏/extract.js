/*eslint no-console: ["allow"]*/

const async = require('async');
const tagPageLinks = require('./a').tagPageLinks;
const contentLinks = require('./a').contentLinks;
const contentWords = require('./a').contentWords;
const fs = require('fs');

const WORKERS = 8;
const STATUS = { QUEUE: 0, COMPLETED: 0 };
const train = JSON.parse(fs.readFileSync('./train.json', { encoding: 'utf8' }));

// queue for extracting words from `contentLink`
const contentWordQueue = async.queue((contentLink, callback) => {
  ++STATUS.QUEUE;
  console.log(`⛏  extracting ${decodeURI(contentLink)}...`);
  contentWords(contentLink, { selector: '.article_content', frequency: true })
    .then((cWords) => {
      for (const word in cWords) {
        if ({}.hasOwnProperty.call(cWords, word) === true) {
          train[word] = train.hasOwnProperty(word) ? train[word] + cWords[word] : cWords[word];
        }
      }

      ++STATUS.COMPLETED;
      const PERCENT = ((STATUS.COMPLETED / STATUS.QUEUE) * 100).toFixed(1);
      console.log(`✅  [${PERCENT}%] ${decodeURI(contentLink)} `);
      callback();
    })
    .catch((err) => {
      callback(err);
    });
}, WORKERS);

contentWordQueue.drain = () => {
  fs.writeFile('./train.txt', Object.keys(train).join('\n'), (err) => {
    if (err) console.error(err);
  });

  fs.writeFile('./train.json', JSON.stringify(train), (err) => {
    if (err) console.error(err);
  });
};

// queue for extracting content links from `pageLink`
const contentLinkQueue = async.queue((pageLink, callback) => {
  contentLinks(pageLink, 'http://www.ethiopianreporter.com')
    .then((cLinks) => {
      cLinks.forEach(cLink => {
        contentWordQueue.push(cLink);
      });

      callback();
    })
    .catch((err) => {
      callback(err);
    });
}, WORKERS);

// queue for extracting pages from `tagLink`
const tagPageLinkQueue = async.queue((tagLink, callback) => {
  tagPageLinks(tagLink)
    .then((tPageLinks) => {
      tPageLinks.forEach(tPageLink => {
        contentLinkQueue.push(tPageLink);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}, WORKERS);

process.argv.forEach((arg, index) => {
  if (index > 1) {
    tagPageLinkQueue.push(arg);
  }
});

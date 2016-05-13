/*eslint no-console: ["allow"]*/

const async = require('async');
const tagPageLinks = require('./a').tagPageLinks;
const contentLinks = require('./a').contentLinks;
const contentWords = require('./a').contentWords;
const fs = require('fs');

const train = JSON.parse(fs.readFileSync('./train.json', { encoding: 'utf8' }));

// queue for extracting words from `contentLink`
const contentWordQueue = async.queue((contentLink, callback) => {
  console.log(`⛏  extracting ${decodeURI(contentLink)}...`);
  contentWords(contentLink, { selector: '.article_content', frequency: true })
    .then((cWords) => {
      for (const word in cWords) {
        if ({}.hasOwnProperty.call(cWords, word) === true) {
          train[word] = train.hasOwnProperty(word)
            ? train[word] + cWords[word]
            : cWords[word];
        }
      }

      console.log(`✅  done extracting from ${decodeURI(contentLink)}`);
      callback();
    })
    .catch((err) => {
      callback(err);
    });
}, 8);

contentWordQueue.drain = () => {
  let file = '';
  for (const word in train) {
    if ({}.hasOwnProperty.call(train, word) === true) {
      file += `${word}\n`;
    }
  }

  fs.writeFile('./train.txt', file, (err) => {
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
}, 8);

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
}, 2);

process.argv.forEach((arg, index) => {
  if (index > 1) {
    tagPageLinkQueue.push(arg);
  }
});

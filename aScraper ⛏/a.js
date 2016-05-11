// eslint-disable-next-line
'use strict';

const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

/**
 * Amharic word scraper.
 * It'll ONLY extract words, no numbers or single letters words.
 *
 * @param  {String}   url
 * @param  {Object}   options
 * @param  {Boolean}  options.unique
 * @param  {Boolean}  options.frequency
 * @return {Promise}
 */
module.exports = (url, options) => {
  // I'm not going to force you to use node-v6...not yet 😎
  if (options === undefined) {
    // eslint-disable-next-line
    options = { selector: 'body', unique: false, frequency: true };
  } else {
    // eslint-disable-next-line
    options = Object.assign({}, { selector: 'body', unique: false, frequency: true }, options);
  }

  const promise = new Promise((resolve, reject) => {
    request
      .get(encodeURI(url))
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          let allWords = cheerio.load(res.text)(options.selector)
                                .text()
                                .replace(/[\u135D-\u137C\፡]/g, ' ') // some use :: instead of ።
                                .match(/[\u1200-\u137C]{2,}/g); // ignoring single letter words

          if (options.unique === true) {
            allWords = _.uniq(allWords);
          }

          if (options.frequency === true) {
            const frequency = {};

            allWords.filter((word) => {
              frequency[word] = frequency.hasOwnProperty(word) === true ? ++frequency[word] : 1;
              return false;
            });

            resolve(frequency);
          } else {
            resolve(allWords);
          }
        }

        return 'Thou shall not scrape without permission';
      });
  });

  return promise;
};

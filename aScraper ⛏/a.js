const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

/**
 * given a url | utf8 content it'll extract Amharic words
 * It'll not extract single letter words or digits.
 *
 * usage:
 * (url, {...}) - web mode
 * (url)        - web mode
 * (utf8, null) - extract from passed text
 *
 * @param  {String}   url | utf8 content
 * @param  {Object}   options
 * @param  {Boolean}  options.unique
 * @param  {Boolean}  options.frequency
 * @return {Promise}
 */
module.exports = (url, options = { selector: 'body', unique: false, frequency: true }) => {
  const promise = new Promise((resolve, reject) => {
    const extract = (content) => {
      let words = Object.assign([], content.match(/[\u1200-\u135A]{2,}/g));

      if (options.unique === true) {
        words = _.uniq(words);
      }

      if (options.frequency === true) {
        if (options.frequency === true) {
          const frequency = {};

          words.forEach((word) => {
            frequency[word] = frequency.hasOwnProperty(word) === true ? ++frequency[word] : 1;
          });

          resolve(frequency);
        } else {
          resolve(words);
        }
      }
    };

    if (options === null) {
      extract(url);
    } else if (typeof options === 'object') { // yes I know the "quirks" or `typeof`
      Object.assign({ selector: 'body', unique: false, frequency: true }, options);

      request
        .get(encodeURI(decodeURI(url))) // makes sure we don't run into double-encoding scenario
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            extract(cheerio.load(res.text)(options.selector).text());
          }
        });
    } else {
      reject('Invalid options passed');
    }
  });

  return promise;
};

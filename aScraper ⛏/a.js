// eslint-disable-next-line
'use strict';

const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

/**
 * given an article url it'll extract words, no numbers or single letters words.
 *
 * @param  {String}   url
 * @param  {Object}   options
 * @param  {Boolean}  options.unique
 * @param  {Boolean}  options.frequency
 * @return {Promise}
 */
const contentWords = (url, options = { selector: 'body', unique: false, frequency: true }) => {
  // I'm not going to force you to use node-v6+...not yet 😎...i lied
  Object.assign(options, { selector: 'body', unique: false, frequency: true }, options);

  const promise = new Promise((resolve, reject) => {
    request
      .get(encodeURI(decodeURI(url)))
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          let allWords = cheerio.load(res.text)(options.selector)
                                .text()
                                .replace(/[\u135D-\u137C፡]/g, ' ') // some use :: instead of ።
                                .match(/[\u1200-\u137C]{2,}/g); // ignoring single letter words

          if (options.unique === true) {
            allWords = _.uniq(allWords);
          }

          if (options.frequency === true) {
            const frequency = {};

            allWords.forEach((word) => {
              frequency[word] = frequency.hasOwnProperty(word) === true ? ++frequency[word] : 1;
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

/**
 * given a tag url of a tag it'll return all page links
 *
 * @param {String} url
 * @return {Promise}
 */
const tagPageLinks = (url) => {
  const promise = new Promise((resolve, reject) => {
    request
      .get(encodeURI(decodeURI(url)))
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          const $ = cheerio.load(res.text);
          let lastPage = Number($('.pagination .pager-last a').attr('href').match(/page=(\d+)/)[1]);

          if (Number.isNaN(lastPage) === true) {
            reject('Could not find last page');
          } else {
            const contentLinks = [];

            while (lastPage > 0) {
              contentLinks.push(`${url}?page=${lastPage}`);
              --lastPage;
            }

            resolve(contentLinks);
          }
        }
      });
  });

  return promise;
};

/**
 * given tag page it'll extract links to article content
 *
 * @param {String} url
 * @param {String} base url to be used if the link extracted starts with `/`
 * @return {Promise}
 */
const contentLinks = (url, base = '') => {
  const promise = new Promise((resolve, reject) => {
    request
      .get(encodeURI(decodeURI(url)))
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          const links = cheerio.load(res.text)('#page-main-content article .post-title a');

          // cheerio has `map` which is acting weird, it's returning holes (i think)
          // so i had to fall-back to the inevitable _
          resolve(_.map(links, link => (link.attribs.href.startsWith('/') === true
            ? `${base}${link.attribs.href}`
            : link.attribs.href
          )));
        }
      });
  });

  return promise;
};

module.exports = {
  tagPageLinks,
  contentLinks,
  contentWords,
};

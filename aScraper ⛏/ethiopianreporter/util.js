/**
 * this is where site specific tool will live
 */

const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

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
};

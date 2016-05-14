/**
 * this is where site specific tool will live
 */

const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

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
          const links = cheerio.load(res.text)('li.chapter a');

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
  contentLinks,
};

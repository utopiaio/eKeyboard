### aScraper
Simple [Amharic]scraper built with [cheerio](https://github.com/cheeriojs/cheerio) and [superagent](https://github.com/visionmedia/superagent).

### Usage
I don't have plans to publish this *scraper* to npm (it's too specific for "general" use), so copy the code inside of `a.js`.

```javascript
import a from './a';

a('LINK-TO-SCRAPE-FROM', {
  selector: 'selector', // cheerio selector, default: 'body'
  unique: false, // return unique words, default: false
  frequency: true, // return unique words with frequency, default: true
})
.then((words) => {
  console.log(words);
})
.catch((err) => {
  console.error(err);
});
```

### aScraper
Simple [Amharic]scraper built with [cheerio](https://github.com/cheeriojs/cheerio) and [superagent](https://github.com/visionmedia/superagent).

### Usage
I don't have plans to publish this *scraper* to npm (it's too specific for "general" use), download this repository, `cd` to `aScraper ⛏` folder and `npm install`

```shell
$ node extract.js <tagLinks>
$ node extract.js http://www.ethiopianreporter.com/tags/ዜና http://www.ethiopianreporter.com/tags/ኪንና-ባህል
```

```
🗄 Output 🎉
train.json -> {"word": frequency}
train.txt -> word\n
```

Then comes the awesome part, where you go to get a cup of ☕️ or a couple of 🍺🍺🍺

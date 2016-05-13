### aScraper
Simple [Amharic]scraper built with [cheerio](https://github.com/cheeriojs/cheerio) and [superagent](https://github.com/visionmedia/superagent).

### Usage
I don't have plans to publish this *scraper* to npm (it's too specific for "general" use), download this repository, `cd` to `aScraper ⛏` folder and `npm install`

```shell
$ node extractWeb.js <tagLinks>
$ node extractWeb.js http://www.ethiopianreporter.com/tags/ዜና http://www.ethiopianreporter.com/tags/ኪንና-ባህል
$ node extractFile.js <filePath>
```

```
🗄 Output 🎉
train.json -> {"word": frequency}
train.txt -> word\n
```

Then comes the awesome part, where you go to get a cup of ☕️ or a couple of 🍺🍺🍺

### Back from the bar (yes, I'm no happy either)
I got ~62K(61,788) words. All extracted from the very organized and well made [Ethiopian Reporter](http://www.ethiopianreporter.com). With little tweaking you can extract words from other Amharic sites. If you do, please send a pull request so the the dictionary grows.

Links
- [http://www.ethiopianreporter.com/tags/ዜና](http://www.ethiopianreporter.com/tags/ዜና)
- [http://www.ethiopianreporter.com/tags/ርዕሰ-አንቀጽ](http://www.ethiopianreporter.com/tags/ርዕሰ-አንቀጽ)
- [http://www.ethiopianreporter.com/tags/ፓለቲካ](http://www.ethiopianreporter.com/tags/ፓለቲካ)
- [http://www.ethiopianreporter.com/tags/ቢዝነስ-ና-ኢኮኖሚ](http://www.ethiopianreporter.com/tags/ቢዝነስ-ና-ኢኮኖሚ)
- [http://www.ethiopianreporter.com/tags/ቆይታ](http://www.ethiopianreporter.com/tags/ቆይታ)
- [http://www.ethiopianreporter.com/tags/ክቡር-ሚንስትር](http://www.ethiopianreporter.com/tags/ክቡር-ሚንስትር)
- [http://www.ethiopianreporter.com/tags/ኪንና-ባህል](http://www.ethiopianreporter.com/tags/ኪንና-ባህል)
- [http://www.ethiopianreporter.com/tags/ማኅበራዊ](http://www.ethiopianreporter.com/tags/ማኅበራዊ)
- [http://www.ethiopianreporter.com/tags/ምን-እየሠሩ-ነው](http://www.ethiopianreporter.com/tags/ምን-እየሠሩ-ነው)
- [http://www.ethiopianreporter.com/tags/ስፓርት](http://www.ethiopianreporter.com/tags/ስፓርት)
- [http://www.ethiopianreporter.com/tags/ተሟገት](http://www.ethiopianreporter.com/tags/ተሟገት)
- [http://www.ethiopianreporter.com/tags/እኔ-የምለዉ](http://www.ethiopianreporter.com/tags/እኔ-የምለዉ)
- [http://www.ethiopianreporter.com/tags/በህግ-አምላክ](http://www.ethiopianreporter.com/tags/በህግ-አምላክ)
- [http://www.ethiopianreporter.com/tags/ልናገር](http://www.ethiopianreporter.com/tags/ልናገር)
- [http://www.ethiopianreporter.com/tags/ታክሲ](http://www.ethiopianreporter.com/tags/ታክሲ)
- [http://www.ethiopianreporter.com/tags/ሸማች](http://www.ethiopianreporter.com/tags/ሸማች)
- [http://www.ethiopianreporter.com/tags/ደላላው](http://www.ethiopianreporter.com/tags/ደላላው)
- [http://www.ethiopianreporter.com/tags/ዓለም](http://www.ethiopianreporter.com/tags/ዓለም)
- [http://www.ethiopianreporter.com/tags/ይድረስ፡-ለአዘጋጁ](http://www.ethiopianreporter.com/tags/ይድረስ፡-ለአዘጋጁ)
- [http://www.ethiopianreporter.com/tags/አስተያየት](http://www.ethiopianreporter.com/tags/አስተያየት)
- [http://www.ethiopianreporter.com/tags/ፌርማታ](http://www.ethiopianreporter.com/tags/ፌርማታ)
- [http://www.ethiopianreporter.com/tags/ፍሬከናፍር](http://www.ethiopianreporter.com/tags/ፍሬከናፍር)
- [http://www.ethiopianreporter.com/tags/የሳምንቱ-ገጠመኝ](http://www.ethiopianreporter.com/tags/የሳምንቱ-ገጠመኝ)
- [http://www.ethiopianreporter.com/tags/ዝንቅ](http://www.ethiopianreporter.com/tags/ዝንቅ)
- [http://www.ethiopianreporter.com/tags/ሥነ-ፍጥረት](http://www.ethiopianreporter.com/tags/ሥነ-ፍጥረት)
- [http://www.ethiopianreporter.com/tags/ባልትና](http://www.ethiopianreporter.com/tags/ባልትና)

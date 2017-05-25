### ~⚠️ Update ⚠️~
~I've been informed by [@jixtes](https://github.com/jixtes) that Google already has the `Amharic-English` implementation.~

~Head on to [Google Input](http://www.google.com/inputtools/try/) and select the `Amharic` input. It requires a working Internet connection for it to come-up with the predictions.~

~**So now, `eKeyboard` project is more of a reimplementation.**~

### HOL'UP [Update 2.0]
Google-Input (on Amharic) only has _sound normalizing_; no distance computation or auto-correction. Making eKeyboard [once again] a **new** endeavor

### eKeyboard
Make typing Amharic [on mobile] great [again]. (no association)

### Great!?, #holdUp
The *mistake* (imo) most mobile keyboard developers make is try to fit the **entire** Amharic alphabet (200+) on the small phone screen.
This has been done in a variety of ways, but in general developers will display part of the alphabet on the screen and then create application rules for how to navigate between letters.
This could be through pressing and holding a letter or sliding across the keyboard to navigate the different views or the very time-taking timeout approach where user types a letter and types another one after some time (type fast and rule breaks).
Since the rules are not standardized and unintuitive, it can be complex for a user to adapt to. We see the issue reflected on many social media forums and messaging applications where users type `Amharic-English` to get around the frustration of strictly using Amharic Fidels.

### Plan-Future...Dirty Sprite
The whole idea of `eKeyboard` revolves around by not introducing any new *rules* and building on-top of the *community standardized* rule of `Amharic-English` rule. If you can `sound it out`, then you can type on `eKeyboard`. #holdup that has been done before `eko`, right?

Yes and No.

ALL Amharic keyboards implementation of `Amharic-English`:
```
እኮ  -> e[pause]ko
ለምን -> le[pause]m[pause]n
ቆንጆ -> qo[pause]n[pause]jo
```
Well, that's not very efficient. They're all basically mapping each **letter** to the *sound* 📢 instead of putting emphasis to the word.

eKeyboard approach of `Amharic-English`:
```
እኮ  -> eko, eco
ለምን -> lemin, lmin, lemen
ቆንጆ -> konjo, qonjo, kongo
```
On `eKeyboard` you won't have to [pause](https://youtu.be/fhIdbRp6xeg?t=40s) between letters, it **just works**.

### How exactly is that going to work?
Well, I'm going to raise tax on the rich...

Seriously tho, the algorithm is in its early stages.

It has to *guess* words. I'll have to get a list of words and come up with a mapping algorithm that will match a string (basically like auto-correct for `Amharic-English`).

### Mining ⛏
Well, I'm in a bit of a pickle here, turns out I can not find list of Amharic words so I'll have to mine for words. The obvious way is to scrape some Amharic websites. Which will be a violation of their copyright, almost all don't allow scraping for ANY purpose (in this case JUST extracting words and frequency). I'll try to get a consent, if not, I'll have to go down *that* road.

### Roadmap
- [x] Dictionary
- [ ] Algorithm
- [ ] iOS Keyboard (iOS 8+)
- [ ] Web - Chrome Plugin

Android?...Nope 😔, I have no interest on implementing the algorithm for Android. Any Android developer is **welcome** to implement the algorithm.

Implement the algorithm -> iOS Keyboard (iOS 8+) -> Web (Chrome Plugin).

### Contributions
- [@haworku](http://github.com/haworku)
- Eskinder, co-founder of [AhdooTec](http://www.ahadootec.com)
- [ሹክሹክታ Facebook group](https://www.facebook.com/Shukshukta)
- [@jixtes](https://github.com/jixtes)
- [@yonihahasis](https://github.com/yonihahasis)

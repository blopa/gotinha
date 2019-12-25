# Gotinha (Phaser + Webpack + ES6 + Cordova project)
Making your own game is a dream of many people, including myself, and with the amount of content we have available these days, it was never that easy to build one. [read more...](https://google.com)

[Download it from Google Play](https://play.google.com/store/apps/details?id=com.werules.gotinha)

## About
Gotinha is a open source Phaser 3 game available on [Google Play](https://play.google.com/store/apps/details?id=com.werules.gotinha).

It was always my dream to make my own game, and after trying Unity a couple years ago, I decided to try it again with something I'm more familiar with: Javascript. As a frontend developer, Javascript is already the language that I write most of my code at work and also in my personal projects, and after a quick search I was able to find the amazing PhaserJS Framework for building 2D web games.

My goal was to make a game from scratch, not only code, but sprites and sound effects as well. Of course this was only possible because of some amazing free/open source softwares available today. So I'd like to say a special thank you to:
- [npm](https://github.com/npm/cli) for javascript packager managing
- [eslint](https://github.com/eslint/eslint) for code linter
- [Phaser](https://github.com/photonstorm/phaser) for the game engine
- [Webpack](https://github.com/webpack/webpack) to build and run the Javascript environment
- [photopea](https://github.com/photopea/photopea) for making the sprites alongside with [Microsoft Paint](https://pt.wikipedia.org/wiki/Microsoft_Paint)
- [ShoeBox](http://renderhjs.net/shoebox/) for unpacking sprites
- [Atlas Packer Phaser 3](https://github.com/gammafp/atlas-packer-phaser) for packing Phaser Atlas files
- [sfMaker](https://github.com/leshylabs/sfMaker) for sound effects
- [beepbox](https://github.com/johnnesky/beepbox) for sound tracks
- [cordova](https://github.com/apache/cordova) for packing the Android APK file
- [NativeScript Image Builder](http://nsimage.brosteins.com/) for the Android icons
- [Android Studio](https://android.googlesource.com/platform/tools/base/+/studio-master-dev/studio.md) to sign the APK file

## Project Features
- Up to date Framework versions
- Easy deployment
- ESLint
- Cordova for mobile deployment

## Frameworks
- Phaser 3
- Webpack 4
- Cordova 8
- Gradle 6
- JDK 8

## Deployment
Run `npm run deploy` to build the game and the APK file at `platforms\android\app\build\outputs\apk\release`, then sign it. Done.
To build the Phaser game only, run `npm run deploy-phaser`

## Screenshot
![ScreenShot](https://raw.githubusercontent.com/blopa/gotinha/master/screenshots/v2/screenshot_1.png)

![ScreenShot](https://raw.githubusercontent.com/blopa/gotinha/master/screenshots/v2/screenshot_2.png)

![ScreenShot](https://raw.githubusercontent.com/blopa/gotinha/master/screenshots/v2/screenshot_3.png)


Please don't forget to credit if you use this for your own project :)

## Release Notes
- **v1.0.3:**
    - Add Share on Twitter button
	- Small improvements
	- Remove christmas theme
- **v1.0.2:**
	- Fix hero floating glitch
	- Add christmas theme
- **v1.0.1:**
	- Fix jumping input glitch.
- **v1.0.0:**
	- First release.

## F.A.Q.
**Q: Can you implement <???> function?**

A: I can try. Open a issue and I'll see what I can do.

**Q: Your project is awesome. How can I help?**

A: Thank you! You can help by codding more features, creating pull requests, or donating using Bitcoin: **1BdL9w4SscX21b2qeiP1ApAFNAYhPj5GgG**

## TODO
- Integration with Google Play Games leaderboard
- More skins?

## License
MIT License

Copyright (c) 2019 blopa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**Free Software, Hell Yeah!**

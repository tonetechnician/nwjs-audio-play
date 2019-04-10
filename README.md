# Audio-play with NWJS

## Requirements
- [browserify](http://browserify.org/)
- [NWJS](https://www.npmjs.com/package/nw)
- [audio-play](https://www.npmjs.com/package/audio-play)
- [audio-loader](https://github.com/audiojs/audio-loader)

## Installation

1. First install browserify globally: `npm install -g browserify`
2. Then install required dependencies for the local project: `npm install`

## How to wrap audio-play into a browser bundle for use with nwjs

Take a look in the _audioPlay.js_ file. This file holds the main modules that are required to play a selected audio file. Here we see:

```javascript
// in audioPlay.js
const play = require('audio-play');
const load = require('audio-loader');

// So our other nwjs scripts are able to see our current modules.
window.audioPlay = { 
    play : play,
    load : load
}
```

The only interesting thing to note here is that we attach the important functions 'play' and 'load' to the _window_. By doing this, other nwjs scripts are able to see the module by simply calling `window.audioPlay.play` or `window.audioPlay.load`.

**NOW:**

We first need to browserify our _audioPlay.js_. This means that all the node modules required by audio-play and audio-loader into a single .js file. This ensures that when it is loaded by the .html script, all the required modules are available to it. 

_note: browserify is typically used to wrap node modules for the web browser. Since nwjs is built with chromium, we are consider it to have a browser context. Important to note here is that browserify does not work on all node modules. For instance 'fs' and other modules will not work within the browser because of permissions._

So now we **browserify** our _audioPlay.js_ file with the command `browserify audioPlay.js -o bundle.js` 

Once the modules have been browserified, we are able to reference them in other scripts that are loaded. Remember how we attached them to the window object? We can now reference them simply as shown in the script tags in _simplePlayer.html_

## Working application with button events

To see a more event intensive example, refer to _main.js_ that is called in _index.html_. To switch between either, simple change the package.json _main_ to reference _index.html_.


## Multichannel File Support

audio-play is able to load multichannel .wav files, not .mp3 files (but that is a limitation on .mp3 I believe). I think decoder options are required to read multichannel .opus files and such. Check the directory for different multichannel files.

In order to play multichannel .wav files, we'll need to look at the audio context and change that so it is the limit of the audio device.


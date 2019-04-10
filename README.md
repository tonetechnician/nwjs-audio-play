# Audio-play with NWJS

## Requirements
- [browserify](http://browserify.org/)
- [NWJS](https://www.npmjs.com/package/nw)
- [audio-play](https://www.npmjs.com/package/audio-play)
- [audio-loader](https://github.com/audiojs/audio-loader)

## Installation

1. First install browserify globally: `npm install -g browserify`
2. Then install required dependencies for the local project: `npm install`

## Run

If nwjs was installed with `npm install`, simply run `npm start`.

otherwise, use `path/to/nw .` in the project directory.

### How to wrap audio-play into a browser bundle for use with nwjs

Take a look in the _audioPlay.js_ file. This file holds the main modules that are required to play a selected audio file. Here we see:

```javascript
// in audioPlay.js
const play = require('audio-play');
const load = require('audio-loader');

// So other nwjs scripts are able to see the audio-play and audio-loader modules
window.audioPlay = { 
    play : play,
    load : load
}
```

The only interesting thing to note here is that we attach the important functions 'play' and 'load' to the _window_ variable. By doing this, other nwjs scripts are able to see the module by simply calling `window.audioPlay.play` or `window.audioPlay.load`.

**NOW:**

We need to browserify our _audioPlay.js_ so that all the other node modules it depends on are wrapped into a single .js file. This ensures that when it is loaded by the .html script, all the required modules are available to the script. 

_note: browserify is typically used to wrap node modules for the web browser. Since nwjs is built with chromium, we consider it to have a browser context as well as a node context. Important to note here is that browserify does not work on all node modules. For instance 'fs' and other modules will not work within the browser because of permissions._

So now we **browserify** our _audioPlay.js_ file with the command 

`browserify audioPlay.js -o bundle.js` 

Once the modules have been browserified, we are able to reference them in other scripts that are loaded. Remember how we attached them to the window object? We can now reference them simply as shown in the script tags in _simplePlayer.html_

### Working application with button events

To see a more event intensive example, refer to _main.js_ that is called in _index.html_. To switch between either, simple change the package.json _main_ object to reference _index.html_ or _simplePlayer.html_.


### Multichannel File Support

audio-play is able to load multichannel .wav files, not .mp3 files (but that is a limitation on .mp3 I believe). I think decoder options are required to read compressed multichannel files like .opus files and such. Check the directory for different multichannel files.

In order to play multichannel .wav files, we'll need to look at the audio context. This may change dynamically according to the audio device attached to the computer. I have not been able to test as of yet because I only have a stereo audio device on my laptop currently.



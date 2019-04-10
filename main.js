let playBtn = document.getElementById("play");
let pauseBtn = document.getElementById("pause");
let stopBtn = document.getElementById("stop");
let loadBtn = document.getElementById("load");
let filenameOutput = document.getElementById("filepath")

let sampleBuffer;   // Variable to hold the audioBuffer
let fileLoaded = 0; // Flag used to indicate if the file has loaded
let player;         // Variable to set the audio-play player object so it can be paused.

// Event handlers
filenameOutput.addEventListener("change",() => {
    fileLoaded = 0;
    // Load the file 
    // For some reason, audio-loader doesn't like full paths. Need to reference the files that are in the same or child directories.
    window.audioPlay.load(filenameOutput.files[0].name)
        .then((buffer) => {
            sampleBuffer = buffer;
            console.log("file loaded into buffer");
            fileLoaded = 1;
            console.log(sampleBuffer);
        });
})

playBtn.addEventListener("click",() => {
    console.log("play")
    if(fileLoaded && player === undefined) {
        player = window.audioPlay.play(sampleBuffer);
    }
    else if (fileLoaded) {
        player.play()
    } else {
        console.log("file is not loaded yet, please wait");
    }
})

pauseBtn.addEventListener("click",() => {
    console.log("pause")
    player.pause();
})

stopBtn.addEventListener("click",() => {
    console.log("stop")
    // There is no function for stop... Pause and then dereference player object
    player.pause();
    player = undefined;
})
console.log("Hello from audio js");


const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const playrBox = document.querySelector("#player-container");
console.log(playrBox);


const titleTeg = document.createElement("h2");
titleTeg.textContent = "createdElement";
playrBox.append(titleTeg);

playBtn.addEventListener("click", onPlay);
stopBtn.addEventListener("click", onStop);


// // Завантаження звуків
const soundCrash = new Audio();
soundCrash.src = "../sounds/crash1.wav";
console.log(soundCrash);

// playrBox.append(soundCrash);

// // const musicGame = new Audio();
// // musicGame.src = "../../sounds/music1.ogg";


// soundCrash.play();

// soundCrash.pause();
// soundCrash.currentTime = 0; 



function onPlay() {
    console.log("play");
    soundCrash.play();
}

function onStop() {
    console.log("Stop");
    soundCrash.pause();
    soundCrash.currentTime = 0;
}
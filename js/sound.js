console.log("Hello from audio js");



const myPlayer = document.querySelector(".my-audio"); // Player

const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const playrBox = document.querySelector("#player-container");




// Завантаження звуків

const soundCrash = new Audio();
soundCrash.src = "../sounds/crash1.wav";

// const myMusic = new Audio();
// myMusic.src = "../sounds/music1.ogg";




// ========== Слухачі =============

playBtn.addEventListener("click", onPlay);
pauseBtn.addEventListener("click", onPause);
stopBtn.addEventListener("click", onStop);
// myPlayer.addEventListener("timeupdate", onUpdateTime);



// ============== FUNCTIONS ==================

function onPlay() {
    console.log("play");
    myPlayer.play();
    console.log(myPlayer.duration);
    console.log(myPlayer.volume);
    // myPlayer.duration
    // soundCrash.addEventListener("playing", ()=> console.log("Audio started"));
    // soundCrash.addEventListener("ended", ()=> console.log("Audio stoped"));
}

function onPause() {
    console.log("Pause");
    myPlayer.pause();
}

function onStop() {
    console.log("Stop");
    myPlayer.pause();
    myPlayer.currentTime = 0;
}

function onUpdateTime(event) {
    const { duration, currentTime } = event.srcElement;
    console.log(duration, currentTime );
}










// ====== DRAFT ================

// const titleTeg = document.createElement("h2");
// titleTeg.textContent = "createdElement";
// playrBox.append(titleTeg);


   // soundCrash.addEventListener("playing", ()=> console.log("Audio started"));
    // soundCrash.addEventListener("ended", ()=> console.log("Audio stoped"));
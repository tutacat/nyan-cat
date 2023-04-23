///////////////////////////////////////////////////
///////// onload //////////////////////////////////
///////////////////////////////////////////////////




var containerRainbows = document.querySelector('div.rainbows');

function manualAutoPlay() {
    if (!catAudio[0].playing) {
        catAudio[0].play()
    }
    window.removeEventListener('pointerdown', manualAutoPlay);
    window.removeEventListener('keydown', manualAutoPlay);
}
window.addEventListener('DOMContentLoaded', () => {
    console.log("After-load, fetching elements, adding listener.")
    catStyle = document.getElementById("catStyle");
    catImg = document.querySelector("div#cat>img");
    catAudio = document.querySelectorAll("audio, audio>source");
    catAudio[0].preservesPitch = false;
    catAudio[0].addEventListener("loadeddata", () => {
        if (window.tim) {
            catAudio[0].currentTime = tim % catAudio[0].duration;
            catAudio[0].playbackRate = speed;
            tim = 0;
        }
    });
    window.addEventListener("hashchange", () => {
        updateCat(location.hash.replace('#', ''));
    });
    updateCat(catName);
    window.addEventListener('pointerdown', manualAutoPlay, {
        once: true
    });
    window.addEventListener('keydown', manualAutoPlay, {
        once: true
    });
}, {
    once: true
});

export const videoPlayer = document.querySelector(".player");
export const video = document.querySelector(".player__video");
export const playButton = document.querySelector(".play");
export const resizeButton = document.querySelector(".resize");
export const skipButtons = document.querySelectorAll("[data-skip]");
export const inputs = document.querySelectorAll('[type="range"]');
export const bar = document.querySelector(".player__bar");
export const watchedBar = document.querySelector(".player__watched");

// this structure enable changing isClicked in other files
export const controlsFlag = {
    isClicked: false,
};

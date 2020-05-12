const video = document.querySelector('.player__video');
const playButton = document.querySelector('.play');
const skipButtons = document.querySelectorAll('[data-skip]');
const inputs = document.querySelectorAll('[type="range"]');
const watchedBar = document.querySelector('.player__watched');

function play() {
    if(playButton.textContent === '►') {
        video.play();
        playButton.textContent = '❚ ❚';
    } else {
        video.pause();
        playButton.textContent = '►';
    }
}

function skip(e) {
    const time = parseInt(e.target.dataset.skip);
    video.currentTime += time;

    if(video.currentTime === video.duration) {
        playButton.textContent = '►';
    }
}

function updateBar() {
    const videoPart = (video.currentTime / video.duration) * 100;
    watchedBar.style.flexBasis = `${videoPart}%`;
}

function handleChange(e) {
    video[e.target.dataset.property] = e.target.value;
}

playButton.addEventListener('click', play);
video.addEventListener('timeupdate', updateBar);
skipButtons.forEach(button => button.addEventListener('click', skip));
inputs.forEach(input => input.addEventListener('input', handleChange));
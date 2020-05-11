const video = document.querySelector('.player__video');
const playButton = document.querySelector('.play');
const skipButtons = document.querySelectorAll('[data-skip]');
const inputs = document.querySelectorAll('[type="range"]');

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

playButton.addEventListener('click', play);
skipButtons.forEach(button => button.addEventListener('click', skip))
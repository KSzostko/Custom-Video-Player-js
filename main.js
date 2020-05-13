const videoPlayer = document.querySelector('.player');
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.play');
const resizeButton = document.querySelector('.resize');
const skipButtons = document.querySelectorAll('[data-skip]');
const inputs = document.querySelectorAll('[type="range"]');
const bar = document.querySelector('.player__bar');
const watchedBar = document.querySelector('.player__watched');

let isClicked = false;

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

function changeVideoTime(e) {
    if(!isClicked) return;
    
    const { x } = video.getBoundingClientRect();
    const videoPart = ((e.pageX - x) / video.offsetWidth) * 100;

    watchedBar.style.flexBasis = `${videoPart}%`;
    video.currentTime = (video.duration * videoPart) / 100;
}

function resizeVideo() {
    const icon = resizeButton.querySelector('i');
    video.style.height = '100%';
    video.style.width = '100%';

    if(document.fullscreenElement) {
        icon.classList.replace('fa-compress', 'fa-expand');

        document.exitFullscreen()
            .catch(err => console.log('exitFullscreen failed', err));
    } else {
        icon.classList.replace('fa-expand', 'fa-compress');

        videoPlayer.requestFullscreen()
            .catch(err => console.log('requestFullscreen failed', err));
    }
}

playButton.addEventListener('click', play);
video.addEventListener('timeupdate', updateBar);
bar.addEventListener('mousedown', e => {
    isClicked = true;
    changeVideoTime(e);
});
bar.addEventListener('mouseup', () => isClicked = false);
bar.addEventListener('mouseleave', () => isClicked = false);
bar.addEventListener('mousemove', changeVideoTime);
resizeButton.addEventListener('click', resizeVideo);
skipButtons.forEach(button => button.addEventListener('click', skip));
inputs.forEach(input => input.addEventListener('input', handleChange));
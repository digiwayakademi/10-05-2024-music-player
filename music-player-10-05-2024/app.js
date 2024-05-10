const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const currenttime = document.querySelector("#current-time");
const progressbar = document.querySelector("#progress-bar");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});


function displayMusic(music) {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {

    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();   
});

prev.addEventListener("click", () => {
    prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});

function prevMusic(){
    player.previous();
    let music =  player.getMusic();
    displayMusic(music);
    playMusic();
}; 

function nextMusic(){
    player.next();
    let music =  player.getMusic();
    displayMusic(music);
    playMusic();
};

function pauseMusic() {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (seconds) => {    
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const newsecond = second < 10 ? `0${second}` : `${second}`
    const sonuc = `${minute}:${newsecond}`;
    return sonuc;
} 


audio.addEventListener("loadedmetadata", () =>{
    duration.textContent = calculateTime(audio.duration);
    progressbar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressbar.value = Math.floor(audio.currentTime);
    currenttime.textContent = calculateTime(progressbar.value);

})
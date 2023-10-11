let audioPlayer = document.getElementById('audioPlayer');
let artistName = document.getElementById('artistName');
let songName = document.getElementById('songName');
let trackNumber = document.getElementById('trackNumber');
let fileName = document.getElementById('fileName');
let fileFormat = document.getElementById('fileFormat');
let audioQuality = document.getElementById('audioQuality');
let playlist = document.getElementById('playlist');

let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let currentSongIndex = 0;
let songs = [];

let isPlaying = false;

function loadMusic() {
    let audioFile = document.getElementById('audioFile');
    let files = audioFile.files;

    for (let file of files) {
        let objectURL = URL.createObjectURL(file);
        songs.push({
            url: objectURL,
            fileName: file.name,
            fileFormat: file.type.split('/')[1],
            artist: "Artista Desconocido",
            songName: file.name,
            trackNumber: "N/A",
            audioQuality: "N/A"
        });
    }

    updatePlaylist();
}

function playSong(index) {
    let song = songs[index];
    audioPlayer.src = song.url;
    artistName.textContent = song.artist;
    songName.textContent = song.songName;
    trackNumber.textContent = "Pista: " + song.trackNumber;
    fileName.textContent = "Nombre del archivo: " + song.fileName;
    fileFormat.textContent = "Formato: " + song.fileFormat;
    audioQuality.textContent = "Calidad: " + song.audioQuality;
    audioPlayer.play();
    currentSongIndex = index;
    isPlaying = true;
    highlightPlayingSong();
}

function updatePlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        let songDiv = document.createElement('div');
        songDiv.textContent = song.songName;
        songDiv.onclick = () => playSong(index);
        playlist.appendChild(songDiv);
    });
    highlightPlayingSong();
}

function highlightPlayingSong() {
    const songDivs = playlist.querySelectorAll('div');
    songDivs.forEach((div, index) => {
        if (isPlaying && index === currentSongIndex) {
            div.classList.add('playing');
        } else {
            div.classList.remove('playing');
        }
    });
}

function clearPlaylist() {
    songs = [];
    updatePlaylist();
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    artistName.textContent = "Artista";
    songName.textContent = "Título de la canción";
    trackNumber.textContent = "Pista: N/A";
    fileName.textContent = "Nombre del archivo: N/A";
    fileFormat.textContent = "Formato: N/A";
    audioQuality.textContent = "Calidad: N/A";
}

audioPlayer.addEventListener('ended', function() {
    currentSongIndex++;
    if (songs.length > 1 && currentSongIndex < songs.length) {
        playSong(currentSongIndex);
    } else if (songs.length > 1 && currentSongIndex >= songs.length) {
        currentSongIndex = 0;
        playSong(currentSongIndex);
    } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isPlaying = false;
    }
    highlightPlayingSong();
});

function toggleTheme() {
    const themeIcon = document.querySelector("#toggleTheme i");
    if (currentTheme === 'dark') {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else if (currentTheme === 'light') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('feminine-mode');
        localStorage.setItem('theme', 'feminine');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-venus');
    } else {
        document.body.classList.remove('feminine-mode');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-venus');
        themeIcon.classList.add('fa-moon');
    }
    currentTheme = localStorage.getItem('theme');
}

window.onload = function() {
    const themeIcon = document.querySelector("#toggleTheme i");
    if (currentTheme) {
        document.body.classList.toggle('light-mode', currentTheme === 'light');
        document.body.classList.toggle('feminine-mode', currentTheme === 'feminine');
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-sun', 'fa-venus');
            themeIcon.classList.add('fa-moon');
        } else if (currentTheme === 'light') {
            themeIcon.classList.remove('fa-moon', 'fa-venus');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-moon', 'fa-sun');
            themeIcon.classList.add('fa-venus');
        }
    }
}

window.onload = function() {
    const themeIcon = document.querySelector("#toggleTheme i");
    if (currentTheme) {
        document.body.classList.toggle('light-mode', currentTheme === 'light');
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}
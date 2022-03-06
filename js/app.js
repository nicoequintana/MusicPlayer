//song Data
const songList = [{
        title: 'El arte de recuperarte',
        file: 'elartederecuperarte.mp3',
        cover: 'el-arte-de-recuperarte.webp',
    },
    {
        title: 'Por amar al amor',
        file: 'poramaralamor.mp3',
        cover: 'por-amar-al-amor.jpg',
    },
    {
        title: 'Me gustas tanto',
        file: 'megustastanto.mp3',
        cover: 'me-gustas-tanto.webp',
    },
]

//cancion actual
let actualSong = null

//capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById('title');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');

//escuchar al progress container
progressContainer.addEventListener('click', setProgress)

//escuchar al elemento audio
audio.addEventListener('timeupdate', updateProgress)

//escuchar clicks en el boton play
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

prev.addEventListener('click', () => prevSong())
next.addEventListener('click', () => nextSong())


//cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {
        //crear li
        const li = document.createElement("li")
        //crear a
        const link = document.createElement("a")
        //hidratar a
        link.textContent = song.title
        link.href = '#'
        //escuchar clicks
        link.addEventListener('click', () => loadSong(index))
        //aniadir a li
        li.appendChild(link)
        //anadir li a ul
        songs.appendChild(li)
    })
}

//funcion para cargar cancion seleccionada
function loadSong(songIndex) {

    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file;
        audio.play()
        playSong()
        changeSongTitle(songIndex)
        changeCover(songIndex)

    }
}

//actualizar barra de progreso
function updateProgress(event) {
    //total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%"
}

//hacer la barra de progreso clickeable
function setProgress(e) {
    const totalWidth = this.offsetWidth
    const progressWidth = e.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

//actualizar controles
function updateControls() {
    if (audio.paused) {
        play.classList.replace('fa-pause', 'fa-play')
    } else {
        play.classList.replace('fa-play', 'fa-pause')
    }
}

//reproducir cancion
function playSong() {
    if (actualSong !== null){
        audio.play()
        updateControls()
    }
}

//pausar cancion
function pauseSong() {
    audio.pause()
    updateControls()
}

//cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll('a')
    if (lastIndex !== null) {
        links[actualSong].classList.remove('active')
    }
    links[newIndex].classList.add('active')
}

//cargar titulo de song
function changeCover(songIndex) {
    cover.src = './img/' + songList[songIndex].cover

}

//cambiar titulo de la song
function changeSongTitle(songIndex) {
    title.innerText = songList[songIndex].title
}


//cancion anterior
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong -1)
        
    } else {
        loadSong(songList.length -1)
    }
}

//cancion siguiente
function nextSong() {
    if(actualSong < songList.length -1){
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}

//lanzar siguiente cancion automaticamente
audio.addEventListener('ended', () => nextSong())



//go!
loadSongs()
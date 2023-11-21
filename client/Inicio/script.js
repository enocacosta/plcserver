
// Carga la API de YouTube
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Variable para guardar el reproductor de video
var player;

// Función de inicio del reproductor
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'oHg5SJYRHA0', // Reemplaza con el ID de tu video de YouTube
        playerVars: {
            'autoplay': 1, // Reproducción automática
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

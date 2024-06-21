document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBar = document.getElementById('progressBar');
    const progressFilled = document.getElementById('progressFilled');
    const volumeSlider = document.getElementById('volumeSlider');
    const languageSelect = document.getElementById('languageSelect');
    const qualitySelect = document.getElementById('qualitySelect');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');
    const season = urlParams.get('s');
    const episode = urlParams.get('e');

    if (!tmdbId) {
        alert('TMDB ID is required');
        return;
    }

    const tmdbApiKey = 'f6e840332142f77746185ab4e67be858';
    const type = season && episode ? 'tv' : 'movie';
    const externalIdsEndpoint = `https://api.themoviedb.org/3/${type}/${tmdbId}/external_ids?api_key=${tmdbApiKey}`;

    fetch(externalIdsEndpoint)
        .then(response => response.json())
        .then(data => {
            let imdbId;
            if (data.imdb_id) {
                imdbId = data.imdb_id;
            } else {
                alert('IMDB ID not found');
                return;
            }

            const mediaInfoEndpoint = `https://8-stream-api.vercel.app/api/v1/mediaInfo?id=${imdbId}`;
            fetch(mediaInfoEndpoint)
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.data.playlist.length > 0) {
                        const playlist = data.data.playlist;
                        const key = data.data.key;

                        playlist.forEach((item, index) => {
                            const option = document.createElement('option');
                            option.value = index;
                            option.text = item.title;
                            languageSelect.appendChild(option);
                        });

                        playStream(playlist[0].file, key);

                        languageSelect.addEventListener('change', (event) => {
                            const selectedIndex = event.target.value;
                            playStream(playlist[selectedIndex].file, key);
                        });
                    } else {
                        alert('No playable streams found');
                    }
                })
                .catch(error => console.error('Error fetching media info:', error));
        })
        .catch(error => console.error('Error fetching TMDB data:', error));

    function playStream(file, key) {
        fetch('https://8-stream-api.vercel.app/api/v1/getStream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file, key })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && Hls.isSupported()) {
                if (videoPlayer.hls) {
                    videoPlayer.hls.destroy();
                }
                videoPlayer.hls = new Hls();
                videoPlayer.hls.loadSource(data.data.link);
                videoPlayer.hls.attachMedia(videoPlayer);
                videoPlayer.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoPlayer.play();
                });
                videoPlayer.hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error('HLS error:', data);
                });
            } else {
                alert('Error fetching stream link');
            }
        })
        .catch(error => console.error('Error fetching stream link:', error));
    }

    playPauseButton.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    videoPlayer.addEventListener('timeupdate', () => {
        const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFilled.style.width = `${percentage}%`;
    });

    progressBar.addEventListener('click', (e) => {
        const newTime = (e.offsetX / progressBar.offsetWidth) * videoPlayer.duration;
        videoPlayer.currentTime = newTime;
    });

    volumeSlider.addEventListener('input', (e) => {
        videoPlayer.volume = e.target.value;
    });

    videoPlayer.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    let touchstartX = 0;
    let touchendX = 0;

    videoPlayer.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
    });

    videoPlayer.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchendX < touchstartX - 50) {
            videoPlayer.currentTime -= 10;
        }
        if (touchendX > touchstartX + 50) {
            videoPlayer.currentTime += 10;
        }
    }

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    qualitySelect.addEventListener('change', (e) => {
        const quality = e.target.value;
        const container = document.getElementById('videoContainer');
        switch (quality) {
            case '1080':
                container.style.width = '1920px';
                container.style.height = '1080px';
                break;
            case '720':
                container.style.width = '1280px';
                container.style.height = '720px';
                break;
            case '480':
                container.style.width = '854px';
                container.style.height = '480px';
                break;
            case '360':
                container.style.width = '640px';
                container.style.height = '360px';
                break;
            default:
                container.style.width = '100%';
                container.style.height = '100%';
                break;
        }
    });
});

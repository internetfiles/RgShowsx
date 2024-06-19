document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        fetchVideoData(id);
    } else {
        console.error("ID parameter is missing from the URL");
    }

    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const volumeBar = document.getElementById('volumeBar');
    const muteButton = document.getElementById('muteButton');
    const fullScreenButton = document.getElementById('fullScreenButton');
    const qualityButton = document.getElementById('qualityButton');
    const qualityMenu = document.getElementById('qualityMenu');

    let hls;
    let isPlaying = false;
    let isMuted = false;
    let isFullScreen = false;

    // Play/pause functionality
    function togglePlayPause() {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    playPauseButton.addEventListener('click', togglePlayPause);
    videoPlayer.addEventListener('play', () => {
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    });
    videoPlayer.addEventListener('pause', () => {
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');
    });

    // Update progress bar
    function updateProgress() {
        const value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progress.style.width = `${value}%`;
    }

    videoPlayer.addEventListener('timeupdate', updateProgress);

    progressBarContainer.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / rect.width;
        videoPlayer.currentTime = pos * videoPlayer.duration;
    });

    volumeBar.addEventListener('input', (e) => {
        videoPlayer.volume = e.target.value;
        muteButton.className = videoPlayer.volume == 0 ? 'fas fa-volume-mute control-button' : 'fas fa-volume-up control-button';
    });

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        videoPlayer.muted = isMuted;
        muteButton.className = isMuted ? 'fas fa-volume-mute control-button' : 'fas fa-volume-up control-button';
    });

    // Full screen functionality
    fullScreenButton.addEventListener('click', () => {
        if (!isFullScreen) {
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen();
            } else if (videoPlayer.mozRequestFullScreen) {
                videoPlayer.mozRequestFullScreen();
            } else if (videoPlayer.webkitRequestFullscreen) {
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) {
                videoPlayer.msRequestFullscreen();
            }
            isFullScreen = true;
            document.getElementById('player-container').classList.add('fullscreen');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullScreen = false;
            document.getElementById('player-container').classList.remove('fullscreen');
        }
    });

    // Quality menu functionality
    qualityButton.addEventListener('click', () => {
        qualityMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!qualityMenu.contains(e.target) && e.target !== qualityButton) {
            qualityMenu.classList.remove('show');
        }
    });

    // Double tap to seek 10s
    let lastTap = 0;
    videoPlayer.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            if (e.target === videoPlayer) {
                videoPlayer.currentTime += 10;
            }
        }
        lastTap = currentTime;
    });

    // One tap to play/pause
    videoPlayer.addEventListener('click', () => {
        togglePlayPause();
    });

    // HLS.js setup
    function fetchVideoData(id) {
        fetch(`https://cg.autoembed.cc/api/cinego/movie/UpCloud/${id}`)
            .then(response => response.json())
            .then(data => {
                const sources = data.sources.filter(source => source.isM3U8);
                const subtitles = data.subtitles;
                const videoSource = sources[0].url;

                hls = new Hls();
                hls.loadSource(videoSource);
                hls.attachMedia(videoPlayer);

                // Add quality options to the menu
                sources.forEach((source, index) => {
                    const button = document.createElement('button');
                    button.textContent = source.quality;
                    button.addEventListener('click', () => {
                        hls.loadSource(source.url);
                        hls.startLoad();
                        qualityMenu.classList.remove('show');
                    });
                    qualityMenu.appendChild(button);
                });

                // Add subtitles
                subtitles.forEach(subtitle => {
                    const track = document.createElement('track');
                    track.src = subtitle.url;
                    track.kind = 'subtitles';
                    track.srclang = subtitle.lang;
                    track.label = subtitle.lang;
                    videoPlayer.appendChild(track);
                });
            })
            .catch(error => console.error('Error fetching video data:', error));
    }

});


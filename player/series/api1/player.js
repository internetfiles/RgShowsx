document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const languageSelect = document.getElementById('languageSelect');
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');
    const season = urlParams.get('s');
    const episode = urlParams.get('e');

    if (!tmdbId) {
        alert('TMDB ID is required');
        return;
    }

    const tmdbApiKey = 'f6e840332142f77746185ab4e67be858';

    // Determine if it's a movie or TV show
    const isTvShow = season && episode;
    const tmdbEndpoint = `https://api.themoviedb.org/3/${isTvShow ? 'tv' : 'movie'}/${tmdbId}?api_key=${tmdbApiKey}`;

    // Fetch external IDs for TV shows
    const fetchExternalIds = (tmdbId) => {
        return fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${tmdbApiKey}`)
            .then(response => response.json())
            .then(data => data.imdb_id)
            .catch(error => {
                console.error('Error fetching external IDs:', error);
                return null;
            });
    };

    // Convert TMDB ID to IMDB ID
    const fetchImdbId = async () => {
        const response = await fetch(tmdbEndpoint);
        const data = await response.json();
        if (data.imdb_id) {
            return data.imdb_id;
        } else if (isTvShow) {
            return fetchExternalIds(tmdbId);
        } else if (data.external_ids && data.external_ids.imdb_id) {
            return data.external_ids.imdb_id;
        } else {
            alert('IMDB ID not found');
            return null;
        }
    };

    fetchImdbId().then(imdbId => {
        if (!imdbId) return;

        // Fetch media info
        const mediaInfoEndpoint = `https://8-stream-api.vercel.app/api/v1/mediaInfo?id=${imdbId}`;
        fetch(mediaInfoEndpoint)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data.playlist.length > 0) {
                    const playlist = data.data.playlist;
                    const key = data.data.key;

                    // Populate language options for movies
                    if (!isTvShow) {
                        playlist.forEach((item, index) => {
                            const option = document.createElement('option');
                            option.value = index;
                            option.text = item.title;
                            languageSelect.appendChild(option);
                        });

                        // Play the first language by default
                        playStream(playlist[0].file, key);

                        // Change language event
                        languageSelect.addEventListener('change', (event) => {
                            const selectedIndex = event.target.value;
                            playStream(playlist[selectedIndex].file, key);
                        });
                    } else {
                        // Handle TV shows
                        const seasonData = playlist.find(s => s.title === `Season ${season}`);
                        if (seasonData) {
                            const episodeData = seasonData.folder.find(e => e.episode === episode);
                            if (episodeData && episodeData.folder.length > 0) {
                                const languages = episodeData.folder;

                                // Populate language options
                                languages.forEach((item, index) => {
                                    const option = document.createElement('option');
                                    option.value = index;
                                    option.text = item.title;
                                    languageSelect.appendChild(option);
                                });

                                // Play the first language by default
                                playStream(languages[0].file, key);

                                // Change language event
                                languageSelect.addEventListener('change', (event) => {
                                    const selectedIndex = event.target.value;
                                    playStream(languages[selectedIndex].file, key);
                                });
                            } else {
                                alert('Episode not found');
                            }
                        } else {
                            alert('Season not found');
                        }
                    }
                } else {
                    alert('No playable streams found');
                }
            })
            .catch(error => console.error('Error fetching media info:', error));
    });

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
});

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
    const tmdbEndpoint = `https://api.themoviedb.org/3/${season && episode ? 'tv' : 'movie'}/${tmdbId}?api_key=${tmdbApiKey}`;
    const tmdbExternalIdsEndpoint = `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${tmdbApiKey}`;

    // Convert TMDB ID to IMDB ID
    fetch(season && episode ? tmdbExternalIdsEndpoint : tmdbEndpoint)
        .then(response => response.json())
        .then(data => {
            let imdbId;
            if (data.imdb_id) {
                imdbId = data.imdb_id;
            } else if (data.external_ids && data.external_ids.imdb_id) {
                imdbId = data.external_ids.imdb_id;
            } else {
                alert('IMDB ID not found');
                return;
            }

            // Fetch media info
            const mediaInfoEndpoint = `https://8-stream-api.vercel.app/api/v1/mediaInfo?id=${imdbId}`;
            fetch(mediaInfoEndpoint)
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.data.playlist.length > 0) {
                        const playlist = data.data.playlist;
                        const key = data.data.key;

                        // Populate language options
                        function populateLanguageOptions(playlist, parentTitle = '') {
                            playlist.forEach((item, index) => {
                                if (item.file) {
                                    const option = document.createElement('option');
                                    option.value = index;
                                    option.text = parentTitle ? `${parentTitle} - ${item.title}` : item.title;
                                    if (!option.text) {
                                        option.text = "Unnamed Language"; // Fallback for undefined titles
                                    }
                                    languageSelect.appendChild(option);
                                } else if (item.folder) {
                                    populateLanguageOptions(item.folder, item.title);
                                }
                            });
                        }
                        
                        populateLanguageOptions(playlist);

                        // Play the first available stream by default
                        playStream(playlist[0].file, key);

                        // Change language event
                        languageSelect.addEventListener('change', (event) => {
                            const selectedIndex = event.target.value;
                            let selectedItem = playlist[selectedIndex];
                            while (selectedItem && selectedItem.folder) {
                                selectedItem = selectedItem.folder[0];
                            }
                            if (selectedItem) {
                                playStream(selectedItem.file, key);
                            }
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
});

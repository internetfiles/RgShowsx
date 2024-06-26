function removeFromContinue() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('anime_id');

    let continueEpisodes = JSON.parse(localStorage.getItem('continueEpisodes')) || [];
    const animeIndex = continueEpisodes.findIndex(anime => anime.animeId === animeId);

    if (animeIndex !== -1) {
        continueEpisodes.splice(animeIndex, 1);
        localStorage.setItem('continueEpisodes', JSON.stringify(continueEpisodes));
        alert(`Removed ${animeId} from continue list`);
    } else {
        alert(`Anime ${animeId} is already removed from continue list`);
    }
}

document.getElementById('removeFromContinue').addEventListener('click', removeFromContinue);
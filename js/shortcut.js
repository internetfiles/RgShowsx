document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === '1') {
        updatePageParameter('1');
    } else if (event.altKey && event.key === '2') {
        updatePageParameter('2');
    } else if (event.altKey && event.key === '3') {
        updatePageParameter('3');
    } else if (event.altKey && event.key === '4') {
        updatePageParameter('4');
    } else if (event.altKey && (event.key === 'm' || event.key === 'M')) {
        redirectToRandomMovie();
    } else if (event.altKey && (event.key === 's' || event.key === 'S')) {
        redirectToRandomSeries();
    } else if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        removeAllParametersExceptP();
    } else if (event.altKey && event.key === 'Delete') {
        resetDataAndParameter();
    } else if (event.altKey && event.key === 'ArrowRight') {
        goToNextPage();                             
    } else if (event.altKey && event.key === 'ArrowLeft') {
        goToPreviousPage();
    }
});

function updatePageParameter(page) {
    const url = new URL(window.location);
    // Clear all existing parameters
    url.search = ''; 
    // Set only the 'p' parameter
    url.searchParams.set('p', page);
    history.pushState({}, '', url);
}

function removeAllParametersExceptP() {
    const url = new URL(window.location);
    const pValue = url.searchParams.get('p') || '1'; // Default to '1' if 'p' parameter is not present
    url.search = ''; // Clear all existing parameters
    url.searchParams.set('p', pValue);
    history.pushState({}, '', url);
}

function resetDataAndParameter() {
    localStorage.clear();
    const url = new URL(window.location);
    url.search = ''; // Clear all existing parameters
    url.searchParams.set('p', '1'); // Set 'p' parameter to '1'
    history.pushState({}, '', url);
}

function goToPreviousPage() {
    history.back();
}

function goToNextPage() {
    history.forward();
}

async function getRandomMovieId() {
    const encodedApiKey = 'ZjZlODQwMzMyMTQyZjc3NzQ2MTg1YWI0ZTY3YmU4NTg=';
    const apiKey = atob(encodedApiKey);
    try {
        const totalPagesResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const totalPagesData = await totalPagesResponse.json();
        const totalPages = Math.min(totalPagesData.total_pages, 500); // Limit to maximum of 500 pages

        // Generate a random page number between 1 and totalPages
        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        // Fetch movies from the random page
        const randomPageResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`);
        const randomPageData = await randomPageResponse.json();
        const movies = randomPageData.results;

        // Select a random movie from the page
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        return randomMovie.id;
    } catch (error) {
        console.error('Error fetching random movie ID:', error);
        return null;
    }
}

async function redirectToRandomMovie() {
    const randomMovieId = await getRandomMovieId();
    if (randomMovieId !== null) {
        const url = new URL(window.location);
        const currentPage = url.searchParams.get('p') || '1';
        url.search = ''; // Clear all existing parameters
        url.searchParams.set('p', currentPage);
        url.searchParams.set('m', `m-${randomMovieId}`);
        history.pushState({}, '', url);
    } else {
        console.error('Failed to fetch random movie ID');
    }
}

async function getRandomSeriesId() {
    const encodedApiKey = 'ZjZlODQwMzMyMTQyZjc3NzQ2MTg1YWI0ZTY3YmU4NTg=';
    const apiKey = atob(encodedApiKey);
    try {
        const totalPagesResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`);
        const totalPagesData = await totalPagesResponse.json();
        const totalPages = Math.min(totalPagesData.total_pages, 500); // Limit to maximum of 500 pages

        // Generate a random page number between 1 and totalPages
        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        // Fetch series from the random page
        const randomPageResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`);
        const randomPageData = await randomPageResponse.json();
        const series = randomPageData.results;

        // Select a random series from the page
        const randomSeries = series[Math.floor(Math.random() * series.length)];
        return randomSeries.id;
    } catch (error) {
        console.error('Error fetching random series ID:', error);
        return null;
    }
}

async function redirectToRandomSeries() {
    const randomSeriesId = await getRandomSeriesId();
    if (randomSeriesId !== null) {
        const url = new URL(window.location);
        const currentPage = url.searchParams.get('p') || '1';
        url.search = ''; // Clear all existing parameters
        url.searchParams.set('p', currentPage);
        url.searchParams.set('m', `s-${randomSeriesId}`);
        history.pushState({}, '', url);
    } else {
        console.error('Failed to fetch random series ID');
    }
}

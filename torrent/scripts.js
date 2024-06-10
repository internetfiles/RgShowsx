const baseUrl = 'https://news-api-six-navy.vercel.app/api/torrent';

function searchTorrents(page = 1) {
    const query = document.getElementById('search-query').value;
    const provider = document.getElementById('provider').value;

    if (!query) return alert('Please enter a search query');

    fetch(`${baseUrl}/${provider}/${query}/${page}`)
        .then(response => response.json())
        .then(data => displayResults(data, provider, query, page))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(torrents, provider, query, page) {
    const list = document.getElementById('torrent-list');
    list.innerHTML = '';

    torrents.forEach(torrent => {
        const item = document.createElement('div');
        item.classList.add('torrent-item');
        item.innerHTML = `
            <h3>${torrent.Name}</h3>
            <p>Size: ${torrent.Size || torrent.Files[0].Size}</p>
            <p>Date Uploaded: ${torrent.DateUploaded || torrent.ReleasedDate}</p>
            <p>Seeders: ${torrent.Seeders || '-'}</p>
            <p>Leechers: ${torrent.Leechers || '-'}</p>
            <a href="${torrent.Url}" target="_blank">Torrent Link</a> | 
            <a href="${torrent.Magnet}" target="_blank">Magnet Link</a>
        `;
        list.appendChild(item);
    });

    displayPagination(provider, query, page);
}

function displayPagination(provider, query, page) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = page === 1;
    prevButton.onclick = () => searchTorrents(page - 1);
    pagination.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.onclick = () => searchTorrents(page + 1);
    pagination.appendChild(nextButton);
}

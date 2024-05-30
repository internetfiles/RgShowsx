// Array of iframe URLs to block popups from
const blockedUrls = [
    "https://vidsrc.to/",
    "https://vidsrc.me/",
    "https://show2embed/",
    "https://autoembed.co/",
    "https://multiembed.mov/",
    "https://play.123embed.net/",
    "https://www.2embed.cc/",
    "https://www.2embed.stream/",
    "https://www.primewire.tf/",
    "https://embed.smashystream.com/",
    "https://8-stream.vercel.app/",
    "https://2embed.pro/",
    "https://vidsrc.pro/",
    "https://vidsrc.xyz/",
    "https://flixon.click/",
    "https://vidsrc.in/",
    "https://vidsrc.pm/",
    "https://2embed.org/",
    "https://vidsrc.icu/",
    "https://vidsrc.xyz/",
    "https://databasegdriveplayer.xyz/",
    "https://moviehab.to/",
    "https://api.123movie.cc/",
    "https://player.autoembed.cc/",
    "https://embed.warezcdn.com/",
    "https://new-nunflix-player.vercel.app/",
    "https://watch.streamflix.one/",
    "https://blackvid.space/",
    "https://superflixapi.top/",
    "https://api.slidemovies.org/",
    "https://moviesapi.club/",
    "https://vip.filmclub.tv/",
    "https://mostream.us/",
    "https://vidsrc.top/",
];

// Function to block popups
function blockPopups() {
    // Block popups for main URL
    window.addEventListener("beforeunload", function(event) {
        event.preventDefault();
        event.returnValue = '';
    });

    // Block popups for iframe URLs
    document.querySelectorAll('iframe').forEach(iframe => {
        const iframeUrl = iframe.src;
        if (blockedUrls.includes(iframeUrl)) {
            iframe.contentWindow.addEventListener('beforeunload', event => {
                // Prevent the iframe from opening a new window
                event.preventDefault();
            });
        }
    });
}

// Call the blockPopups function
blockPopups();

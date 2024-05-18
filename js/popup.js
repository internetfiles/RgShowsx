document.querySelectorAll('iframe').forEach(iframe => {
    iframe.contentWindow.addEventListener('beforeunload', event => {
        // Prevent the iframe from opening a new window
        event.preventDefault();
    });
});

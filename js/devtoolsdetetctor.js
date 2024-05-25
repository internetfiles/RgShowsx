(function() {
    let devToolsOpened = false;
    let lastBlockedTime = 0;
    const blockTimeout = 5000; // 5 seconds

    // Function to detect if developer tools are open
    function detectDevTools() {
        if (devToolsOpened || performance.now() > 100) {
            devToolsOpened = true;
            if (Date.now() - lastBlockedTime > blockTimeout) {
                redirectToBlockedPage();
                lastBlockedTime = Date.now();
            }
        }
    }

    // Function to redirect to blocked page
    function redirectToBlockedPage() {
        window.location.href = '/blocked.html';
    }

    // Periodically check for dev tools
    setInterval(detectDevTools, 1000); // Check every second

    // Check if the window is resized to an unusual size (like when dev tools are undocked)
    function detectWindowResize() {
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            devToolsOpened = true;
            if (Date.now() - lastBlockedTime > blockTimeout) {
                redirectToBlockedPage();
                lastBlockedTime = Date.now();
            }
        }
    }

    window.addEventListener('resize', detectWindowResize);

})();

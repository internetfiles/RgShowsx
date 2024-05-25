(function() {
    let blocked = false;
    let devToolsOpened = false;

    // Function to detect if developer tools are open
    function detectDevTools() {
        if (blocked) return;
        if (devToolsOpened || performance.now() > 100) {
            devToolsOpened = true;
            blocked = true;
            redirectToBlockedPage();
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
        if (blocked) return;
        
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            blocked = true;
            redirectToBlockedPage();
        }
    }

    window.addEventListener('resize', detectWindowResize);

})();

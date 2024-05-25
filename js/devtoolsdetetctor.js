(function() {
    let blocked = false;

    // Function to detect if developer tools are open
    function detectDevTools() {
        if (blocked) return;
        
        const start = new Date();
        debugger;
        const end = new Date();
        if (end - start > 100) {
            blocked = true;
            redirectToBlockedPage();
        }
    }

    // Function to redirect to blocked page
    function redirectToBlockedPage() {
        window.location.href = '/blocked.html';
    }

    // Periodically check for dev tools
    setInterval(detectDevTools, 5000); // Check every 5 seconds

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

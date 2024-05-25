(function() {
    // Whitelisted IP addresses
    const whitelistedIPs = ['192.168.1.1', '127.0.0.1'];

    // Function to detect if developer tools are open
    function detectDevTools() {
        const element = new Image();
        let devToolsOpened = false;

        Object.defineProperty(element, 'id', {
            get: function() {
                devToolsOpened = true;
                redirectToBlockedPage();
            }
        });

        console.log(element);
        setTimeout(() => {
            devToolsOpened = false;
        }, 1000);
    }

    // Function to redirect to blocked page
    function redirectToBlockedPage() {
        window.location.href = '/blocked.html';
    }

    // Check if the IP is whitelisted
    function isIPWhitelisted(ip) {
        return whitelistedIPs.includes(ip);
    }

    // Periodically check for dev tools
    setInterval(detectDevTools, 1000);

    // Check for dev tools by measuring execution time of a debugger statement
    setInterval(() => {
        const start = new Date();
        debugger;
        const end = new Date();
        if (end - start > 100) {
            redirectToBlockedPage();
        }
    }, 1000);

    // Check if the window is resized to an unusual size (like when dev tools are undocked)
    function detectWindowResize() {
        if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
            redirectToBlockedPage();
        }
    }

    window.addEventListener('resize', detectWindowResize);

    // Check if IP is whitelisted before blocking
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            if (!isIPWhitelisted(ip)) {
                detectDevTools();
            }
        })
        .catch(error => console.error('Error getting IP address:', error));

})();

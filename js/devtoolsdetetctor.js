(function() {
    // Whitelisted IP addresses
    const whitelistedIPs = ['192.168.1.1', '127.0.0.1'];

    // Excluded user agents (devices)
    const excludedUserAgents = ['iPhone'];

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

    // Check if the user agent is excluded
    function isUserAgentExcluded(userAgent) {
        return excludedUserAgents.includes(userAgent);
    }

    // Periodically check for dev tools
    setInterval(detectDevTools, 1000);

    // Check if the window is resized to an unusual size (like when dev tools are undocked)
    function detectWindowResize() {
        if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
            redirectToBlockedPage();
        }
    }

    window.addEventListener('resize', detectWindowResize);

    // Check if IP is whitelisted or user agent is excluded before blocking
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const userAgent = navigator.userAgent;
            if (!isIPWhitelisted(ip) && !isUserAgentExcluded(userAgent)) {
                detectDevTools();
            }
        })
        .catch(error => console.error('Error getting IP address:', error));

})();

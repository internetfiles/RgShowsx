// Function to send data to Discord webhook
function sendDataToWebhook(webhookURL, data, messageID) {
    fetch(`${webhookURL}/messages/${messageID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

// Function to read and update total views and daily views from a text file
function updateViews() {
    // Retrieve total views and daily views from the text file
    let views = localStorage.getItem('views');
    if (!views) {
        views = {
            total: {},
            daily: {},
            lastUpdated: new Date().toLocaleDateString(),
        };
    } else {
        views = JSON.parse(views);
    }

    // Check if the date has changed since the last update
    const currentDate = new Date().toLocaleDateString();
    if (currentDate !== views.lastUpdated) {
        // Reset daily views
        views.daily = {};
        views.lastUpdated = currentDate;
    }

    // Get the visitor's IP address
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            // Increment total views for this IP
            views.total[ip] = (views.total[ip] || 0) + 1;
            // Increment daily views for this IP
            views.daily[ip] = (views.daily[ip] || 0) + 1;

            // Save updated views back to the text file
            localStorage.setItem('views', JSON.stringify(views));

            // Update Discord messages
            updateDiscordMessages(views);
        });
}

// Function to update Discord messages
function updateDiscordMessages(views) {
    // Your Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

    // Message ID for the total views message
    const totalViewsMessageID = '1244312476154204281'; // Update with your actual total views message ID

    // Message ID for the daily views message
    const dailyViewsMessageID = '1244312476191817898'; // Update with your actual daily views message ID

    // Calculate total views for all IPs
    const totalViewsSum = Object.values(views.total).reduce((acc, curr) => acc + curr, 0);

    // Generate embeds for total views
    const totalViewsEmbed = {
        embeds: [{
            title: 'Total Views',
            description: Object.entries(views.total).map(([ip, count]) => `${ip}: ${count}`).join('\n') + `\n\nTotal: ${totalViewsSum}`,
            color: 16711680, // Red color
        }],
    };

    // Calculate daily views for all IPs
    const dailyViewsEmbed = {
        embeds: [{
            title: 'Daily Views',
            description: Object.entries(views.daily).map(([ip, count]) => `${ip}: ${count}`).join('\n'),
            color: 65280, // Green color
        }],
    };

    // Send the data to Discord webhooks
    sendDataToWebhook(webhookURL, totalViewsEmbed, totalViewsMessageID);
    sendDataToWebhook(webhookURL, dailyViewsEmbed, dailyViewsMessageID);
}

// Update total views and daily views
updateViews();

const fs = require('fs');

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

// Read views from file
function readViewsFromFile() {
    try {
        const data = fs.readFileSync('views.txt', 'utf8');
        const lines = data.split('\n');
        const views = {};
        lines.forEach((line) => {
            const parts = line.split('=');
            views[parts[0]] = parseInt(parts[1]);
        });
        return views;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Update views in file
function updateViewsInFile(views) {
    try {
        let newData = '';
        Object.keys(views).forEach((key) => {
            newData += `${key}=${views[key]}\n`;
        });
        fs.writeFileSync('views.txt', newData);
    } catch (err) {
        console.error(err);
    }
}

// Get current date
const currentDate = new Date().toLocaleDateString();

// Your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

// Message IDs for the master message and latency message
const masterMessageID = '1244312476191817898'; // Update with your actual master message ID
const latencyMessageID = '1244312476154204281'; // Update with your actual latency message ID

// Read views from file
let views = readViewsFromFile();

// Check if views were successfully read from file
if (views !== null) {
    // Embed for the first message
    const totalViewsEmbed = {
        embeds: [{
            title: 'Master message',
            description: `Total views: ${views.TotalViews}`,
            color: 16711680, // Red color
        }],
    };

    // Embed for the second message
    const latencyEmbed = {
        embeds: [{
            title: 'Real-time latency and today\'s date total views',
            description: `Latency: ${views.Latency} ms\nToday's date total views: ${views.DailyViews}`,
            color: 65280, // Green color
        }],
    };

    // Send the data to Discord webhooks
    sendDataToWebhook(webhookURL, totalViewsEmbed, masterMessageID);
    sendDataToWebhook(webhookURL, latencyEmbed, latencyMessageID);

    // Update daily views in file
    views.DailyViews += 1;
    updateViewsInFile(views);
}

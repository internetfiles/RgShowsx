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

// Function to get total views (you need to implement this according to your site's logic)
function getTotalViews() {
    return 100; // Example: replace this with your actual total views logic
}

// Function to get today's date total views (you need to implement this according to your site's logic)
function getTodaysDateTotalViews() {
    return 10; // Example: replace this with your actual today's date total views logic
}

// Function to get latency (you need to implement this according to your site's logic)
function getLatency() {
    return 50; // Example: replace this with your actual latency logic
}

// Get current date
const currentDate = new Date().toLocaleDateString();

// Your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

// Message IDs for the master message and latency message
const masterMessageID = '1244312476191817898'; // Update with your actual master message ID
const latencyMessageID = '1244312476154204281'; // Update with your actual latency message ID

// Embed for the first message
const totalViewsEmbed = {
    embeds: [{
        title: 'Master message',
        description: `Total views: ${getTotalViews()}`,
        color: 16711680, // Red color
    }],
};

// Embed for the second message
const latencyEmbed = {
    embeds: [{
        title: 'Real-time latency and today\'s date total views',
        description: `Latency: ${getLatency()} ms\nToday's date total views: ${getTodaysDateTotalViews()}`,
        color: 65280, // Green color
    }],
};

// Send the data to Discord webhooks
sendDataToWebhook(webhookURL, totalViewsEmbed, masterMessageID);
sendDataToWebhook(webhookURL, latencyEmbed, latencyMessageID);

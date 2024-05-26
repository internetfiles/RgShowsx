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
            total: 0,
            daily: 0,
            lastUpdated: new Date().toLocaleDateString(),
        };
    } else {
        views = JSON.parse(views);
    }

    // Check if the date has changed since the last update
    const currentDate = new Date().toLocaleDateString();
    if (currentDate !== views.lastUpdated) {
        // Reset daily views
        views.daily = 0;
        views.lastUpdated = currentDate;
    }

    // Increment total views and daily views
    views.total++;
    views.daily++;

    // Save updated views back to localStorage
    localStorage.setItem('views', JSON.stringify(views));

    return views;
}

// Your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

// Message ID for the total views message
const totalViewsMessageID = '1244312476154204281'; // Update with your actual total views message ID

// Message ID for the daily views message
const dailyViewsMessageID = '1244312476191817898'; // Update with your actual daily views message ID

// Update total views and daily views
const views = updateViews();

// Embed for the total views message
const totalViewsEmbed = {
    embeds: [{
        title: 'Total Views',
        description: `Total views: ${views.total}`,
        color: 16711680, // Red color
    }],
};

// Embed for the daily views message
const dailyViewsEmbed = {
    embeds: [{
        title: 'Daily Views',
        description: `Today's date: ${views.lastUpdated}\nDaily views: ${views.daily}`,
        color: 65280, // Green color
    }],
};

// Send the data to Discord webhooks
sendDataToWebhook(webhookURL, totalViewsEmbed, totalViewsMessageID);
sendDataToWebhook(webhookURL, dailyViewsEmbed, dailyViewsMessageID);

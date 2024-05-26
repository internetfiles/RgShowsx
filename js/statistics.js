// Define your Discord webhook URL
const webhookURL = "https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg";

// Function to calculate latency
async function getLatency() {
    const startTime = Date.now();
    await fetch(window.location.href);
    const endTime = Date.now();
    return endTime - startTime;
}

// Function to send data to Discord
function sendToDiscord(message) {
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: message
        })
    });
}

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Initialize view counters
let totalViews = 0;
let dailyViews = {};
const todayDate = getTodayDate();

// Function to update view counters and send data to Discord
function updateViews() {
    // Increment total views
    totalViews++;

    // Increment daily views
    dailyViews[todayDate] = (dailyViews[todayDate] || 0) + 1;

    // Send data to Discord
    getLatency().then(latency => {
        const totalViewsMessage = `Total Views: ${totalViews}`;
        const dailyViewsMessage = `Daily Views for ${todayDate}: ${dailyViews[todayDate]}`;
        const latencyMessage = `Latency: ${latency} ms`;

        const message = `${latencyMessage}\n${totalViewsMessage}\n${dailyViewsMessage}`;
        sendToDiscord(message);
    });
}

// Schedule daily view count reset and report to Discord
function scheduleDailyViewReport() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    const timeToMidnight = midnight - now;

    setTimeout(() => {
        // Send daily views count to Discord
        const dailyViewsCount = dailyViews[todayDate] || 0;
        const dailyViewsMessage = `Daily Views for ${todayDate}: ${dailyViewsCount}`;
        sendToDiscord(dailyViewsMessage);

        // Reset daily views counter
        dailyViews = {};
        todayDate = getTodayDate();

        // Schedule the next report
        scheduleDailyViewReport();
    }, timeToMidnight);
}

// Start the schedule for daily view report
scheduleDailyViewReport();

// Simulate a view every 10 seconds
setInterval(updateViews, 10000);

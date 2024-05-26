// Define your Discord webhook URL
const webhookURL = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI0NDMwMTA2NDE3MDM3NzI4Ni9wVFQ4c3FFbEdMOUtKOTc2OFJZYXNIbXpibkhicXpiUFdGUXFxbFNLeWc0LTJYb0RUWjY1QlV4TFZzZVB4cEV1MXBKeA==";

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
let totalViews = localStorage.getItem('totalViews');
totalViews = totalViews ? parseInt(totalViews, 10) : 0;

let dailyViews = localStorage.getItem('dailyViews');
dailyViews = dailyViews ? JSON.parse(dailyViews) : {};

const todayDate = getTodayDate();

// Increment view counters
totalViews++;
dailyViews[todayDate] = (dailyViews[todayDate] || 0) + 1;

// Save updated counters to localStorage
localStorage.setItem('totalViews', totalViews);
localStorage.setItem('dailyViews', JSON.stringify(dailyViews));

// Send real-time view data to Discord
getLatency().then(latency => {
    const totalViewsMessage = `Total Views: ${totalViews}`;
    const dailyViewsMessage = `Daily Views for ${todayDate}: ${dailyViews[todayDate]}`;
    const latencyMessage = `Latency: ${latency} ms`;

    const message = `${latencyMessage}\n${totalViewsMessage}\n${dailyViewsMessage}`;
    sendToDiscord(message);
});

// Function to send daily views count to Discord at midnight
function scheduleDailyViewReport() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    const timeToMidnight = midnight - now;

    setTimeout(() => {
        const yesterdayDate = getTodayDate();
        const dailyViewsCount = dailyViews[yesterdayDate] || 0;
        const dailyViewsMessage = `Daily Views for ${yesterdayDate}: ${dailyViewsCount}`;

        sendToDiscord(dailyViewsMessage);

        // Reset daily view counter for new day
        dailyViews = {};
        localStorage.setItem('dailyViews', JSON.stringify(dailyViews));

        // Schedule the next report
        scheduleDailyViewReport();
    }, timeToMidnight);
}

// Start the schedule for daily view report
scheduleDailyViewReport();

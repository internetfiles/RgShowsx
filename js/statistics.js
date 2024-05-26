const webhookUrl = 'https://discord.com/api/webhooks/1244301064170377286/pTT8sqElGL9KJ9768RYasHmzbnHbqzbPWFQqqlSKyg4-2XoDTZ65BUxLVsePxpEu1pJx';
const dailyViewsKey = 'dailyViews';
const totalViewsKey = 'totalViews';
const lastVisitKey = 'lastVisit';

// Measure latency
const start = Date.now();

window.addEventListener('load', () => {
    const latency = Date.now() - start;
    console.log(`Latency: ${latency}ms`);
    trackView(latency);
    updateViewCounts();
});

function trackView(latency) {
    const today = new Date().toISOString().split('T')[0];
    let dailyViews = JSON.parse(localStorage.getItem(dailyViewsKey)) || {};
    let totalViews = parseInt(localStorage.getItem(totalViewsKey)) || 0;
    const lastVisit = localStorage.getItem(lastVisitKey);

    if (lastVisit !== today) {
        dailyViews[today] = (dailyViews[today] || 0) + 1;
        totalViews += 1;
        localStorage.setItem(dailyViewsKey, JSON.stringify(dailyViews));
        localStorage.setItem(totalViewsKey, totalViews);
        localStorage.setItem(lastVisitKey, today);
        sendToDiscord(latency, totalViews, dailyViews[today]);
    }
}

function updateViewCounts() {
    const today = new Date().toISOString().split('T')[0];
    const dailyViews = JSON.parse(localStorage.getItem(dailyViewsKey)) || {};
    const totalViews = parseInt(localStorage.getItem(totalViewsKey)) || 0;
    console.log(`Total Views: ${totalViews}`);
    console.log(`Daily Views: ${dailyViews[today] || 0}`);
}

function sendToDiscord(latency, totalViews, dailyViews) {
    const message = `Site View Update:\nLatency: ${latency}ms\nTotal Views: ${totalViews}\nDaily Views: ${dailyViews}`;
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    }).catch(error => console.error('Error sending to Discord:', error));
}

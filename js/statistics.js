// Function to send data to Discord webhook
function sendDataToWebhook(webhookURL, data) {
    fetch(webhookURL, {
        method: 'POST',
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
            updateDiscordMessages(views, ip);
        });
}

// Function to update Discord messages
function updateDiscordMessages(views, ip) {
    // Your Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

    // Get the user agent, ISP, country, city, and region information
    fetch('https://wtfismyip.com/json')
        .then(response => response.json())
        .then(data => {
            const userAgent = data.YourFuckingUserAgent;
            fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${data.YourFuckingIPAddress}`)
                .then(response => response.json())
                .then(ipData => {
                    const embed = {
                        embeds: [{
                            title: `Views for ${ip}`,
                            description: `Total Views: ${views.total[ip]}\nDaily Views: ${views.daily[ip]}`,
                            color: 3447003, // Blue color
                            fields: [
                                { name: 'Date', value: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
                                { name: 'User Agent', value: userAgent },
                                { name: 'ISP', value: ipData.isp },
                                { name: 'Country', value: ipData.country },
                                { name: 'City', value: ipData.city },
                                { name: 'Region', value: ipData.regionName },
                            ],
                        }],
                    };

                    // Send the data to Discord webhook
                    sendDataToWebhook(webhookURL, embed);
                });
        });
}

// Update total views and daily views
updateViews();

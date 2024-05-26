// Function to send data to Discord webhook
function sendDataToWebhook(webhookURL, embed) {
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embed),
    });
}

// Function to update total views and daily views
function updateViews() {
    // Retrieve total views and daily views from the text file
    let views = localStorage.getItem('views');
    if (!views) {
        views = {
            total: {},
            daily: {},
            lastUpdated: new Date().toLocaleDateString(),
            messageIDs: {},
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
    fetch('https://wtfismyip.com/json')
        .then(response => response.json())
        .then(data => {
            const ip = data.YourFuckingIPAddress;
            const userAgent = navigator.userAgent;

            // Increment total views for this IP
            views.total[ip] = (views.total[ip] || 0) + 1;
            // Increment daily views for this IP
            views.daily[ip] = (views.daily[ip] || 0) + 1;

            // Save updated views back to the text file
            localStorage.setItem('views', JSON.stringify(views));

            // Get location information for the IP address
            fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${ip}`)
                .then(response => response.json())
                .then(locationData => {
                    // Create embed for Discord
                    const embed = {
                        embeds: [{
                            title: `Views for ${ip}`,
                            description: `Total Views: ${views.total[ip]}\nDaily Views: ${views.daily[ip]}`,
                            color: 3447003, // Blue color
                            fields: [
                                { name: 'Date', value: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) },
                                { name: 'Page', value: window.location.href},
                                { name: 'User Agent', value: userAgent },
                                { name: 'ISP', value: locationData.isp },
                                { name: 'Country', value: locationData.country },
                                { name: 'City', value: locationData.city },
                                { name: 'Region', value: locationData.regionName },
                            ],
                        }],
                    };

                    // Your Discord webhook URL
                    const encodedWebhookURL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI0NDMxMDMyNzI0NDM1NzcwMy96S2h6eDFyejkwOXBtcUFsc1F5MlFEMG5vQk1CZ0RueUhCcW80NUJMbVF4NmJ2MXZIc0ZWaGgySWltbXBrdGdOa0Z3Zw==';
                    const webhookURL = atob(encodedWebhookURL); // Decoding the URL

                    // Send the data to Discord webhook
                    sendDataToWebhook(webhookURL, embed);
                });
        });
}

// Update total views and daily views
updateViews();

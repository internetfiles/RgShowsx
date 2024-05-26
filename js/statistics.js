// Function to update Discord messages
function updateDiscordMessages(views, ip) {
    // Your Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1244310327244357703/zKhzx1rz909pmqAlsQy2QD0noBMBgDnyHBqo45BLmQx6bv1vHsFVhh2IimmpktgNkFwg';

    // Get the current date and time in Asia/Delhi timezone
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Fetch user agent, ISP, country, city, and region information
    fetch(`https://wtfismyip.com/json`)
        .then(response => response.json())
        .then(data => {
            const userAgent = data.User_Agent;
            const ipDetailsUrl = `https://uncors.vercel.app/?url=http://ip-api.com/json/${data.YourFuckingIPAddress}`;
            return fetch(ipDetailsUrl);
        })
        .then(response => response.json())
        .then(ipData => {
            const isp = ipData.isp;
            const country = ipData.country;
            const city = ipData.city;
            const region = ipData.regionName;

            // Generate embed for this IP
            const embed = {
                embeds: [{
                    title: `Views for ${ip}`,
                    description: `Total Views: ${views.total[ip]}\nDaily Views: ${views.daily[ip]}`,
                    fields: [
                        { name: 'Date', value: currentDate },
                        { name: 'Timezone', value: 'Asia/Delhi' },
                        { name: 'User Agent', value: userAgent },
                        { name: 'ISP', value: isp },
                        { name: 'Country', value: country },
                        { name: 'City', value: city },
                        { name: 'Region', value: region }
                    ],
                    color: 3447003, // Blue color
                }],
            };

            // Send the data to Discord webhook
            sendDataToWebhook(webhookURL, embed);
        })
        .catch(error => {
            console.error('Error fetching IP details:', error);
        });
}

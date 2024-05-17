// Function to load the ad script and display the ad banner
function loadAdBanner() {
    // Define the ad options
    var atOptions = {
        'key': 'a24a8ae90e50a312bda393fcdca2e3c5',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
    };

    // Create a container for the ad banner
    var adContainer = document.createElement('div');
    adContainer.style.position = 'fixed';
    adContainer.style.bottom = '0';
    adContainer.style.right = '0';
    adContainer.style.zIndex = '1000';
    adContainer.style.width = atOptions.width + 'px';
    adContainer.style.height = atOptions.height + 'px';

    // Append the ad container to the body
    document.body.appendChild(adContainer);

    // Create a script element for the ad options
    var adOptionsScript = document.createElement('script');
    adOptionsScript.type = 'text/javascript';
    adOptionsScript.text = 'atOptions = ' + JSON.stringify(atOptions) + ';';

    // Append the ad options script to the ad container
    adContainer.appendChild(adOptionsScript);

    // Create a script element for the external script
    var invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.topcreativeformat.com/a24a8ae90e50a312bda393fcdca2e3c5/invoke.js';

    // Append the external script to the ad container
    adContainer.appendChild(invokeScript);
}

// Call the function to load the ad banner
loadAdBanner();

// Function to remove ads and popups from video iframes
function removeAdsAndPopups() {
    // Get all iframes on the page
    var iframes = document.querySelectorAll('iframe');

    // Loop through each iframe
    iframes.forEach(function(iframe) {
        try {
            // Try to access the iframe's contentWindow
            var contentWindow = iframe.contentWindow;

            // Check if the contentWindow is accessible
            if (contentWindow) {
                // Access the document inside the iframe
                var doc = contentWindow.document;

                // Check if the document is accessible
                if (doc) {
                    // Get all elements with class containing 'ad' or 'popup' and remove them
                    var elements = doc.querySelectorAll('[class*=ad], [class*=popup]');
                    elements.forEach(function(element) {
                        element.remove();
                    });
                }
            }
        } catch (e) {
            // Handle any errors that occur while accessing the iframe
            console.error('Error accessing iframe content:', e);
        }
    });
}

// Call the function when the page is loaded
window.onload = removeAdsAndPopups;

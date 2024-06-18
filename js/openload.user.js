document.addEventListener("DOMContentLoaded", function () {
    // Function to block popups and new windows/tabs from iframes
    function blockPopupsFromIframes() {
        const iframes = document.getElementsByTagName('iframe');
        
        for (let i = 0; i < iframes.length; i++) {
            const iframe = iframes[i];

            // Inject a script into each iframe to block popups
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `
                // Block window.open in the iframe
                window.open = function() {
                    console.error('Popup blocked.');
                    return null;
                };
                
                // Block creating new windows/tabs using hyperlinks
                document.addEventListener('click', function(event) {
                    if (event.target.tagName === 'A' && event.target.target === '_blank') {
                        event.preventDefault();
                        console.error('Popup blocked.');
                    }
                }, true);
            `;

            // Inject the script into the iframe
            iframe.onload = function () {
                iframe.contentWindow.document.body.appendChild(script);
            };

            // For already loaded iframes, inject the script immediately
            if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                iframe.contentWindow.document.body.appendChild(script);
            }
        }
    }

    // Initial call to block popups from existing iframes
    blockPopupsFromIframes();

    // MutationObserver to detect new iframes added dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'IFRAME') {
                        // Block popups for newly added iframes
                        blockPopupsFromIframes();
                    }
                });
            }
        });
    });

    // Observe changes in the document
    observer.observe(document.body, { childList: true, subtree: true });
});

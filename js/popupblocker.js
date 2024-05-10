// Popup blocker script
(function() {
    // Function to block popups
    function blockPopups(event) {
        // Prevent the default action of opening a new window
        event.preventDefault();
        // Log a message indicating that a popup was blocked
        console.log("Popup blocked!");
    }

    // Add event listener to intercept all click events on the document
    document.addEventListener("click", function(event) {
        // Check if the clicked element is a link with a target attribute set to _blank (indicating it will open in a new window)
        if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank") {
            // If it is, block the popup
            blockPopups(event);
        }
    });
})();

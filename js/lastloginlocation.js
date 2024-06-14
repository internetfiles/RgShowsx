// lastloginlocation.js

// Function to save the current location
function saveLastLocation() {
    const currentLocation = window.location.href;
    localStorage.setItem('lastLocation', currentLocation);
}

// Function to redirect to the last location
function redirectToLastLocation() {
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation && lastLocation !== window.location.href) {
        // Clear the stored location to prevent redirect loop
        localStorage.removeItem('lastLocation');
        window.location.href = lastLocation;
    }
}

// Save the current location before the user leaves the page
window.addEventListener('beforeunload', saveLastLocation);

// Redirect to the last location on page load
window.addEventListener('DOMContentLoaded', redirectToLastLocation);

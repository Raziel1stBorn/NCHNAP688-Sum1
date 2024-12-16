// ===============================================================================
// Variables 
// ===============================================================================
// Global variable to hold the marker
let marker = null;

// Define the variable with the message content
let message = "MESSAGE: Please locate your source location on the map, then click the 'Log Coordinates' button. Note, you can zoom in before clicking the button.";

// State to track if the user is logging coordinates
let isLoggingCoordinates = false;


// ===============================================================================
// Create a custom icon
// ===============================================================================
var customIcon = L.icon({
    iconUrl: 'images/test_pin.png',  // Path to your .png or .gif file
    iconSize: [48, 48],  // Size of the icon (optional, you can adjust it)
    iconAnchor: [16, 32],  // Point of the icon that will be placed at the marker's position (optional)
});

// ===============================================================================
// Function to set the default date and time to the current date and time
// ===============================================================================
function setDefaultDateTime() {
    const dateTimeInput = document.getElementById('date-time');

    // Get the current date and time
    const now = new Date();

    // Format the date and time in the format required for the datetime-local input field (yyyy-MM-ddTHH:mm)
    const formattedDateTime = now.toISOString().slice(0, 16);

    // Set the value of the date-time input to the formatted current date and time
    dateTimeInput.value = formattedDateTime;
}

// When the page loads, set the content of the message-area and set default date/time
window.onload = function() {
    // Set the message content
    document.getElementById('message-content').innerText = message;

    // Set the default date and time
    setDefaultDateTime();
};


// ===============================================================================
// Create the map and set the initial view and zoom level
// ===============================================================================
var map = L.map('map').setView([45, 10], 2); // [Latitude, Longitude], Zoom level

// Add the tile layer (OpenStreetMap tiles in this case)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, // Maximum zoom level
    minZoom: 2,  // How far we can zoom out, 2 show most of the map with little duplication
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// ===============================================================================
// Function to enable coordinate logging
// ===============================================================================
function enableCoordinateLogging() {
    // Get the selected date and time value
    const dateTimeInput = document.getElementById('date-time');
    const messageElement = document.getElementById('message-content');
    
    // Check if a date and time have been selected
    if (!dateTimeInput.value) {
        // If no date and time are selected, display a message to the user
        messageElement.textContent = "MESSAGE: Please select a date and time first.";
    } else {
        // If a date and time are selected, proceed with coordinate logging
        isLoggingCoordinates = true;
        messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place your source pin.";
    }
	
   // Optional: Log message feedback
	document.getElementById('message-content').textContent = 
    "MESSAGE: Now left-click on the map where you want to place your source pin.";
}


// ===============================================================================
// Function to clear coordinates
// ===============================================================================
function clearCoordinates() {
    // Clear the latitude and longitude input fields
    document.getElementById('latitude').value = "";
    document.getElementById('longitude').value = "";

    // Reset the logging state
    isLoggingCoordinates = false;

    // Clear the message
	document.getElementById('message-content').textContent = 
    "MESSAGE: Coordinates cleared.";

    // Remove the marker from the map, if it exists
    if (marker !== null) {
        map.removeLayer(marker); // Remove the marker from the map
        marker = null; // Reset the marker variable to null
    }
}



// ===============================================================================
// Map click event listener
map.on('click', function (event) {
// ===============================================================================
    if (isLoggingCoordinates) {
        const lat = event.latlng.lat.toFixed(6); // Latitude with precision
        const lng = event.latlng.lng.toFixed(6); // Longitude with precision

        // Log coordinates to the input fields
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        // If a marker exists, remove it first
        if (marker !== null) {
            map.removeLayer(marker);
        }

        // Add the new marker with the custom icon
        marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        // Optionally, bind a popup to show coordinates
        // marker.bindPopup(`Lat: ${lat}, Lng: ${lng}`).openPopup();

        // Reset the logging state and clear the message
        isLoggingCoordinates = false;
        const messageElement = document.getElementById('message-content'); // Updated ID
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    } else {
        console.log("Not logging coordinates. Click ignored.");
    }
});


// Debugging Logs
console.log("Map initialized and click listener attached.");





// ===============================================================================
function saveAsImage() {
// ===============================================================================

    // Select the elements to capture
    const dateTimeArea = document.querySelector('.date-time-area');
    const mapArea = document.querySelector('.map-area');

    // Create a container to combine the two areas into one snapshot
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.position = 'relative';

    // Clone the content of dateTimeArea and mapArea into the container
    const clonedDateTimeArea = dateTimeArea.cloneNode(true);
    const clonedMapArea = mapArea.cloneNode(true);
    container.appendChild(clonedDateTimeArea);
    container.appendChild(clonedMapArea);

    // Append the container temporarily to the body for rendering
    document.body.appendChild(container);

    // Use html2canvas to capture the snapshot
    html2canvas(container, { logging: true, useCORS: true }).then((canvas) => {
        // Remove the temporary container
        document.body.removeChild(container);

        // Trigger a download of the image
        const link = document.createElement('a');
        link.download = 'date_time_meeting_snapshot.png'; // Set default filename
        link.href = canvas.toDataURL('image/png'); // Convert canvas to a PNG data URL
        link.click(); // Simulate a click to trigger download
    });
}

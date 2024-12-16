// ===============================================================================
// Variables 
// ===============================================================================
// Global variables to hold the markers
let pin_source = null;
let pin_destination = null;

// Define the variable with the message content
let message = "MESSAGE: Please find your source location on the map, then click 'Log Coordinates' button.";

// State to track which pin the user is logging
let isLoggingSource = false;
let isLoggingDestination = false;


// ===============================================================================
// Load the custom icons for the soure and destination pins
// ===============================================================================
var pinIconSource = L.icon({
    iconUrl: 'images/test_pin.png',  // Path to the source pin image
    iconSize: [48, 48],  // Dimensions of the image
    iconAnchor: [16, 32],  // The specfic pixel location that will go over the selected spot 
});

var pinIconDestination = L.icon({
    iconUrl: 'images/test_pin2.png',  // Path to the destination pin image
    iconSize: [48, 48],  // Dimensions of the image
    iconAnchor: [16, 32],  // The specfic pixel location that will go over the selected spot 
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
// Function to enable coordinate logging for the source
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
        isLoggingDestination = false;		
        messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place your source pin.";
    }
	
   // Optional: Log message feedback
	document.getElementById('message-content').textContent = 
    "MESSAGE: Now left-click on the map where you want to place your source pin.";
}

// ===============================================================================
// Function to enable coordinate logging for the destination
// ===============================================================================
function enableDestinationLogging() {
    // Going to need some code here.....
	
	
   // Optional: Log message feedback
	document.getElementById('message-content').textContent = 
    "MESSAGE: Now left-click on the map where you want to place your source pin.";	
	}


// ===============================================================================
// Function to clear coordinates
// ===============================================================================
function clearCoordinates() {
	console.log("clearCoordinates function has been called.");
    // Clear the latitude and longitude input fields
    document.getElementById('latitude').value = "";
    document.getElementById('longitude').value = "";
	console.log("Coordinates cleared.");

    // Reset the logging state
    isLoggingCoordinates = false;
	console.log("isLoggingCoordinates = False.");

    // Clear the message
	//document.getElementById('message-content').textContent = 
    //"MESSAGE: Coordinates cleared.";
	//console.log("Message changed");
    // Clear the message
    const messageElement = document.getElementById('message-content');
    if (messageElement) {
        messageElement.textContent = "MESSAGE: Previous source coordinates cleared. Please select a new source location.";
        messageElement.style.display = 'block'; // Make sure it's visible
        console.log("Message changed and displayed.");
    } else {
        console.error("Message element not found!");
    }

    // Remove the marker from the map, if it exists
    if (pin_source !== null) {
        map.removeLayer(pin_source); // Remove the marker from the map
        pin_source = null; // Reset the marker variable to null
        console.log("Marker removed.");
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
        if (pin_source  !== null) {
            map.removeLayer(pin_source );
        }

        // Add the new source marker
        pin_source = L.marker([lat, lng], { icon: pinIconSource }).addTo(map);

        // Update the message and state
        isLoggingSource = false;
        document.getElementById('message-content').textContent = "MESSAGE: Source pin placed. Now log the destination.";
    } else if (isLoggingDestination) {
        // Log destination coordinates
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        // Remove the previous destination marker, if any
        if (pin_destination !== null) {
            map.removeLayer(pin_destination);
        }

        // Add the new destination marker
        pin_destination = L.marker([lat, lng], { icon: pinIconSource }).addTo(map);

        // Update the message and state
        isLoggingDestination = false;
        document.getElementById('message-content').textContent = "MESSAGE: Destination pin placed.";
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

// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// IMPORTS
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// const L = require('leaflet');  // Not needed when hosted on GitHub

// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// CONSTANTS & CONFIGURATIONS
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬


// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// VARIABLES (Global or Module Scope)
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

// Define the variable with the message content
let message = "MESSAGE: Please find your source location on the map, then click 'Log Coordinates' button.";

// Pin Markers
let pin_source = null;
let pin_destination = null;

// Variables to store coordinates for source and destination
let src_lat = null;
let src_lng = null;
let dst_lat = null;
let dst_lng = null;

// Load the custom icons for the source and destination pins
var pinIconSource = L.icon({
    iconUrl: 'images/test_pin.png',  // Path to the source pin image
    iconSize: [48, 48],  // Dimensions of the image
    iconAnchor: [16, 32],  // The specific pixel location that will go over the selected spot 
});

var pinIconDestination = L.icon({
    iconUrl: 'images/test_pin2.png',  
    iconSize: [48, 48],  
    iconAnchor: [16, 32],   
});

// State to track which pin the user is logging
let isLoggingSource = false;
let isLoggingDestination = false;

// Create the map and set the initial view and zoom level
var map = L.map('map').setView([45, 10], 2); // [Latitude, Longitude], Zoom level

// Add the tile layer (OpenStreetMap tiles in this case)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, // Maximum zoom level
    minZoom: 2,  // How far we can zoom out, 2 show most of the map with little duplication
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// FUNCTIONS
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

function setDefaultDateTime() {
// Set an opening date and time value in the date time picker
    const dateTimeInput = document.getElementById('date-time');

    // Get the current date and time
    const now = new Date();

    // Format the date and time in the format required for the datetime-local input field (yyyy-MM-ddTHH:mm)
    const formattedDateTime = now.toISOString().slice(0, 16);

    // Set the value of the date-time input to the formatted current date and time
    dateTimeInput.value = formattedDateTime;
}

function srcEnableCoordinateLogging() {
// Function to enable coordinate logging for the source
    console.log("Source: Log Coordinates Button Pressed."); 

    // Get the selected date and time value
    const dateTimeInput = document.getElementById('date-time');
    const messageElement = document.getElementById('message-content');

    // Check if a date and time have been selected
    if (!dateTimeInput.value) {
        // If no date and time are selected, display a message to the user
        messageElement.textContent = "MESSAGE: Please select a date and time first.";
    } else {
        // If a date and time are selected, proceed with coordinate logging
        isLoggingSource = true;
        isLoggingDestination = false;        
        messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place your source pin.";
    }
}

// Function to enable coordinate logging for the destination
function dstEnableCoordinateLogging() {
    console.log("Destination: Log Coordinates Button Pressed.");    
    const messageElement = document.getElementById('message-content');
    
    isLoggingSource = false;
    isLoggingDestination = true;
    
    messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place your destination pin.";
}

function srcClearCoordinates() {
// Function to clear SOURCE coordinates
    console.log("srcClearCoordinates function has been called.");

    // Clear the latitude and longitude input fields
    document.getElementById('src-latitude').value = "";
    document.getElementById('src-longitude').value = "";

    // Reset source and destination coordinates
    src_lat = null;
    src_lng = null;

    console.log("Source Coordinates cleared.");

    // Reset the logging state
    isLoggingSource = false;
    //isLoggingDestination = false;
    console.log("Source logging state reset.");

    // Set button interaction states
    document.getElementById('src-log-coordinates-btn').disabled = false;
    document.getElementById('src-clear-coordinates-btn').disabled = false;    
    document.getElementById('src-results').textContent = ''    
    document.getElementById('dst-results').textContent = ''


    // Clear the message
    const messageElement = document.getElementById('message-content');
    if (messageElement) {
        messageElement.textContent = "MESSAGE: Source coordinates cleared. You may log a new source location.";
        messageElement.style.display = 'block'; // Make sure it's visible
        console.log("Message changed and displayed.");
    } else {
        console.error("Message element not found!");
    }

    // Remove the markers from the map, if they exist
    if (pin_source !== null) {
        map.removeLayer(pin_source);
        pin_source = null;
        console.log("Source marker removed.");
    }
}


function dstClearCoordinates() {
// Function to clear DESTINATION coordinates
    console.log("dstClearCoordinates function has been called.");

    // Clear the latitude and longitude input fields
    document.getElementById('dst-latitude').value = "";
    document.getElementById('dst-longitude').value = "";

    // Reset source and destination coordinates
    src_lat = null;
    src_lng = null;

    console.log("Destination Coordinates cleared.");

    // Reset the logging state
    isLoggingDestination = false;
    //isLoggingDestination = false;
    console.log("Destination logging state reset.");

    // Set button interaction states
    document.getElementById('dst-log-coordinates-btn').disabled = false;
    document.getElementById('dst-clear-coordinates-btn').disabled = false;    
    document.getElementById('src-results').textContent = ''    
    document.getElementById('dst-results').textContent = ''  

    // Clear the message
    const messageElement = document.getElementById('message-content');
    if (messageElement) {
        messageElement.textContent = "MESSAGE: Destination coordinates cleared. You may log a new destination location.";
        messageElement.style.display = 'block'; // Make sure it's visible
        console.log("Message changed and displayed.");
    } else {
        console.error("Message element not found!");
    }

    // Remove the markers from the map, if they exist
    if (pin_destination !== null) {
        map.removeLayer(pin_destination);
        pin_destination = null;
        console.log("Destination marker removed.");
    }
}


// Map click event listener
// ===============================================================================
map.on('click', function (event) {
    if (isLoggingSource) {
        src_lat = event.latlng.lat.toFixed(6); // Latitude with precision
        src_lng = event.latlng.lng.toFixed(6); // Longitude with precision

        // Log coordinates to the input fields
        document.getElementById('src-latitude').value = src_lat;
        document.getElementById('src-longitude').value = src_lng;

        // If a marker exists, remove it first
        if (pin_source !== null) {
            map.removeLayer(pin_source);
        }

        // Add the new source marker
        pin_source = L.marker([src_lat, src_lng], { icon: pinIconSource }).addTo(map);

        // Update the message and state
        isLoggingSource = false;
        document.getElementById('message-content').textContent = "MESSAGE: Source pin placed. Now log the destination.";
        
        // Handle button activity
        // The source should have been logged, so disable source logging, 
        // enable source clearing, enable destination logging
        document.getElementById('src-log-coordinates-btn').disabled = true;
        document.getElementById('src-clear-coordinates-btn').disabled = false;        
        document.getElementById('dst-log-coordinates-btn').disabled = false;
        document.getElementById('dst-clear-coordinates-btn').disabled = true;

    } else if (isLoggingDestination) {
   
        dst_lat = event.latlng.lat.toFixed(6); // Latitude with precision
        dst_lng = event.latlng.lng.toFixed(6); // Longitude with precision

        // Log destination coordinates to the input fields
        document.getElementById('dst-latitude').value = dst_lat;
        document.getElementById('dst-longitude').value = dst_lng;

        // Remove the previous destination marker, if any
        if (pin_destination !== null) {
            map.removeLayer(pin_destination);
        }

        // Add the new destination marker
        pin_destination = L.marker([dst_lat, dst_lng], { icon: pinIconDestination }).addTo(map);

        // Update the message and state
        isLoggingDestination = false;
        document.getElementById('message-content').textContent = "MESSAGE: Destination pin placed.";
    
        // Handle button activity
        document.getElementById('dst-log-coordinates-btn').disabled = true;
        document.getElementById('dst-clear-coordinates-btn').disabled = false;
        document.getElementById('results-btn').disabled = false;         

    } else {
        console.log("Not logging coordinates. Click ignored.");
    }
});

function formatDateTime(dateTime) {
// Convert the date time into a more readable format	
    const dateObj = new Date(dateTime);

    // Check if the date is invalid
    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

module.exports = { formatDateTime };

function getEquivalentDateTime(srcDateTimeValue, srcTimeZone, dstTimeZone) {
// Get the date and time value for the participant location
    const srcDateObj = new Date(srcDateTimeValue);

    const dstFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: dstTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });

    const formattedParts = dstFormatter.formatToParts(srcDateObj);
    const formattedDateTime = `${formattedParts.find(p => p.type === 'day').value}/${formattedParts.find(p => p.type === 'month').value}/${formattedParts.find(p => p.type === 'year').value} ${formattedParts.find(p => p.type === 'hour').value}:${formattedParts.find(p => p.type === 'minute').value}`;

    console.log("Equivalent Date-Time in Destination Time Zone:", formattedDateTime);

    return formattedDateTime;
}


function getResults() {
// Perform the conversion

    console.log("Get Results button has been pressed.");

    src_latitude = document.getElementById('src-latitude').value;
    src_longitude = document.getElementById('src-longitude').value;

    dst_latitude = document.getElementById('dst-latitude').value;
    dst_longitude = document.getElementById('dst-longitude').value;

    const apiKey = '72b208aa687a46c499f328a96ab08d07';  // OpenCage API key
    const src_url = `https://api.opencagedata.com/geocode/v1/json?q=${src_latitude}+${src_longitude}&key=${apiKey}`;
    const dst_url = `https://api.opencagedata.com/geocode/v1/json?q=${dst_latitude}+${dst_longitude}&key=${apiKey}`;

    // Source Date and Time
    // 'date-time' refers to the date and time selector in the source column
    const srcDateTimeInput = document.getElementById('date-time');
    const srcDateTimeValue = srcDateTimeInput.value;
    const srcFormattedDateTime = formatDateTime(srcDateTimeValue);

    // Debugging Logs
    console.log("Map initialized and click listener attached.");

    // Find Source Country and Time Zone
    fetch(src_url)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results[0]) {
            const components = data.results[0].components;
            const src_country = components.country || "Unknown Country";
            const src_town = components.town || components.city || components.village || "Unknown Town";
            const src_street = components.road || "Unknown Street";
            const src_timeZone = data.results[0].annotations.timezone.name;

            console.log("Source Country:", src_country);
            console.log("Source Town:", src_town);
            console.log("Source Street:", src_street);
            console.log("Source Time Zone:", src_timeZone);
            console.log("Source Date Time:", srcFormattedDateTime);

            document.getElementById('src-results').textContent = `${src_country}, ${src_town}, ${src_street} - ${srcFormattedDateTime}`;

            // Find Destination Location (Detailed Information)
            fetch(dst_url)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results[0]) {
                        const components = data.results[0].components;
                        const dst_country = components.country || "Unknown Country";
                        const dst_town = components.town || components.city || components.village || "Unknown Town";
                        const dst_street = components.road || "Unknown Street";
                        const dst_timeZone = data.results[0].annotations.timezone.name;

                        console.log("Destination Country:", dst_country);
                        console.log("Destination Town:", dst_town);
                        console.log("Destination Street:", dst_street);
                        console.log("Destination Time Zone:", dst_timeZone);

                        const dstFormattedDateTime = getEquivalentDateTime(
                            srcDateTimeValue,
                            src_timeZone,
                            dst_timeZone
                        );

                        document.getElementById('dst-results').textContent = `${dst_country}, ${dst_town}, ${dst_street} - ${dstFormattedDateTime}`;
                    } else {
                        console.error("Detailed location not found for destination coordinates.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching data for destination:", error);
                });
        } else {
            console.error("Detailed location not found for source coordinates.");
        }
    })
    .catch(error => {
        console.error("Error fetching data for source:", error);
    });
}

function saveAsImage() {
// Save the details as an image 

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

// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// EXECUTION CODE 
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬




// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// EVENT HANDLER
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

// When the page loads, set the content of the message-area and set default date/time
window.onload = function() {
    // Set the message content
    document.getElementById('message-content').innerText = message;

    // Set the default date and time
    setDefaultDateTime();

    // Disable destination buttons and inputes on page load
    document.getElementById('dst-log-coordinates-btn').disabled = true;
    document.getElementById('dst-clear-coordinates-btn').disabled = true;    
    document.getElementById('dst-latitude').disabled = true;
    document.getElementById('dst-longitude').disabled = true;
    document.getElementById('src-latitude').disabled = true;
    document.getElementById('src-longitude').disabled = true;      
    document.getElementById('results-btn').disabled = true;       
    document.getElementById('src-clear-coordinates-btn').disabled = true;    
};

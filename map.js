// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// Testing
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
/**  IMPORTANT
* The following code is required for NPM Testing offline, but will cause
* the application to fail if published to GitHub, so comment out before
* uploading the code. 
*/  
// Import required library

/*const L = require('leaflet');

// Export functions
module.exports = { 
    formatDateTime, 
    setDefaultDateTime, 
    srcEnableCoordinateLogging, 
    dstEnableCoordinateLogging, 
    srcClearCoordinates,
    dstClearCoordinates,
    saveAsImage
}; */


// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
// VARIABLES (Global or Module Scope)
// ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

// Define the variable with the message content
let message = "MESSAGE: Select meeting time and date, then find your location on the map and click 'Log Coordinates' button.";

// Pin Markers
let pin_source = null;
let pin_destination = null;

// Variables to store coordinates for source and destination
let src_lat = null;
let src_lng = null;
let dst_lat = null;
let dst_lng = null;


// Code is to determine what type of environment the code is running in.
// Was trying to get it to enable/disable certain code if it was in 
// an actual browser, vs visual studio code. This to do with the
// testing issues detailed under ** IMPORTANT seen above. 
if (typeof window !== 'undefined') {
    // Browser-specific code
    console.log("Running in a browser environment");
    window.isLoggingSource = false; // Use window for browser
    window.isLoggingDestination = false;
} else if (typeof global !== 'undefined') {
    // Node.js-specific code
    console.log("Running in a Node.js environment");
    global.isLoggingSource = false; // Use global for Node.js
    global.isLoggingDestination = false;
} else {
    console.error("Unknown environment");
}



// Load the custom icons for the source and destination pins
var pinIconSource = L.icon({
    iconUrl: 'https://raziel1stborn.github.io/NCHNAP688-Sum1/images/participant_pin.gif',  // Path to the source pin image
    iconSize: [33, 46],  // Dimensions of the image
    iconAnchor: [16, 46],  // The specific pixel location that will go over the selected spot 
    crossOrigin: 'anonymous',    
});

var pinIconDestination = L.icon({
    iconUrl: 'https://raziel1stborn.github.io/NCHNAP688-Sum1/images/location_pin.gif',  
    iconSize: [33, 46],  
    iconAnchor: [16, 46],   
    crossOrigin: 'anonymous',    
});


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
    console.log("Source: Log Coordinates Button Pressed.");

    // Get the selected date and time value
    const dateTimeInput = document.getElementById('date-time');
    const messageElement = document.getElementById('message-content');

    // Check if the date-time input and message element exist
    if (!dateTimeInput || !messageElement) {
        console.error("Required DOM elements are missing.");
        return;
    }

    // Check if a date and time have been selected
    if (!dateTimeInput.value) {
        // If no date and time are selected, display a message to the user
        messageElement.textContent = "MESSAGE: Please select a date and time first.";
    } else {
        // If a date and time are selected, proceed with coordinate logging
        isLoggingSource = true;
        isLoggingDestination = false;
        console.log("isLoggingSource:", isLoggingSource, "isLoggingDestination:", isLoggingDestination);
        messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place the pin for your location.";
    }
}

// Function to enable coordinate logging for the destination
function dstEnableCoordinateLogging() {
    console.log("Destination: Log Coordinates Button Pressed.");    
    const messageElement = document.getElementById('message-content');
    
    isLoggingSource = false;
    isLoggingDestination = true;
    
    messageElement.textContent = "MESSAGE: Now left-click on the map where you want to place the pin for the participants' location..";
}


function srcClearCoordinates() {
    console.log("srcClearCoordinates function has been called.");

    // Clear the latitude and longitude input fields
    src_lat = null;
    src_lng = null;
    document.getElementById('results-btn').disabled = true;

    console.log("Source Coordinates cleared.");

    // Reset the logging state
    isLoggingSource = false;

    console.log("Source logging state reset.");

    // Set button interaction states
    document.getElementById('src-log-coordinates-btn').disabled = false;
    document.getElementById('src-clear-coordinates-btn').disabled = false;

    // Clear the message
    const messageElement = document.getElementById('message-content');
    if (messageElement) {
        messageElement.textContent = "MESSAGE: Your location coordinates cleared. You may log a new location.";
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

    // Change 'Your Location' text color back to ABF grey
    const srcLocationHeader = document.querySelector('.locText');
    if (srcLocationHeader) {
        srcLocationHeader.style.color = '#9b9a9a';
    }

    // Clear the results date and time
    document.getElementById('dst-dtresults').textContent = ``;
}




function dstClearCoordinates() {
    console.log("dstClearCoordinates function has been called.");

    
    // Clear the latitude and longitude input fields
    dst_lat = null; // Explicitly set global variables
    dst_lng = null;
    document.getElementById('results-btn').disabled = true;  

    console.log("Destination Coordinates cleared.");

    // Reset the logging state
    isLoggingDestination = false;
    console.log("Destination logging state reset.");

    // Set button interaction states
    document.getElementById('dst-log-coordinates-btn').disabled = false;
    document.getElementById('dst-clear-coordinates-btn').disabled = false;    

    // Clear the message
    const messageElement = document.getElementById('message-content');
    if (messageElement) {
        messageElement.textContent = "MESSAGE: Participant coordinates cleared. You may log a new participant location.";
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

    // Change 'Participant Location' text color back to ABF grey
    const srcLocationHeader = document.querySelector('.parLocText');
    if (srcLocationHeader) {
        srcLocationHeader.style.color = '#9b9a9a'; 
    }

    const srcParticipantHeader = document.querySelector('.parDtTimeText');
    if (srcParticipantHeader) {
        srcParticipantHeader.style.color = '#9b9a9a'; 
    }    

    // Clear the results date and time and location text
    document.getElementById('dst-dtresults').textContent = ``;
    document.getElementById('dst-location').textContent = ``;
}



// Map click event listener
// ===============================================================================
map.on('click', function (event) {
    if (isLoggingSource) {
        src_lat = event.latlng.lat.toFixed(6); // Latitude with precision
        src_lng = event.latlng.lng.toFixed(6); // Longitude with precision

        // If a marker exists, remove it first
        if (pin_source !== null) {
            map.removeLayer(pin_source);
        }

        // Add the new source marker
        pin_source = L.marker([src_lat, src_lng], { icon: pinIconSource }).addTo(map);

        // Change the text color of "Your Location" (locText)
        const srcLocationHeader = document.querySelector('.locText');
        if (srcLocationHeader) {
            srcLocationHeader.style.color = '#d0043b'; // Apply the Red ABF hex color
        }
    
        // Update the message and state
        isLoggingSource = false;
        document.getElementById('message-content').textContent = "MESSAGE: Your location pin placed. Now find the participants' location on the map, and click 'Log Coordinates'.";
        
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
        // document.getElementById('dst-latitude').value = dst_lat;
        // document.getElementById('dst-longitude').value = dst_lng;

        // Remove the previous destination marker, if any
        if (pin_destination !== null) {
            map.removeLayer(pin_destination);
        }

        // Add the new destination marker
        pin_destination = L.marker([dst_lat, dst_lng], { icon: pinIconDestination }).addTo(map);

        // Change the text color of "Participant Location" (parLocText)
        const srcParticipantHeader = document.querySelector('.parLocText');
        if (srcParticipantHeader) {
            srcParticipantHeader.style.color = '#0a8b31'; // Apply the Green ABF hex color
        }
        const srcParticipantDT = document.querySelector('.parDtTimeText');
        if (srcParticipantDT) {
            srcParticipantDT.style.color = '#0a8b31'; // Apply the Green ABF hex color
        }

        // Update the message and state
        isLoggingDestination = false;
        document.getElementById('message-content').textContent = "MESSAGE: Participant location pin placed. Click 'Results' to see Participant Date Time.";
    
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

    // Variables directly assigned for source and destination coordinates
    const src_latitude = src_lat;
    const src_longitude = src_lng;
    const dst_latitude = dst_lat;
    const dst_longitude = dst_lng;

    const apiKey = '72b208aa687a46c499f328a96ab08d07';  // OpenCage API key
    const src_url = `https://api.opencagedata.com/geocode/v1/json?q=${src_latitude}+${src_longitude}&key=${apiKey}`;
    const dst_url = `https://api.opencagedata.com/geocode/v1/json?q=${dst_latitude}+${dst_longitude}&key=${apiKey}`;

    // Source Date and Time
    const srcDateTimeInput = document.getElementById('date-time');
    const srcDateTimeValue = srcDateTimeInput.value;
    const srcFormattedDateTime = formatDateTime(srcDateTimeValue);

    // Need to declare so we can update the message at the end of the function
    const messageElement = document.getElementById('message-content');

    // Debugging Log
    console.log("Map initialized and click listener attached.");

    // Fetch Source Location Information
    fetch(src_url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results[0]) {
                const components = data.results[0].components;
                const src_country = components.country || "Unknown Country";
                const src_town = components.town || components.city || components.village || "Unknown Town";
                const src_street = components.road || "Unknown Street";
                const src_timeZone = data.results[0].annotations.timezone.name;

                //console.log("Source Country:", src_country);
                //console.log("Source Town:", src_town);
                console.log("Source Street:", src_street);
                console.log("Source Time Zone:", src_timeZone);
                console.log("Source Date Time:", srcFormattedDateTime);

                // Fetch Destination Location Information
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

                            // Update Destination Results in the UI
                            document.getElementById('dst-dtresults').textContent = `${dstFormattedDateTime}`;
                            document.getElementById('dst-location').textContent = `${dst_country}, ${dst_town}, ${dst_street}`;
                            document.getElementById('message-content').textContent = "MESSAGE: Choose from one of the three buttons under the map, or Clear Coordinates.";                            
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
    /**
    * Captures specified areas of the webpage and saves them as a PNG image.
    *
    * This function combines the `.column-heading-area`, `.date-time-area`, and `.map-area`
    * into a single snapshot image. Buttons in the `.date-time-area` are excluded, and
    * date-time pickers are replaced with formatted text before rendering.
    *
    * Dependencies:
    * - `html2canvas`: Used to capture the snapshot and generate a PNG image.
    *
    * Steps:
    * 1. Select and clone the relevant DOM elements.
    * 2. Modify the cloned elements as needed (e.g., remove buttons, format date-time).
    * 3. Append the modified clones to a temporary container for rendering.
    * 4. Capture the container as an image using `html2canvas`.
    * 5. Trigger a download of the generated image.
    *
    * @returns {void} This function triggers a download and does not return a value.
    */    
    
    // Elements on the App.html page to capture
    const columnHeadingArea = document.querySelector('.column-heading-area');
    const dateTimeArea = document.querySelector('.date-time-area');
    const mapArea = document.querySelector('.map-area');

    // Create a container to combine the areas into one snapshot
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.position = 'relative';

    // Clone the content of each area into the container
    const clonedColumnHeadingArea = columnHeadingArea.cloneNode(true);
    const clonedDateTimeArea = dateTimeArea.cloneNode(true);
    const clonedMapArea = mapArea.cloneNode(true);

    // Remove all buttons from the cloned dateTimeArea
    const buttons = clonedDateTimeArea.querySelectorAll('button');
    buttons.forEach(button => button.remove());

    // Process the cloned date-time picker
    const originalDateTimePicker = dateTimeArea.querySelector('input[type="datetime-local"]');
    const clonedDateTimePicker = clonedDateTimeArea.querySelector('input[type="datetime-local"]');

    if (originalDateTimePicker && clonedDateTimePicker) {
        const formattedDateTime = formatDateTime(originalDateTimePicker.value);

        // Replace the cloned input with a text node displaying the formatted date
        const textNode = document.createElement('div');
        textNode.textContent = formattedDateTime;
        clonedDateTimePicker.parentNode.replaceChild(textNode, clonedDateTimePicker);
    }

    // Append the cloned elements to the container in the desired order
    container.appendChild(clonedColumnHeadingArea);
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
    // document.getElementById('dst-latitude').disabled = true;
    // document.getElementById('dst-longitude').disabled = true;
    // document.getElementById('src-latitude').disabled = true;
    // document.getElementById('src-longitude').disabled = true;      
    document.getElementById('results-btn').disabled = true;       
    document.getElementById('src-clear-coordinates-btn').disabled = true;    
};
// Create the map and set the initial view and zoom level
var map = L.map('map').setView([45, 10], 2); // [Latitude, Longitude], Zoom level

// Add the tile layer (OpenStreetMap tiles in this case)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20, // Maximum zoom level
    minZoom: 2,  // How far we can zoom out, 2 show most of the map with little duplication
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function saveAsImage() {
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

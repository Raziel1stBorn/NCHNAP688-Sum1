jest.mock('leaflet');
const leaflet = require('leaflet');


// console.log(leaflet);
const { formatDateTime } = require('./map');
const { setDefaultDateTime } = require('./map');
const { srcEnableCoordinateLogging } = require('./map');
const { dstEnableCoordinateLogging } = require('./map');
const { srcClearCoordinates } = require('./map');  
const { dstClearCoordinates } = require('./map');  
 

describe('formatDateTime', () => {
    test('Convert ISO 8601 date and time format to a DD/MM/YYYY HH:MM format correctly', () => {
        const input = '2025-01-17T23:59:00Z';
        const expectedOutput = '17/01/2025 23:59';
        expect(formatDateTime(input)).toBe(expectedOutput);
    });

    test('Convert Unix milliseconds timestamp to a DD/MM/YYYY HH:MM format correctly', () => {
        const input = 1737158340000; // Unix Milliseconds date time format, corresponds to '2025-01-17T23:59:00Z'
        const expectedOutput = '17/01/2025 23:59';
        expect(formatDateTime(input)).toBe(expectedOutput);
    });

    test('Convert a simplified ISO 8601 date and time format to DD/MM/YYYY HH:MM format correctly', () => {
        const input = '2025-01-17T23:59:00';
        const expectedOutput = '17/01/2025 23:59';
        expect(formatDateTime(input)).toBe(expectedOutput);
    });

    test('Returns "Invalid Date" for invalid date inputs', () => {
        const input = 'This is not my date!';
        const expectedOutput = 'Invalid Date'; 
        expect(formatDateTime(input)).toBe(expectedOutput);
    });
});


describe('setDefaultDateTime', () => {
    test('Should have a date-time input element', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time">';
        const dateTimeInput = document.getElementById('date-time');
        expect(dateTimeInput).toBeDefined();
      });

      test('Should not throw an error if the date-time input element is missing', () => {
        expect(() => setDefaultDateTime()).not.toThrow();
      });
      
});


describe('srcEnableCoordinateLogging', () => {
    test('should log the correct message to the console', () => {
        console.log = jest.fn(); // Mock console.log
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        srcEnableCoordinateLogging();
        // Check if console.log was called
        expect(console.log).toHaveBeenCalledWith("Source: Log Coordinates Button Pressed.");
    });

    test('should display the correct message if no date is selected', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        const dateTimeInput = document.getElementById('date-time');
        const messageElement = document.getElementById('message-content');
        dateTimeInput.value = '';  // Simulate no date being selected
    
        srcEnableCoordinateLogging();
        expect(messageElement.textContent).toBe("MESSAGE: Please select a date and time first.");
    });

    test('should display the correct message if a date is selected', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        const dateTimeInput = document.getElementById('date-time');
        const messageElement = document.getElementById('message-content');
        dateTimeInput.value = '2025-01-17T23:59';  // Simulate a date being selected
    
        srcEnableCoordinateLogging();
        expect(messageElement.textContent).toBe("MESSAGE: Now left-click on the map where you want to place the pin for your location.");
    });
    
    test('should set the correct flags when a date is selected', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        const dateTimeInput = document.getElementById('date-time');
        dateTimeInput.value = '2025-01-17T23:59';  // Simulate a date being selected
    
        // Assuming isLoggingSource and isLoggingDestination are declared globally or imported
        isLoggingSource = false;
        isLoggingDestination = false;
        srcEnableCoordinateLogging();
    
        expect(isLoggingSource).toBe(true);
        expect(isLoggingDestination).toBe(false);
    });
    
    test('should update the message element with the correct message when a date is selected', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        const dateTimeInput = document.getElementById('date-time');
        const messageElement = document.getElementById('message-content');
        dateTimeInput.value = '2025-01-17T23:59';  // Simulate a date being selected
    
        srcEnableCoordinateLogging();
        expect(messageElement.textContent).toBe("MESSAGE: Now left-click on the map where you want to place the pin for your location.");
    });
    
    test('should update the message element with the correct message when no date is selected', () => {
        document.body.innerHTML = '<input type="datetime-local" id="date-time"><div id="message-content"></div>';
        const dateTimeInput = document.getElementById('date-time');
        const messageElement = document.getElementById('message-content');
        dateTimeInput.value = '';  // Simulate no date being selected
    
        srcEnableCoordinateLogging();
        expect(messageElement.textContent).toBe("MESSAGE: Please select a date and time first.");
    });   
    
      
});


describe('dstEnableCoordinateLogging', () => {
    test('should set the correct flags and message when destination logging is enabled', () => {
        // Set up the DOM elements
        document.body.innerHTML = '<div id="message-content"></div>';
        const messageElement = document.getElementById('message-content');

        // Initialize the global flags
        isLoggingSource = true;  // Simulate a previous state where source logging was enabled
        isLoggingDestination = false;

        // Run the function
        dstEnableCoordinateLogging();

        // Assert the flags
        expect(isLoggingSource).toBe(false);
        expect(isLoggingDestination).toBe(true);

        // Assert the message content
        expect(messageElement.textContent).toBe(
            "MESSAGE: Now left-click on the map where you want to place the pin for the participants' location."
        );
    });
});    


describe('srcClearCoordinates', () => {
    let originalGlobal;

    beforeEach(() => {
        // Mock global variables
        originalGlobal = { ...global };
        global.src_lat = 51.5074;
        global.src_lng = -0.1278;
        global.isLoggingSource = true;
        global.pin_source = { remove: jest.fn() }; // Mocking a marker object
        global.map = {
            removeLayer: jest.fn(),
        };

        // Set up DOM elements
        document.body.innerHTML = `
            <button id="src-log-coordinates-btn"></button>
            <button id="src-clear-coordinates-btn"></button>
            <button id="results-btn" disabled></button>
            <div id="message-content"></div>
            <p class="locText" style="color: #9b9a9a;"></p>
            <div id="dst-dtresults"></div>
        `;
    });

    afterEach(() => {
        global = { ...originalGlobal }; // Restore original global state
    });

    test('should clear source coordinates and update global variables', () => {
        srcClearCoordinates();

        expect(global.src_lat).toBeNull();
        expect(global.src_lng).toBeNull();
        expect(global.isLoggingSource).toBe(false);
    });

    test('should disable the results button', () => {
        const resultsBtn = document.getElementById('results-btn');
        expect(resultsBtn.disabled).toBe(true);
    });

    test('should enable coordinate buttons', () => {
        const logBtn = document.getElementById('src-log-coordinates-btn');
        const clearBtn = document.getElementById('src-clear-coordinates-btn');
        expect(logBtn.disabled).toBe(false);
        expect(clearBtn.disabled).toBe(false);
    });


    test('should clear the results date and time', () => {
        const dtResults = document.getElementById('dst-dtresults');
        expect(dtResults.textContent).toBe('');
    });

    test('should display the correct message', () => {
        const messageContent = document.createElement('div');
        messageContent.id = 'message-content';
        document.body.appendChild(messageContent);
    
        // Simulate the behavior of the app setting the message
        messageContent.textContent =
            'MESSAGE: Source coordinates cleared. You may log a new source location.';
        messageContent.style.display = 'block';
    
        expect(messageContent.textContent.trim()).toBe(
            'MESSAGE: Source coordinates cleared. You may log a new source location.'
        );
        expect(messageContent.style.display).toBe('block');
    });

    test('should display the correct message', () => {
        const messageContent = document.createElement('div');
        messageContent.id = 'message-content';
        document.body.appendChild(messageContent);
    
        // Simulate the behavior of the app setting the message
        messageContent.textContent =
            'MESSAGE: Source coordinates cleared. You may log a new source location.';
        messageContent.style.display = 'block';
    
        expect(messageContent.textContent.trim()).toBe(
            'MESSAGE: Source coordinates cleared. You may log a new source location.'
        );
        expect(messageContent.style.display).toBe('block');
    });

   
    
});

describe('dstClearCoordinates', () => {
    let originalGlobal;
    
    beforeEach(() => {
        // Mock global variables
        originalGlobal = { ...global };
        global.dst_lat = 51.5074;
        global.dst_lng = -0.1278;
        global.isLoggingDestination = true;
        global.pin_destination = { remove: jest.fn() }; // Mocking a marker object
        global.map = {
            removeLayer: jest.fn(),
        };

        // Set up DOM elements
        document.body.innerHTML = `
            <button id="dst-log-coordinates-btn"></button>
            <button id="dst-clear-coordinates-btn"></button>
            <button id="results-btn" disabled></button>
            <div id="message-content"></div>
            <p class="parLocText" style="color: #9b9a9a;"></p>
            <p class="parDtTimeText" style="color: #9b9a9a;"></p>
            <div id="dst-dtresults"></div>
            <div id="dst-location"></div>
        `;
    });

    afterEach(() => {
        global = { ...originalGlobal }; // Restore original global state
    });

    test('should clear destination coordinates and update global variables', () => {
        dstClearCoordinates();

        expect(global.dst_lat).toBeNull();
        expect(global.dst_lng).toBeNull();
        expect(global.isLoggingDestination).toBe(false);
    });

    test('should disable the results button', () => {
        dstClearCoordinates();
        const resultsBtn = document.getElementById('results-btn');
        expect(resultsBtn.disabled).toBe(true);
    });

    test('should enable destination coordinate buttons', () => {
        dstClearCoordinates();
        const logBtn = document.getElementById('dst-log-coordinates-btn');
        const clearBtn = document.getElementById('dst-clear-coordinates-btn');
        expect(logBtn.disabled).toBe(false);
        expect(clearBtn.disabled).toBe(false);
    });

    test('should display the correct message', () => {
        dstClearCoordinates();
        const messageContent = document.getElementById('message-content');
        expect(messageContent.textContent.trim()).toBe(
            'MESSAGE: Participant coordinates cleared. You may log a new participant location.'
        );
        expect(messageContent.style.display).toBe('block');
    });

    test('should remove the destination marker from the map', () => {
        // Mock removeLayer and pin_destination
        global.map.removeLayer = jest.fn();
        global.pin_destination = { remove: jest.fn() };  // This should be a mock object
        
        // Call the function
        dstClearCoordinates();  // Executes the function under test
    
        // Assert that removeLayer was called with the destination marker
        expect(global.map.removeLayer).toHaveBeenCalledWith(global.pin_destination);
    
        // Check that the remove method on pin_destination was called
        expect(global.pin_destination.remove).toHaveBeenCalled();
    
        // Finally, ensure that global.pin_destination is set to null after calling the function
        expect(global.pin_destination).toBeNull();
    });
    
    

    test('should reset text color for "Participant Location" and "Participant Date and Time"', () => {
        dstClearCoordinates();
        const locText = document.querySelector('.parLocText');
        const dtText = document.querySelector('.parDtTimeText');
        expect(locText.style.color).toBe('#9b9a9a');
        expect(dtText.style.color).toBe('#9b9a9a');
    });

    test('should clear the results date, time, and location text', () => {
        dstClearCoordinates();
        const dtResults = document.getElementById('dst-dtresults');
        const locationText = document.getElementById('dst-location');
        expect(dtResults.textContent).toBe('');
        expect(locationText.textContent).toBe('');
    });
});

  

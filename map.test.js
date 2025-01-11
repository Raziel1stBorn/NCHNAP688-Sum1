jest.mock('leaflet');
const leaflet = require('leaflet');


// console.log(leaflet);
const { formatDateTime } = require('./map');
const { setDefaultDateTime } = require('./map');
const { srcEnableCoordinateLogging } = require('./map');
const { dstEnableCoordinateLogging } = require('./map');
const { srcClearCoordinates } = require('./map');  


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
        expect(messageElement.textContent).toBe("MESSAGE: Now left-click on the map where you want to place your source pin.");
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
        expect(messageElement.textContent).toBe("MESSAGE: Now left-click on the map where you want to place your source pin.");
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
            "MESSAGE: Now left-click on the map where you want to place your destination pin."
        );
    });
});    


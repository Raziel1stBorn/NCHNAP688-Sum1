jest.mock('leaflet');
const leaflet = require('leaflet');
// console.log(leaflet);
const { formatDateTime } = require('./map');

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
// __mocks__/leaflet.js
module.exports = {
    icon: jest.fn(() => ({
        options: {}
    })),
    marker: jest.fn(() => ({
        addTo: jest.fn()
    })),
    map: jest.fn(() => ({
        setView: jest.fn().mockReturnThis(),
        addLayer: jest.fn(),
        on: jest.fn(), // Mock for the `on` method
    })),
    tileLayer: jest.fn(() => ({
        addTo: jest.fn()
    })),
}; 


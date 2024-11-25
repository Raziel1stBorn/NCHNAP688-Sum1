const { multiply } = require('./index');

test('that Jest is working', () => {
    expect(2+2).toBe(4);
})

describe('tests all functions', () => {
    test('that multiply function works with numbers', () => {
        expect(multiply(3,3)).toBe(9);
        expect(multiply(-3,1)).toBe(-3);
        expect(multiply(3.1,3)).toBe(9.3);
        // Rather than '.toBe' can also be "to be close to"
    });
    test('that multiply function works with string', () => {
        expect(multiply('3','3')).toBe(9);
    });
})
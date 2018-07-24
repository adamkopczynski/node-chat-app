const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {

    it('should generate correct message object', () => {
        const from = 'Test';
        const text = 'Message';
        const message = generateMessage(from ,text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeTruthy();
    })
})

describe('generate location message', () => {

    it('should generate correct message object', () => {
        const from = 'Test';
        const coords = {
            latitude: 51.790799899999996,
            longitude: 19.455998299999997
        };
        const message = generateLocationMessage(from, coords);

        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
        expect(message.createdAt).toBeTruthy();
    })
})
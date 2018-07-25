const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string value', () => {
        expect(isRealString(123)).toBeFalsy();
    })

    it('should reject string with only spaces', () => {
        expect(isRealString('    ')).toBeFalsy();
    })

    it('should allow string with spaces at begin and the end', () => {
        expect(isRealString(' qwerty ')).toBeTruthy();
    })
})
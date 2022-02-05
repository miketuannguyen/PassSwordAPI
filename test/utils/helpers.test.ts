import { helpers } from '../../src/utils';

describe('deepFreeze', () => {
    it('should freeze object', () => {
        const obj = helpers.deepFreeze({ pro: 'test' });
        expect(Object.isFrozen(obj)).toBe(true);
    });

    it('should throw when a nested property is modified', () => {
        const obj = helpers.deepFreeze({ pro: { nest_pro: '' } });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(() => obj.pro.nest_pro = '123').toThrow();
    });
});

describe('isNotEmptyArray', () => {
    it('should return true when input is an array and not empty', () => {
        const arr = [1];
        expect(helpers.isNotEmptyArray(arr)).toBe(true);
    });

    it('should return false when input is not an array', () => {
        const input = 'string';
        expect(helpers.isNotEmptyArray(input)).toBe(false);
    });

    it('should return false when input is an empty array', () => {
        const input = [];
        expect(helpers.isNotEmptyArray(input)).toBe(false);
    });
});

describe('isEmpty', () => {
    it('should return true when input is null', () => {
        expect(helpers.isEmpty(null)).toBe(true);
    });

    it('should return true when input is undefined', () => {
        expect(helpers.isEmpty(undefined)).toBe(true);
    });
});

describe('isBlank', () => {
    it('should return false if input is not an empty string', () => {
        const str = 'string';
        expect(helpers.isBlank(str)).toBe(false);
    });

    it('should return false if input is a number except 0', () => {
        const num = 1;
        expect(helpers.isBlank(num)).toBe(false);
    });

    it('should return true if input is a blank string', () => {
        const str = '';
        expect(helpers.isBlank(str)).toBe(true);
    });

    it('should return true if input is null', () => {
        expect(helpers.isBlank(null)).toBe(true);
    });

    it('should return true if input is undefined', () => {
        expect(helpers.isBlank(undefined)).toBe(true);
    });
});

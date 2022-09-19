import { getCalculatedValue } from '../../utils/getCalculatedValue';

describe('getCalculatedValue', () => {
    it('calculates the correct value from a string with a sum operation', () => {
        const value = getCalculatedValue('1 + 1');
        expect(value).toBe(2);
    });
    it('calculates the correct value from a string with a substract operation', () => {
        let value = getCalculatedValue('1 - 1');
        expect(value).toBe(0);

        value = getCalculatedValue('15 - 3');
        expect(value).toBe(12);
    });
    it('calculates the correct value from a string with a multiply operation', () => {
        let value = getCalculatedValue('1 * 1');
        expect(value).toBe(1);

        value = getCalculatedValue('5 * 3');
        expect(value).toBe(15);
    });
    it('calculates the correct value from a string with a division operation', () => {
        const value = getCalculatedValue('10 / 2');
        expect(value).toBe(5);
    });

    it('calculates the correct value from a string with a modulo operation', () => {
        let value = getCalculatedValue('10 % 2');
        expect(value).toBe(0);

        value = getCalculatedValue('5 % 2');
        expect(value).toBe(1);

        value = getCalculatedValue('3.2 % 0.5');
        expect(value).toBe(0.2);
    });

    it('calculates multiple operators, in correct order of operations', () => {
        const value = getCalculatedValue('10 / 2 + 5 - 3 * 3');
        expect(value).toBe(1);
    });
    it('rounds the result', () => {
        let value = getCalculatedValue('1 * 1,1254');
        expect(value).toBe(1.13);

        value = getCalculatedValue('1 * 0,999');
        expect(value).toBe(1);

        value = getCalculatedValue('1 * 0,999', 3);
        expect(value).toBe(0.999);

        value = getCalculatedValue('1 * 0,999', 4);
        expect(value).toBe(0.999);
    });

    it('filters out unrelated characters', () => {
        const value = getCalculatedValue('10px');
        expect(value).toBe(10);
    });

    it('can display negatives when calculated', () => {
        const value = getCalculatedValue('10 - 12px');
        expect(value).toBe(-2);
    });

    it('accepts negative numbers on the right side of the operator', () => {
        const value = getCalculatedValue('12 + -10');
        expect(value).toBe(2);
    });

    it('accepts negative numbers at the start', () => {
        const value = getCalculatedValue('-12 + 10');
        expect(value).toBe(-2);
    });

    it('accepts negative numbers on the left side of the operator', () => {
        let value = getCalculatedValue('10 + -10 * 5');
        expect(value).toBe(-40);

        value = getCalculatedValue('10 - -10 * 5');
        expect(value).toBe(60);

        value = getCalculatedValue('10 - -10 * 5 * 2');
        expect(value).toBe(110);
    });

    it('can handle a mix of everything', () => {
        const value = getCalculatedValue('-10 + -10 * 5 / -10');
        expect(value).toBe(-5);
    });

    it('can handle negative and substraction', () => {
        const value = getCalculatedValue('-10-3');
        expect(value).toBe(-13);
    });
});

import { round } from '../../utils/MathUtils';

describe('Round', () => {
    it('rounds to precision of 2 by default', () => {
        expect(round(15.123)).toBe(15.12);
        expect(round(15.995)).toBe(16);
        expect(round(15.001)).toBe(15);
        expect(round(15.555)).toBe(15.56);
    });
    it('rounds to custom precision', () => {
        expect(round(15.123, 3)).toBe(15.123);
        expect(round(15.9954, 3)).toBe(15.995);
        expect(round(15.0001, 3)).toBe(15);
        expect(round(15.555, 1)).toBe(15.6);
    });
});

import { hello } from '../../index';

describe('Hello (alive check)', () => {
    it('initializes the SDK', () => {
        expect(hello()).toBe('Hello, the SDK works');
    });
});

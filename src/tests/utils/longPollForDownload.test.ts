import { longPollForDownload } from '../../utils/longPollForDownload';

const mockFetch = jest.fn();
beforeEach(() => {
    global.fetch = mockFetch;
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
});

afterEach(() => {
    jest.useRealTimers();
});
afterAll(() => {
    jest.restoreAllMocks();
});
describe('longPollForDownload', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    it('calls fetch with given url', () => {
        longPollForDownload('url');
        expect(mockFetch).toHaveBeenLastCalledWith('url');
    });
    it('calls fetch till response status code is more than 200', async () => {
        mockFetch
            .mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        status: 202,
                    }),
                ),
            )

            .mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        status: 200,
                    }),
                ),
            );

        await longPollForDownload('url');

        jest.runAllTimers();

        expect(mockFetch).toHaveBeenCalledTimes(3);
    });
});

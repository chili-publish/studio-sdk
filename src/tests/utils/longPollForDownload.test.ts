import { longPollForDownload } from '../../utils/longPollForDownload';

const mockFetch = jest.fn();
beforeEach(() => {
    global.fetch = mockFetch;
});

afterEach(() => {
    jest.useRealTimers();
});
afterAll(() => {
    jest.restoreAllMocks();
});
describe('longPollForDownload', () => {
    it('calls fetch with given url', () => {
        longPollForDownload('url');
        expect(mockFetch).toHaveBeenLastCalledWith('url');
    });
    jest.setTimeout(15000);
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

        expect(mockFetch).toHaveBeenCalledTimes(4);
    });
});

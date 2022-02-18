import mockChild from '../__mocks__/FrameProperties';
import { mockDocument } from '../__mocks__/mockDocument';

import { DocumentController } from '../../controllers/DocumentController';
import * as FetchHelper from '../../utils/getFetchUrl';

let document: DocumentController;
let mockedFetURLGetter: jest.SpyInstance;
let mockedLongPoll: jest.SpyInstance;
const mockFetch = jest.fn();

beforeEach(() => {
    document = new DocumentController(mockChild);
    jest.spyOn(document, 'getCurrentDocumentState');
    jest.spyOn(document, 'loadDocument');
    jest.spyOn(document, 'getDownloadLink');
    mockedLongPoll = jest.spyOn(document, 'startPollingOnEndpoint');
    mockedFetURLGetter = jest.spyOn(FetchHelper, 'getFetchURL');
    global.fetch = mockFetch;
    mockedFetURLGetter.mockReturnValue('test url');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    describe('document getters', () => {
        it('retrieve current document state', async () => {
            await document.getCurrentDocumentState();
            expect(document.getCurrentDocumentState).toHaveBeenCalledTimes(1);
            expect(mockChild.getCurrentDocumentState).toHaveBeenCalledTimes(1);
        });
    });

    describe('api calls that is using current document', () => {
        beforeEach(() => {
            document.getCurrentDocumentState = jest.fn().mockResolvedValue({ data: 'document' });
        });
        it('retrieve returns a download link from current document when there is no error', async () => {
            mockFetch.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        json: () => ({
                            id: '1',
                            downloadUrl: '/url/1',
                            resultUrl: '/url/1',
                        }),
                    }),
                ),
            );

            mockedLongPoll.mockResolvedValueOnce(new Promise((resolve) => resolve(true)));

            const downloadResponse = await document.getDownloadLink('mp4', 1);

            expect(document.getCurrentDocumentState).toHaveBeenCalledTimes(1);

            expect(mockChild.getCurrentDocumentState).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4', 1);

            expect(mockFetch).toHaveBeenLastCalledWith('test url', {
                body: 'document',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            expect(mockedLongPoll).toHaveBeenLastCalledWith('https://eap-rendering.azurewebsites.net/url/1');

            expect(downloadResponse).toMatchObject({
                success: true,
                data: 'https://eap-rendering.azurewebsites.net/url/1',
            });
        });

        it(' returns error when first api call fails', async () => {
            mockFetch.mockRejectedValueOnce({
                status: 400,
                code: 400,
                Error: 'Not found',
            });

            mockedLongPoll.mockResolvedValueOnce(new Promise((resolve) => resolve(true)));

            const downloadResponse = await document.getDownloadLink('mp4', 1);

            expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4', 1);
            expect(mockFetch).toHaveBeenLastCalledWith('test url', {
                body: 'document',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            expect(mockedLongPoll).toHaveBeenCalledTimes(0);

            expect(downloadResponse).toMatchObject({
                success: false,
                data: null,
                error: {
                    error: {
                        Error: 'Not found',
                    },
                },
            });
        });

        it(' returns error when first api call fails without a code', async () => {
            mockFetch.mockRejectedValueOnce({
                status: 400,
                Error: 'Not found',
            });

            mockedLongPoll.mockResolvedValueOnce(new Promise((resolve) => resolve(true)));

            const downloadResponse = await document.getDownloadLink('mp4', 1);

            expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4', 1);
            expect(mockFetch).toHaveBeenLastCalledWith('test url', {
                body: 'document',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            expect(mockedLongPoll).toHaveBeenCalledTimes(0);

            expect(downloadResponse).toMatchObject({
                success: false,
                data: null,
                error: {
                    error: {
                        Error: 'Not found',
                    },
                },
            });
        });

        it(' returns error when second api call fails', async () => {
            mockFetch.mockResolvedValueOnce(
                new Promise((resolve) =>
                    resolve({
                        json: () => ({
                            id: '1',
                            downloadUrl: '/url/1',
                            resultUrl: '/url/1',
                        }),
                    }),
                ),
            );

            mockFetch.mockRejectedValueOnce(
                new Promise((resolve, reject) =>
                    reject({
                        Error: 'Second api call failed.',
                    }),
                ),
            );

            const downloadResponse = await document.getDownloadLink('mp4', 1);

            expect(mockChild.getCurrentDocumentState).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

            expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4', 1);
            expect(mockFetch).toHaveBeenLastCalledWith('https://eap-rendering.azurewebsites.net/url/1');

            expect(mockedLongPoll).toHaveBeenCalledTimes(1);

            expect(downloadResponse).toMatchObject({
                success: false,
                data: null,
                error: {
                    Error: 'Second api call failed.',
                },
            });
        });
    });
    describe('startPollingOnEndpoint', () => {
        it('calls fetch with given url', () => {
            document.startPollingOnEndpoint('url');
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

            await document.startPollingOnEndpoint('url');

            expect(mockFetch).toHaveBeenCalledTimes(9);
        });
    });

    it('load provided document', async () => {
        await document.loadDocument(mockDocument);
        expect(mockChild.loadDocument).toHaveBeenCalledTimes(1);
    });
});

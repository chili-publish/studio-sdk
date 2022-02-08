import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';

import { SDK } from '../../index';
import { DocumentController } from '../../controllers/DocumentController';
import * as FetchHelper from '../../utils/getFetchUrl';
import * as longPoll from '../../utils/longPollForDownload';

let mockedSDK: SDK;
let mockedFetURLGetter: jest.SpyInstance;
let mockedLongPoll: jest.SpyInstance;
const mockFetch = jest.fn();
let mockDocumentState: jest.SpyInstance;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockDocumentState = jest.spyOn(mockedSDK.document, 'getCurrentDocumentState');
    jest.spyOn(mockedSDK.document, 'getDownloadLink');
    mockedFetURLGetter = jest.spyOn(FetchHelper, 'getFetchURL');
    global.fetch = mockFetch;
    mockedFetURLGetter.mockReturnValue('test url');
    mockedLongPoll = jest.spyOn(longPoll, 'longPollForDownload');
    mockedSDK.children = mockChild;
    mockedSDK.document = new DocumentController(mockChild, mockConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    it('retrieve current document state', async () => {
        await mockedSDK.document.getCurrentDocumentState();
        expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);
    });

    it('retrieve returns a download link from current document when there is no error', async () => {
        mockDocumentState = jest.spyOn(mockedSDK.document, 'getCurrentDocumentState');

        mockFetch.mockReturnValueOnce(
            new Promise((resolve) =>
                resolve({
                    json: () => ({
                        $id: '1',
                        id: '1',
                        resultUrl: '/url/1',
                    }),
                }),
            ),
        );

        mockDocumentState.mockResolvedValue(new Promise((resolve) => resolve({ data: 'document' })));
        mockedLongPoll.mockResolvedValueOnce(new Promise((resolve) => resolve(true)));

        const downloadResponse = await mockedSDK.document.getDownloadLink('mp4');

        expect(mockDocumentState).toHaveBeenCalledTimes(1);

        expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);

        expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

        expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4');

        expect(mockFetch).toHaveBeenLastCalledWith('test url', {
            body: '"document"',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        });

        expect(mockedLongPoll).toHaveBeenLastCalledWith('https://eap-rendering.azurewebsites.net/url/1');

        expect(downloadResponse).toMatchObject({
            success: true,
            status: 200,
            data: 'https://eap-rendering.azurewebsites.net/url/1',
            error: null,
        });
    });

    // it(' returns error when first api call fails', async () => {
    //     mockDocumentState = jest.spyOn(mockedSDK.document, 'getCurrentDocumentState');

    //     mockFetch.mockRejectedValueOnce(
    //         new Promise((resolve, reject) =>
    //             reject({
    //                 error: {
    //                     Error: 'Not found',
    //                 },
    //             }),
    //         ),
    //     );
    //     mockDocumentState.mockResolvedValue(new Promise((resolve) => resolve({ data: 'document' })));

    //     mockDocumentState.mockResolvedValue(new Promise((resolve) => resolve({ data: 'document' })));
    //     mockedLongPoll.mockResolvedValueOnce(new Promise((resolve) => resolve(true)));

    //     const downloadResponse = await mockedSDK.document.getDownloadLink('mp4');

    //     expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);

    //     expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

    //     expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4');

    //     expect(mockFetch).toHaveBeenLastCalledWith('test url', {
    //         body: '"document"',
    //         headers: { 'Content-Type': 'application/json' },
    //         method: 'POST',
    //     });

    //     expect(mockedLongPoll).toHaveBeenCalledTimes(0);

    //     expect(downloadResponse).toMatchObject({
    //         success: false,
    //         status: 404,
    //         data: null,
    //         error: {
    //             error: {
    //                 Error: 'Not found',
    //             },
    //         },
    //     });
    // });

    // it(' returns error when second api call fails', async () => {
    //     mockDocumentState = jest.spyOn(mockedSDK.document, 'getCurrentDocumentState');

    //     mockFetch.mockReturnValueOnce(
    //         new Promise((resolve) =>
    //             resolve({
    //                 json: () => ({
    //                     $id: '1',
    //                     id: '1',
    //                     resultUrl: '/url/1',
    //                 }),
    //             }),
    //         ),
    //     );
    //     mockDocumentState.mockResolvedValue(new Promise((resolve) => resolve({ data: 'document' })));

    //    // mockedLongPoll.mockRejectedValue(new Promise((resolve, reject) => reject({ Error: 'Not found' })));

    //     const downloadResponse = await mockedSDK.document.getDownloadLink('mp4');

    //     expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);

    //     expect(FetchHelper.getFetchURL).toHaveBeenCalledTimes(1);

    //     expect(FetchHelper.getFetchURL).toHaveBeenLastCalledWith('mp4');

    //     expect(mockFetch).toHaveBeenLastCalledWith('test url', {
    //         body: '"document"',
    //         headers: { 'Content-Type': 'application/json' },
    //         method: 'POST',
    //     });

    //     // expect(mockedLongPoll).toHaveBeenCalledTimes(1);

    //     // expect(downloadResponse).toMatchObject({
    //     //     success: false,
    //     //     status: 404,
    //     //     data: null,
    //     //     error: {
    //     //         Error: 'Not found',
    //     //     },
    //     // });
    // });
});

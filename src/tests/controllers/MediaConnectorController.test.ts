import {SDK} from '../../index';
import mockConfig from '../__mocks__/config';
import {MediaConnectorController} from '../../controllers/MediaConnectorController';
import {DownloadType, SortBy, SortOrder} from "../../../types/MediaConnectorTypes";
import mockChild from "../__mocks__/MockEditorAPI";

let mockedSDK: SDK;


beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.mediaConnector = new MediaConnectorController(mockChild);
    jest.spyOn(mockedSDK.mediaConnector, 'query');
    jest.spyOn(mockedSDK.mediaConnector, 'download');
    jest.spyOn(mockedSDK.mediaConnector, 'upload');
    jest.spyOn(mockedSDK.mediaConnector, 'remove');
    jest.spyOn(mockedSDK.mediaConnector, 'copy');
    jest.spyOn(mockedSDK.mediaConnector, 'getCapabilities');
    jest.spyOn(mockedSDK.mediaConnector, 'getQueryOptions');
    jest.spyOn(mockedSDK.mediaConnector, 'getDownloadOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('MediaConnector methods', () => {
    it('Should call  all of the mediaConnector functions of child successfully', async () => {
        const connectorId = 'dam';
        const mediaId = 'm123';
        const queryOptions1 = {
            'filter': ['test'],
            pageSize: 1,
            pageToken: 'token',
            sortBy: SortBy.id,
            sortOrder: SortOrder.ascending
        };
        const queryOptions2 = {
            'filter': ['test'],
            pageSize: 1,
            pageToken: 'token',
            sortBy: SortBy.name,
            sortOrder: SortOrder.descending
        };
        const context = {'debug': 'true'};
        const blob = new Uint8Array([1, 2, 3]);

        await mockedSDK.mediaConnector.copy(connectorId, mediaId, 'newName');
        expect(mockedSDK.editorAPI.mediaConnectorCopy).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorCopy).toHaveBeenCalledWith(connectorId, mediaId, 'newName');

        await mockedSDK.mediaConnector.query(connectorId, queryOptions1, context);
        expect(mockedSDK.editorAPI.mediaConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorQuery).toHaveBeenCalledWith(connectorId, queryOptions1, context);

        await mockedSDK.mediaConnector.query(connectorId, queryOptions2, context);
        expect(mockedSDK.editorAPI.mediaConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorQuery).toHaveBeenCalledWith(connectorId, queryOptions2, context);

        await mockedSDK.mediaConnector.download(connectorId, mediaId, DownloadType.LowResolutionWeb, context);
        expect(mockedSDK.editorAPI.mediaConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorDownload).toHaveBeenCalledWith(connectorId, mediaId, DownloadType.LowResolutionWeb, context);

        await mockedSDK.mediaConnector.remove(connectorId, mediaId);
        expect(mockedSDK.editorAPI.mediaConnectorRemove).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorRemove).toHaveBeenCalledWith(connectorId, mediaId);

        await mockedSDK.mediaConnector.upload(connectorId, mediaId, blob);
        expect(mockedSDK.editorAPI.mediaConnectorUpload).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorUpload).toHaveBeenCalledWith(connectorId, mediaId, blob);

        await mockedSDK.mediaConnector.getCapabilities(connectorId);
        expect(mockedSDK.editorAPI.mediaConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);

        await mockedSDK.mediaConnector.getQueryOptions(connectorId);
        expect(mockedSDK.editorAPI.mediaConnectorGetQueryOptions).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorGetQueryOptions).toHaveBeenLastCalledWith(connectorId);

        await mockedSDK.mediaConnector.getDownloadOptions(connectorId);
        expect(mockedSDK.editorAPI.mediaConnectorGetDownloadOptions).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.mediaConnectorGetDownloadOptions).toHaveBeenLastCalledWith(connectorId);
    });
});

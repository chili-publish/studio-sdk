import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { FontConnectorController } from '../../controllers/FontConnectorController';
import { SortBy, SortOrder } from '../../../types/ConnectorTypes';
import { FontDownloadType } from '../../../types/FontConnectorTypes';
import mockChild from '../__mocks__/MockEditorAPI';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.fontConnector = new FontConnectorController(mockChild);
    jest.spyOn(mockedSDK.fontConnector, 'query');
    jest.spyOn(mockedSDK.fontConnector, 'detail');
    jest.spyOn(mockedSDK.fontConnector, 'download');
    jest.spyOn(mockedSDK.fontConnector, 'upload');
    jest.spyOn(mockedSDK.fontConnector, 'remove');
    jest.spyOn(mockedSDK.fontConnector, 'copy');
    jest.spyOn(mockedSDK.fontConnector, 'getCapabilities');
    jest.spyOn(mockedSDK.fontConnector, 'getQueryOptions');
    jest.spyOn(mockedSDK.fontConnector, 'getDownloadOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('FontConnector methods', () => {
    it('Should call all of the FontConnector functions of child successfully', async () => {
        const connectorId = 'dam';
        const FontId = 'm123';
        const queryOptions1 = {
            filter: ['test'],
            pageSize: 1,
            pageToken: 'token',
            sortBy: SortBy.id,
            sortOrder: SortOrder.ascending,
        };
        const queryOptions2 = {
            filter: ['test'],
            pageSize: 1,
            pageToken: 'token',
            sortBy: SortBy.name,
            sortOrder: SortOrder.descending,
        };
        const context = { debug: 'true' };
        const blob = new Uint8Array([1, 2, 3]);

        await mockedSDK.fontConnector.copy(connectorId, FontId, 'newName');
        expect(mockedSDK.editorAPI.fontConnectorCopy).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorCopy).toHaveBeenCalledWith(connectorId, FontId, 'newName');

        await mockedSDK.fontConnector.query(connectorId, queryOptions1, context);
        expect(mockedSDK.editorAPI.fontConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions1),
            JSON.stringify(context),
        );

        await mockedSDK.fontConnector.query(connectorId, queryOptions2, context);
        expect(mockedSDK.editorAPI.fontConnectorQuery).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.fontConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions2),
            JSON.stringify(context),
        );

        await mockedSDK.fontConnector.download(connectorId, FontId, FontDownloadType.Preview, context);
        expect(mockedSDK.editorAPI.fontConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            FontId,
            FontDownloadType.Preview,
            JSON.stringify(context),
        );

        await mockedSDK.fontConnector.remove(connectorId, FontId);
        expect(mockedSDK.editorAPI.fontConnectorRemove).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorRemove).toHaveBeenCalledWith(connectorId, FontId);

        await mockedSDK.fontConnector.upload(connectorId, FontId, blob);
        expect(mockedSDK.editorAPI.fontConnectorUpload).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorUpload).toHaveBeenCalledWith(connectorId, FontId, blob);

        await mockedSDK.fontConnector.getCapabilities(connectorId);
        expect(mockedSDK.editorAPI.fontConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);

        await mockedSDK.fontConnector.getQueryOptions(connectorId);
        expect(mockedSDK.editorAPI.fontConnectorGetQueryOptions).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorGetQueryOptions).toHaveBeenLastCalledWith(connectorId);

        await mockedSDK.fontConnector.getDownloadOptions(connectorId);
        expect(mockedSDK.editorAPI.fontConnectorGetDownloadOptions).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorGetDownloadOptions).toHaveBeenLastCalledWith(connectorId);

        await mockedSDK.fontConnector.detail(connectorId, FontId);
        expect(mockedSDK.editorAPI.fontConnectorDetail).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.fontConnectorDetail).toHaveBeenLastCalledWith(connectorId, FontId);
    });
});

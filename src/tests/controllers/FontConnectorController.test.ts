import { FontConnectorController } from '../../controllers/FontConnectorController';
import { SortBy, SortOrder } from '../../../types/ConnectorTypes';
import { FontDownloadType } from '../../../types/FontConnectorTypes';
import { EditorAPI } from '../../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedFontConnectorController: FontConnectorController;

const mockedEditorApi: EditorAPI = {
    fontConnectorCopy: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorDownload: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorUpload: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorRemove: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorDetail: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorGetQueryOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorGetDownloadOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFontConnectorController = new FontConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'fontConnectorQuery');
    jest.spyOn(mockedEditorApi, 'fontConnectorCopy');
    jest.spyOn(mockedEditorApi, 'fontConnectorDownload');
    jest.spyOn(mockedEditorApi, 'fontConnectorRemove');
    jest.spyOn(mockedEditorApi, 'fontConnectorUpload');
    jest.spyOn(mockedEditorApi, 'fontConnectorDetail');
    jest.spyOn(mockedEditorApi, 'fontConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'fontConnectorGetQueryOptions');
    jest.spyOn(mockedEditorApi, 'fontConnectorGetDownloadOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('FontConnectorController', () => {
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

    it('Should call the copy method', async () => {
        await mockedFontConnectorController.copy(connectorId, FontId, 'newName');
        expect(mockedEditorApi.fontConnectorCopy).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorCopy).toHaveBeenCalledWith(connectorId, FontId, 'newName');
    });

    it('Should call the query method', async () => {
        await mockedFontConnectorController.query(connectorId, queryOptions1, context);
        expect(mockedEditorApi.fontConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions1),
            JSON.stringify(context),
        );

        await mockedFontConnectorController.query(connectorId, queryOptions2, context);
        expect(mockedEditorApi.fontConnectorQuery).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.fontConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions2),
            JSON.stringify(context),
        );
    });

    it('Should call the download method', async () => {
        await mockedFontConnectorController.download(connectorId, FontId, FontDownloadType.Preview, context);
        expect(mockedEditorApi.fontConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            FontId,
            FontDownloadType.Preview,
            JSON.stringify(context),
        );
    });

    it('Should call the remove method', async () => {
        await mockedFontConnectorController.remove(connectorId, FontId);
        expect(mockedEditorApi.fontConnectorRemove).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorRemove).toHaveBeenCalledWith(connectorId, FontId);
    });

    it('Should call the upload method', async () => {
        await mockedFontConnectorController.upload(connectorId, FontId, blob);
        expect(mockedEditorApi.fontConnectorUpload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorUpload).toHaveBeenCalledWith(connectorId, FontId, blob);
    });

    it('Should call the getCapabilities method', async () => {
        await mockedFontConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.fontConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getQueryOptions method', async () => {
        await mockedFontConnectorController.getQueryOptions(connectorId);
        expect(mockedEditorApi.fontConnectorGetQueryOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorGetQueryOptions).toHaveBeenLastCalledWith(connectorId);
    });
    it('Should call the getDownloadOptions method', async () => {
        await mockedFontConnectorController.getDownloadOptions(connectorId);
        expect(mockedEditorApi.fontConnectorGetDownloadOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorGetDownloadOptions).toHaveBeenLastCalledWith(connectorId);
    });
    it('Should call the detail method', async () => {
        await mockedFontConnectorController.detail(connectorId, FontId);
        expect(mockedEditorApi.fontConnectorDetail).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorDetail).toHaveBeenLastCalledWith(connectorId, FontId);
    });
});

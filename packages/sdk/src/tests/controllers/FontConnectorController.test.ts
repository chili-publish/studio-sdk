import { FontConnectorController } from '../../controllers/FontConnectorController';
import { SortBy, SortOrder } from '../../types/ConnectorTypes';
import { FontPreviewFormat } from '../../types/FontConnectorTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedFontConnectorController: FontConnectorController;

const mockedEditorApi: EditorAPI = {
    fontConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorDownload: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorPreview: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorDetail: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    fontConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFontConnectorController = new FontConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'fontConnectorQuery');
    jest.spyOn(mockedEditorApi, 'fontConnectorDownload');
    jest.spyOn(mockedEditorApi, 'fontConnectorPreview');
    jest.spyOn(mockedEditorApi, 'fontConnectorDetail');
    jest.spyOn(mockedEditorApi, 'fontConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'fontConnectorGetConfigurationOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('FontConnectorController', () => {
    const connectorId = 'dam';
    const fontId = 'm123';
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
        await mockedFontConnectorController.download(connectorId, fontId, context);
        expect(mockedEditorApi.fontConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            fontId,
            JSON.stringify(context),
        );
    });

    it('Should call the preview method', async () => {
        await mockedFontConnectorController.preview(connectorId, fontId, FontPreviewFormat.Square, context);
        expect(mockedEditorApi.fontConnectorPreview).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorPreview).toHaveBeenCalledWith(
            connectorId,
            fontId,
            FontPreviewFormat.Square,
            JSON.stringify(context),
        );
    });

    it('Should call the getCapabilities method', async () => {
        await mockedFontConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.fontConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getConfigurationOptions method', async () => {
        await mockedFontConnectorController.getConfigurationOptions(connectorId);
        expect(mockedEditorApi.fontConnectorGetConfigurationOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorGetConfigurationOptions).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the detail method', async () => {
        await mockedFontConnectorController.detail(connectorId, fontId, context);
        expect(mockedEditorApi.fontConnectorDetail).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.fontConnectorDetail).toHaveBeenLastCalledWith(
            connectorId,
            fontId,
            JSON.stringify(context),
        );
    });
});

import { ComponentConnectorController } from '../../controllers/ComponentConnectorController';
import { SortBy, SortOrder } from '../../types/ConnectorTypes';
import { ComponentPreviewType } from '../../types/ComponentConnectorTypes';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedComponentConnectorController: ComponentConnectorController;

const mockedEditorApi: EditorAPI = {
    componentConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    componentConnectorPreview: async () => new Uint8Array() as unknown as EditorResponse<any>,
    componentConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    componentConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedComponentConnectorController = new ComponentConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'componentConnectorQuery');
    jest.spyOn(mockedEditorApi, 'componentConnectorPreview');
    jest.spyOn(mockedEditorApi, 'componentConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'componentConnectorGetConfigurationOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ComponentConnectorController', () => {
    const connectorId = 'dam';
    const componentId = 'm123';
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

    it('Should call the query method', async () => {
        await mockedComponentConnectorController.query(connectorId, queryOptions1, context);
        expect(mockedEditorApi.componentConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.componentConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions1),
            JSON.stringify(context),
        );

        await mockedComponentConnectorController.query(connectorId, queryOptions2, context);
        expect(mockedEditorApi.componentConnectorQuery).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.componentConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions2),
            JSON.stringify(context),
        );
    });

    it('Should call the preview method', async () => {
        await mockedComponentConnectorController.preview(
            connectorId,
            componentId,
            ComponentPreviewType.highest,
            context,
        );
        expect(mockedEditorApi.componentConnectorPreview).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.componentConnectorPreview).toHaveBeenCalledWith(
            connectorId,
            componentId,
            ComponentPreviewType.highest,
            JSON.stringify(context),
        );
    });

    it('Should call the getCapabilities method', async () => {
        await mockedComponentConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.componentConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.componentConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getConfigurationOptions method', async () => {
        await mockedComponentConnectorController.getConfigurationOptions(connectorId);
        expect(mockedEditorApi.componentConnectorGetConfigurationOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.componentConnectorGetConfigurationOptions).toHaveBeenLastCalledWith(connectorId);
    });
});

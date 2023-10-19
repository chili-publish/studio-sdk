import { MediaConnectorController } from '../../controllers/MediaConnectorController';
import { SortBy, SortOrder } from '../../types/ConnectorTypes';
import { MediaAllowedResourceType, MediaDownloadType } from '../../types/MediaConnectorTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedMediaConnectorController: MediaConnectorController;

const mockedEditorApi: EditorAPI = {
    mediaConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDetail: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDownload: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedMediaConnectorController = new MediaConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'mediaConnectorQuery');
    jest.spyOn(mockedEditorApi, 'mediaConnectorDetail');
    jest.spyOn(mockedEditorApi, 'mediaConnectorDownload');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetConfigurationOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('MediaConnectorController', () => {
    const connectorId = 'dam';
    const mediaId = 'm123';
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
        await mockedMediaConnectorController.query(connectorId, queryOptions1, context);
        expect(mockedEditorApi.mediaConnectorQuery).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions1),
            JSON.stringify(context),
        );

        await mockedMediaConnectorController.query(connectorId, queryOptions2, context);
        expect(mockedEditorApi.mediaConnectorQuery).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.mediaConnectorQuery).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(queryOptions2),
            JSON.stringify(context),
        );
    });

    it('Should call the download method', async () => {
        await mockedMediaConnectorController.download(
            connectorId,
            mediaId,
            MediaDownloadType.thumbnail,
            context,
        );
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            mediaId,
            MediaDownloadType.thumbnail,
            JSON.stringify([MediaAllowedResourceType.image]),
            JSON.stringify(context),
        );
    });

    it('Should call the getCapabilities method', async () => {
        await mockedMediaConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.mediaConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getConfigurationOptions method', async () => {
        await mockedMediaConnectorController.getConfigurationOptions(connectorId);
        expect(mockedEditorApi.mediaConnectorGetConfigurationOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorGetConfigurationOptions).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the detail method', async () => {
        await mockedMediaConnectorController.detail(connectorId, mediaId, context);
        expect(mockedEditorApi.mediaConnectorDetail).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDetail).toHaveBeenLastCalledWith(
            connectorId,
            mediaId,
            JSON.stringify(context),
        );
    });
});

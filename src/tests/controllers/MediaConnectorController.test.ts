import { MediaConnectorController } from '../../controllers/MediaConnectorController';
import { SortBy, SortOrder } from '../../../types/ConnectorTypes';
import { MediaDownloadType } from '../../../types/MediaConnectorTypes';
import { EditorAPI } from '../../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedMediaConnectorController: MediaConnectorController;

const mockedEditorApi: EditorAPI = {
    mediaConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDetail: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDownload: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorUpload: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorRemove: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorCopy: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetQueryOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetDownloadOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedMediaConnectorController = new MediaConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'mediaConnectorQuery');
    jest.spyOn(mockedEditorApi, 'mediaConnectorDetail');
    jest.spyOn(mockedEditorApi, 'mediaConnectorDownload');
    jest.spyOn(mockedEditorApi, 'mediaConnectorUpload');
    jest.spyOn(mockedEditorApi, 'mediaConnectorRemove');
    jest.spyOn(mockedEditorApi, 'mediaConnectorCopy');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetQueryOptions');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetDownloadOptions');
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
    const blob = new Uint8Array([1, 2, 3]);

    it('Should call the copy method', async () => {
        await mockedMediaConnectorController.copy(connectorId, mediaId, 'newName');
        expect(mockedEditorApi.mediaConnectorCopy).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorCopy).toHaveBeenCalledWith(connectorId, mediaId, 'newName');
    });
    it('Should call the query methog', async () => {
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
            MediaDownloadType.LowResolutionWeb,
            context,
        );
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            mediaId,
            MediaDownloadType.LowResolutionWeb,
            JSON.stringify(context),
        );
    });
    it('Should call the remove method', async () => {
        await mockedMediaConnectorController.remove(connectorId, mediaId);
        expect(mockedEditorApi.mediaConnectorRemove).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorRemove).toHaveBeenCalledWith(connectorId, mediaId);
    });

    it('Should call the upload method', async () => {
        await mockedMediaConnectorController.upload(connectorId, mediaId, blob);
        expect(mockedEditorApi.mediaConnectorUpload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorUpload).toHaveBeenCalledWith(connectorId, mediaId, blob);
    });

    it('Should call the getCapabilities method', async () => {
        await mockedMediaConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.mediaConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getQueryOptions method', async () => {
        await mockedMediaConnectorController.getQueryOptions(connectorId);
        expect(mockedEditorApi.mediaConnectorGetQueryOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorGetQueryOptions).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getDownloadOptions method', async () => {
        await mockedMediaConnectorController.getDownloadOptions(connectorId);
        expect(mockedEditorApi.mediaConnectorGetDownloadOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorGetDownloadOptions).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the detail method', async () => {
        await mockedMediaConnectorController.detail(connectorId, mediaId);
        expect(mockedEditorApi.mediaConnectorDetail).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDetail).toHaveBeenLastCalledWith(connectorId, mediaId);
    });
});

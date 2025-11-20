import { MediaConnectorController } from '../../controllers/MediaConnectorController';
import { DeprecatedMediaConnectorDownloadType, SortBy, SortOrder } from '../../types/ConnectorTypes';
import { MediaDownloadIntent, MediaDownloadType } from '../../types/MediaConnectorTypes';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { WellKnownConfigurationKeys } from '../../types/ConfigurationTypes';

let mockedMediaConnectorController: MediaConnectorController;

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockedEditorApi: EditorAPI = {
    mediaConnectorQuery: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDetail: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorDownload: async <T>() =>
        new Uint8Array() as unknown as EditorResponse<T>,
    mediaConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
    mediaConnectorUpload: async () => getEditorResponseData(castToEditorResponse(null)),
};

const mockedLocalConfig = new Map<string, string>();
beforeEach(() => {
    mockedLocalConfig.set(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl, 'ENVIRONMENT_API/');
    mockedLocalConfig.set(WellKnownConfigurationKeys.GraFxStudioAuthToken, 'GRAFX_AUTH_TOKEN');
    mockedMediaConnectorController = new MediaConnectorController(Promise.resolve(mockedEditorApi));
    jest.spyOn(mockedEditorApi, 'mediaConnectorDetail');
    jest.spyOn(mockedEditorApi, 'mediaConnectorDownload');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'mediaConnectorGetConfigurationOptions');
    jest.spyOn(mockedEditorApi, 'mediaConnectorQuery');
    jest.spyOn(mockedEditorApi, 'mediaConnectorUpload');
});

afterEach(() => {
    jest.restoreAllMocks();
    mockFetch.mockClear();
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
        await mockedMediaConnectorController.download(connectorId, mediaId, MediaDownloadType.thumbnail, context);
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            mediaId,
            MediaDownloadType.thumbnail,
            MediaDownloadIntent.web,
            JSON.stringify(context),
        );
    });
    it('Should convert legacy values to new ones in the download method', async () => {
        await mockedMediaConnectorController.download(
            connectorId,
            mediaId,
            DeprecatedMediaConnectorDownloadType.LowResolutionWeb as unknown as MediaDownloadType,
            context,
        );
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorDownload).toHaveBeenCalledWith(
            connectorId,
            mediaId,
            MediaDownloadType.thumbnail,
            MediaDownloadIntent.web,
            JSON.stringify(context),
        );
    });
    it('Should throw a structured error if the download method returns a non-success response', async () => {
        (mockedEditorApi.mediaConnectorDownload as jest.Mock).mockResolvedValueOnce({
            success: false,
            status: 500,
            error: 'Error',
            data: JSON.stringify({}),
            parsedData: null,
        });
        await expect(
            mockedMediaConnectorController.download(connectorId, mediaId, MediaDownloadType.thumbnail, context),
        ).rejects.toThrow('Error');
    });

    it('Should throw an unrecognized response type error if download method returns an unexpected response type', async () => {
        (mockedEditorApi.mediaConnectorDownload as jest.Mock).mockResolvedValueOnce(null);
        await expect(
            mockedMediaConnectorController.download(connectorId, mediaId, MediaDownloadType.thumbnail, context),
        ).rejects.toThrow('Unexpected response type: object.');
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

describe('MediaConnectorController - Upload', () => {
    const connectorId = 'dam';
    it('should call the upload method', async () => {
        await mockedMediaConnectorController.upload(
            connectorId,
            [{ id: '123', name: 'test.jpg', url: 'https://test.com/test.jpg' }],
            {},
        );
        expect(mockedEditorApi.mediaConnectorUpload).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.mediaConnectorUpload).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify([{ id: '123', name: 'test.jpg', url: 'https://test.com/test.jpg' }]),
            JSON.stringify({}),
        );
    });
});

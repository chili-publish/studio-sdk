import { DataPage, PageConfig } from '../../types/DataConnectorTypes';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { DataConnectorController } from '../../controllers/DataConnectorController';

let mockedDataConnectorController: DataConnectorController;

const mockedEditorApi: EditorAPI = {
    dataConnectorGetPage: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetModel: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDataConnectorController = new DataConnectorController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'dataConnectorGetPage');
    jest.spyOn(mockedEditorApi, 'dataConnectorGetModel');
    jest.spyOn(mockedEditorApi, 'dataConnectorGetCapabilities');
    jest.spyOn(mockedEditorApi, 'dataConnectorGetConfigurationOptions');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('DataConnectorController', () => {
    const connectorId = 'data';

    const pageConfig: PageConfig = {
        filters: [],
        sorting: [],
        continuationToken: 'some token',
        limit: 20,
    };

    const context = { debug: 'true' };

    it('Should call the getPage method', async () => {
        await mockedDataConnectorController.getPage(connectorId, pageConfig, context);
        expect(mockedEditorApi.dataConnectorGetPage).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.dataConnectorGetPage).toHaveBeenCalledWith(
            connectorId,
            JSON.stringify(pageConfig),
            JSON.stringify(context),
        );
    });

    it('Should parse dates correctly', async () => {
        (mockedEditorApi.dataConnectorGetPage as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: JSON.stringify({
                data: [
                    {
                        createDate: { type: 'date', value: 1000 },
                    },
                    {
                        createDate: { type: 'date', value: 1111 },
                    },
                    {
                        createDate: { type: 'date', value: 2222 },
                    },
                ],
            }),
        });

        const result: EditorResponse<DataPage> = await mockedDataConnectorController.getPage(
            connectorId,
            pageConfig,
            context,
        );

        expect(result.parsedData?.data).toStrictEqual([
            {
                createDate: new Date(1000),
            },
            {
                createDate: new Date(1111),
            },
            {
                createDate: new Date(2222),
            },
        ]);
    });

    it('Should call the getModel method', async () => {
        await mockedDataConnectorController.getModel(connectorId, context);
        expect(mockedEditorApi.dataConnectorGetModel).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.dataConnectorGetModel).toHaveBeenCalledWith(connectorId, JSON.stringify(context));
    });

    it('Should call the getCapabilities method', async () => {
        await mockedDataConnectorController.getCapabilities(connectorId);
        expect(mockedEditorApi.dataConnectorGetCapabilities).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.dataConnectorGetCapabilities).toHaveBeenLastCalledWith(connectorId);
    });

    it('Should call the getConfigurationOptions method', async () => {
        await mockedDataConnectorController.getConfigurationOptions(connectorId);
        expect(mockedEditorApi.dataConnectorGetConfigurationOptions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.dataConnectorGetConfigurationOptions).toHaveBeenLastCalledWith(connectorId);
    });
});

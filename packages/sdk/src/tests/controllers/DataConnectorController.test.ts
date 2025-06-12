import { DataConnectorController } from '../../controllers/DataConnectorController';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { DataPage, PageConfig } from '../../types/DataConnectorTypes';
import { DataItemMappingTools } from '../../utils/DataItemMappingTools';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedDataConnectorController: DataConnectorController;

const mockedEditorApi: EditorAPI = {
    dataConnectorGetPage: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetModel: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetCapabilities: async () => getEditorResponseData(castToEditorResponse(null)),
    dataConnectorGetConfigurationOptions: async () => getEditorResponseData(castToEditorResponse(null)),
};

const mockedDataItemMappingTools = new DataItemMappingTools();

beforeEach(() => {
    mockedDataConnectorController = new DataConnectorController(mockedEditorApi, mockedDataItemMappingTools);
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

    it('only DatePropertyWrapper objects are being converted to date objects', async () => {
        (mockedEditorApi.dataConnectorGetPage as jest.Mock).mockResolvedValueOnce({
            success: true,
            data: JSON.stringify({
                data: [
                    {
                        createDate: { type: 'date', value: 1111 },
                        stringDate: '01-01-2021',
                        epochDate: 1111,
                    },
                    {
                        createDate: { type: 'date', value: 2222 },
                        stringDate: '02-02-2022',
                        epochDate: 1111,
                    },
                    {
                        createDate: { type: 'date', value: 3333 },
                        stringDate: '03-03-2023',
                        epochDate: 3333,
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
                createDate: new Date(1111),
                stringDate: '01-01-2021',
                epochDate: 1111,
            },
            {
                createDate: new Date(2222),
                stringDate: '02-02-2022',
                epochDate: 1111,
            },
            {
                createDate: new Date(3333),
                stringDate: '03-03-2023',
                epochDate: 3333,
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

import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { DataSourceController } from '../../controllers/DataSourceController';
import { DataItemMappingTools, EngineDataItem } from '../../utils/DataItemMappingTools';

let mockedDataSourceController: DataSourceController;

const mockEditorApi: EditorAPI = {
    setDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
    getDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
    removeDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
    setDataRow: async () => getEditorResponseData(castToEditorResponse(null)),
};

const mockedDataItemMappingTools = new DataItemMappingTools();

beforeEach(() => {
    mockedDataSourceController = new DataSourceController(Promise.resolve(mockEditorApi), mockedDataItemMappingTools);
    jest.spyOn(mockEditorApi, 'setDataSource');
    jest.spyOn(mockEditorApi, 'getDataSource');
    jest.spyOn(mockEditorApi, 'removeDataSource');
    jest.spyOn(mockEditorApi, 'setDataRow');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('DataSourceController', () => {
    it('Should be possible to set the data source id', async () => {
        const connectorId = '123';

        await mockedDataSourceController.setDataSource(connectorId);
        expect(mockEditorApi.setDataSource).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setDataSource).toHaveBeenCalledWith(connectorId);
    });

    it('Should be possible to get the data source', async () => {
        await mockedDataSourceController.getDataSource();
        expect(mockEditorApi.getDataSource).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to remove the data source', async () => {
        await mockedDataSourceController.removeDataSource();
        expect(mockEditorApi.removeDataSource).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to set a data row', async () => {
        const dataRow = { '1': 2, '3': 4 };
        await mockedDataSourceController.setDataRow(dataRow);
        expect(mockEditorApi.setDataRow).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setDataRow).toHaveBeenCalledWith(JSON.stringify(dataRow));
    });

    it('Date objects are being converted to DatePropertyWrapper objects', async () => {
        await mockedDataSourceController.setDataRow({
            createDate: new Date(1111),
            anotherDate: new Date(2222),
            stringValue: 'hola',
            numberValue: 5,
        });

        expect(mockEditorApi.setDataRow).toHaveBeenCalledWith(
            JSON.stringify({
                createDate: { value: new Date(1111).getTime(), type: 'date' } as EngineDataItem,
                anotherDate: { value: new Date(2222).getTime(), type: 'date' } as EngineDataItem,
                stringValue: 'hola',
                numberValue: 5,
            }),
        );
    });
});

import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { DataSourceController } from '../../controllers/DataSourceController';

let mockedDataSourceController: DataSourceController;

const mockEditorApi: EditorAPI = {
    setDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
    getDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
    removeDataSource: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDataSourceController = new DataSourceController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'setDataSource');
    jest.spyOn(mockEditorApi, 'getDataSource');
    jest.spyOn(mockEditorApi, 'removeDataSource');
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
});

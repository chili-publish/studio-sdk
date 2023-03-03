import { EditorAPI } from '../../../types/CommonTypes';
import { DebugController } from '../../controllers/DebugController';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedDebugController: DebugController;

const mockedEditorApi: EditorAPI = {
    getLogs: async () => getEditorResponseData(castToEditorResponse(null)),
    toggleDebugPanel: async () => getEditorResponseData(castToEditorResponse(null)),
    enableDebug: async () => getEditorResponseData(castToEditorResponse(null)),
    disableDebug: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDebugController = new DebugController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getLogs');
    jest.spyOn(mockedEditorApi, 'toggleDebugPanel');
    jest.spyOn(mockedEditorApi, 'enableDebug');
    jest.spyOn(mockedEditorApi, 'disableDebug');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('DebugProperties', () => {
    it('Should call all of the Debug Functions of EditorAPI successfully', async () => {
        await mockedDebugController.getLogs();
        expect(mockedEditorApi.getLogs).toHaveBeenCalledTimes(1);
        await mockedDebugController.toggleDebugPanel();
        expect(mockedEditorApi.toggleDebugPanel).toHaveBeenCalledTimes(1);
        await mockedDebugController.enableDebug();
        expect(mockedEditorApi.enableDebug).toHaveBeenCalledTimes(1);
        await mockedDebugController.disableDebug();
        expect(mockedEditorApi.disableDebug).toHaveBeenCalledTimes(1);
    });
});

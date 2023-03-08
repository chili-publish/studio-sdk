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
describe('DebugController', () => {
    it('Should be possible to retrieve the logs', async () => {
        await mockedDebugController.getLogs();
        expect(mockedEditorApi.getLogs).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to toggle the debug panel', async () => {
        await mockedDebugController.toggleDebugPanel();
        expect(mockedEditorApi.toggleDebugPanel).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to enable debugging', async () => {
        await mockedDebugController.enableDebug();
        expect(mockedEditorApi.enableDebug).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to disable debugging', async () => {
        await mockedDebugController.disableDebug();
        expect(mockedEditorApi.disableDebug).toHaveBeenCalledTimes(1);
    });
});

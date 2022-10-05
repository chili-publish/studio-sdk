import { DebugController } from '../../controllers/DebugController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedDebugProperties: DebugController;

beforeEach(() => {
    mockedDebugProperties = new DebugController(MockEditorAPI);
    jest.spyOn(mockedDebugProperties, 'getLogs');
    jest.spyOn(mockedDebugProperties, 'toggleDebugPanel');
    jest.spyOn(mockedDebugProperties, 'enableDebug');
    jest.spyOn(mockedDebugProperties, 'disableDebug');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('DebugProperties', () => {
    it('Should call all of the Debug Functions of EditorAPI successfully', () => {
        mockedDebugProperties.getLogs();
        expect(mockedDebugProperties.getLogs).toHaveBeenCalledTimes(1);
        mockedDebugProperties.toggleDebugPanel();
        expect(mockedDebugProperties.toggleDebugPanel).toHaveBeenCalledTimes(1);
        mockedDebugProperties.enableDebug();
        expect(mockedDebugProperties.enableDebug).toHaveBeenCalledTimes(1);
        mockedDebugProperties.disableDebug();
        expect(mockedDebugProperties.disableDebug).toHaveBeenCalledTimes(1);
    });
});

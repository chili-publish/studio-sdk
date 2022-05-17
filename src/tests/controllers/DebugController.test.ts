import MockEditorAPI from '../__mocks__/FrameProperties';
import { DebugController } from '../../controllers/DebugController';

let mockedDebugProperties: DebugController;

beforeEach(() => {
    mockedDebugProperties = new DebugController(MockEditorAPI);
    jest.spyOn(mockedDebugProperties, 'getLogs');
    jest.spyOn(mockedDebugProperties, 'toggleDebugPanel');
    jest.spyOn(mockedDebugProperties, 'enableDebugPanel');
    jest.spyOn(mockedDebugProperties, 'disableDebugPanel');
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
        mockedDebugProperties.enableDebugPanel();
        expect(mockedDebugProperties.enableDebugPanel).toHaveBeenCalledTimes(1);
        mockedDebugProperties.disableDebugPanel();
        expect(mockedDebugProperties.disableDebugPanel).toHaveBeenCalledTimes(1);
    });
});

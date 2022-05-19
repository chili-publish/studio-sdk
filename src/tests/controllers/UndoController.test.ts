import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK } from '../../index';
import { UndoController } from '../../controllers/UndoController';

describe('undo controller', () => {
    let mockedSDK: SDK;
    beforeEach(() => {
        mockedSDK = new SDK(mockConfig);
        mockedSDK.editorAPI = mockChild;
        mockedSDK.undoManager = new UndoController(mockChild);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Undoes the last operation', async () => {
        await mockedSDK.undoManager.undo();
        expect(mockedSDK.editorAPI.undo).toHaveBeenCalledTimes(1);
    });

    it('Redoes the last operation', async () => {
        await mockedSDK.undoManager.redo();
        expect(mockedSDK.editorAPI.redo).toHaveBeenCalledTimes(1);
    });
});

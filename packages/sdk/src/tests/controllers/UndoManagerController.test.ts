import { UndoManagerController } from '../../controllers/UndoManagerController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

describe('UndoManagerController', () => {
    let mockedUndoManagerController: UndoManagerController;

    const mockEditorApi: EditorAPI = {
        undo: async () => getEditorResponseData(castToEditorResponse(null)),
        redo: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedUndoManagerController = new UndoManagerController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'undo');
        jest.spyOn(mockEditorApi, 'redo');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Undoes the last operation', async () => {
        await mockedUndoManagerController.undo();
        expect(mockEditorApi.undo).toHaveBeenCalledTimes(1);
    });

    it('Redoes the last operation', async () => {
        await mockedUndoManagerController.redo();
        expect(mockEditorApi.redo).toHaveBeenCalledTimes(1);
    });
});

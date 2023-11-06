import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { SelectionController } from '../../controllers/SelectionController';
import { SelectionOperation } from '../../types/SelectionTypes';

describe('SelectionController', () => {
    let mockedSelectionController: SelectionController;

    const mockEditorApi: EditorAPI = {
        performSelectionOperation: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedSelectionController = new SelectionController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'performSelectionOperation');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls performSelectionOperation with copy operation', async () => {
        await mockedSelectionController.copy();
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledWith(SelectionOperation.COPY);
    });

    it('calls performSelectionOperation with cut operation', async () => {
        await mockedSelectionController.cut();
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledWith(SelectionOperation.CUT);
    });

    it('calls performSelectionOperation with paste operation', async () => {
        await mockedSelectionController.paste();
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledWith(SelectionOperation.PASTE);
    });

    it('calls performSelectionOperation with duplicate operation', async () => {
        await mockedSelectionController.duplicate();
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.performSelectionOperation).toHaveBeenCalledWith(SelectionOperation.DUPLICATE);
    });
});

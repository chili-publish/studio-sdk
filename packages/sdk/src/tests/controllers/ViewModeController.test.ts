import { ViewModeController } from '../../controllers/ViewModeController';
import { EditorAPI } from '../../types/CommonTypes';
import { ViewMode } from '../../types/ViewModeTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedViewModeController: ViewModeController;

const mockEditorApi: EditorAPI = {
    setViewMode: async () => getEditorResponseData(castToEditorResponse(null)),
};
beforeEach(() => {
    mockedViewModeController = new ViewModeController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'setViewMode');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('ViewModeController', () => {
    it('should call set function of EditorAPI', async () => {
        await mockedViewModeController.set(ViewMode.normal);
        expect(mockEditorApi.setViewMode).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setViewMode).toHaveBeenCalledWith(ViewMode.normal);
    });
});

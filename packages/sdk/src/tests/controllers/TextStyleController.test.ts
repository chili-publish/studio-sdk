import { TextStyleController } from '../../controllers/TextStyleController';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

describe('TextStyleController', () => {
    let mockedTextStyleController: TextStyleController;

    const mockEditorApi: EditorAPI = {
        selectedTextStyleDeltaUpdate: async () => getEditorResponseData(castToEditorResponse(null)),
        selectedTextStyleClean: async () => getEditorResponseData(castToEditorResponse(null)),
        getSelectedTextStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedTextStyleController = new TextStyleController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'selectedTextStyleDeltaUpdate');
        jest.spyOn(mockEditorApi, 'selectedTextStyleClean');
        jest.spyOn(mockEditorApi, 'getSelectedTextStyle');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Should call set of EditorAPI successfully', async () => {
        const style = { FONT_SIZE: { value: 34 } };
        await mockedTextStyleController.set(style);
        expect(mockEditorApi.selectedTextStyleDeltaUpdate).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.selectedTextStyleDeltaUpdate).toHaveBeenCalledWith(JSON.stringify(style));
    });

    it('Should call removeSelected of EditorAPI successfully', async () => {
        await mockedTextStyleController.removeSelected();
        expect(mockEditorApi.selectedTextStyleClean).toHaveBeenCalledTimes(1);
    });

    it('Should call getSelected of EditorAPI successfully', async () => {
        await mockedTextStyleController.getSelected();
        expect(mockEditorApi.getSelectedTextStyle).toHaveBeenCalledTimes(1);
    });
});

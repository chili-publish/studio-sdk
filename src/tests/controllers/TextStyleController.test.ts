import { TextStyleController } from '../../controllers/TextStyleController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';
import mockConfig from '../__mocks__/config';
import {SDK} from '../../index';


describe('TextProperties', () => {
    let mockedSDK: SDK;

    beforeEach(() => {
        mockedSDK = new SDK(mockConfig);
        mockedSDK.editorAPI = MockEditorAPI;
        mockedSDK.textSelection = new TextStyleController(MockEditorAPI);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Should call selectedTextStyleDeltaUpdate of EditorAPI successfully', async () => {
        await mockedSDK.textSelection.setTextStyleProperties({ FONT_SIZE: { value: 34 } });
        expect(mockedSDK.editorAPI.selectedTextStyleDeltaUpdate).toHaveBeenCalledTimes(1);
    });

    it('Should call selectedTextStyleClean of EditorAPI successfully', async () => {
        await mockedSDK.textSelection.clearTextStyleProperties();
        expect(mockedSDK.editorAPI.selectedTextStyleClean).toHaveBeenCalledTimes(1);
    });
});

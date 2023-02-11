import { TextStyleController } from '../../controllers/TextStyleController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

describe('TextProperties', () => {
    let mockedTextProperties: TextStyleController;

    beforeEach(() => {
        mockedTextProperties = new TextStyleController(MockEditorAPI);
        jest.spyOn(mockedTextProperties, 'setTextStyleProperties');
        jest.spyOn(mockedTextProperties, 'cleanTextStyleProperties');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Should call setTextStyleProperties of EditorAPI successfully', () => {
        mockedTextProperties.setTextStyleProperties({ FONT_SIZE: { value: 34 } });
        expect(mockedTextProperties.setTextStyleProperties).toHaveBeenCalledTimes(1);
    });

    it('Should call cleanTextStyleProperties of EditorAPI successfully', () => {
        mockedTextProperties.cleanTextStyleProperties();
        expect(mockedTextProperties.cleanTextStyleProperties).toHaveBeenCalledTimes(1);
    });
});

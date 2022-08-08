import MockEditorAPI from '../__mocks__/FrameProperties';
import { TextSelectionController } from '../../controllers/TextSelectionController';

let mockedTextProperties: TextSelectionController;

beforeEach(() => {
    mockedTextProperties = new TextSelectionController(MockEditorAPI);
    jest.spyOn(mockedTextProperties, 'setTextStyleProperties');

});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('TextProperties', () => {
    it('Should call all of the TextSelection Functions of EditorAPI successfully', () => {
        mockedTextProperties.setTextStyleProperties({ FONT_SIZE: { value: 34 } });
        expect(mockedTextProperties.setTextStyleProperties).toHaveBeenCalledTimes(1);

    });
});

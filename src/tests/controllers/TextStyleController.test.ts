import { TextStyleController } from '../../controllers/TextStyleController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedTextProperties: TextStyleController;

beforeEach(() => {
    mockedTextProperties = new TextStyleController(MockEditorAPI);
    jest.spyOn(mockedTextProperties, 'setTextStyleProperties');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('TextProperties', () => {
    it('Should call all of the TextStyle Functions of EditorAPI successfully', () => {
        mockedTextProperties.setTextStyleProperties({ FONT_SIZE: { value: 34 } });
        expect(mockedTextProperties.setTextStyleProperties).toHaveBeenCalledTimes(1);
    });
});

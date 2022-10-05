import { PageController } from '../../controllers/PageController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedPageProperties: PageController;

beforeEach(() => {
    mockedPageProperties = new PageController(MockEditorAPI);
    jest.spyOn(mockedPageProperties, 'getPages');
    jest.spyOn(mockedPageProperties, 'getPageById');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageProperties', () => {
    it('Should call all of the Page Functions of EditorAPI successfully', () => {
        mockedPageProperties.getPages();
        expect(mockedPageProperties.getPages).toHaveBeenCalledTimes(1);

        mockedPageProperties.getPageById(4);
        expect(mockedPageProperties.getPageById).toHaveBeenCalledTimes(1);
        expect(mockedPageProperties.getPageById).toHaveBeenCalledWith(4);
    });
});

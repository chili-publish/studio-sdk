import { PageController } from '../../controllers/PageController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedPageProperties: PageController;

beforeEach(() => {
    mockedPageProperties = new PageController(MockEditorAPI);
    jest.spyOn(mockedPageProperties, 'getPages');
    jest.spyOn(mockedPageProperties, 'getPageById');
    jest.spyOn(mockedPageProperties, 'setPageWidth');
    jest.spyOn(mockedPageProperties, 'setPageHeight');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageProperties', () => {
    it('Should call all of the Page Functions of EditorAPI successfully', () => {
        mockedPageProperties.getPages();
        expect(mockedPageProperties.getPages).toHaveBeenCalledTimes(1);

        mockedPageProperties.getPageById('4');
        expect(mockedPageProperties.getPageById).toHaveBeenCalledTimes(1);
        expect(mockedPageProperties.getPageById).toHaveBeenCalledWith('4');

        mockedPageProperties.setPageWidth('id', '4');
        expect(mockedPageProperties.setPageWidth).toHaveBeenCalledTimes(1);
        expect(mockedPageProperties.setPageWidth).toHaveBeenCalledWith('id', '4');

        mockedPageProperties.setPageHeight('id', '4');
        expect(mockedPageProperties.setPageHeight).toHaveBeenCalledTimes(1);
        expect(mockedPageProperties.setPageHeight).toHaveBeenCalledWith('id', '4');
    });
});

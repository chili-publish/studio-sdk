import { EditorAPI } from '../../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedPageProperties: PageController;

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageById: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageProperties = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getPages');
    jest.spyOn(mockEditorApi, 'getPageById');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call all of the Page Functions of EditorAPI successfully', async () => {
        await mockedPageProperties.getPages();
        expect(mockEditorApi.getPages).toHaveBeenCalledTimes(1);

        await mockedPageProperties.getPageById('4');
        expect(mockEditorApi.getPageById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageById).toHaveBeenCalledWith('4');
    });
});

import { EditorAPI } from '../../../types/CommonTypes';
import { Page } from '../../../types/PageTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedPageProperties: PageController;

const mockPages: Page[] = [
    {
        pageId: 'aaa',
        pageNumber: 0,
        width: 100,
        height: 200,
    },
];

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(mockPages)),
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
describe('PageProperties', () => {
    it('Should call all of the Page Functions of EditorAPI successfully', async () => {
        await mockedPageProperties.getPages();
        expect(mockEditorApi.getPages).toHaveBeenCalledTimes(1);

        await mockedPageProperties.getPageById('4');
        expect(mockEditorApi.getPageById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageById).toHaveBeenCalledWith('4');
    });
});

import { EditorAPI } from '../../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';

let mockedPageController: PageController;

const mockEditorApi: EditorAPI = {
    setPageWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageController = new PageController(Promise.resolve(mockEditorApi));
    jest.spyOn(mockEditorApi, 'setPageWidth');
    jest.spyOn(mockEditorApi, 'setPageHeight');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call the setWidth method', async () => {
        await mockedPageController.setWidth('4');
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledWith('4');
    });

    it('Should call the setHeight method', async () => {
        await mockedPageController.setHeight('4');
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledWith('4');
    });
});

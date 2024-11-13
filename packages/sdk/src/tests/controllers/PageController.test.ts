import { EditorAPI } from '../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedPageController: PageController;

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageById: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    reorderPages: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageController = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getPages');
    jest.spyOn(mockEditorApi, 'getPageById');
    jest.spyOn(mockEditorApi, 'setPageWidth');
    jest.spyOn(mockEditorApi, 'setPageHeight');
    jest.spyOn(mockEditorApi, 'reorderPages');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call the getPages method', async () => {
        await mockedPageController.getAll();
        expect(mockEditorApi.getPages).toHaveBeenCalledTimes(1);
    });
    it('Should call the getPage method', async () => {
        await mockedPageController.getById('4');
        expect(mockEditorApi.getPageById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageById).toHaveBeenCalledWith('4');
    });
    it('Should call the setWidth method', async () => {
        await mockedPageController.setWidth('id', '4');
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledWith('id', '4');
    });
    it('Should call the setHeight method', async () => {
        await mockedPageController.setHeight('id', '4');
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledWith('id', '4');
    });

    it('Should accept calculations for the pageHeight and pageWidth methods', async () => {
        await mockedPageController.setHeight('id', '4+2');
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledWith('id', '4+2');

        await mockedPageController.setWidth('id', '4*3');
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledWith('id', '4*3');
    });

    it('Should be possible to reorder the pages', async () => {
        await mockedPageController.reorderPages(1, ['id']);
        expect(mockEditorApi.reorderPages).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.reorderPages).toHaveBeenCalledWith(1, ['id']);
    });
});

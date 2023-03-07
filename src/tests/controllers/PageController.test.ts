import { EditorAPI } from '../../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedPageProperties: PageController;

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageById: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageProperties = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getPages');
    jest.spyOn(mockEditorApi, 'getPageById');
    jest.spyOn(mockEditorApi, 'setPageWidth');
    jest.spyOn(mockEditorApi, 'setPageHeight');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call the getPages method', async () => {
        await mockedPageProperties.getPages();
        expect(mockEditorApi.getPages).toHaveBeenCalledTimes(1);
    });
    it('Should call the getPageById method', async () => {
        await mockedPageProperties.getPageById('4');
        expect(mockEditorApi.getPageById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageById).toHaveBeenCalledWith('4');
    });
    it('Should call the setPageWidth method and transform string to number', async () => {
        await mockedPageProperties.setPageWidth('id', '4');
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledWith('id', 4);
    });
    it('Should call the setPageHeight method and transform string to number', async () => {
        await mockedPageProperties.setPageHeight('id', '4');
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledWith('id', 4);
    });

    it('Should accept calculations for the pageHeight and pageWidth methods', async () => {
        await mockedPageProperties.setPageHeight('id', '4+2');
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setPageHeight).toHaveBeenCalledWith('id', 6);

        await mockedPageProperties.setPageWidth('id', '4*3');
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setPageWidth).toHaveBeenCalledWith('id', 12);
    });
});

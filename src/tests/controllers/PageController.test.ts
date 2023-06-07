import { EditorAPI } from '../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedPageProperties: PageController;

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageById: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageProperties = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getPages');
    jest.spyOn(mockEditorApi, 'getPageById');
    jest.spyOn(mockEditorApi, 'setWidth');
    jest.spyOn(mockEditorApi, 'setHeight');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call the getPages method', async () => {
        await mockedPageProperties.getAll();
        expect(mockEditorApi.getPages).toHaveBeenCalledTimes(1);
    });
    it('Should call the getPage method', async () => {
        await mockedPageProperties.getById('4');
        expect(mockEditorApi.getPageById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageById).toHaveBeenCalledWith('4');
    });
    it('Should call the setWidth method and transform string to number', async () => {
        await mockedPageProperties.setWidth('id', '4');
        expect(mockEditorApi.setWidth).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setWidth).toHaveBeenCalledWith('id', 4);
    });
    it('Should call the setHeight method and transform string to number', async () => {
        await mockedPageProperties.setHeight('id', '4');
        expect(mockEditorApi.setHeight).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setHeight).toHaveBeenCalledWith('id', 4);
    });

    it('Should accept calculations for the pageHeight and pageWidth methods', async () => {
        await mockedPageProperties.setHeight('id', '4+2');
        expect(mockEditorApi.setHeight).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setHeight).toHaveBeenCalledWith('id', 6);

        await mockedPageProperties.setWidth('id', '4*3');
        expect(mockEditorApi.setWidth).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setWidth).toHaveBeenCalledWith('id', 12);
    });
});

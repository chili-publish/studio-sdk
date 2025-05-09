import { EditorAPI } from '../../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { PageController } from '../../controllers/PageController';

let mockedPageController: PageController;

const mockEditorApi: EditorAPI = {
    setPageWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageSize: async (width: unknown, height: unknown) =>
        getEditorResponseData(castToEditorResponse({ width, height })),
};

beforeEach(() => {
    mockedPageController = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'setPageWidth');
    jest.spyOn(mockEditorApi, 'setPageHeight');
    jest.spyOn(mockEditorApi, 'setPageSize');
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

    it('Should call the setSize method', async () => {
        await mockedPageController.setSize('4', '5');
        expect(mockEditorApi.setPageSize).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageSize).toHaveBeenCalledWith('4', '5');
    });
});

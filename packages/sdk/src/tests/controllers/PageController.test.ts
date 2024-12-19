import { EditorAPI } from '../../types/CommonTypes';
import { PageController } from '../../controllers/PageController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { SnapshotSettings } from '../../types/PageTypes';

let mockedPageController: PageController;

const mockEditorApi: EditorAPI = {
    getPages: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageById: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageWidth: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageHeight: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    addPage: async () => getEditorResponseData(castToEditorResponse('frameID')),
    removePage: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPageSnapshot: async () => getEditorResponseData(castToEditorResponse([1])),
    getPageSnapshotWithSettings: async () => getEditorResponseData(castToEditorResponse([1])),
    selectPage: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    duplicatePage: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
    setPageIsVisible: async (id: unknown, isVisible: unknown) =>
        getEditorResponseData(castToEditorResponse({ id, isVisible })),
    reorderPages: async (id: unknown) => getEditorResponseData(castToEditorResponse(id)),
};

beforeEach(() => {
    mockedPageController = new PageController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getPages');
    jest.spyOn(mockEditorApi, 'getPageById');
    jest.spyOn(mockEditorApi, 'setPageWidth');
    jest.spyOn(mockEditorApi, 'setPageHeight');
    jest.spyOn(mockEditorApi, 'addPage');
    jest.spyOn(mockEditorApi, 'removePage');
    jest.spyOn(mockEditorApi, 'getPageSnapshot');
    jest.spyOn(mockEditorApi, 'getPageSnapshotWithSettings');
    jest.spyOn(mockEditorApi, 'selectPage');
    jest.spyOn(mockEditorApi, 'setPageIsVisible');
    jest.spyOn(mockEditorApi, 'duplicatePage');
    jest.spyOn(mockEditorApi, 'reorderPages');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageController', () => {
    it('Should call the add method', async () => {
        await mockedPageController.add();
        expect(mockEditorApi.addPage).toHaveBeenCalledTimes(1);
    });
    it('Should call the remove method', async () => {
        await mockedPageController.remove('1');
        expect(mockEditorApi.removePage).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removePage).toHaveBeenCalledWith('1');
    });
    it('Should call the select method', async () => {
        await mockedPageController.select('1');
        expect(mockEditorApi.selectPage).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.selectPage).toHaveBeenCalledWith('1');
    });
    it('Should call the duplicate method', async () => {
        await mockedPageController.duplicate('1');
        expect(mockEditorApi.duplicatePage).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicatePage).toHaveBeenCalledWith('1');
    });
    it('Should call the setVisibility method', async () => {
        await mockedPageController.setVisibility('1', true);
        expect(mockEditorApi.setPageIsVisible).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setPageIsVisible).toHaveBeenCalledWith('1', true);
    });
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

    it('Should call the getSnapshotWithSettings method', async () => {
        const settings = { largestAxisSize: 5 } as SnapshotSettings;

        await mockedPageController.getSnapshotWithSettings('1', settings);
        expect(mockEditorApi.getPageSnapshotWithSettings).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getPageSnapshotWithSettings).toHaveBeenCalledWith('1', JSON.stringify(settings));
    });

    it('getSnapshot should call the getSnapshotWithSettings method', async () => {
        await mockedPageController.getSnapshot('1');
        expect(mockEditorApi.getPageSnapshotWithSettings).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.getPageSnapshotWithSettings).toHaveBeenCalledWith('1', null);
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
        await mockedPageController.move(1, ['id']);
        expect(mockEditorApi.reorderPages).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.reorderPages).toHaveBeenCalledWith(1, ['id']);
    });
});

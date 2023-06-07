import { EditorAPI, Id } from '../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectPage } from '../__mocks__/FrameProperties';

let mockedFontController: LayoutController;
let mockId: Id;

const mockedEditorApi: EditorAPI = {
    getLayouts: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutById: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutByName: async () => getEditorResponseData(castToEditorResponse(null)),
    getSelectedLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    removeLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    addLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    setName: async () => getEditorResponseData(castToEditorResponse(null)),
    selectLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    reset: async () => getEditorResponseData(castToEditorResponse(null)),
    setHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    setWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    resetHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    resetWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageSnapshot: async () => getEditorResponseData(castToEditorResponse(null)),
    renameLayout: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFontController = new LayoutController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getLayouts');
    jest.spyOn(mockedEditorApi, 'getLayoutById');
    jest.spyOn(mockedEditorApi, 'getLayoutByName');
    jest.spyOn(mockedEditorApi, 'getSelectedLayout');
    jest.spyOn(mockedEditorApi, 'removeLayout');
    jest.spyOn(mockedEditorApi, 'addLayout');
    jest.spyOn(mockedEditorApi, 'setName');
    jest.spyOn(mockedEditorApi, 'selectLayout');
    jest.spyOn(mockedEditorApi, 'duplicateLayout');
    jest.spyOn(mockedEditorApi, 'reset');

    jest.spyOn(mockedEditorApi, 'setHeight');
    jest.spyOn(mockedEditorApi, 'setWidth');
    jest.spyOn(mockedEditorApi, 'resetHeight');
    jest.spyOn(mockedEditorApi, 'resetWidth');
    jest.spyOn(mockedEditorApi, 'getPageSnapshot');
    jest.spyOn(mockedEditorApi, 'renameLayout');

    mockId = mockSelectPage.layoutId;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LayoutController', () => {
    it('Should be possible to get all layouts', async () => {
        await mockedFontController.getAll();
        expect(mockedEditorApi.getLayouts).toHaveBeenCalledTimes(1);
    });

    it("Should be possible to get a layout by it's id", async () => {
        await mockedFontController.getById('1');
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledWith('1');
    });
    it("Should be possible to get a layout by it's name", async () => {
        await mockedFontController.getByName('layout');
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledWith('layout');
    });
    it('Should be possible to get the selected layout', async () => {
        await mockedFontController.getSelected();
        expect(mockedEditorApi.getSelectedLayout).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to remove a layout', async () => {
        await mockedFontController.remove('1');
        expect(mockedEditorApi.removeLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to create a layout', async () => {
        await mockedFontController.create('1');
        expect(mockedEditorApi.addLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to set the layout name', async () => {
        await mockedFontController.rename('1', 'TEST');
        expect(mockedEditorApi.renameLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameLayout).toHaveBeenCalledWith('1', 'TEST');
    });
    it('Should be possible to select a layout', async () => {
        await mockedFontController.select('1');
        expect(mockedEditorApi.selectLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to duplicate a layout', async () => {
        await mockedFontController.duplicate('1');
        expect(mockedEditorApi.duplicateLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.duplicateLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to reset a layout', async () => {
        await mockedFontController.reset('1');
        expect(mockedEditorApi.reset).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.reset).toHaveBeenCalledWith('1');
    });
    it('Should be possible to set the layout height', async () => {
        await mockedFontController.setHeight(mockId, '32');
        expect(mockedEditorApi.setHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setHeight).toHaveBeenCalledWith('1', 32);
    });
    it('Should not be possible to set the layout height to null', async () => {
        await mockedFontController.setHeight(mockId, 'null');
        expect(mockedEditorApi.setHeight).not.toHaveBeenCalled();
    });
    it('Should be possible to set the layout width', async () => {
        await mockedFontController.setWidth(mockId, '34');
        expect(mockedEditorApi.setWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setWidth).toHaveBeenCalledWith('1', 34);
    });
    it('Should not be possible to set the layout width to null', async () => {
        await mockedFontController.setWidth(mockId, 'null');
        expect(mockedEditorApi.setWidth).not.toHaveBeenCalled();
    });
    it('Should be possible to reset the layout height', async () => {
        await mockedFontController.resetHeight('1');
        expect(mockedEditorApi.resetHeight).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout width', async () => {
        await mockedFontController.resetWidth('1');
        expect(mockedEditorApi.resetWidth).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to get the selected layout snapshot', async () => {
        await mockedFontController.getSelectedSnapshot();
        expect(mockedEditorApi.getPageSnapshot).toHaveBeenCalledTimes(1);
    });
});

describe('User inputs for Layout Properties', () => {
    it('Should calculate user Inputs and returns null when calculated value is null or same with selectedLayout property', async () => {
        const responseHeight = await mockedFontController.setHeight(mockId, 'test');
        const responseWidth = await mockedFontController.setWidth(mockId, '20/0');

        expect(responseHeight).toEqual(null);
        expect(responseWidth).toEqual(null);
    });
});

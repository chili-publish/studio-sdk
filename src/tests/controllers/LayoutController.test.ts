import { EditorAPI, Id } from '../../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
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
    setLayoutName: async () => getEditorResponseData(castToEditorResponse(null)),
    selectLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutWidth: async () => getEditorResponseData(castToEditorResponse(null)),
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
    jest.spyOn(mockedEditorApi, 'setLayoutName');
    jest.spyOn(mockedEditorApi, 'selectLayout');
    jest.spyOn(mockedEditorApi, 'duplicateLayout');
    jest.spyOn(mockedEditorApi, 'resetLayout');

    jest.spyOn(mockedEditorApi, 'setLayoutHeight');
    jest.spyOn(mockedEditorApi, 'setLayoutWidth');
    jest.spyOn(mockedEditorApi, 'resetLayoutHeight');
    jest.spyOn(mockedEditorApi, 'resetLayoutWidth');
    jest.spyOn(mockedEditorApi, 'getPageSnapshot');
    jest.spyOn(mockedEditorApi, 'renameLayout');

    mockId = mockSelectPage.layoutId;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Layout methods', () => {
    it('handles all layout methods', async () => {
        await mockedFontController.getLayouts();
        expect(mockedEditorApi.getLayouts).toHaveBeenCalledTimes(1);

        await mockedFontController.getLayoutById('1');
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledWith('1');

        await mockedFontController.getLayoutByName('layout');
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledWith('layout');

        await mockedFontController.getSelectedLayout();
        expect(mockedEditorApi.getSelectedLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.removeLayout('1');
        expect(mockedEditorApi.removeLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.addLayout('1');
        expect(mockedEditorApi.addLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.setLayoutName('1', 'TEST');
        expect(mockedEditorApi.renameLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.selectLayout('1');
        expect(mockedEditorApi.selectLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.duplicateLayout('1');
        expect(mockedEditorApi.duplicateLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.resetLayout('1');
        expect(mockedEditorApi.resetLayout).toHaveBeenCalledTimes(1);

        await mockedFontController.setLayoutHeight(mockId, '32');
        expect(mockedEditorApi.setLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedFontController.setLayoutHeight(mockId, 'null');
        expect(mockedEditorApi.setLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedFontController.setLayoutWidth(mockId, '34');
        expect(mockedEditorApi.setLayoutWidth).toHaveBeenCalledTimes(1);

        await mockedFontController.setLayoutWidth(mockId, 'null');
        expect(mockedEditorApi.setLayoutWidth).toHaveBeenCalledTimes(1);

        await mockedFontController.resetLayoutHeight('1');
        expect(mockedEditorApi.resetLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedFontController.resetLayoutWidth('1');
        expect(mockedEditorApi.resetLayoutWidth).toHaveBeenCalledTimes(1);

        await mockedFontController.getSelectedLayoutSnapshot();
        expect(mockedEditorApi.getPageSnapshot).toHaveBeenCalledTimes(1);
    });
});

describe('User inputs for Layout Properties', () => {
    it('Should calculate user Inputs and returns null when calculated value is null or same with selectedLayout property', async () => {
        const responseHeight = await mockedFontController.setLayoutHeight(mockId, 'fsadfafasf');
        const responseWidth = await mockedFontController.setLayoutWidth(mockId, '20/0');

        expect(responseHeight).toEqual(null);
        expect(responseWidth).toEqual(null);
    });
});

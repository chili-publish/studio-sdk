import { Id } from '../../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { mockSelectPage } from '../__mocks__/FrameProperties';
import mockChild from '../__mocks__/MockEditorAPI';

let mockedSDK: SDK;
let mockId: Id;
beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.layout, 'getLayouts');
    jest.spyOn(mockedSDK.layout, 'getLayoutById');
    jest.spyOn(mockedSDK.layout, 'getLayoutByName');
    jest.spyOn(mockedSDK.layout, 'getSelectedLayout');
    jest.spyOn(mockedSDK.layout, 'removeLayout');
    jest.spyOn(mockedSDK.layout, 'addLayout');
    jest.spyOn(mockedSDK.layout, 'setLayoutName');
    jest.spyOn(mockedSDK.layout, 'selectLayout');
    jest.spyOn(mockedSDK.layout, 'duplicateLayout');
    jest.spyOn(mockedSDK.layout, 'resetLayout');

    jest.spyOn(mockedSDK.layout, 'setLayoutHeight');
    jest.spyOn(mockedSDK.layout, 'setLayoutWidth');
    jest.spyOn(mockedSDK.layout, 'resetLayoutHeight');
    jest.spyOn(mockedSDK.layout, 'resetLayoutWidth');

    mockedSDK.editorAPI = mockChild;
    mockedSDK.layout = new LayoutController(mockChild);
    mockId = mockSelectPage.layoutId;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Layout methods', () => {
    it('handles all layout methods', async () => {
        await mockedSDK.layout.getLayouts();
        expect(mockedSDK.editorAPI.getLayouts).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.getLayoutById('1');
        expect(mockedSDK.editorAPI.getLayoutById).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getLayoutById).toHaveBeenCalledWith('1');

        await mockedSDK.layout.getLayoutByName('layout');
        expect(mockedSDK.editorAPI.getLayoutByName).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getLayoutByName).toHaveBeenCalledWith('layout');

        await mockedSDK.layout.getSelectedLayout();
        expect(mockedSDK.editorAPI.getSelectedLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.removeLayout('1');
        expect(mockedSDK.editorAPI.removeLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.addLayout('1');
        expect(mockedSDK.editorAPI.addLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutName('1', 'TEST');
        expect(mockedSDK.editorAPI.renameLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.selectLayout('1');
        expect(mockedSDK.editorAPI.selectLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.duplicateLayout('1');
        expect(mockedSDK.editorAPI.duplicateLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.resetLayout('1');
        expect(mockedSDK.editorAPI.resetLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutHeight(mockId, '32');
        expect(mockedSDK.editorAPI.setLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutHeight(mockId, 'null');
        expect(mockedSDK.editorAPI.setLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutWidth(mockId, '34');
        expect(mockedSDK.editorAPI.setLayoutWidth).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutWidth(mockId, 'null');
        expect(mockedSDK.editorAPI.setLayoutWidth).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.resetLayoutHeight('1');
        expect(mockedSDK.editorAPI.resetLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.resetLayoutWidth('1');
        expect(mockedSDK.editorAPI.resetLayoutWidth).toHaveBeenCalledTimes(1);
    });
});

describe('User inputs for Layout Properties', () => {
    it('Should calculate user Inputs and returns null when calculated value is null or same with selectedLayout property', async () => {
        const responseHeight = await mockedSDK.layout.setLayoutHeight(mockId, 'fsadfafasf');
        const responseWidth = await mockedSDK.layout.setLayoutWidth(mockId, '20/0');

        expect(responseHeight).toEqual(null);
        expect(responseWidth).toEqual(null);
    });
});

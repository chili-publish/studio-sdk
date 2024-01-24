import { EditorAPI, Id } from '../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectPage } from '../__mocks__/FrameProperties';
import { LayoutIntent, MeasurementUnit } from '../../types/LayoutTypes';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';

let mockedLayoutController: LayoutController;
let mockId: Id;

const mockedEditorApi: EditorAPI = {
    getLayouts: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutById: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutByName: async () => getEditorResponseData(castToEditorResponse(null)),
    getSelectedLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    removeLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    addLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    renameLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    selectLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutUnit: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutUnit: async () => getEditorResponseData(castToEditorResponse(null)),
    getPageSnapshot: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutIntent: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutIntent: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutFillColor: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutFillColor: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedLayoutController = new LayoutController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getLayouts');
    jest.spyOn(mockedEditorApi, 'getLayoutById');
    jest.spyOn(mockedEditorApi, 'getLayoutByName');
    jest.spyOn(mockedEditorApi, 'getSelectedLayout');
    jest.spyOn(mockedEditorApi, 'removeLayout');
    jest.spyOn(mockedEditorApi, 'addLayout');
    jest.spyOn(mockedEditorApi, 'renameLayout');
    jest.spyOn(mockedEditorApi, 'selectLayout');
    jest.spyOn(mockedEditorApi, 'duplicateLayout');
    jest.spyOn(mockedEditorApi, 'resetLayout');
    jest.spyOn(mockedEditorApi, 'setLayoutHeight');
    jest.spyOn(mockedEditorApi, 'setLayoutWidth');
    jest.spyOn(mockedEditorApi, 'setLayoutUnit');
    jest.spyOn(mockedEditorApi, 'resetLayoutHeight');
    jest.spyOn(mockedEditorApi, 'resetLayoutWidth');
    jest.spyOn(mockedEditorApi, 'resetLayoutUnit');
    jest.spyOn(mockedEditorApi, 'getPageSnapshot');
    jest.spyOn(mockedEditorApi, 'setLayoutIntent');
    jest.spyOn(mockedEditorApi, 'resetLayoutIntent');
    jest.spyOn(mockedEditorApi, 'setLayoutFillColor');
    jest.spyOn(mockedEditorApi, 'resetLayoutFillColor');

    mockId = mockSelectPage.layoutId;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LayoutController', () => {
    it('Should be possible to get all layouts', async () => {
        await mockedLayoutController.getAll();
        expect(mockedEditorApi.getLayouts).toHaveBeenCalledTimes(1);
    });

    it("Should be possible to get a layout by it's id", async () => {
        await mockedLayoutController.getById('1');
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutById).toHaveBeenCalledWith('1');
    });
    it("Should be possible to get a layout by it's name", async () => {
        await mockedLayoutController.getByName('layout');
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutByName).toHaveBeenCalledWith('layout');
    });
    it('Should be possible to get the selected layout', async () => {
        await mockedLayoutController.getSelected();
        expect(mockedEditorApi.getSelectedLayout).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to remove a layout', async () => {
        await mockedLayoutController.remove('1');
        expect(mockedEditorApi.removeLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to create a layout', async () => {
        await mockedLayoutController.create('1');
        expect(mockedEditorApi.addLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to set the layout name', async () => {
        await mockedLayoutController.rename('1', 'TEST');
        expect(mockedEditorApi.renameLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameLayout).toHaveBeenCalledWith('1', 'TEST');
    });
    it('Should be possible to select a layout', async () => {
        await mockedLayoutController.select('1');
        expect(mockedEditorApi.selectLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to duplicate a layout', async () => {
        await mockedLayoutController.duplicate('1');
        expect(mockedEditorApi.duplicateLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.duplicateLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to reset a layout', async () => {
        await mockedLayoutController.reset('1');
        expect(mockedEditorApi.resetLayout).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetLayout).toHaveBeenCalledWith('1');
    });
    it('Should be possible to set the layout height', async () => {
        await mockedLayoutController.setHeight(mockId, '32');
        expect(mockedEditorApi.setLayoutHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutHeight).toHaveBeenCalledWith('1', '32');
    });
    it('Should be possible to set the layout width', async () => {
        await mockedLayoutController.setWidth(mockId, '34');
        expect(mockedEditorApi.setLayoutWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutWidth).toHaveBeenCalledWith('1', '34');
    });
    it('Should be possible to set the layout unit', async () => {
        await mockedLayoutController.setUnit(mockId, MeasurementUnit.cm);
        expect(mockedEditorApi.setLayoutUnit).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutUnit).toHaveBeenCalledWith('1', MeasurementUnit.cm);
    });
    it('Should be possible to reset the layout height', async () => {
        await mockedLayoutController.resetHeight('1');
        expect(mockedEditorApi.resetLayoutHeight).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout width', async () => {
        await mockedLayoutController.resetWidth('1');
        expect(mockedEditorApi.resetLayoutWidth).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout unit', async () => {
        await mockedLayoutController.resetUnit('1');
        expect(mockedEditorApi.resetLayoutUnit).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to get the selected layout snapshot', async () => {
        await mockedLayoutController.getSelectedSnapshot();
        expect(mockedEditorApi.getPageSnapshot).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to set the layout intent', async () => {
        await mockedLayoutController.setLayoutIntent('1', LayoutIntent.print);
        expect(mockedEditorApi.setLayoutIntent).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout intent', async () => {
        await mockedLayoutController.resetLayoutIntent('1');
        expect(mockedEditorApi.resetLayoutIntent).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to set the layout fill color', async () => {
        await mockedLayoutController.setLayoutFillColor('1', {
            type: ColorUsageType.local,
            color: {
                r: 0,
                g: 0,
                b: 0,
                type: ColorType.rgb,
            },
            opacity: 1,
        });
        expect(mockedEditorApi.setLayoutFillColor).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout fill color', async () => {
        await mockedLayoutController.resetLayoutFillColor('1');
        expect(mockedEditorApi.resetLayoutFillColor).toHaveBeenCalledTimes(1);
    });
});

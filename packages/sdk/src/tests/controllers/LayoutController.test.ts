import { EditorAPI, Id } from '../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectPage } from '../__mocks__/FrameProperties';
import { BleedDeltaUpdate, LayoutIntent, MeasurementUnit, PositionEnum } from '../../types/LayoutTypes';

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
    updateLayoutBleed: async () => getEditorResponseData(castToEditorResponse(null)),
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
    jest.spyOn(mockedEditorApi, 'updateLayoutBleed');

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
        await mockedLayoutController.setIntent('1', LayoutIntent.print);
        expect(mockedEditorApi.setLayoutIntent).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to reset the layout intent', async () => {
        await mockedLayoutController.resetIntent('1');
        expect(mockedEditorApi.resetLayoutIntent).toHaveBeenCalledTimes(1);
    });
    describe('bleed', () => {
        it('Should be possible set the combined bleed value', async () => {
            await mockedLayoutController.setBleedValue('1', '5');
            const update: BleedDeltaUpdate = {
                left: '5',
                top: '5',
                right: '5',
                bottom: '5',
            };
            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(update));
        });

        it('Should be possible to set the individual bleed values', async () => {
            await mockedLayoutController.setBleedValue('1', '5', PositionEnum.left);
            await mockedLayoutController.setBleedValue('1', '5', PositionEnum.top);
            await mockedLayoutController.setBleedValue('1', '5', PositionEnum.right);
            await mockedLayoutController.setBleedValue('1', '5', PositionEnum.bottom);

            const left: BleedDeltaUpdate = {
                left: '5',
            };

            const top: BleedDeltaUpdate = {
                top: '5',
            };

            const right: BleedDeltaUpdate = {
                right: '5',
            };

            const bottom: BleedDeltaUpdate = {
                bottom: '5',
            };

            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(left));
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(top));
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(right));
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(bottom));
        });

        it('Should be possible to reset the layout bleed', async () => {
            await mockedLayoutController.resetBleedValues('1');
            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', null);
        });
    });
});

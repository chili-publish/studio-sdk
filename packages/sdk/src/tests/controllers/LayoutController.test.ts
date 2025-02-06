import { EditorAPI, Id } from '../../types/CommonTypes';
import { LayoutController } from '../../controllers/LayoutController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectPage } from '../__mocks__/FrameProperties';
import { BleedDeltaUpdate, LayoutIntent, LayoutPreset, MeasurementUnit, PositionEnum } from '../../types/LayoutTypes';
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
    addLayouts: async () => getEditorResponseData(castToEditorResponse(null)),
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
    setLayoutFillColorEnabled: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutFillColor: async () => getEditorResponseData(castToEditorResponse(null)),
    updateLayoutBleed: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutPrivateData: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutPrivateData: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutDisplayName: async () => getEditorResponseData(castToEditorResponse(null)),
    getLayoutDisplayName: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayoutDisplayName: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutAvailableForUser: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayoutSelectedByUser: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedLayoutController = new LayoutController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getLayouts');
    jest.spyOn(mockedEditorApi, 'getLayoutById');
    jest.spyOn(mockedEditorApi, 'getLayoutByName');
    jest.spyOn(mockedEditorApi, 'getSelectedLayout');
    jest.spyOn(mockedEditorApi, 'removeLayout');
    jest.spyOn(mockedEditorApi, 'addLayout');
    jest.spyOn(mockedEditorApi, 'addLayouts');
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
    jest.spyOn(mockedEditorApi, 'setLayoutFillColorEnabled');
    jest.spyOn(mockedEditorApi, 'updateLayoutBleed');
    jest.spyOn(mockedEditorApi, 'setLayoutPrivateData');
    jest.spyOn(mockedEditorApi, 'getLayoutPrivateData');
    jest.spyOn(mockedEditorApi, 'setLayoutDisplayName');
    jest.spyOn(mockedEditorApi, 'getLayoutDisplayName');
    jest.spyOn(mockedEditorApi, 'resetLayoutDisplayName');
    jest.spyOn(mockedEditorApi, 'setLayoutAvailableForUser');
    jest.spyOn(mockedEditorApi, 'setLayoutSelectedByUser');

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
    it('Should be possible to create a layout with a preset', async () => {
        const preset: LayoutPreset = {
            name: 'name',
            intent: LayoutIntent.print,
            unit: MeasurementUnit.mm,
            width: '100 mm',
            height: '200 mm',
            duration: 5000,
            bleed: {
                left: '3 mm',
                right: '2 mm',
                bottom: '1 mm',
                top: '0 mm',
                areBleedValuesCombined: false,
            },
        };

        await mockedLayoutController.create('1', [preset]);

        expect(mockedEditorApi.addLayouts).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addLayouts).toHaveBeenCalledWith(
            '1',
            '[{"name":"name","intent":"print","unit":"mm","width":"100 mm","height":"200 mm","duration":5000,"bleed":{"left":"3 mm","right":"2 mm","bottom":"1 mm","top":"0 mm","areBleedValuesCombined":false}}]',
        );
    });
    it('Should be possible to create a layout without a preset', async () => {
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
    it('Should be possible to set the layout fill color', async () => {
        await mockedLayoutController.setFillColor('1', {
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
        await mockedLayoutController.resetFillColor('1');
        expect(mockedEditorApi.resetLayoutFillColor).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to set the layout fill color to disabled', async () => {
        await mockedLayoutController.setFillColorEnabled('1', false);
        expect(mockedEditorApi.setLayoutFillColorEnabled).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to set the layout fill color to enabled', async () => {
        await mockedLayoutController.setFillColorEnabled('1', true);
        expect(mockedEditorApi.setLayoutFillColorEnabled).toHaveBeenCalledTimes(1);
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
            await mockedLayoutController.setBleedValue('1', '2', PositionEnum.left);
            await mockedLayoutController.setBleedValue('1', '3', PositionEnum.top);
            await mockedLayoutController.setBleedValue('1', '4', PositionEnum.right);
            await mockedLayoutController.setBleedValue('1', '5', PositionEnum.bottom);

            const left: BleedDeltaUpdate = {
                left: '2',
            };

            const top: BleedDeltaUpdate = {
                top: '3',
            };

            const right: BleedDeltaUpdate = {
                right: '4',
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

        it('Should be possible set the combined state of the bleed values', async () => {
            await mockedLayoutController.setAreBleedValuesCombined('1', true);
            const update: BleedDeltaUpdate = {
                areBleedValuesCombined: true,
            };
            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(update));
        });

        it('Should be possible set the non-combined state of the bleed values', async () => {
            await mockedLayoutController.setAreBleedValuesCombined('1', false);
            const update: BleedDeltaUpdate = {
                areBleedValuesCombined: false,
            };
            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', JSON.stringify(update));
        });

        it('Should be possible to reset the layout bleed', async () => {
            await mockedLayoutController.resetBleedValues('1');
            expect(mockedEditorApi.updateLayoutBleed).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateLayoutBleed).toBeCalledWith('1', null);
        });
    });

    it('should be possible to set private data', async () => {
        await mockedLayoutController.setPrivateData('1', { test: 'test' });
        expect(mockedEditorApi.setLayoutPrivateData).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutPrivateData).toHaveBeenCalledWith('1', '{"test":"test"}');
    });
    it('should be possible to get private data', async () => {
        await mockedLayoutController.getPrivateData('1');
        expect(mockedEditorApi.getLayoutPrivateData).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutPrivateData).toHaveBeenCalledWith('1');
    });

    it('Should be possible to set the display name', async () => {
        await mockedLayoutController.setDisplayName('1', 'new-name');
        expect(mockedEditorApi.setLayoutDisplayName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutDisplayName).toHaveBeenCalledWith('1', 'new-name');
    });

    it('Should be possible to reset the display name', async () => {
        await mockedLayoutController.resetDisplayName('1');
        expect(mockedEditorApi.setLayoutDisplayName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutDisplayName).toHaveBeenCalledWith('1', null);
    });

    it('Should be possible to get the display name', async () => {
        await mockedLayoutController.getDisplayName('1');
        expect(mockedEditorApi.getLayoutDisplayName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayoutDisplayName).toHaveBeenCalledWith('1');
    });

    it('Should be possible to set layout availability', async () => {
        await mockedLayoutController.setAvailableForUser('1', false);
        expect(mockedEditorApi.setLayoutAvailableForUser).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutAvailableForUser).toHaveBeenCalledWith('1', false);
    });

    it('Should be possible to set user selected layout', async () => {
        await mockedLayoutController.setSelectedByUser('1', false);
        expect(mockedEditorApi.setLayoutSelectedByUser).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayoutSelectedByUser).toHaveBeenCalledWith('1', false);
    });
});

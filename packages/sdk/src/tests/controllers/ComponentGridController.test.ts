import { EditorAPI, Id } from '../../types/CommonTypes';
import {
    ComponentGridLayoutAlgorithm,
    ComponentGridSettings,
    ComponentGridSettingsDeltaUpdate,
} from '../../types/ComponentGridTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ComponentGridController } from '../../controllers/ComponentGridController';

let id: Id;

let mockedComponentGridController: ComponentGridController;

const mockedEditorApi: EditorAPI = {
    updateComponentGridProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridMapping: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridSettings: async () => getEditorResponseData(castToEditorResponse(null)),
    resetComponentGridProperties: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedComponentGridController = new ComponentGridController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'updateComponentGridProperties');
    jest.spyOn(mockedEditorApi, 'setComponentGridMapping');
    jest.spyOn(mockedEditorApi, 'setComponentGridSettings');
    jest.spyOn(mockedEditorApi, 'resetComponentGridProperties');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('ComponentGridController', () => {
    describe('updateComponentGridProperties', () => {
        it('Should be possible to update component grid properties', async () => {
            const deltaUpdate: ComponentGridSettingsDeltaUpdate = {
                numberOfColumns: { value: 4 },
                numberOfRows: { value: 3 },
            };
            await mockedComponentGridController.updateComponentGridProperties(id, deltaUpdate);
            expect(mockedEditorApi.updateComponentGridProperties).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateComponentGridProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify(deltaUpdate),
            );
        });
    });

    describe('setComponentGridMapping', () => {
        it('Should be possible to set component grid mapping', async () => {
            await mockedComponentGridController.setComponentGridMapping(id, 'connector-id', 'component-id');
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledWith(
                id,
                'connector-id',
                'component-id',
            );
        });

        it('Should be possible to unset component grid mapping', async () => {
            await mockedComponentGridController.setComponentGridMapping(id, null, null);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledWith(id, null, null);
        });
    });

    describe('setComponentGridSettings', () => {
        it('Should be possible to set fixed component grid settings', async () => {
            const settings: ComponentGridSettings = {
                type: ComponentGridLayoutAlgorithm.fixed,
                numberOfColumns: 3,
                numberOfRows: 2,
                componentConnectorId: 'connector-id',
                componentId: 'component-id',
                horizontalSpacing: '10',
                verticalSpacing: '5',
            };
            await mockedComponentGridController.setComponentGridSettings(id, settings);
            expect(mockedEditorApi.setComponentGridSettings).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridSettings).toHaveBeenCalledWith(
                id,
                JSON.stringify(settings),
            );
        });

        it('Should be possible to set slotting component grid settings', async () => {
            const settings: ComponentGridSettings = {
                type: ComponentGridLayoutAlgorithm.slotting,
                numberOfColumns: 4,
                numberOfRows: 3,
                allowReordering: true,
                componentConnectorId: null,
                componentId: null,
            };
            await mockedComponentGridController.setComponentGridSettings(id, settings);
            expect(mockedEditorApi.setComponentGridSettings).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridSettings).toHaveBeenCalledWith(
                id,
                JSON.stringify(settings),
            );
        });
    });

    describe('resetComponentGridProperties', () => {
        it('Should be possible to reset component grid properties', async () => {
            await mockedComponentGridController.resetComponentGridProperties(id);
            expect(mockedEditorApi.resetComponentGridProperties).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.resetComponentGridProperties).toHaveBeenCalledWith(id);
        });
    });
});

import { EditorAPI, Id } from '../../types/CommonTypes';
import {
    ComponentGridSettingsDeltaUpdate,
} from '../../types/ComponentGridTypes';
import { ComponentFitEnum, ComponentSourceTypeEnum } from '../../types/FrameTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ComponentGridController } from '../../controllers/ComponentGridController';

let id: Id;

let mockedComponentGridController: ComponentGridController;

const mockedEditorApi: EditorAPI = {
    updateComponentGridSettings: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridMapping: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridDataSourceVariable: async () => getEditorResponseData(castToEditorResponse(null)),
    resetComponentGridSettings: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridComponentSource: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentGridResizeMode: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedComponentGridController = new ComponentGridController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'updateComponentGridSettings');
    jest.spyOn(mockedEditorApi, 'setComponentGridMapping');
    jest.spyOn(mockedEditorApi, 'resetComponentGridSettings');
    jest.spyOn(mockedEditorApi, 'setComponentGridComponentSource');
    jest.spyOn(mockedEditorApi, 'setComponentGridDataSourceVariable');
    jest.spyOn(mockedEditorApi, 'setComponentGridResizeMode');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('ComponentGridController', () => {
    describe('updateSettings', () => {
        it('Should be possible to update component grid settings', async () => {
            const deltaUpdate: ComponentGridSettingsDeltaUpdate = {
                numberOfColumns: { value: 4 },
                numberOfRows: { value: 3 },
            };
            await mockedComponentGridController.updateSettings(id, deltaUpdate);
            expect(mockedEditorApi.updateComponentGridSettings).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateComponentGridSettings).toHaveBeenCalledWith(id, JSON.stringify(deltaUpdate));
        });
    });

    describe('setMapping', () => {
        it('Should be possible to set component grid mapping', async () => {
            await mockedComponentGridController.setMapping(id, 'component-id', 'target-variable-id', 'source-variable-id', 'source-field');
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledWith(
                id,
                'component-id',
                'target-variable-id',
                'source-variable-id',
                'source-field',
            );
        });

        it('Should be possible to unset component grid mapping', async () => {
            await mockedComponentGridController.setMapping(id, 'component-id', 'target-variable-id', null, null);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridMapping).toHaveBeenCalledWith(
                id,
                'component-id',
                'target-variable-id',
                null,
                null,
            );
        });
    });

    describe('resetSettings', () => {
        it('Should be possible to reset component grid settings', async () => {
            await mockedComponentGridController.resetSettings(id);
            expect(mockedEditorApi.resetComponentGridSettings).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.resetComponentGridSettings).toHaveBeenCalledWith(id);
        });
    });

    describe('setComponentSource', () => {
        it('Should be possible to set the component source', async () => {
            const src = {
                type: ComponentSourceTypeEnum.connector,
                id: 'connector-id',
                assetId: 'asset-id',
            } as const;
            await mockedComponentGridController.setComponentSource(id, src);
            expect(mockedEditorApi.setComponentGridComponentSource).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridComponentSource).toHaveBeenCalledWith(id, JSON.stringify(src));
        });
    });

    describe('setDataSourceVariable', () => {
        it('Should be possible to set the data source variable', async () => {
            const dataSourceVariableId = 'data-source-variable-id';
            await mockedComponentGridController.setDataSourceVariable(id, dataSourceVariableId);
            expect(mockedEditorApi.setComponentGridDataSourceVariable).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridDataSourceVariable).toHaveBeenCalledWith(id, dataSourceVariableId);
        });
    });

    describe('setResizeMode', () => {
        it('Should be possible to set the resize mode', async () => {
            await mockedComponentGridController.setResizeMode(id, ComponentFitEnum.resize);
            expect(mockedEditorApi.setComponentGridResizeMode).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentGridResizeMode).toHaveBeenCalledWith(id, ComponentFitEnum.resize);
        });
    });
});

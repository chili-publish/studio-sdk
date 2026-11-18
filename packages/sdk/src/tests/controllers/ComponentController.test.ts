import { EditorAPI, Id } from '../../types/CommonTypes';
import { ComponentFitEnum, ComponentVersion, ComponentVersionTypeEnum } from '../../types/FrameTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ComponentController } from '../../controllers/ComponentController';

let id: Id;

let mockedComponentController: ComponentController;

const mockedEditorApi: EditorAPI = {
    linkComponentVariable: async () => getEditorResponseData(castToEditorResponse(null)),
    getComponentVariables: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentLayoutFit: async () => getEditorResponseData(castToEditorResponse(null)),
    resetComponentLayoutFit: async () => getEditorResponseData(castToEditorResponse(null)),
    setComponentVersion: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedComponentController = new ComponentController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'linkComponentVariable');
    jest.spyOn(mockedEditorApi, 'getComponentVariables');
    jest.spyOn(mockedEditorApi, 'setComponentLayoutFit');
    jest.spyOn(mockedEditorApi, 'resetComponentLayoutFit');
    jest.spyOn(mockedEditorApi, 'setComponentVersion');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('ComponentController', () => {
    describe('linkComponentVariable', () => {
        it('Should be possible to link variable', async () => {
            await mockedComponentController.linkVariable(id, 'target-variable-id', 'source-variable-id');
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledWith(
                id,
                'target-variable-id',
                'source-variable-id',
                null,
            );
        });
        it('Should be possible to unlink variable', async () => {
            await mockedComponentController.linkVariable(id, 'target-variable-id');
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledWith(
                id,
                'target-variable-id',
                undefined,
                null,
            );
        });
    });
    describe('getComponentVariables', () => {
        it('Should be possible to get component variables', async () => {
            await mockedComponentController.getComponentVariables(id);
            expect(mockedEditorApi.getComponentVariables).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.getComponentVariables).toHaveBeenCalledWith(id);
        });
    });
    describe('setFitMode', () => {
        it('Should be possible to set the fit mode of a component frame', async () => {
            await mockedComponentController.setFitMode(id, ComponentFitEnum.resize);
            expect(mockedEditorApi.setComponentLayoutFit).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentLayoutFit).toHaveBeenCalledWith(id, ComponentFitEnum.resize);
        });
    });
    describe('resetFitMode', () => {
        it('Should be possible to reset the fit mode of a component frame', async () => {
            await mockedComponentController.resetFitMode(id);
            expect(mockedEditorApi.resetComponentLayoutFit).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.resetComponentLayoutFit).toHaveBeenCalledWith(id);
        });
    });
    describe('setVersion', () => {
        const versions: [string, ComponentVersion, string][] = [
            ['live', { type: ComponentVersionTypeEnum.live }, '{"type":"live"}'],
            ['latest', { type: ComponentVersionTypeEnum.latestVersion }, '{"type":"latestVersion"}'],
            [
                'specific',
                { type: ComponentVersionTypeEnum.versioned, id: 'version-1' },
                '{"type":"versioned","id":"version-1"}',
            ],
        ];

        it.each(versions)('Should be possible to set the %s version of a component frame', async (_, version, json) => {
            await mockedComponentController.setVersion(id, version);
            expect(mockedEditorApi.setComponentVersion).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setComponentVersion).toHaveBeenCalledWith(id, json);
        });
    });
});

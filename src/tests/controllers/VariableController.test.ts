import { VariableController } from '../../controllers/VariableController';
import { ImageVariableSourceType, MediaConnectorImageVariableSource, UrlImageVariableSource, VariableType } from '../../types/VariableTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VariableController', () => {
    let mockedVariableController: VariableController;

    const mockEditorApi: EditorAPI = {
        getVariableById: async () => getEditorResponseData(castToEditorResponse(null)),
        getVariableByName: async () => getEditorResponseData(castToEditorResponse(null)),
        getVariables: async () => getEditorResponseData(castToEditorResponse(null)),
        addVariable: async () => getEditorResponseData(castToEditorResponse(null)),
        removeVariables: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableLabel: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableType: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableValue: async () => getEditorResponseData(castToEditorResponse(null)),
        groupVariables: async () => getEditorResponseData(castToEditorResponse(null)),
        duplicateVariable: async () => getEditorResponseData(castToEditorResponse(null)),
        moveVariable: async () => getEditorResponseData(castToEditorResponse(null)),
        moveVariables: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableIsHidden: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableIsRequired: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableIsReadonly: async () => getEditorResponseData(castToEditorResponse(null)),
        ungroupVariable: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableName: async () => getEditorResponseData(castToEditorResponse(null)),
        setVariableSource: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedVariableController = new VariableController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'getVariableById');
        jest.spyOn(mockEditorApi, 'getVariableByName');
        jest.spyOn(mockEditorApi, 'getVariables');
        jest.spyOn(mockEditorApi, 'addVariable');
        jest.spyOn(mockEditorApi, 'removeVariables');
        jest.spyOn(mockEditorApi, 'setVariableLabel');
        jest.spyOn(mockEditorApi, 'setVariableType');
        jest.spyOn(mockEditorApi, 'setVariableValue');
        jest.spyOn(mockEditorApi, 'groupVariables');
        jest.spyOn(mockEditorApi, 'duplicateVariable');
        jest.spyOn(mockEditorApi, 'moveVariable');
        jest.spyOn(mockEditorApi, 'moveVariables');
        jest.spyOn(mockEditorApi, 'setVariableIsHidden');
        jest.spyOn(mockEditorApi, 'setVariableIsRequired');
        jest.spyOn(mockEditorApi, 'setVariableIsReadonly');
        jest.spyOn(mockEditorApi, 'ungroupVariable');
        jest.spyOn(mockEditorApi, 'setVariableName');
        jest.spyOn(mockEditorApi, 'setVariableSource');
    });

    it('get variable by id', async () => {
        await mockedVariableController.getById('2');
        expect(mockEditorApi.getVariableById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getVariableById).toHaveBeenCalledWith('2');
    });

    it('get variable by name', async () => {
        await mockedVariableController.getByName('name');
        expect(mockEditorApi.getVariableByName).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getVariableByName).toHaveBeenCalledWith('name');
    });

    it('get variable list', async () => {
        await mockedVariableController.getAll();
        expect(mockEditorApi.getVariables).toHaveBeenCalledTimes(1);
    });

    it('create a new variable', async () => {
        await mockedVariableController.create('2', VariableType.shortText);
        expect(mockEditorApi.addVariable).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.addVariable).toHaveBeenCalledWith('2', VariableType.shortText);
    });

    it('remove a variable', async () => {
        await mockedVariableController.remove(['2']);
        expect(mockEditorApi.removeVariables).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeVariables).toHaveBeenCalledWith(['2']);
    });

    it('set variable name', async () => {
        await mockedVariableController.rename('3', 'newName');
        expect(mockEditorApi.setVariableName).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableName).toHaveBeenCalledWith('3', 'newName');
    });

    it('set variable label', async () => {
        await mockedVariableController.setLabel('3', 'newLabel');
        expect(mockEditorApi.setVariableLabel).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableLabel).toHaveBeenCalledWith('3', 'newLabel');
    });

    it('set variable type', async () => {
        await mockedVariableController.setType('3', VariableType.group);
        expect(mockEditorApi.setVariableType).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableType).toHaveBeenCalledWith('3', VariableType.group);
    });

    it('set variable value', async () => {
        await mockedVariableController.setValue('3', 'value');
        expect(mockEditorApi.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableValue).toHaveBeenCalledWith('3', 'value');
    });

    it('group variables', async () => {
        await mockedVariableController.groupVariables('3', ['2', '5']);
        expect(mockEditorApi.groupVariables).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.groupVariables).toHaveBeenCalledWith('3', ['2', '5']);
    });

    it('duplicate variable', async () => {
        await mockedVariableController.duplicate('3');
        expect(mockEditorApi.duplicateVariable).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateVariable).toHaveBeenCalledWith('3');
    });

    it('moveVariable variable', async () => {
        await mockedVariableController.move(0, '1', '6');
        expect(mockEditorApi.moveVariable).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveVariable).toHaveBeenCalledWith('1', '6', 0);
    });

    it('moveVariables', async () => {
        await mockedVariableController.moveVariables(0, ['1'], '6');
        expect(mockEditorApi.moveVariables).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveVariables).toHaveBeenCalledWith(['1'], '6', 0);
    });

    it('set isHidden', async () => {
        await mockedVariableController.setIsHidden('1', false);
        expect(mockEditorApi.setVariableIsHidden).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableIsHidden).toHaveBeenCalledWith('1', false);
    });

    it('set isRequired', async () => {
        await mockedVariableController.setIsRequired('1', true);
        expect(mockEditorApi.setVariableIsRequired).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableIsRequired).toHaveBeenCalledWith('1', true);
    });

    it('set isReadonly', async () => {
        await mockedVariableController.setIsReadonly('1', true);
        expect(mockEditorApi.setVariableIsReadonly).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableIsReadonly).toHaveBeenCalledWith('1', true);
    });

    it('ungroup variables', async () => {
        await mockedVariableController.ungroupVariables('1');
        expect(mockEditorApi.ungroupVariable).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.ungroupVariable).toHaveBeenCalledWith('1');
    });

    it('set variable url source', async () => {
        const varId = '1';
        const src: UrlImageVariableSource = {
            url: 'mocked url',
            type: ImageVariableSourceType.url,
        };

        await mockedVariableController.setSource(varId, src);

        expect(mockEditorApi.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableValue).toHaveBeenCalledWith(varId, null);
    });

    it('set variable media connector source', async () => {
        const varId = '1';
        const src: MediaConnectorImageVariableSource = {
            assetId: 'asset id',
            connectorId: 'connector id',
            type: ImageVariableSourceType.mediaConnector,
        };

        await mockedVariableController.setSource(varId, src);

        expect(mockEditorApi.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableValue).toHaveBeenCalledWith(varId, src.assetId);
    });

    it('remove variable source', async () => {
        const varId = '1';

        await mockedVariableController.removeSource(varId);

        expect(mockEditorApi.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setVariableValue).toHaveBeenCalledWith(varId, null);
    });
});

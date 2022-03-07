import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK } from '../../index';
import { VariableController } from '../../controllers/VariableController';
import { VariableType } from '../../../types/VariableTypes';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.variable, 'addVariable');
    jest.spyOn(mockedSDK.variable, 'removeVariable');

    mockedSDK.editorAPI = mockChild;
    mockedSDK.variable = new VariableController(mockChild);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Variable controller', () => {
    it('get variable by id', async () => {
        await mockedSDK.variable.getVariable('2');
        expect(mockedSDK.editorAPI.getVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getVariable).toHaveBeenCalledWith('2');
    });

    it('get variable list', async () => {
        await mockedSDK.variable.getVariableList();
        expect(mockedSDK.editorAPI.getVariableList).toHaveBeenCalledTimes(1);
    });

    it('add a new variable', async () => {
        await mockedSDK.variable.addVariable('2', VariableType.shorttext);
        expect(mockedSDK.editorAPI.addVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.addVariable).toHaveBeenCalledWith('2', VariableType.shorttext);
    });

    it('remove a variable', async () => {
        await mockedSDK.variable.removeVariable('2');
        expect(mockedSDK.editorAPI.removeVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.removeVariable).toHaveBeenCalledWith('2');
    });

    it('set variable name', async () => {
        await mockedSDK.variable.setVariableName('3', 'newName');
        expect(mockedSDK.editorAPI.setVariableName).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableName).toHaveBeenCalledWith('3', 'newName');
    });

    it('set variable label', async () => {
        await mockedSDK.variable.setVariableLabel('3', 'newLabel');
        expect(mockedSDK.editorAPI.setVariableLabel).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableLabel).toHaveBeenCalledWith('3', 'newLabel');
    });

    it('set variable type', async () => {
        await mockedSDK.variable.setVariableType('3', VariableType.group);
        expect(mockedSDK.editorAPI.setVariableType).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableType).toHaveBeenCalledWith('3', VariableType.group);
    });

    it('set variable default value', async () => {
        await mockedSDK.variable.setDefaultVariableValue('3', 'value');
        expect(mockedSDK.editorAPI.setDefaultVariableValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setDefaultVariableValue).toHaveBeenCalledWith('3', 'value');
    });

    it('set variable value', async () => {
        await mockedSDK.variable.setVariableValue('3', 'value');
        expect(mockedSDK.editorAPI.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableValue).toHaveBeenCalledWith('3', 'value');
    });

    it('group variables', async () => {
        await mockedSDK.variable.groupVariables('3', ['2', '5']);
        expect(mockedSDK.editorAPI.groupVariables).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.groupVariables).toHaveBeenCalledWith('3', ['2', '5']);
    });

    it('duplicate variable', async () => {
        await mockedSDK.variable.duplicateVariable('3');
        expect(mockedSDK.editorAPI.duplicateVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.duplicateVariable).toHaveBeenCalledWith('3');
    });

    it('moveVariable variable', async () => {
        await mockedSDK.variable.moveVariable('1', '6', 0);
        expect(mockedSDK.editorAPI.moveVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.moveVariable).toHaveBeenCalledWith('1', '6', 0);
    });

    it('set isHidden', async () => {
        await mockedSDK.variable.setVariableIsHidden('1', false);
        expect(mockedSDK.editorAPI.setVariableIsHidden).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableIsHidden).toHaveBeenCalledWith('1', false);
    });

    it('set isRequired', async () => {
        await mockedSDK.variable.setVariableIsRequired('1', true);
        expect(mockedSDK.editorAPI.setVariableIsRequired).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableIsRequired).toHaveBeenCalledWith('1', true);
    });

    it('set isReadonly', async () => {
        await mockedSDK.variable.setVariableIsReadonly('1', true);
        expect(mockedSDK.editorAPI.setVariableIsReadonly).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVariableIsReadonly).toHaveBeenCalledWith('1', true);
    });

    it('ungroup variables', async () => {
        await mockedSDK.variable.ungroupVariable('1');
        expect(mockedSDK.editorAPI.ungroupVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.ungroupVariable).toHaveBeenCalledWith('1');
    });
});

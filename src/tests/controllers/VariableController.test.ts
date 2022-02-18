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

    mockedSDK.children = mockChild;
    mockedSDK.variable = new VariableController(mockChild);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Variable controller', () => {
    it('get variable by id', async () => {
        await mockedSDK.variable.getVariable('2');
        expect(mockedSDK.children.getVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.getVariable).toHaveBeenCalledWith('2');
    });

    it('get variable list', async () => {
        await mockedSDK.variable.getVariableList();
        expect(mockedSDK.children.getVariableList).toHaveBeenCalledTimes(1);
    });

    it('add a new variable', async () => {
        await mockedSDK.variable.addVariable('2', VariableType.shorttext);
        expect(mockedSDK.children.addVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.addVariable).toHaveBeenCalledWith('2', VariableType.shorttext);
    });

    it('remove a variable', async () => {
        await mockedSDK.variable.removeVariable('2');
        expect(mockedSDK.children.removeVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.removeVariable).toHaveBeenCalledWith('2');
    });

    it('set variable name', async () => {
        await mockedSDK.variable.setVariableName('3', 'newName');
        expect(mockedSDK.children.setVariableName).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableName).toHaveBeenCalledWith('3', 'newName');
    });

    it('set variable label', async () => {
        await mockedSDK.variable.setVariableLabel('3', 'newLabel');
        expect(mockedSDK.children.setVariableLabel).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableLabel).toHaveBeenCalledWith('3', 'newLabel');
    });

    it('set variable type', async () => {
        await mockedSDK.variable.setVariableType('3', VariableType.group);
        expect(mockedSDK.children.setVariableType).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableType).toHaveBeenCalledWith('3', VariableType.group);
    });

    it('set variable default value', async () => {
        await mockedSDK.variable.setDefaultVariableValue('3', 'value');
        expect(mockedSDK.children.setDefaultVariableValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setDefaultVariableValue).toHaveBeenCalledWith('3', 'value');
    });

    it('set variable value', async () => {
        await mockedSDK.variable.setVariableValue('3', 'value');
        expect(mockedSDK.children.setVariableValue).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableValue).toHaveBeenCalledWith('3', 'value');
    });

    it('group variables', async () => {
        await mockedSDK.variable.groupVariables('3', ['2', '5']);
        expect(mockedSDK.children.groupVariables).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.groupVariables).toHaveBeenCalledWith('3', ['2', '5']);
    });

    it('duplicate variable', async () => {
        await mockedSDK.variable.duplicateVariable('3');
        expect(mockedSDK.children.duplicateVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.duplicateVariable).toHaveBeenCalledWith('3');
    });

    it('moveVariable variable', async () => {
        await mockedSDK.variable.moveVariable('1', '6', 0);
        expect(mockedSDK.children.moveVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.moveVariable).toHaveBeenCalledWith('1', '6', 0);
    });

    it('set isHidden', async () => {
        await mockedSDK.variable.setVariableIsHidden('1', false);
        expect(mockedSDK.children.setVariableIsHidden).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableIsHidden).toHaveBeenCalledWith('1', false);
    });

    it('set isRequired', async () => {
        await mockedSDK.variable.setVariableIsRequired('1', true);
        expect(mockedSDK.children.setVariableIsRequired).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableIsRequired).toHaveBeenCalledWith('1', true);
    });

    it('set isReadonly', async () => {
        await mockedSDK.variable.setVariableIsReadonly('1', true);
        expect(mockedSDK.children.setVariableIsReadonly).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.setVariableIsReadonly).toHaveBeenCalledWith('1', true);
    });

    it('ungroup variables', async () => {
        await mockedSDK.variable.ungroupVariable('1');
        expect(mockedSDK.children.ungroupVariable).toHaveBeenCalledTimes(1);
        expect(mockedSDK.children.ungroupVariable).toHaveBeenCalledWith('1');
    });
});

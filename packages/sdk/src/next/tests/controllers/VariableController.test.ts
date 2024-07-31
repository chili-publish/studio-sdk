import { VariableController } from '../../controllers/VariableController';
import { ListVariableItem, Variable, VariableType } from '../../../types/VariableTypes';
import type { ListVariable } from '../../../next/types/VariableTypes';
import { EditorAPI } from '../../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';

import {
    ConnectorGrafxRegistration,
    ConnectorLocalRegistration,
    ConnectorRegistrationSource,
    ConnectorUrlRegistration,
} from '../../types/ConnectorTypes';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Next.VariableController', () => {
    let mockedVariableController: VariableController;

    const variableId = 'variableId';

    const listVar: Variable & { items: ListVariableItem[]; selected?: ListVariableItem } = {
        id: variableId,
        type: VariableType.list,
        name: '',
        label: '',
        isVisible: true,
        isReadonly: false,
        isRequired: false,
        occurrences: 0,
        selected: { value: 'abc', displayValue: 'A-B-C' },
        items: [{ value: 'abc', displayValue: 'A-B-C' }],
    };

    const variables = [listVar];

    const mockEditorApi: EditorAPI = {
        getVariableById: async () => getEditorResponseData(castToEditorResponse(listVar)),
        getVariableByName: async () => getEditorResponseData(castToEditorResponse(listVar)),
        getVariables: async () => getEditorResponseData(castToEditorResponse(variables)),
        setListVariableItems: async () => getEditorResponseData(castToEditorResponse(null)),
        setImageVariableConnector: async () => getEditorResponseData(castToEditorResponse('newConnectorId')),
    };

    beforeEach(() => {
        mockedVariableController = new VariableController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'getVariableById');
        jest.spyOn(mockEditorApi, 'getVariableByName');
        jest.spyOn(mockEditorApi, 'getVariables');
        jest.spyOn(mockEditorApi, 'setListVariableItems');
        jest.spyOn(mockEditorApi, 'setImageVariableConnector');
    });

    it('get variable by id', async () => {
        const result = await mockedVariableController.getById('2');
        expect(mockEditorApi.getVariableById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getVariableById).toHaveBeenCalledWith('2');
        expect((result.parsedData as ListVariable).items).toStrictEqual([{ value: 'abc', displayValue: 'A-B-C' }]);
    });

    it('get variable by name', async () => {
        const result = await mockedVariableController.getByName('name');
        expect(mockEditorApi.getVariableByName).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getVariableByName).toHaveBeenCalledWith('name');
        // Backwards compatibility layer maps the new `VariableListItem` into a string.
        expect((result.parsedData as ListVariable).items).toStrictEqual([{ value: 'abc', displayValue: 'A-B-C' }]);
        expect((result.parsedData as ListVariable).selected).toStrictEqual({ value: 'abc', displayValue: 'A-B-C' });
    });

    it('get variable list', async () => {
        const result = await mockedVariableController.getAll();
        expect(mockEditorApi.getVariables).toHaveBeenCalledTimes(1);
        // Backwards compatibility layer maps the new `VariableListItem` into a string.
        expect((result.parsedData as ListVariable[])[0].items).toStrictEqual([{ value: 'abc', displayValue: 'A-B-C' }]);
        expect((result.parsedData as ListVariable[])[0].selected).toStrictEqual({
            value: 'abc',
            displayValue: 'A-B-C',
        });
    });

    it('sets the variable list items', async () => {
        await mockedVariableController.setListVariable('listId', [{ value: 'a' }, { value: 'b' }, { value: 'c' }]);
        expect(mockEditorApi.setListVariableItems).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setListVariableItems).toHaveBeenCalledWith(
            'listId',
            (<ListVariableItem[]>[{ value: 'a' }, { value: 'b' }, { value: 'c' }]).map((item) => JSON.stringify(item)),
        );

        await mockedVariableController.setListVariable('listId', [
            { value: 'a', displayValue: 'dis a' },
            { value: 'b', displayValue: 'dis b' },
            { value: 'c', displayValue: 'dis c' },
        ]);
        expect(mockEditorApi.setListVariableItems).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.setListVariableItems).toHaveBeenCalledWith(
            'listId',
            (<ListVariableItem[]>[
                { value: 'a', displayValue: 'dis a' },
                { value: 'b', displayValue: 'dis b' },
                { value: 'c', displayValue: 'dis c' },
            ]).map((item) => JSON.stringify(item)),
        );
    });

    it('set image variable url connector', async () => {
        const registration: ConnectorUrlRegistration = {
            url: 'test://test.test',
            source: ConnectorRegistrationSource.url,
        };

        const response = await mockedVariableController.setImageVariableConnector(variableId, registration);

        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledWith(variableId, JSON.stringify(registration));
        expect(response?.parsedData).toBe('newConnectorId');
    });

    it('set image variable local connector', async () => {
        const registration: ConnectorLocalRegistration = {
            url: './test.local',
            source: ConnectorRegistrationSource.local,
        };

        const response = await mockedVariableController.setImageVariableConnector(variableId, registration);

        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledWith(variableId, JSON.stringify(registration));
        expect(response?.parsedData).toBe('newConnectorId');
    });

    it('set image variable Grafx connector', async () => {
        const grafxRegistration: ConnectorGrafxRegistration = {
            source: ConnectorRegistrationSource.grafx,
            id: 'grafx-id',
        };

        const response = await mockedVariableController.setImageVariableConnector(variableId, grafxRegistration);

        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setImageVariableConnector).toHaveBeenCalledWith(
            variableId,
            JSON.stringify(grafxRegistration),
        );
        expect(response?.parsedData).toBe('newConnectorId');
    });
});

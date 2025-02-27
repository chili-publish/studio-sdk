import { EditorAPI } from '../../../types/CommonTypes';
import { ConfigHelper } from '../../../utils/ConfigHelper';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { SubscriberController } from '../../controllers/SubscriberController';
import { ConnectorRegistrationSource } from '../../types/ConnectorTypes';
import { VariableType } from '../../types/VariableTypes';

let mockedSubscriberController: SubscriberController;

const mockEditorApi: EditorAPI = {
    onVariableListChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onConnectorsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    jest.spyOn(mockEditorApi, 'onVariableListChanged');
    jest.spyOn(mockEditorApi, 'onConnectorsChanged');

    mockedSubscriberController = new SubscriberController(ConfigHelper.createRuntimeConfig(mockEditorApi));
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Next.SubscriberController', () => {
    it('Should be possible to subscribe to onVariableListChanged', async () => {
        const variables = [
            { id: '1', type: VariableType.group },
            { id: 'varList', type: VariableType.list, selected: 'Orange', items: ['Apple', 'Pear', 'Orange'] },
        ];
        await mockedSubscriberController.onVariableListChanged(JSON.stringify(variables));
        expect(mockEditorApi.onVariableListChanged).toHaveBeenCalledWith(variables);
        expect(mockEditorApi.onVariableListChanged).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to subscribe to onConnectorsChanged', async () => {
        const connectors = [{ id: 'id', name: 'name', source: ConnectorRegistrationSource.local }];

        await mockedSubscriberController.onConnectorsChanged(JSON.stringify(connectors));
        expect(mockEditorApi.onConnectorsChanged).toHaveBeenCalledWith(connectors);
        expect(mockEditorApi.onConnectorsChanged).toHaveBeenCalledTimes(1);
    });
});

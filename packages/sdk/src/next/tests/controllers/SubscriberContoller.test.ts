import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { SubscriberController } from '../../controllers/SubscriberController';
import { ConnectorInstance, ConnectorRegistrationSource } from '../../types/ConnectorTypes';
import { VariableType } from '../../types/VariableTypes';
import { PageSize } from '../../types/PageTypes';
import { RuntimeConfigType } from '../../types/CommonTypes';
import { EngineEvent } from '../../../utils/EngineEvent';
import { Variable } from '../../../types/VariableTypes';

let mockedSubscriberController: SubscriberController;
let variableListChangedEvent: EngineEvent<(variables: Variable[]) => void>;
let connectorsChangedEvent: EngineEvent<(connectors: ConnectorInstance[]) => void>;
let pageSizeChangedEvent: EngineEvent<(pageSize: PageSize) => void>;

const mockEditorApi = {
    onVariableListChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
    onConnectorsChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
    onPageSizeChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
};

beforeEach(() => {
    variableListChangedEvent = new EngineEvent(() => mockEditorApi.onVariableListChanged);
    connectorsChangedEvent = new EngineEvent(() => mockEditorApi.onConnectorsChanged);
    pageSizeChangedEvent = new EngineEvent(() => mockEditorApi.onPageSizeChanged);

    const config = {
        events: {
            onVariableListChanged: variableListChangedEvent,
            onConnectorsChanged: connectorsChangedEvent,
            onPageSizeChanged: pageSizeChangedEvent,
        },
    } as RuntimeConfigType;

    mockedSubscriberController = new SubscriberController(config);
});

afterEach(() => {
    jest.clearAllMocks();
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

    it('Should be possible to subscribe to onPageSizeChanged', async () => {
        const pageSize = { height: 100, width: 100 } as PageSize;

        await mockedSubscriberController.onPageSizeChanged(JSON.stringify(pageSize));
        expect(mockEditorApi.onPageSizeChanged).toHaveBeenCalledWith(pageSize);
        expect(mockEditorApi.onPageSizeChanged).toHaveBeenCalledTimes(1);
    });
});

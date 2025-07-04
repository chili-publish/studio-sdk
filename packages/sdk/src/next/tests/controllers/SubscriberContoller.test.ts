import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { SubscriberController } from '../../controllers/SubscriberController';
import { ConnectorRegistrationSource } from '../../types/ConnectorTypes';
import { VariableType } from '../../types/VariableTypes';
import { PageSize } from '../../types/PageTypes';
import { ConfigHelper } from '../../../utils/ConfigHelper';

let mockedSubscriberController: SubscriberController;

const mockEditorApi = {
    onVariableListChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
    onConnectorsChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
    onPageSizeChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
    onBrandKitMediaChanged: jest.fn(async () => getEditorResponseData(castToEditorResponse(null))),
};

beforeEach(() => {
    jest.spyOn(mockEditorApi, 'onVariableListChanged');
    jest.spyOn(mockEditorApi, 'onConnectorsChanged');
    jest.spyOn(mockEditorApi, 'onPageSizeChanged');
    jest.spyOn(mockEditorApi, 'onBrandKitMediaChanged');
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

    it('Should be possible to subscribe to onPageSizeChanged', async () => {
        const pageSize = { height: 100, width: 100 } as PageSize;

        await mockedSubscriberController.onPageSizeChanged(JSON.stringify(pageSize));
        expect(mockEditorApi.onPageSizeChanged).toHaveBeenCalledWith(pageSize);
        expect(mockEditorApi.onPageSizeChanged).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to subscribe to onBrandKitMediaChanged', async () => {
        const brandKitMedia = [{ name: 'test-media', remoteConnectorId: 'connector-1', assetId: 'asset-1' }];

        await mockedSubscriberController.onBrandKitMediaChanged(JSON.stringify(brandKitMedia));
        expect(mockEditorApi.onBrandKitMediaChanged).toHaveBeenCalledWith(brandKitMedia);
        expect(mockEditorApi.onBrandKitMediaChanged).toHaveBeenCalledTimes(1);
    });
});

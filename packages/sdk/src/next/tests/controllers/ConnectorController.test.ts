import { ConnectorController } from '../../controllers/ConnectorController';

import { EditorAPI } from '../../../types/CommonTypes';

import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import {
    ConnectorGrafxRegistration,
    ConnectorLocalRegistration,
    ConnectorRegistrationSource,
    ConnectorUrlRegistration,
} from '../../types/ConnectorTypes';
import { ConnectorType } from '../../../types/ConnectorTypes';

let mockedConnectorController: ConnectorController;

const mockEditorApi: EditorAPI = {
    getConnectorById: async () => getEditorResponseData(castToEditorResponse(null)),
    getConnectors: async () => getEditorResponseData(castToEditorResponse(null)),
    registerConnector: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getConnectorById');
    jest.spyOn(mockEditorApi, 'getConnectors');
    jest.spyOn(mockEditorApi, 'registerConnector');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ConnectorController', () => {
    const connectorId = 'dam';

    it('Should call the getById method', async () => {
        await mockedConnectorController.getById(connectorId);
        expect(mockEditorApi.getConnectorById).toHaveBeenCalledTimes(1);
    });

    it('Should call the getAllByType method', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to retrieve all connectors of a certain type', async () => {
        await mockedConnectorController.getAllByType(ConnectorType.media);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getConnectors).toHaveBeenCalledWith(ConnectorType.media);
    });

    it('Should be possible to register a url connector', async () => {
        const nonGrafxRegistration: ConnectorUrlRegistration = {
            url: 'https://mock.url/',
            source: ConnectorRegistrationSource.url,
        };

        await mockedConnectorController.register(nonGrafxRegistration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(nonGrafxRegistration));
    });

    it('Should be possible to register a local connector', async () => {
        const nonGrafxRegistration: ConnectorLocalRegistration = {
            url: './local.test',
            source: ConnectorRegistrationSource.local,
        };

        await mockedConnectorController.register(nonGrafxRegistration);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(nonGrafxRegistration));
    });

    it('Should be possible to register a grafx connector', async () => {
        const grafxRegistration: ConnectorGrafxRegistration = {
            id: 'grafx-id',
            source: ConnectorRegistrationSource.grafx,
        };

        await mockedConnectorController.register(grafxRegistration);

        expect(mockEditorApi.registerConnector).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.registerConnector).toHaveBeenCalledWith(JSON.stringify(grafxRegistration));
    });
});

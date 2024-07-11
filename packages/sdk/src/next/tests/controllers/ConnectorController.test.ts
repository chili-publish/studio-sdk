import { ConnectorController } from '../../controllers/ConnectorController';

import { EditorAPI } from '../../../types/CommonTypes';

import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import {
    ConnectorGrafxRegistration,
    ConnectorLocalRegistration,
    ConnectorRegistrationSource,
    ConnectorUrlRegistration,
} from '../../types/ConectorTypes';

let mockedConnectorController: ConnectorController;

const mockEditorApi: EditorAPI = {
    registerConnector: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedConnectorController = new ConnectorController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'registerConnector');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('ConnectorController', () => {
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

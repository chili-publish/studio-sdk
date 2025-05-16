import { ConnectorHttpErrorConstructor } from './Connector.Error';

export * from './Connector.Error';
export * as Connector from './Connector.Shared';
export * as Data from './DataConnector';
export * as Font from './FontConnector';
export * as Media from './MediaConnector';

declare global {
    var ConnectorHttpError: ConnectorHttpErrorConstructor;
}

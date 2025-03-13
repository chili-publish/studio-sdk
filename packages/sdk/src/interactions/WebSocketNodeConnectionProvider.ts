import { ConfigParameterTypes } from './Connector';
import { StudioConnection } from './base/StudioConnection';
import { IConnectionProvider } from './base/IConnectionProvider';
import { WebSocketConnection } from './WebSocketConnection';

export class WebSocketNodeConnectionProvider implements IConnectionProvider {
    createConnection(
        editorLink: string,
        _params: ConfigParameterTypes,
        setConnection: (connection: StudioConnection) => void,
    ) {
        const connection = {
            promise: new WebSocketConnection(editorLink).editorApi,
            destroy: () => {
                console.log('destroy');
            },
        };
        setConnection(connection as unknown as StudioConnection);
    }
}

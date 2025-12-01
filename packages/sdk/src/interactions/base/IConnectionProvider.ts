import { StudioStyling } from '../../types/ConfigurationTypes';
import { ConfigParameterTypes } from '../Connector';
import { StudioConnection } from './StudioConnection';

export interface IConnectionProvider {
    createConnection(
        editorLink: string,
        params: ConfigParameterTypes,
        setConnection: (connection: StudioConnection) => void,
        editorId?: string,
        styling?: StudioStyling,
    ): void;
}

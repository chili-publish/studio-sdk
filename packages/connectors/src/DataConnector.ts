import {
    DataConnectorCapabilities,
    DataModel,
    DataPage,
    Dictionary,
    PageConfig,
} from '@chili-studio/connector-types';
import { ConnectorConfigOptions, ConnectorRuntimeContext } from './Connector.Shared';

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataModelProperty,
    DataPage,
    PageConfig
} from '@chili-studio/connector-types';

export interface DataConnector {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
    getModel(context: Dictionary): Promise<DataModel>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): DataConnectorCapabilities;
}

// TODO: add methods once defined
export type DataConnectorRuntimeContext = ConnectorRuntimeContext;

import {
    DataConnectorCapabilities,
    DataModel,
    DataPage,
    Dictionary,
    BiderectionalDataPage,
    BiderectionalPageConfig,
    PageConfig,
    BiderectionalDataPageItem,
} from '@chili-studio/connector-types';
import { ConnectorConfigOptions, ConnectorRuntimeContext } from './Connector.Shared';

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataModelProperty,
    DataPage,
    BiderectionalPageConfig,
    PageConfig,
    BiderectionalDataPage
} from '@chili-studio/connector-types';

export interface BaseDataConnector {
    getModel(context: Dictionary): Promise<DataModel>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): DataConnectorCapabilities;
}

export interface OneDirectionalNavigation {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
}

export interface BiderectionalNavigation {
    getPage(config: BiderectionalPageConfig, context: Dictionary): Promise<BiderectionalDataPage>;
}

export interface DataConnector extends BaseDataConnector, OneDirectionalNavigation {}

/**
 * Mixin interface that must be implemented by connectors advertising
 * `DataConnectorCapabilities.dataSourceVariable = true`.
 * Extending `BiderectionalNavigation` enforces that the connector implements bidirectional
 * `getPage` in addition to the item-level `getPageItemById` lookup — both are required
 * for the Data Source Variable feature to function.
 */
export interface DataSourceVariableCapability extends BiderectionalNavigation {
    getPageItemById(id: string, context: Dictionary): Promise<BiderectionalDataPageItem>;
}

export type DataConnectorRuntimeContext = ConnectorRuntimeContext;

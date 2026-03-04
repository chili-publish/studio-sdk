import {
    DataConnectorCapabilities,
    DataModel,
    DataPage,
    Dictionary,
    BidirectionalDataPage,
    BidirectionalPageConfig,
    PageConfig,
    BidirectionalDataPageItem,
} from '@chili-studio/connector-types';
import { Connector, ConnectorRuntimeContext } from './Connector.Shared';

export type {
    DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataModelProperty,
    DataPage,
    BidirectionalPageConfig,
    PageConfig,
    BidirectionalDataPage,
} from '@chili-studio/connector-types';

/**
 * Contract for connectors that set `DataConnectorCapabilities.dataSourceVariable = true`.
 * All three methods are required for the Data Source Variable feature.
 */
export interface DataSourceVariableCapability {
    /** Bidirectional paged data. */
    getPage(config: BidirectionalPageConfig, context: Dictionary): Promise<BidirectionalDataPage>;
    /** Single item by ID (column identified by the model’s itemIdPropertyName). */
    getPageItemById(id: string, context: Dictionary): Promise<BidirectionalDataPageItem>;
    /** Model must declare which property is the item ID. */
    getModel(context: Dictionary): Promise<Required<DataModel>>;
}

/**
 * Contract for connectors that set `DataConnectorCapabilities.model = true`.
 */
export interface ModelCapability {
    getModel(context: Dictionary): Promise<DataModel>;
}

/**
 * Default implementation that we use for Output Data Source use case
 */
export interface DataConnector extends Connector<DataConnectorCapabilities> {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
}

export type DataConnectorRuntimeContext = ConnectorRuntimeContext;

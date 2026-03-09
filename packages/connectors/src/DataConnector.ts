import {
    BidirectionalDataPage,
    BidirectionalDataPageItem,
    BidirectionalPageConfig,
    DataConnectorCapabilities,
    DataModel,
    DataPage,
    DataSourceVariableDataModel,
    Dictionary,
    PageConfig,
    PageItemOptions,
} from '@chili-studio/connector-types';
import { BaseConnector, ConnectorRuntimeContext } from './Connector.Shared';

export type {
    BidirectionalDataPage, BidirectionalDataPageItem,
    BidirectionalPageConfig, DataConnectorCapabilities,
    DataItem,
    DataModel,
    DataModelProperty, DataPage, DataSourceVariableDataModel, PageConfig,
    PageItemOptions
} from '@chili-studio/connector-types';

/**
 * @experimental This interface is still experimental and might change in future releases.
 * 
 * Contract for connectors that set `DataConnectorCapabilities.dataSourceVariable = true`.
 * All three methods are required for the Data Source Variable feature.
 */
export interface DataSourceVariableCapability extends ModelCapability {
    /** Bidirectional paged data. */
    getPage(config: BidirectionalPageConfig, context: Dictionary): Promise<BidirectionalDataPage>;
    /** Single item by ID; pageOptions (sorting, limit) used to build navigation tokens. */
    getPageItemById(id: string, pageOptions: PageItemOptions, context: Dictionary): Promise<BidirectionalDataPageItem>;
    /** Get the data model for the data source variable. */
    getModel(context: Dictionary): Promise<DataSourceVariableDataModel>;
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
export interface DataConnector extends BaseConnector<DataConnectorCapabilities> {
    getPage(config: PageConfig, context: Dictionary): Promise<DataPage>;
}

export type DataConnectorRuntimeContext = ConnectorRuntimeContext;

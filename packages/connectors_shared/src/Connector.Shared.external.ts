import { QueryOptionsT } from "../../connectors/src/Connector.Shared";

export type Id = string;

export enum ConnectorConfigValueType {
  text = "text",
  boolean = "boolean",
}

export interface ConnectorConfigValue {
  readonly name: string;
  readonly displayName: string;
  readonly type: ConnectorConfigValueType;
}

export enum SortBy {
  name = "name",
  path = "relativePath",
  id = "id",
}

export enum SortOrder {
  ascending = "asc",
  descending = "desc",
}

export type QueryOptions = QueryOptionsT<SortBy, SortOrder>;

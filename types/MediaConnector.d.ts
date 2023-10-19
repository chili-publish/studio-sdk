import {ArrayBufferPointer, ConnectorConfigOptions, Dictionary, QueryOptions,} from "./Connector.Shared";

export interface MediaConnector {
  detail(id: string, context: Dictionary): Promise<MediaDetail>;
  query(options: QueryOptions, context: Dictionary): Promise<MediaPage>;
  download(
    id: string,
    previewType: DownloadType,
    context: Dictionary
  ): Promise<ArrayBufferPointer>;
  getConfigurationOptions(): ConnectorConfigOptions | null;
  getCapabilities(): MediaConnectorCapabilities;
}

export enum MediaAllowedResourceType {
    image = 'image',
    vector = 'vector',
}

export enum DownloadType {
    thumbnail = 'thumbnail',
    web = 'web',
    highres = 'highres',
    original = 'original',
}

export interface MediaPage {
  pageSize: number;
  data: Media[];
  links: {
    nextPage: string;
  };
}

export interface Media {
  id: string;
  name: string;
  relativePath: string;
  type: number;
  metaData: Dictionary;
  extension?: string;
}

export interface MediaDetail extends Media {
  width?: number;
  height?: number;
}

export type MediaConnectorCapabilities = {
  query: boolean;
  detail: boolean;
  filtering: boolean;
};

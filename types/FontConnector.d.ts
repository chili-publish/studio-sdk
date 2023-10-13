import {
  ArrayBufferPointer,
  ConnectorConfigOptions,
  Dictionary,
  FontConnectorCapabilities,
  QueryOptions,
} from "./Connector.Shared";

declare module "grafx-studio-fontconnector" {
  interface GrafxFontConnector {
    detail(
      connectorId: string,
      fontFamilyId: string,
      context: Dictionary
    ): Promise<FontStyle[]>;
    query(
      connectorId: string,
      queryOptions: QueryOptions,
      context: Dictionary
    ): Promise<FontFamilyPage>;
    download(styleId: string, context: Dictionary): Promise<ArrayBufferPointer>;
    preview(
      familyId: string,
      previewFormat: FontPreviewFormat,
      context: Dictionary
    ): Promise<ArrayBufferPointer>;
    getConfigurationOptions(): ConnectorConfigOptions | null;
    getCapabilities(): FontConnectorCapabilities;
  }

  enum FontPreviewFormat {
    Square = "square",
    Line = "line",
  }

  interface FontFamilyPage {
    pageSize: number;
    data: FontFamily[];
    links: {
      nextPage: string;
    };
  }

  interface FontFamily {
    id: string;
    name: string;
    fontStylesCount: number;
    extensions: string[];
  }

  interface FontStyle {
    id: string;
    name: string;
    familyId: string;
    familyName: string;
  }
}

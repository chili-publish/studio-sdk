import { Id } from "./Connector.Shared.external";

export type FontConnectorCapabilities = {
  query: boolean;
  detail: boolean;
  preview: boolean;
  filtering: boolean;
};

export enum FontPreviewFormat {
  Square = "square",
  Line = "line",
}

export interface FontFamily {
  id: Id;
  name: string;
  fontStylesCount: number;
  extensions: string[];
}

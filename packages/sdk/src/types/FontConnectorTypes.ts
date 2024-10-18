import { Id } from './CommonTypes';

export type FontConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    preview: boolean;
    filtering: boolean;
};

export enum FontPreviewFormat {
    Square = 'square',
    Line = 'line',
}

export type FontFamily = {
    id: Id;
    name: string;
    fontStylesCount: number;
    extensions: string[];
};

export type FontStyle = {
    id: Id;
    name: string;
    familyId: string;
    familyName: string;
};

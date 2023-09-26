import { Id } from './CommonTypes';

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

export type FontPage = {
    pageSize: number;
    nextPageToken?: string;
    data: FontFamily[];
};

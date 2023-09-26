import { Id } from './CommonTypes';

export type Page = {
    id: Id;
    number: number;
    width?: number;
    height?: number;
};

export type PageSize = {
    id: Id;
    width: number;
    height: number;
};

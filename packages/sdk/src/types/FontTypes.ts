import { Id } from "./CommonTypes";

export type DocumentFont = {
    id: Id;
    name: string;
    fontFamily: string;
    fontStyle: string;
    fontId: Id;
    connectorId: Id;
    isDefault: boolean;
};

export type AddDocumentFont = {
    name: string;
    fontFamily: string;
    fontStyle: string;
    fontId: Id;
};

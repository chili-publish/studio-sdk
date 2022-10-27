
export type DocumentFont = {
    id: string;
    name: string;
    fontFamily: string;
    fontStyle: string;
    fontId: string;
    connectorId: string;
    isDefault: boolean;
}

export type AddDocumentFont = {
    name: string;
    fontFamily: string;
    fontStyle: string;
    fontId: string;
}
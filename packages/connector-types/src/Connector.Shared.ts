export interface Dictionary {
    [Key: string]: string | boolean;
}

export type QueryOptions = {
    filter?: string[] | null;
    collection?: string | null;
    pageToken?: string | null;
    pageSize?: number;
    sortBy?: string | null;
    sortOrder?: string | null;
};

export type QueryPage<T> = {
    pageSize: number;
    links: {
        nextPage: string;
    };
    data: T[];
};

export type ConnectorConfigValueType = 'text' | 'boolean';

export interface ConnectorConfigValue {
    readonly name: string;
    readonly displayName: string;
    readonly type: ConnectorConfigValueType;
}

export type ConnectorConfigOptions = ConnectorConfigValue[];

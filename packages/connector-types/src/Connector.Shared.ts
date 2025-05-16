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

export interface ConnectorConfigValue<Type> {
    readonly name: string;
    readonly displayName: string;
    readonly type: Type;
}

export type ConnectorConfigOptions<Type> = ConnectorConfigValue<Type>[];

export type ConnectorRegistration = {
    id: string,
    name: string,
    type: ConnectorType,
    source: ConnectorRegistrationSource,
    url: string
}

export enum ConnectorType {
    media,
    font
}

export enum ConnectorRegistrationSource {
    url
}
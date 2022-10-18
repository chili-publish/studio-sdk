export type ConnectorRegistration = {
    id: string,
    source: ConnectorRegistrationSource,
    url: string
}

export enum ConnectorType {
    media = 'media',
    font = 'font'
}

export enum ConnectorRegistrationSource {
    url = 'url'
}
export type ConnectorRegistration = {
    id: string,
    source: ConnectorRegistrationSource,
    url: string
}

export enum ConnectorRegistrationSource {
    url = 'url'
}
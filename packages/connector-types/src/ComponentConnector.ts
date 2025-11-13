import { QueryPage } from './Connector.Shared';

/**
 * @experimental This is still experimental and might change in future releases.
 */
export type ComponentPage = QueryPage<Component>;

/**
 * @experimental This is still experimental and might change in future releases.
 */
export interface Component {
    id: string;
    name: string;
};

/**
 * @experimental This is still experimental and might change in future releases.
 */
export type ComponentConnectorCapabilities = {
    query: boolean;
    detail: boolean;
    preview: boolean;
    filtering: boolean;
    serverRender: boolean;
};

import { EngineEvent } from '../../utils/EngineEvent';
import { PageSize } from './PageTypes';
import { ConfigType, MaybePromise } from '../../types/CommonTypes';
import { Variable } from '../../types/VariableTypes';
import { ConnectorInstance } from '../../types/ConnectorTypes';

export type RuntimeConfigType = ConfigType & ManagedCallbacksConfigType;

export type ManagedCallbacksConfigType = {
    events: {
        onVariableListChanged: EngineEvent<(variableList: Variable[]) => MaybePromise<void>>;
        onConnectorsChanged: EngineEvent<(connectors: ConnectorInstance[]) => MaybePromise<void>>;
        onPageSizeChanged: EngineEvent<(pageSize: PageSize) => MaybePromise<void>>;
    };
};

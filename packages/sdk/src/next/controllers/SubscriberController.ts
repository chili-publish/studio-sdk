import { RuntimeConfigType } from '../types/CommonTypes';

/**
 * The SubscriberController is responsible for all listeners which can influence the application-state from outside.
 * Callbacks inside this controller can be set by `window.SDK.subscriber.{method-name}`
 */
export class SubscriberController {
    /**
     * @ignore
     */
    private config: RuntimeConfigType;

    /**
     * @ignore
     */
    constructor(config: RuntimeConfigType) {
        this.config = config;
    }

    /**
     * Listener on when variables change
     * @param variablesJson Stringified array of Variable
     */
    onVariableListChanged = (variablesJson: string) => {
        this.config.events.onVariableListChanged.trigger(JSON.parse(variablesJson));
    };

    /**
     * Listener on connectors, if this changes, this listener will get triggered with the updates
     * @param connectors Stringified array of ConnectorInstance type
     */
    onConnectorsChanged = (connectors: string) => {
        this.config.events.onConnectorsChanged.trigger(JSON.parse(connectors));
    };

    /**
     * Listener on page size, this listener will get triggered when the page size is changed, while the document is a `project`.
     * This will not emit anything if your document is a `template`.
     * @param pageSize Stringified object of the PageSize
     */
    onPageSizeChanged = (pageSize: string) => {
        this.config.events.onPageSizeChanged.trigger(JSON.parse(pageSize));
    };
}

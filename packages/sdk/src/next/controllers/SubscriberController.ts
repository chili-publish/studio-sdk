import { ConfigType, RuntimeConfigType } from '../../types/CommonTypes';

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
        this.config.events.onVariableListChanged.executeCallbacks(JSON.parse(variablesJson));
    };
}

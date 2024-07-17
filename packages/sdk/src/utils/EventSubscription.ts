/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CallbackErrorBehavior,
    LoggerFunction,
    LogLevel,
    LogCategory,
} from '../types/CommonTypes';

export class EventSubscriptionBase {}

export class EngineCallbackHandler<T extends (...args: any[]) => any> extends EventSubscriptionBase {
    protected callbacks: Map<string, { callback: T; errorBehavior: CallbackErrorBehavior }> = new Map();
    protected legacyEventHandler: (() => T | undefined) | undefined;
    protected logger: LoggerFunction | undefined;

    constructor(legacyEventHandler?: () => T | undefined, logger?: LoggerFunction) {
        super();
        this.legacyEventHandler = legacyEventHandler;
        this.logger = logger;
    }

    /**
     * Executes the registered callbacks with the provided arguments.
     *
     * @param args The arguments to pass to the callbacks.
     * @returns The result of executing the callbacks.
     */
    trigger(...args: Parameters<T>): any {
        let result;

        if (this.legacyEventHandler) {
            const callback = this.legacyEventHandler();
            if (callback) {
                result = this.executeCallback('legacyEventHandler', callback, CallbackErrorBehavior.LOG, ...args);
            }
        }
        for (const [key, callback] of this.callbacks.entries()) {
            result = this.executeCallback(key, callback.callback, callback.errorBehavior, ...args);
        }

        return result ?? null;
    }

    private executeCallback(
        key: string,
        callback: T,
        errorBehavior: CallbackErrorBehavior,
        ...args: Parameters<T>
    ): any {
        try {
            return callback(...args);
        } catch (error) {
            if (errorBehavior === CallbackErrorBehavior.LOG) {
                if (this.logger) {
                    this.logger(LogLevel.ERROR, LogCategory.EVENT, `Error in callback ${key}: ${error}`);
                }
            } else if (errorBehavior === CallbackErrorBehavior.THROW) {
                throw error;
            } else if (errorBehavior === CallbackErrorBehavior.REMOVE) {
                this.callbacks.delete(key);
                if (this.logger) {
                    this.logger(LogLevel.WARN, LogCategory.EVENT, `Removed callback ${key} due to error: ${error}`);
                }
            }
        }
    }
}

export class EventSubscription<T extends (...args: any[]) => any> extends EngineCallbackHandler<T> {
    constructor(legacyEventHandler?: () => T | undefined, logger?: LoggerFunction) {
        super(legacyEventHandler, logger);
    }

    /**
     * Registers a callback function with an optional key.
     *
     * @param callback - The callback function to register.
     * @param key - An optional key to associate with the callback.
     * @returns The generated or provided key associated with the callback.
     */
    registerCallback(callback: T, errorBehavior?: CallbackErrorBehavior, key?: string): string {
        const callbackName = key || this.generateUniqueName();
        this.callbacks.set(callbackName, { callback, errorBehavior: errorBehavior || CallbackErrorBehavior.LOG });
        return callbackName;
    }

    /**
     * Removes the callback associated with the specified name from the subscription.
     * @param key - The key of the callback to remove.
     */
    unsubscribeCallback(key: string): void {
        this.callbacks.delete(key);
    }

    // Generate a unique name for unnamed callbacks
    private generateUniqueName(): string {
        return `callback_${Math.random().toString(36).substr(2, 9)}`;
    }
}



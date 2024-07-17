/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallbackErrorBehavior, LoggerFunction } from '../types/CommonTypes';
import { EngineCallbackHandler } from './EngineCallbackHandler';

export class EngineEvent<T extends (...args: any[]) => any> extends EngineCallbackHandler<T> {
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
        this.callbacks.set(callbackName, { callback, errorBehavior: errorBehavior || CallbackErrorBehavior.log });
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

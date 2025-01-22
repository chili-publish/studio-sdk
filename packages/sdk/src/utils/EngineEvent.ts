/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallbackErrorBehavior, LoggerFunction } from '../types/CommonTypes';
import { EngineEventTrigger } from './EngineEventTrigger';

interface Unsubscriber {
    (): void;
}

export class EngineEvent<T extends (...args: any[]) => void> extends EngineEventTrigger<T> {
    private subscriptions: Set<T> = new Set();

    constructor(private legacyHandler: () => T | undefined, logger?: LoggerFunction) {
        super(logger);
    }

    /**
     * Executes the registered callbacks with provided arguments
     *
     * @param args The arguments to pass to the callbacks.
     * @returns The result of executing the callbacks.
     */
    trigger(...args: Parameters<T>): ReturnType<T> {
        const handler = this.legacyHandler();
        if (handler) {
            this.createEventHandlerFn(handler, CallbackErrorBehavior.log)(...args);
        }
        for (const callback of this.subscriptions) {
            callback(...args);
        }
        return undefined as ReturnType<T>;
    }

    /**
     * Registers a callback function.
     *
     * @param callback - The callback function to register. This function will be invoked when the event occurs.
     * @param errorBehavior - An optional parameter to define how to handle errors that appear in the callback function.
     *                         Accepted values are:
     *                         - "log": Logs the error to the console (default behavior)
     *                         - "throw": Throws an error. Keep in mind that throwing of error in one of the callback will prevent calling of others
     * @returns A function to unsubscribe the callback, preventing it from being invoked in the future.
     */
    registerCallback(callback: T, errorBehavior: CallbackErrorBehavior = CallbackErrorBehavior.log): Unsubscriber {
        const callbackFn = this.createEventHandlerFn(callback, errorBehavior);
        this.subscriptions.add(callbackFn);

        return () => {
            this.subscriptions.delete(callbackFn);
        };
    }
}

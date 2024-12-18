/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallbackErrorBehavior, LoggerFunction } from '../types/CommonTypes';
import { EngineEventTrigger } from './EngineEventTrigger';

export class EngineCallbackHandler<T extends (...args: any[]) => any> extends EngineEventTrigger<T> {
    constructor(private handler: () => T | undefined, logger?: LoggerFunction) {
        super(logger);
    }
    /**
     * Executes the defined handler with the provided arguments.
     *
     * @param args The arguments to pass to the callbacks.
     * @returns The result of executing the callbacks.
     */
    trigger(...args: Parameters<T>): ReturnType<T> {
        const handler = this.handler();
        if (handler) {
            return this.createEventHandlerFn(handler, CallbackErrorBehavior.throw)(...args);
        }
        return undefined as ReturnType<T>;
    }
}

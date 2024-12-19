/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallbackErrorBehavior, LogCategory, LoggerFunction, LogLevel } from '../types/CommonTypes';
export abstract class EngineEventTrigger<T extends (...args: any[]) => any> {
    constructor(protected logger?: LoggerFunction) {}

    abstract trigger(...args: Parameters<T>): ReturnType<T>;

    protected createEventHandlerFn(callbackFn: T, errorBehavior: CallbackErrorBehavior): T {
        const wrapper: any = (...args: Parameters<T>) => {
            try {
                const result = callbackFn(...args);
                // If the callback returns a promise, we need to await it
                if (result instanceof Promise) {
                    return result.catch((error) => this.handleError(error, errorBehavior, callbackFn.name));
                }
                return result;
            } catch (error) {
                this.handleError(error, errorBehavior, callbackFn.name);
            }
        };
        return wrapper;
    }

    private handleError(error: unknown, errorBehavior: CallbackErrorBehavior, fnName: string) {
        if (errorBehavior === CallbackErrorBehavior.log) {
            this.logger?.(LogLevel.error, LogCategory.event, `Error in callback ${fnName}: ${error}`);
        } else {
            throw error;
        }
    }
}

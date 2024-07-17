/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallbackErrorBehavior, LoggerFunction, LogLevel, LogCategory } from '../types/CommonTypes';
import { EngineEventBase } from './EngineEventBase';

export class EngineCallbackHandler<T extends (...args: any[]) => any> extends EngineEventBase {
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
                result = this.executeCallback('legacyEventHandler', callback, CallbackErrorBehavior.log, ...args);
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
            const result = callback(...args);

            // If the callback returns a promise, we need to await it
            if (result instanceof Promise) {
                return result.catch((error) => {
                    if (errorBehavior === CallbackErrorBehavior.log) {
                        if (this.logger) {
                            this.logger(LogLevel.error, LogCategory.event, `Error in callback ${key}: ${error}`);
                        }
                    } else if (errorBehavior === CallbackErrorBehavior.throw) {
                        throw error;
                    } else if (errorBehavior === CallbackErrorBehavior.remove) {
                        this.callbacks.delete(key);
                        if (this.logger) {
                            this.logger(
                                LogLevel.warn,
                                LogCategory.event,
                                `Removed callback ${key} due to error: ${error}`,
                            );
                        }
                    }
                });
            }

            return result;
        } catch (error) {
            if (errorBehavior === CallbackErrorBehavior.log) {
                if (this.logger) {
                    this.logger(LogLevel.error, LogCategory.event, `Error in callback ${key}: ${error}`);
                }
            } else if (errorBehavior === CallbackErrorBehavior.throw) {
                throw error;
            } else if (errorBehavior === CallbackErrorBehavior.remove) {
                this.callbacks.delete(key);
                if (this.logger) {
                    this.logger(LogLevel.warn, LogCategory.event, `Removed callback ${key} due to error: ${error}`);
                }
            }
        }
    }
}

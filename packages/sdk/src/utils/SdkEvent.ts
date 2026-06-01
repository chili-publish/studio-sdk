import { CallbackErrorBehavior, LogCategory, LoggerFunction } from '../types/CommonTypes';
import { EngineEventTrigger } from './EngineEventTrigger';

interface Unsubscriber {
    (): void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class SdkEvent<T extends (...args: any[]) => void> extends EngineEventTrigger<T> {
    private subscriptions: Set<T> = new Set();

    constructor(logger?: LoggerFunction) {
        super(logger);
    }

    protected getLogCategory(): LogCategory {
        return LogCategory.sdk;
    }

    trigger(...args: Parameters<T>): ReturnType<T> {
        for (const callback of this.subscriptions) {
            callback(...args);
        }
        return undefined as ReturnType<T>;
    }

    registerCallback(callback: T, errorBehavior: CallbackErrorBehavior = CallbackErrorBehavior.log): Unsubscriber {
        const callbackFn = this.createEventHandlerFn(callback, errorBehavior);
        this.subscriptions.add(callbackFn);

        return () => {
            this.subscriptions.delete(callbackFn);
        };
    }
}

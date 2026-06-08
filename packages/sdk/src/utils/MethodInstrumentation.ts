import { LogCategory, LoggerFunction, LogLevel } from '../types/CommonTypes';
import {
    Instrumented,
    MethodCompleteEvent,
    MethodInvocationEvent,
    MethodInvocationListener,
    MethodInvokeEvent,
    MethodListenable,
    Unsubscriber,
} from '../types/MethodInvocationTypes';
import { SdkEvents } from './SdkEvents';

const NOOP_UNSUBSCRIBER: Unsubscriber = () => undefined;

export class MethodListenerRegistry {
    private listeners = new Map<string, Set<MethodInvocationListener>>();

    add(path: string, listener: MethodInvocationListener): Unsubscriber {
        if (typeof listener !== 'function') {
            return NOOP_UNSUBSCRIBER;
        }

        const subscriptions = this.listeners.get(path) ?? new Set<MethodInvocationListener>();
        subscriptions.add(listener);
        this.listeners.set(path, subscriptions);

        return () => {
            this.remove(path, listener);
        };
    }

    remove(path: string, listener: MethodInvocationListener): void {
        const subscriptions = this.listeners.get(path);
        if (!subscriptions) {
            return;
        }

        subscriptions.delete(listener);

        if (subscriptions.size === 0) {
            this.listeners.delete(path);
        }
    }

    getListeners(path: string): MethodInvocationListener[] {
        return [...(this.listeners.get(path) ?? [])];
    }
}

const isThenable = (value: unknown): value is Promise<unknown> => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    return typeof (value as Promise<unknown>).then === 'function';
};

const isInstrumentableObject = (value: unknown): value is Record<string, unknown> => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }

    return true;
};

const reportListenerError = (path: string, error: unknown, logger?: LoggerFunction) => {
    logger?.(LogLevel.error, LogCategory.sdk, `Error in method listener for ${path}: ${String(error)}`);
};

const notifyListeners = (
    path: string,
    event: MethodInvocationEvent,
    listenerRegistry: MethodListenerRegistry,
    sdkEvents: SdkEvents,
    logger?: LoggerFunction,
) => {
    for (const callback of listenerRegistry.getListeners(path)) {
        try {
            callback(event);
        } catch (error) {
            reportListenerError(path, error, logger);
        }
    }

    try {
        if (event.phase === 'invoke') {
            sdkEvents.onMethodInvoked.trigger(event);
        } else {
            sdkEvents.onMethodCompleted.trigger(event);
        }
    } catch (error) {
        reportListenerError(path, error, logger);
    }
};

export function wrapWithInvocationObserver<T extends object>(
    target: T,
    basePath: string,
    listenerRegistry: MethodListenerRegistry,
    sdkEvents: SdkEvents,
    logger?: LoggerFunction,
): Instrumented<T> {
    const methodWrappers = new Map<PropertyKey, unknown>();
    const nestedControllers = new Map<PropertyKey, unknown>();

    return new Proxy(target, {
        get(targetController, propKey, receiver) {
            const value = Reflect.get(targetController, propKey, receiver);
            if (typeof propKey === 'symbol') {
                return value;
            }

            if (typeof value === 'function') {
                if (methodWrappers.has(propKey)) {
                    return methodWrappers.get(propKey);
                }

                const methodPath = `${basePath}.${String(propKey)}`;
                const controllerName = basePath.split('.')[0] || basePath;
                const methodName = String(propKey);

                const wrappedMethod = ((...args: unknown[]) => {
                    const invokeEvent: MethodInvokeEvent = {
                        phase: 'invoke',
                        path: methodPath,
                        controller: controllerName,
                        method: methodName,
                        args: [...args],
                    };
                    notifyListeners(methodPath, invokeEvent, listenerRegistry, sdkEvents, logger);

                    try {
                        const result = value.apply(targetController, args);

                        if (isThenable(result)) {
                            return result
                                .then((resolvedValue) => {
                                    const completeEvent: MethodCompleteEvent = {
                                        phase: 'complete',
                                        path: methodPath,
                                        controller: controllerName,
                                        method: methodName,
                                        args: [...args],
                                        success: true,
                                        result: resolvedValue,
                                    };
                                    notifyListeners(methodPath, completeEvent, listenerRegistry, sdkEvents, logger);
                                    return resolvedValue;
                                })
                                .catch((error) => {
                                    const completeEvent: MethodCompleteEvent = {
                                        phase: 'complete',
                                        path: methodPath,
                                        controller: controllerName,
                                        method: methodName,
                                        args: [...args],
                                        success: false,
                                        error,
                                    };
                                    notifyListeners(methodPath, completeEvent, listenerRegistry, sdkEvents, logger);
                                    throw error;
                                });
                        }

                        const completeEvent: MethodCompleteEvent = {
                            phase: 'complete',
                            path: methodPath,
                            controller: controllerName,
                            method: methodName,
                            args: [...args],
                            success: true,
                            result,
                        };
                        notifyListeners(methodPath, completeEvent, listenerRegistry, sdkEvents, logger);

                        return result;
                    } catch (error) {
                        const completeEvent: MethodCompleteEvent = {
                            phase: 'complete',
                            path: methodPath,
                            controller: controllerName,
                            method: methodName,
                            args: [...args],
                            success: false,
                            error,
                        };
                        notifyListeners(methodPath, completeEvent, listenerRegistry, sdkEvents, logger);
                        throw error;
                    }
                }) as MethodListenable<(...args: unknown[]) => unknown>;

                wrappedMethod.addEventListener = (listener: MethodInvocationListener) => {
                    return listenerRegistry.add(methodPath, listener);
                };
                wrappedMethod.removeEventListener = (listener: MethodInvocationListener) => {
                    listenerRegistry.remove(methodPath, listener);
                };

                methodWrappers.set(propKey, wrappedMethod);
                return wrappedMethod;
            }

            if (isInstrumentableObject(value)) {
                if (nestedControllers.has(propKey)) {
                    return nestedControllers.get(propKey);
                }

                const nestedPath = `${basePath}.${String(propKey)}`;
                const wrappedNestedController = wrapWithInvocationObserver(
                    value,
                    nestedPath,
                    listenerRegistry,
                    sdkEvents,
                    logger,
                );
                nestedControllers.set(propKey, wrappedNestedController);

                return wrappedNestedController;
            }

            return value;
        },
    }) as Instrumented<T>;
}

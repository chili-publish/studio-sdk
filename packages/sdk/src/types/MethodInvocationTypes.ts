/* eslint-disable @typescript-eslint/no-explicit-any */
export type MethodInvocationBase = {
    path: string;
    controller: string;
    method: string;
    args: unknown[];
};

export type MethodInvokeEvent = MethodInvocationBase & {
    phase: 'invoke';
};

export type MethodCompleteEvent = MethodInvocationBase & {
    phase: 'complete';
    success: boolean;
    result?: unknown;
    error?: unknown;
};

export type MethodInvocationEvent = MethodInvokeEvent | MethodCompleteEvent;

export type MethodInvocationListener = (event: MethodInvocationEvent) => void;

export interface Unsubscriber {
    (): void;
}

export type MethodListenable<T extends (...args: any[]) => any> = T & {
    addEventListener(listener: MethodInvocationListener): Unsubscriber;
    removeEventListener(listener: MethodInvocationListener): void;
};

export type Instrumented<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? MethodListenable<T[K]>
        : T[K] extends object
        ? Instrumented<T[K]>
        : T[K];
};

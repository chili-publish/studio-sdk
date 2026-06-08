import { LogCategory, LogLevel } from '../../types/CommonTypes';
import { MethodInvocationEvent } from '../../types/MethodInvocationTypes';
import { MethodListenerRegistry, wrapWithInvocationObserver } from '../../utils/MethodInstrumentation';
import { SdkEvents } from '../../utils/SdkEvents';

class NestedController {
    increment = async (value: number) => value + 1;
    fail = async () => {
        throw new Error('nested-failure');
    };
}

class ExampleController {
    nested = new NestedController();
    plainNested = {
        subtract: (a: number, b: number) => a - b,
    };
    multiply = (a: number, b: number) => a * b;
    asyncEcho = async (value: string) => `echo:${value}`;
}

describe('MethodInstrumentation', () => {
    test('fires per-method and global listeners before and after execution', async () => {
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents();
        const controller = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);

        const methodEvents: MethodInvocationEvent[] = [];
        controller.multiply.addEventListener((event) => {
            methodEvents.push(event);
        });

        const globalInvoked = jest.fn();
        const globalCompleted = jest.fn();
        sdkEvents.onMethodInvoked.registerCallback(globalInvoked);
        sdkEvents.onMethodCompleted.registerCallback(globalCompleted);

        const result = controller.multiply(2, 3);

        expect(result).toBe(6);
        expect(methodEvents).toEqual([
            {
                phase: 'invoke',
                path: 'variable.multiply',
                controller: 'variable',
                method: 'multiply',
                args: [2, 3],
            },
            {
                phase: 'complete',
                path: 'variable.multiply',
                controller: 'variable',
                method: 'multiply',
                args: [2, 3],
                success: true,
                result: 6,
            },
        ]);
        expect(globalInvoked).toHaveBeenCalledWith(
            expect.objectContaining({
                phase: 'invoke',
                path: 'variable.multiply',
                args: [2, 3],
            }),
        );
        expect(globalCompleted).toHaveBeenCalledWith(
            expect.objectContaining({
                phase: 'complete',
                path: 'variable.multiply',
                success: true,
                result: 6,
            }),
        );

        const asyncResult = await controller.asyncEcho('hello');
        expect(asyncResult).toBe('echo:hello');
    });

    test('supports removeEventListener and unsubscriber', async () => {
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents();
        const controller = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);

        const listener = jest.fn();
        const unsubscribe = controller.multiply.addEventListener(listener);
        controller.multiply.removeEventListener(listener);
        unsubscribe();

        controller.multiply(1, 2);

        expect(listener).not.toHaveBeenCalled();
    });

    test('emits failure completion event and rethrows method errors', async () => {
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents();
        const controller = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);

        const events: MethodInvocationEvent[] = [];
        controller.nested.fail.addEventListener((event) => {
            events.push(event);
        });

        await expect(controller.nested.fail()).rejects.toThrow('nested-failure');

        expect(events[0]).toEqual({
            phase: 'invoke',
            path: 'variable.nested.fail',
            controller: 'variable',
            method: 'fail',
            args: [],
        });
        expect(events[1]).toMatchObject({
            phase: 'complete',
            path: 'variable.nested.fail',
            controller: 'variable',
            method: 'fail',
            success: false,
        });
        expect((events[1] as { error: Error }).error).toBeInstanceOf(Error);
    });

    test('keeps listeners after controller re-instrumentation', async () => {
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents();

        const initialController = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);
        const listener = jest.fn();
        initialController.multiply.addEventListener(listener);

        const refreshedController = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);
        refreshedController.multiply(4, 5);

        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                phase: 'invoke',
                path: 'variable.multiply',
            }),
        );
        expect(listener).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                phase: 'complete',
                path: 'variable.multiply',
                success: true,
            }),
        );
    });

    test('instruments nested methods on plain object properties', () => {
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents();
        const controller = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents);

        const listener = jest.fn();
        controller.plainNested.subtract.addEventListener(listener);

        const result = controller.plainNested.subtract(7, 3);

        expect(result).toBe(4);
        expect(listener).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                phase: 'invoke',
                path: 'variable.plainNested.subtract',
                args: [7, 3],
            }),
        );
        expect(listener).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                phase: 'complete',
                path: 'variable.plainNested.subtract',
                success: true,
                result: 4,
            }),
        );
    });

    test('logs listener errors without breaking method calls', async () => {
        const logger = jest.fn();
        const listenerRegistry = new MethodListenerRegistry();
        const sdkEvents = new SdkEvents(logger);
        const controller = wrapWithInvocationObserver(new ExampleController(), 'variable', listenerRegistry, sdkEvents, logger);

        controller.multiply.addEventListener(() => {
            throw new Error('listener-crash');
        });

        const result = controller.multiply(3, 4);

        expect(result).toBe(12);
        expect(logger).toHaveBeenCalledWith(
            LogLevel.error,
            LogCategory.sdk,
            expect.stringContaining('Error in method listener for variable.multiply'),
        );
    });
});

import { CallbackErrorBehavior, LogLevel, LogCategory } from '../../types/CommonTypes';
import { EngineCallbackHandler } from '../../utils/EngineCallbackHandler';
import { EngineEvent } from '../../utils/EngineEvent';
import { ConfigHelper } from '../../utils/ConfigHelper';

describe('EngineCallbackHandler', () => {
    test('When handler has no value, we expect to return null', () => {
        const subscription = new EngineCallbackHandler(() => undefined);

        const result = subscription.trigger('arg1', 'arg2');

        expect(result).toBeNull();
    });
});

describe('EngineEvent with async callbacks', () => {
    let subscription: EngineEvent<(...args: unknown[]) => Promise<unknown>>;

    beforeEach(() => {
        subscription = new EngineEvent();
    });

    test('should register and execute an async callback', async () => {
        const callback = jest.fn().mockResolvedValue('result');
        subscription.registerCallback(callback);

        const result = await subscription.trigger('arg1', 'arg2');

        expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('result');
    });

    test('should register multiple async callbacks and execute them', async () => {
        const callback1 = jest.fn().mockResolvedValue('result1');
        const callback2 = jest.fn().mockResolvedValue('result2');
        subscription.registerCallback(callback1);
        subscription.registerCallback(callback2);

        const result = await subscription.trigger('arg1', 'arg2');

        expect(callback1).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('result2');
    });

    test('should handle legacy event handler', async () => {
        const legacyCallback = jest.fn().mockResolvedValue('result');
        const legacyEventHandler = () => legacyCallback;
        subscription = new EngineEvent(legacyEventHandler);

        const result = await subscription.trigger('arg1', 'arg2');

        expect(legacyCallback).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('result');
    });

    test('should execute all registered async callbacks including legacy handler', async () => {
        const callback1 = jest.fn().mockResolvedValue('result1');
        const callback2 = jest.fn().mockResolvedValue('result2');
        const legacyCallback = jest.fn().mockResolvedValue('result3');
        const legacyEventHandler = () => legacyCallback;
        subscription = new EngineEvent(legacyEventHandler);

        subscription.registerCallback(callback1);
        subscription.registerCallback(callback2);

        const result = await subscription.trigger('arg1', 'arg2');

        expect(legacyCallback).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback1).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('result2');
    });
});

describe('EngineEvent', () => {
    let subscription: EngineEvent<(...args: unknown[]) => unknown>;

    beforeEach(() => {
        subscription = new EngineEvent();
    });

    test('should register and execute a callback', () => {
        const callback = jest.fn();
        subscription.registerCallback(callback);

        subscription.trigger('arg1', 'arg2');

        expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should register multiple callbacks and execute them', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        subscription.registerCallback(callback1);
        subscription.registerCallback(callback2);

        subscription.trigger('arg1', 'arg2');

        expect(callback1).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should unsubscribe a callback by name', () => {
        const callback = jest.fn();
        const callbackName = subscription.registerCallback(callback);

        subscription.unsubscribeCallback(callbackName);
        subscription.trigger('arg1', 'arg2');

        expect(callback).not.toHaveBeenCalled();
    });

    test('should handle legacy event handler', () => {
        const legacyCallback = jest.fn();
        const legacyEventHandler = () => legacyCallback;
        subscription = new EngineEvent(legacyEventHandler);

        subscription.trigger('arg1', 'arg2');

        expect(legacyCallback).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should generate unique names for unnamed callbacks', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const name1 = subscription.registerCallback(callback1);
        const name2 = subscription.registerCallback(callback2);

        expect(name1).not.toBe(name2);
    });

    test('should execute all registered callbacks including legacy handler', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const legacyCallback = jest.fn();
        const legacyEventHandler = () => legacyCallback;
        subscription = new EngineEvent(legacyEventHandler);

        subscription.registerCallback(callback1);
        subscription.registerCallback(callback2);

        subscription.trigger('arg1', 'arg2');

        expect(legacyCallback).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback1).toHaveBeenCalledWith('arg1', 'arg2');
        expect(callback2).toHaveBeenCalledWith('arg1', 'arg2');
    });
});

describe('EventHelper', () => {
    test('should ensure subscriptions', () => {
        let counter = 0;

        const runtimeConfig = ConfigHelper.createRuntimeConfig({
            onActionsChanged: () => {
                counter++;
            },
        });

        runtimeConfig.events.onActionsChanged.trigger([]);

        expect(counter).toBe(1);
    });
    test('should fire and forget', async () => {
        jest.useFakeTimers(); // Use fake timers

        let counter = 0;

        const runtimeConfig = ConfigHelper.createRuntimeConfig({
            onActionsChanged: async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                counter++;
            },
        });

        runtimeConfig.events.onActionsChanged.registerCallback(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1));
            counter++;
        });

        runtimeConfig.events.onActionsChanged.trigger([]);
        expect(counter).toBe(0);

        jest.advanceTimersByTime(1); // Simulate the passage of 50ms
        await Promise.resolve(); // Allow any pending promises to resolve
        expect(counter).toBe(1);

        jest.advanceTimersByTime(100); // Simulate the passage of 200ms
        await Promise.resolve(); // Allow any pending promises to resolve
        expect(counter).toBe(2);

        jest.useRealTimers(); // Restore real timers
    });
    test('old (broken) workflow should remain intact', () => {
        let counter = 0;

        const incomingConfig = {
            onActionsChanged: () => {
                counter++;
            },
        };

        const sdk = {
            config: ConfigHelper.createRuntimeConfig(incomingConfig),
        };

        sdk.config.onActionsChanged = () => {
            counter = 100;
        };
        sdk.config.events.onActionsChanged.trigger([]);

        expect(counter).toBe(100);
    });
});

describe('EngineEvent Error Handling', () => {
    let mockLogger: jest.Mock;
    let legacyEventHandler: jest.Mock;

    beforeEach(() => {
        mockLogger = jest.fn();
        legacyEventHandler = jest.fn();
    });

    it('logs an error when a callback errors out with LOG behavior', () => {
        const engineEvent = new EngineEvent(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        engineEvent.registerCallback(errorCallback, CallbackErrorBehavior.log);

        engineEvent.trigger();

        expect(mockLogger).toHaveBeenCalledWith(
            LogLevel.error,
            LogCategory.event,
            expect.stringContaining('Error in callback'),
        );
        expect(errorCallback).toHaveBeenCalled();
    });

    it('throws an error when a callback errors out with THROW behavior', () => {
        const engineEvent = new EngineEvent(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        engineEvent.registerCallback(errorCallback, CallbackErrorBehavior.throw);

        expect(() => engineEvent.trigger()).toThrow('Test Error');
        expect(errorCallback).toHaveBeenCalled();
    });

    it('removes the callback when a callback errors out with REMOVE behavior', () => {
        const engineEvent = new EngineEvent(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        engineEvent.registerCallback(errorCallback, CallbackErrorBehavior.remove);

        engineEvent.trigger();

        expect(mockLogger).toHaveBeenCalledWith(
            LogLevel.warn,
            LogCategory.event,
            expect.stringContaining('Removed callback'),
        );
        expect(errorCallback).toHaveBeenCalled();
        expect(() => engineEvent.trigger()).not.toThrow();
    });

    it('executes legacy event handler if provided', () => {
        const legacyCallback = jest.fn();
        legacyEventHandler.mockReturnValue(legacyCallback);

        const engineEvent = new EngineEvent(legacyEventHandler, mockLogger);

        engineEvent.trigger();

        expect(legacyEventHandler).toHaveBeenCalled();
        expect(legacyCallback).toHaveBeenCalled();
    });

    it('does not log if no logger provided for LOG behavior', () => {
        const engineEvent = new EngineEvent(() => undefined);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        engineEvent.registerCallback(errorCallback, CallbackErrorBehavior.log);

        engineEvent.trigger();

        expect(mockLogger).not.toHaveBeenCalled();
    });

    it('does not log if no logger provided for REMOVE behavior', () => {
        const engineEvent = new EngineEvent(() => undefined);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        engineEvent.registerCallback(errorCallback, CallbackErrorBehavior.remove);

        engineEvent.trigger();

        expect(mockLogger).not.toHaveBeenCalled();
    });
});

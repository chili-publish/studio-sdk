import { CallbackErrorBehavior, LogLevel, LogCategory } from '../../types/CommonTypes';
import { EventSubscription, EngineCallbackHandler } from '../../utils/EventSubscription';
import { ConfigHelper } from '../../utils/ConfigHelper';

describe('SingleSubscription', () => {
    test('When handler has no value, we expect to return null', () => {
        const subscription = new EngineCallbackHandler(() => undefined);

        const result = subscription.trigger('arg1', 'arg2');

        expect(result).toBeNull();
    });
});

describe('EventSubscription', () => {
    let subscription: EventSubscription<(...args: unknown[]) => unknown>;

    beforeEach(() => {
        subscription = new EventSubscription();
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
        subscription = new EventSubscription(legacyEventHandler);

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
        subscription = new EventSubscription(legacyEventHandler);

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

describe('EventSubscription Error Handling', () => {
    let mockLogger: jest.Mock;
    let legacyEventHandler: jest.Mock;

    beforeEach(() => {
        mockLogger = jest.fn();
        legacyEventHandler = jest.fn();
    });

    it('logs an error when a callback errors out with LOG behavior', () => {
        const eventSubscription = new EventSubscription(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        eventSubscription.registerCallback(errorCallback, CallbackErrorBehavior.LOG);

        eventSubscription.trigger();

        expect(mockLogger).toHaveBeenCalledWith(
            LogLevel.ERROR,
            LogCategory.EVENT,
            expect.stringContaining('Error in callback'),
        );
        expect(errorCallback).toHaveBeenCalled();
    });

    it('throws an error when a callback errors out with THROW behavior', () => {
        const eventSubscription = new EventSubscription(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        eventSubscription.registerCallback(errorCallback, CallbackErrorBehavior.THROW);

        expect(() => eventSubscription.trigger()).toThrow('Test Error');
        expect(errorCallback).toHaveBeenCalled();
    });

    it('removes the callback when a callback errors out with REMOVE behavior', () => {
        const eventSubscription = new EventSubscription(() => undefined, mockLogger);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        eventSubscription.registerCallback(errorCallback, CallbackErrorBehavior.REMOVE);

        eventSubscription.trigger();

        expect(mockLogger).toHaveBeenCalledWith(
            LogLevel.WARN,
            LogCategory.EVENT,
            expect.stringContaining('Removed callback'),
        );
        expect(errorCallback).toHaveBeenCalled();
        expect(() => eventSubscription.trigger()).not.toThrow();
    });

    it('executes legacy event handler if provided', () => {
        const legacyCallback = jest.fn();
        legacyEventHandler.mockReturnValue(legacyCallback);

        const eventSubscription = new EventSubscription(legacyEventHandler, mockLogger);

        eventSubscription.trigger();

        expect(legacyEventHandler).toHaveBeenCalled();
        expect(legacyCallback).toHaveBeenCalled();
    });

    it('does not log if no logger provided for LOG behavior', () => {
        const eventSubscription = new EventSubscription(() => undefined);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        eventSubscription.registerCallback(errorCallback, CallbackErrorBehavior.LOG);

        eventSubscription.trigger();

        expect(mockLogger).not.toHaveBeenCalled();
    });

    it('does not log if no logger provided for REMOVE behavior', () => {
        const eventSubscription = new EventSubscription(() => undefined);
        const errorCallback = jest.fn(() => {
            throw new Error('Test Error');
        });

        eventSubscription.registerCallback(errorCallback, CallbackErrorBehavior.REMOVE);

        eventSubscription.trigger();

        expect(mockLogger).not.toHaveBeenCalled();
    });
});

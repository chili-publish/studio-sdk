import { EventHelper, EventSubscription, SingleSubscription } from '../../utils/EventSubscription';

describe('SingleSubscription', () => {
    test('When handler has no value, we expect to return null', () => {
        const subscription = new SingleSubscription(() => undefined);

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

        const runtimeConfig = EventHelper.ensureSubscriptions({
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
            config: EventHelper.ensureSubscriptions(incomingConfig),
        };

        sdk.config.onActionsChanged = () => {
            counter = 100;
        };

        sdk.config.events.onActionsChanged.trigger([]);

        expect(counter).toBe(100);
    });
});

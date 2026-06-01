import { CallbackErrorBehavior, LogCategory, LogLevel } from '../../types/CommonTypes';
import { SdkEvent } from '../../utils/SdkEvent';

describe('SdkEvent', () => {
    test('should register and execute callbacks', () => {
        const sdkEvent = new SdkEvent<(value: string) => void>();
        const callback = jest.fn();

        sdkEvent.registerCallback(callback);
        sdkEvent.trigger('test-value');

        expect(callback).toHaveBeenCalledWith('test-value');
    });

    test('should unsubscribe callback', () => {
        const sdkEvent = new SdkEvent<(value: number) => void>();
        const callback = jest.fn();
        const unsubscribe = sdkEvent.registerCallback(callback);

        unsubscribe();
        sdkEvent.trigger(1);

        expect(callback).not.toHaveBeenCalled();
    });

    test('logs callback errors by default', () => {
        const logger = jest.fn();
        const sdkEvent = new SdkEvent<() => void>(logger);
        const callback = jest.fn(() => {
            throw new Error('Sdk event callback failed');
        });

        sdkEvent.registerCallback(callback);
        sdkEvent.trigger();

        expect(logger).toHaveBeenCalledWith(
            LogLevel.error,
            LogCategory.sdk,
            expect.stringContaining('Error in callback'),
        );
    });

    test('throws callback errors when configured', () => {
        const sdkEvent = new SdkEvent<() => void>();
        sdkEvent.registerCallback(
            () => {
                throw new Error('Sdk event callback failed');
            },
            CallbackErrorBehavior.throw,
        );

        expect(() => sdkEvent.trigger()).toThrow('Sdk event callback failed');
    });
});

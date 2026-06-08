import { LoggerFunction, MaybePromise } from '../types/CommonTypes';
import { MethodCompleteEvent, MethodInvokeEvent } from '../types/MethodInvocationTypes';
import { SdkEvent } from './SdkEvent';

export class SdkEvents {
    /**
     * Fired immediately before an instrumented SDK controller method is invoked.
     *
     * This event is synchronous with the method call and always precedes `onMethodCompleted`.
     */
    onMethodInvoked: SdkEvent<(event: MethodInvokeEvent) => MaybePromise<void>>;
    /**
     * Fired after an instrumented SDK controller method finishes.
     *
     * For async methods, this fires when the returned promise settles (resolved/rejected).
     * For sync methods, this fires right after the method returns or throws.
     */
    onMethodCompleted: SdkEvent<(event: MethodCompleteEvent) => MaybePromise<void>>;

    constructor(logger?: LoggerFunction) {
        this.onMethodInvoked = new SdkEvent<(event: MethodInvokeEvent) => MaybePromise<void>>(logger);
        this.onMethodCompleted = new SdkEvent<(event: MethodCompleteEvent) => MaybePromise<void>>(logger);
    }
}

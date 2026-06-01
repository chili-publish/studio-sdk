import { LoggerFunction, MaybePromise } from '../types/CommonTypes';
import { MethodCompleteEvent, MethodInvokeEvent } from '../types/MethodInvocationTypes';
import { SdkEvent } from './SdkEvent';

export class SdkEvents {
    onMethodInvoked: SdkEvent<(event: MethodInvokeEvent) => MaybePromise<void>>;
    onMethodCompleted: SdkEvent<(event: MethodCompleteEvent) => MaybePromise<void>>;

    constructor(logger?: LoggerFunction) {
        this.onMethodInvoked = new SdkEvent<(event: MethodInvokeEvent) => MaybePromise<void>>(logger);
        this.onMethodCompleted = new SdkEvent<(event: MethodCompleteEvent) => MaybePromise<void>>(logger);
    }
}

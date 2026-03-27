import { ActionEditorEvent } from '../types/ActionTypes';
import { Id } from '../types/CommonTypes';

export interface ActionEventErrorData {
    event: ActionEditorEvent;
    actionIds: Id[];
}

interface AsyncErrorBase {
    type: AsyncErrorType;
    message: string;
}

enum AsyncErrorType {
    action = 'action',
    dataRow = 'dataRow',
}

interface ExceptionContext {
    variableId?: Id;
}

interface EditorExceptionDto {
    type: string;
    code: number;
    message: string;
    context?: ExceptionContext;
}

export class ActionAsyncError implements AsyncErrorBase {
    type: AsyncErrorType;
    id?: string;
    event?: ActionEditorEvent;
    eventChain?: ActionEventErrorData[];
    message: string;

    constructor(message: string, id?: string, event?: ActionEditorEvent, eventChain?: ActionEventErrorData[]) {
        this.type = AsyncErrorType.action;
        this.message = message;
        this.id = id;
        this.event = event;
        this.eventChain = eventChain;
    }
}

export class DataRowAsyncError implements AsyncErrorBase {
    type: AsyncErrorType;
    count: number;
    exceptions: EditorExceptionDto[];
    message: string;

    constructor(count: number, message: string, exceptions: EditorExceptionDto[]) {
        this.type = AsyncErrorType.dataRow;
        this.count = count;
        this.message = message;
        this.exceptions = exceptions;
    }
}

export type AsyncError = ActionAsyncError | DataRowAsyncError;

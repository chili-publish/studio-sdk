import { Id } from '../types/CommonTypes';

export class ConnectorHttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string, options?: ErrorOptions) {
        super(message, options);

        this.statusCode = statusCode;
    }
}

interface VariableExceptionContext {
    id: Id;
}

export class VariableValueConstrainsViolationError extends Error {
    context: VariableExceptionContext;

    constructor(context: VariableExceptionContext, message: string, options: ErrorOptions) {
        super(message, options);
        this.context = context;
    }
}

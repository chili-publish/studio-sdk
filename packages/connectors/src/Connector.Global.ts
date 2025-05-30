import { ConnectorHttpError, FilePointer, StudioFormData } from './Connector.Shared';

/**
 * Interface for the constructor of ConnectorHttpError.
 */
export interface ConnectorHttpErrorConstructor {
    /**
     * Creates a new ConnectorHttpError instance.
     *
     * @param status - The HTTP status code associated with the error.
     * @param message - Optional error message.
     * @returns A new instance of ConnectorHttpError.
     */
    new (status: number, message?: string): ConnectorHttpError;

    /**
     * The prototype of ConnectorHttpError.
     */
    readonly prototype: ConnectorHttpError;
}

export interface StudioFormDataConstructor {
    new (): StudioFormData;

    /**
     * The prototype of StudioFormData.
     */
    readonly prototype: StudioFormData;
}

export interface FilePointerConstructor {
    new (id: string, url: string, name: string): FilePointer;

    /**
     * The prototype of FilePointer.
     */
    readonly prototype: FilePointer;
}

declare global {
    var ConnectorHttpError: ConnectorHttpErrorConstructor;
    var StudioFormData: StudioFormDataConstructor;
    var FilePointer: FilePointerConstructor;
}

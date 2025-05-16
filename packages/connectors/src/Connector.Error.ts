/**
 * A custom HTTP error for connectors.
 *
 * This should be thrown when any of the connector methods
 * failed due to a non OK HTTP status code.
 *
 * The framework will be able to handle this error in a better way
 * versus throwing a generic `Error`.
 */
export interface ConnectorHttpError extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    readonly status: number;
}

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
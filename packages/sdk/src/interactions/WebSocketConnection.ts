/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorAPI } from '../types/CommonTypes';
import * as ws from 'ws';
/**
 * WebSocket based proxy for remote procedure calls
 * Replaced the previous gRPC implementation with WebSockets
 */
const wsProxy = (url: string) => {
    // Make sure the URL has the correct protocol for WebSocket
    let wsUrl = url;
    if (wsUrl.startsWith('http://')) {
        wsUrl = wsUrl.replace('http://', 'ws://');
    } else if (wsUrl.startsWith('https://')) {
        wsUrl = wsUrl.replace('https://', 'wss://');
    } else if (!wsUrl.startsWith('ws://') && !wsUrl.startsWith('wss://')) {
        wsUrl = `ws://${wsUrl}`;
    }

    // Store pending requests
    interface PendingRequest {
        resolve: (value: any) => void;
        reject: (reason: any) => void;
    }
    const pendingRequests = new Map<string, PendingRequest>();

    // WebSocket connection management
    let wsConnection: ws.WebSocket | null = null;
    let connecting = false;
    const messageQueue: { command: any }[] = [];
    const waitingForConnection: Array<() => void> = [];

    // Function to ensure WebSocket connection
    const ensureConnection = (): Promise<void> => {
        if (wsConnection && wsConnection.readyState === ws.WebSocket.OPEN) {
            return Promise.resolve();
        }

        if (connecting) {
            return new Promise<void>((resolve) => {
                waitingForConnection.push(resolve);
            });
        }

        connecting = true;
        return new Promise<void>((resolve, reject) => {
            try {
                // In Node.js environment, use the 'ws' package
                wsConnection = new ws.WebSocket(wsUrl);

                wsConnection.onopen = () => {
                    connecting = false;
                    // Process any queued messages
                    while (messageQueue.length > 0) {
                        const msg = messageQueue.shift();
                        if (msg && wsConnection) {
                            wsConnection.send(JSON.stringify(msg.command));
                        }
                    }
                    // Resolve this promise and any waiting ones
                    resolve();
                    waitingForConnection.forEach((callback) => callback());
                    waitingForConnection.length = 0;
                };

                wsConnection.onmessage = (event: ws.MessageEvent) => {
                    try {
                        const response = JSON.parse(event.data as string);
                        const request = pendingRequests.get(response.id);
                        if (request) {
                            const responseData = {
                                success: response.success,
                                response: response.data,
                            };
                            request.resolve(responseData);
                            pendingRequests.delete(response.id);
                        }
                    } catch (error) {
                        console.error('Error processing WebSocket message:', error);
                    }
                };

                wsConnection.onclose = () => {
                    wsConnection = null;
                    // Reject all pending requests
                    pendingRequests.forEach((request) => {
                        request.reject(new Error('WebSocket connection closed'));
                    });
                    pendingRequests.clear();
                };

                wsConnection.onerror = (error) => {
                    if (connecting) {
                        connecting = false;
                        reject(error);
                        waitingForConnection.forEach((callback) => callback());
                        waitingForConnection.length = 0;
                    }
                    console.error('WebSocket error:', error);
                };
            } catch (error) {
                connecting = false;
                reject(error);
            }
        });
    };

    // Create and return the proxy object
    return Promise.resolve(new Proxy({} as EditorAPI, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        get(target, prop, _receiver) {

            // this was a pain to understand
            if (prop === 'then') {
                return undefined;
            }

            // big console message with all debug info, think really big about the console ascii art
            console.log(`
                ${'='.repeat(100)}
                WebSocket Connection Debug Info
                ${'='.repeat(100)}
                URL: ${wsUrl}
                Prop: ${prop?.toString()}
                Connection State: ${wsConnection?.readyState}
                Pending Requests: ${pendingRequests.size}
                Message Queue: ${messageQueue.length}
                Waiting for Connection: ${waitingForConnection.length}
                ${'='.repeat(100)}
            `);

            // print call stack
            console.trace('stack:');
            
            if (!(prop in target)) {
                return async function (...args: any[]) {
                    try {
                        // Generate a unique ID for the command
                        const commandId = Math.random().toString(36).substring(2);

                        // Prepare the command
                        const command = {
                            id: commandId,
                            command: prop,
                            arguments: args,
                        };

                        // Ensure we have a connection before sending
                        await ensureConnection();

                        return new Promise((resolve, reject) => {
                            pendingRequests.set(commandId, { resolve, reject });

                            if (wsConnection && wsConnection.readyState === ws.WebSocket.OPEN) {
                                wsConnection.send(JSON.stringify(command));
                            } else {
                                // Queue the message if not yet connected
                                messageQueue.push({ command });
                            }

                            // Set timeout for requests
                            setTimeout(() => {
                                if (pendingRequests.has(commandId)) {
                                    pendingRequests.delete(commandId);
                                    reject(new Error('Request timeout'));
                                }
                            }, 30000); // 30 second timeout
                        });
                    } catch (error) {
                        console.error('Error in WebSocket proxy call:', error);
                        throw error;
                    }
                };
            }
            return target[prop as string];
        },
    }));
};

export default wsProxy;

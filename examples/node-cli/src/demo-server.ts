import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'crypto';
import { AddressInfo } from 'net';

interface Command {
    id: string;
    command: string;
    argumentsJson: string;
}

interface MockDocument {
    id: string;
    name: string;
    pages: any[];
    variables: any[];
}

class DemoServer {
    private wss: WebSocketServer;
    private mockDocument: MockDocument = {
        id: 'demo-doc',
        name: 'Demo Document',
        pages: [],
        variables: []
    };

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        this.setupServer();
    }

    private setupServer() {
        console.log('Demo WebSocket server starting...');

        this.wss.on('listening', () => {
            const address = this.wss.address() as AddressInfo;
            console.log('Demo server listening on port', address.port);
        });

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            ws.on('message', async (data: Buffer) => {
                try {
                    const command = JSON.parse(data.toString()) as Command;
                    console.log('Received command:', command);

                    // Process the command and send response
                    const response = await this.handleCommand(command);
                    ws.send(JSON.stringify(response));
                } catch (error) {
                    console.error('Error processing message:', error);
                    ws.send(JSON.stringify({
                        id: randomUUID(),
                        success: false,
                        responseJson: JSON.stringify({ error: 'Failed to process command' })
                    }));
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });

            ws.on('error', (error: Error) => {
                console.error('WebSocket error:', error);
            });
        });

        this.wss.on('error', (error: Error) => {
            console.error('Server error:', error);
        });
    }

    private async handleCommand(command: Command): Promise<any> {
        // Simulate some async processing
        await new Promise(resolve => setTimeout(resolve, 100));

        let responseData;
        switch (command.command) {
            case 'document.load':
                responseData = this.mockDocument;
                break;
            case 'variable.list':
                responseData = this.mockDocument.variables;
                break;
            case 'document.save':
                const saveData = JSON.parse(command.argumentsJson);
                this.mockDocument = { ...this.mockDocument, ...saveData };
                responseData = { success: true };
                break;
            default:
                responseData = {
                    message: `Received command: ${command.command}`,
                    args: command.argumentsJson
                };
        }

        console.log('Response data:', responseData);

        return {
            id: command.id,
            success: true,
            responseJson: JSON.stringify(responseData)
        };
    }

    public close() {
        return new Promise<void>((resolve) => {
            this.wss.close(() => {
                console.log('Server closed');
                resolve();
            });
        });
    }
}

// Start the server if this file is run directly
if (require.main === module) {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    new DemoServer(port);
}

export default DemoServer; 

async function runDemo() {
    // Start the demo server
    const port = 3001;
    const server = new DemoServer(port);

    // Give the server a moment to start
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Handle process termination
    process.on('SIGINT', async () => {
        console.log('\nReceived SIGINT. Cleaning up...');
        await server.close();
        process.exit(0);
    });
}

runDemo().catch(error => {
    console.error('Demo failed:', error);
    process.exit(1);
}); 
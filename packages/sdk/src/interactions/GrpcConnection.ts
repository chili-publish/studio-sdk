const grpcProxy = (url: string) => {
    const isNode = typeof process !== 'undefined' && process.versions?.node;
    const webPackTarget = typeof window === 'undefined';

    if (isNode || webPackTarget) {
        const grpc = require('@grpc/grpc-js');
        const protoLoader = require('@grpc/proto-loader');

        // Define the proto file content as a string
        const PROTO_CONTENT = `
syntax = "proto3";

service TemplateModificationService {
  rpc RunSession(stream Command) returns (stream CommandResponse) {}
  rpc HealthCheck(HealthCheckRequest) returns (HealthCheckResponse) {}
}

message Command {
    string id = 1;
    string command = 2;
    string argumentsJson = 3;
}

message CommandResponse {
    string id = 1;
    bool success = 2;
    string responseJson = 3;
}

message HealthCheckRequest {}
message HealthCheckResponse {}
`;

        // Load proto definition
        const packageDefinition = protoLoader.loadSync(
            Buffer.from(PROTO_CONTENT),
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            }
        );

        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const templateService = protoDescriptor.TemplateModificationService;
        return new Proxy({} as any, {
            get(target, prop, receiver) {
                if (!(prop in target)) {
                    return async function (...args: any[]) {
                        // Create gRPC client
                        const client = new templateService(
                            url, // Replace with your gRPC server address
                            grpc.credentials.createInsecure()
                        );

                        // Generate a unique ID for the command
                        const commandId = Math.random().toString(36).substring(2);

                        // Prepare the command
                        const command = {
                            id: commandId,
                            command: prop,
                            argumentsJson: JSON.stringify(args)
                        };

                        return new Promise((resolve, reject) => {
                            // Create the stream
                            const call = client.RunSession();

                            // Handle incoming responses
                            let responseData: any;
                            call.on('data', (response: any) => {
                                if (response.id === commandId) {
                                    responseData = {
                                        success: response.success,
                                        response: JSON.parse(response.responseJson)
                                    };
                                }
                            });

                            call.on('end', () => {
                                client.close();
                                resolve(responseData || { success: false, response: 'No response received' });
                            });

                            call.on('error', (error: any) => {
                                client.close();
                                reject(error);
                            });

                            // Send the command
                            call.write(command);
                            call.end(); // End the stream after sending
                        });
                    };
                }
                return target[prop as string];
            }
        });
    }
};

export default grpcProxy;

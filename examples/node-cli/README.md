# Studio SDK Node.js CLI Example

This example demonstrates how to use the Studio SDK in a Node.js CLI application. It shows how to:
- Connect to the gRPC service
- Perform health checks
- Run interactive sessions with command input

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A running Studio SDK gRPC service (default: localhost:50051)

## Installation

1. Make sure you've built the main SDK package first:
```bash
cd ../../packages/sdk
npm install
npm run build
```

2. Install the CLI example dependencies:
```bash
npm install
```

## Usage

You can run the CLI in development mode:
```bash
npm run dev
```

Or build and run the production version:
```bash
npm run build
npm start
```

### Available Commands

1. Health Check:
```bash
npm start health
```

2. Interactive Session:
```bash
npm start run-session
```

In the interactive session, you can enter commands that will be sent to the SDK. Type 'exit' to quit the session.

## Example Commands

```bash
# Check service health
npm start health

# Start interactive session
npm start run-session
```

## Notes

- The CLI connects to `localhost:50051` by default
- Make sure your Studio SDK service is running before using the CLI
- The interactive session supports any command that the SDK provides
- Commands in the interactive session should be space-separated (command arg1 arg2)

## Building the Linux Executable

```bash
# Build TypeScript files
yarn build

# Package into executable
yarn package
```

This will create a Linux executable at `dist/bin/studio-sdk-node-cli-example`.

## Running the Executable

```bash
# Execute directly
./dist/bin/studio-sdk-node-cli-example

# Or with parameters
./dist/bin/studio-sdk-node-cli-example start -w http://localhost:3001
```
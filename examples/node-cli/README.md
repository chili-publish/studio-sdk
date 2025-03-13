# CHILI GraFx Studio SDK CLI

A command-line interface for interacting with CHILI GraFx Studio via WebSockets.

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
npm run build
```

## Usage

```bash
# Start the interactive REPL with direct URL argument
npm run start start ws://localhost:3001

# Or with the -w/--websocket option
npm run start start -w ws://localhost:3001
npm run start start --websocket ws://localhost:3001

# Or if you install globally or use npx
studio-sdk-cli start -w ws://localhost:3001
```

### Available Commands

1. Start interactive REPL:
```bash
# Using direct argument
npm start start ws://localhost:3001

# Using websocket option
npm start start -w ws://localhost:3001
```

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

## Commands

- `start <websocketUrl>`: Connect to a Studio WebSocket and start an interactive REPL

## Interactive REPL Features

- Command history (up/down arrow keys)
- Auto-suggestions for SDK methods
- Type inference for parameters
- Supports both expressions and statements
- Execute JavaScript expressions against the SDK instance

## Command Reference

### `start` Command

Start an interactive REPL connected to a Studio WebSocket.

```
studio-sdk-cli start [websocketUrl] [options]
```

#### Arguments:
- `websocketUrl`: WebSocket URL to connect to (alternative to -w option)

#### Options:
- `-w, --websocket <url>`: WebSocket URL to connect to (e.g., ws://localhost:3001)

#### Examples:
```bash
studio-sdk-cli start ws://localhost:3001
studio-sdk-cli start -w ws://localhost:3001
studio-sdk-cli start --websocket wss://my-studio-instance.com/ws
```

## Building for Distribution

```bash
# Build TypeScript files
npm run build

# Run the CLI
node ./dist/index.js start -w ws://localhost:3001
```
````

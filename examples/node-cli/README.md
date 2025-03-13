# CHILI GraFx Studio SDK CLI

A command-line interface for interacting with CHILI GraFx Studio via WebSockets.

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A running Studio WebSocket server (example demo server included)

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
node ./dist/index.js start ws://localhost:3001

# Or with the -w/--websocket option
node ./dist/index.js start -w ws://localhost:3001
node ./dist/index.js start --websocket ws://localhost:3001

# Start the demo server (in a separate terminal)
node ./dist/demo-server.js
```

## Demo Server

This example includes a WebSocket demo server that simulates a Studio connection for testing the CLI without a real Studio instance:

```bash
# Start the demo server on port 3001 (default)
node ./dist/demo-server.js

# Optionally specify a port
PORT=3002 node ./dist/demo-server.js
```

## Interactive REPL Features

- Command history (up/down arrow keys)
- Tab completion for SDK methods and properties
- Auto-suggestions for available commands
- Support for JavaScript expressions and statements
- Execute code against the connected SDK instance

## REPL Usage Examples

Once in the REPL, you can execute JavaScript expressions against the SDK:

```javascript
// Get document information
sdk.document.load()

// Chain methods
sdk.document.page.getAll().then(pages => console.log(pages))
```

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

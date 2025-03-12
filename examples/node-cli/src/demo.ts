import DemoServer from './demo-server';
import { spawn } from 'child_process';
import { join } from 'path';

async function runDemo() {
    // Start the demo server
    const port = 3001;
    const server = new DemoServer(port);

    // Give the server a moment to start
    await new Promise(resolve => setTimeout(resolve, 1000));

    // // Start the CLI client
    // const cliProcess = spawn('ts-node', [
    //     join(__dirname, 'index.ts'),
    //     'start',
    //     '-w',
    //     `ws://localhost:${port}`
    // ], {
    //     stdio: 'inherit'
    // });

    // // Handle CLI process exit
    // cliProcess.on('exit', async (code) => {
    //     console.log(`CLI process exited with code ${code}`);
    //     await server.close();
    //     process.exit(code || 0);
    // });

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
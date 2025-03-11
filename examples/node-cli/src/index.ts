#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import SDK from '@chili-publish/studio-sdk';

const program = new Command();

// Create a connection to the gRPC service
const sdk = new SDK({});
sdk.loadEditor()

program
    .name('studio-sdk-cli')
    .description('CLI example for using the Studio SDK')
    .version('1.0.0');

program
    .command('health')
    .description('Check the health of the Studio SDK service')
    .action(async () => {
        try {
            const response = await sdk.document.load('{}');
            console.log('Health check response:', response);
        } catch (error) {
            console.error('Health check failed:', error);
        }
    });

program
    .command('run-session')
    .description('Start an interactive session with the Studio SDK')
    .action(async () => {
        try {
            while (true) {
                const { command } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'command',
                        message: 'Enter a command (or "exit" to quit):',
                        default: 'help'
                    }
                ]);

                if (command.toLowerCase() === 'exit') {
                    break;
                }

                try {
                    // Parse the command and any arguments
                    const [cmd, ...args] = command.split(' ');
                    const response = await (sdk as any)[cmd](...args);
                    console.log('Response:', response);
                } catch (error) {
                    console.error('Command failed:', error);
                }
            }
        } catch (error) {
            console.error('Session error:', error);
        }
    });

program.parse(); 
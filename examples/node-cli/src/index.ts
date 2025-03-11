import { Command } from 'commander';
import inquirer from 'inquirer';
import SDK from '@chili-publish/studio-sdk';
import chalk from 'chalk';

const program = new Command();

program
    .name('studio-sdk-cli')
    .description('CLI REPL for Studio SDK - Execute JS statements directly on the SDK')
    .version('1.0.0')
    .requiredOption('-w, --websocket-url <url>', 'WebSocket URL for SDK connection');

// Help command
program
    .command('help')
    .description('Show available commands and usage')
    .action(() => {
        console.log(chalk.blue('\nStudio SDK REPL Commands:'));
        console.log('  - Enter JS expressions to execute on the SDK (e.g., "document.load(\' {}\')" )');
        console.log('  - Use "await" for async operations');
        console.log('  - Type "exit" or "quit" to exit');
        console.log('  - Type "clear" to clear the screen');
        console.log(chalk.yellow('\nExamples:'));
        console.log('  document.load(\'{"id": "test"}\')');
        console.log('  await variable.list()');
        console.log(chalk.yellow('\nNote:'));
        console.log('  WebSocket URL must be provided using -w or --websocket-url');
    });

// Format result output
function formatResult(result: any) {
    if (result === undefined) return chalk.gray('undefined');
    if (result === null) return chalk.gray('null');
    try {
        return chalk.green(JSON.stringify(result, null, 2));
    } catch {
        return chalk.green(String(result));
    }
}

// Main REPL function
async function startREPL(websocketUrl: string) {
    console.log(chalk.green('Studio SDK REPL started'));
    console.log('Connected to WebSocket:', websocketUrl);
    console.log('Type "help" for instructions, "exit" to quit');
    
    // Initialize SDK with WebSocket URL
    const sdk = new SDK({
        editorLink: websocketUrl        
    });
    
    // Store variables between commands
    const context = { sdk };
    sdk.loadEditor();
    
    while (true) {
        try {
            const { input } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'input',
                    message: 'sdk >',
                    prefix: chalk.cyan('sdk >'),
                }
            ]);

            const command = input.trim();
            const commandLower = command.toLowerCase();

            // Handle special commands
            if (commandLower === 'exit' || commandLower === 'quit') {
                console.log(chalk.green('Goodbye!'));
                process.exit(0);
            }
            if (commandLower === 'clear') {
                console.clear();
                continue;
            }
            if (commandLower === 'help') {
                program.help();
                continue;
            }

            // Execute the JavaScript statement
            if (command) {
                try {
                    // Create a function context with sdk available
                    const evalFunction = new Function('sdk', 'context', `
                        return (async () => {
                            ${command.includes('return') ? command : 'return ' + command};
                        })();
                    `);

                    const result = await evalFunction(sdk, context);
                    
                    // Store result in context if it's an assignment
                    if (command.includes('=')) {
                        const varName = command.split('=')[0].trim();
                        if (varName && !command.includes('==') && !command.includes('===') && !varName.includes(' ')) {
                            //@ts-ignore
                            context[varName] = result;
                        }
                    }

                    // Display the command and result
                    console.log(chalk.yellow('\nCommand:'), command);
                    console.log(chalk.cyan('Result:'));
                    console.log(formatResult(result));
                    console.log(); // Empty line for readability
                } catch (error) {
                    console.log(chalk.yellow('\nCommand:'), command);
                    console.error(chalk.red('Error:'), error);
                    console.log();
                }
            }
        } catch (error) {
            console.error(chalk.red('REPL Error:'), error);
        }
    }
}

// Start the REPL
program
    .command('start')
    .description('Start the REPL interface')
    .action(() => {
        const options = program.opts();
        startREPL(options.websocketUrl);
    });

program.parse();

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}
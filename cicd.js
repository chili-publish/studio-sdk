/**
 * cicd.js
 * 
 * This script is used to execute commands in a specific directory using yarn.
 * 
 * Examples:
 *
 * 1. To clean the project in the sdk directory:
 *    node cicd.js sdk yarn clean
 *
 * 2. To build the project in the actions directory:
 *    node cicd.js actions yarn build
 *
 * 3. To build the project for development in the connectors directory:
 *    node cicd.js connectors yarn build:dev
 */
const fs = require('fs');
const { spawn } = require('child_process');
const process = require('process');
const path = require('path');

function executeCommandInDirectory(directory, command, callback) {
    // Check if directory starts with './packages/' or 'packages/', if not prepend it
    if (!directory.startsWith('./packages/') && !directory.startsWith('packages/')) {
        directory = path.join('./packages/', directory);
    }

    // Check if the directory exists
    if (!fs.existsSync(directory)) {
        return callback(new Error('Directory does not exist'));
    }

    // Get the current working directory
    const originalDirectory = process.cwd();

    try {
        // Change to the target directory
        process.chdir(directory);

        // Split command into base command and arguments
        const [baseCommand, ...commandArgs] = command.split(' ');

        // Execute the command
        const child = spawn(baseCommand, commandArgs, { stdio: 'inherit' });

        child.on('exit', (code) => {
            // Change back to the original directory
            process.chdir(originalDirectory);

            if (code !== 0) {
                return callback(new Error(`Command exited with code ${code}`));
            }

            callback(null);
        });
    } catch (err) {
        // If an error occurred while changing directories or executing the command,
        // change back to the original directory and pass the error to the callback
        process.chdir(originalDirectory);
        callback(err);
    }
}

// Get arguments from command line
const args = process.argv.slice(2); // first two args are "node" and script path
if (args.length < 2) {
    console.error('Please provide a directory and a command');
    process.exit(1);
}

const [directory, ...commandParts] = args;
const command = commandParts.join(' ');

// Usage
executeCommandInDirectory(directory, command, (err) => {
    if (err) {
        console.error(err);
    }
});
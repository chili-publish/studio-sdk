// Import required modules
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

// Get arguments from command line
const args = process.argv.slice(2);

// Check if arguments are provided
if (args.length < 2) {
    console.error("Invalid arguments. Please provide two arguments: a comma-separated list of subfolders and a command to execute.");
    console.error("Example: node cicd.js sdk,actions yarn build");
    process.exit(1);
}

// Split the first argument into an array of subfolders
const subfolders = args[0].split(',');

// The command to execute
const command = args[1];

// arguments to pass to the command
const commandArgs = args.slice(2);

// Iterate over subfolders
for (let subfolder of subfolders) {
    // Construct the full path to the subfolder
    const folderPath = path.join(__dirname, 'packages', subfolder.trim());

    // Check if the subfolder exists
    if (!fs.existsSync(folderPath)) {
        console.error(`The folder ${folderPath} does not exist.`);
        process.exit(1);
    }

    console.log(`Executing command '${command}' with arguments '${commandArgs}' in folder ${folderPath}`);

    try {
        // Execute the command synchronously
        const output = spawnSync(command, commandArgs, {
            cwd: folderPath,
            stdio: 'inherit'  // Show command output in console in real-time
        });

        if (output.status != 0){
            console.error(`Command execution failed in folder ${folderPath}`);
            process.exit(1);
        }
    } catch (error) {
        // If the command fails, stop the entire script execution
        console.error(`Command execution failed in folder ${folderPath}`);
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
const child_process = require('child_process');

// read version property
const version = require('./common').getRootPackageVersion();

function runCommand(command, args) {
    const spawned = child_process.spawnSync(command, args, { stdio: 'inherit' });

    if (spawned.error) {
        console.error(`Error running ${command} ${args.join(' ')}:`, spawned.error);
        process.exit(spawned.status);
    }

    if (spawned.status !== 0) {
        console.error(`Command ${command} ${args.join(' ')} exited with status code ${spawned.status}`);
        process.exit(spawned.status);
    }
}

// use default node to spawn a git command
console.info(`Adding all package.json files to git commit`);
runCommand('git', ['add', '**/**/package.json']);

console.info(`Adding root package.json file to git commit`);
runCommand('git', ['add', 'package.json']);

// commit
console.info(`Committing changes to git`);
runCommand('git', ['commit', '-m', `CI: bumps version to ${version} [skip ci]`]);

console.info(`Pushing changes to git`);
runCommand('git', ['push']);
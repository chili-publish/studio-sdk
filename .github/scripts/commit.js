const child_process = require('child_process');

// read version property
const version = require('./common').getRootPackageVersion();

async function run() {

    // use default node to spawn a git command
    child_process.spawn('git', ['add', '**/**/package.json']);
    child_process.spawn('git', ['add', 'package.json']);

    // commit
    child_process.spawn('git', ['commit', '-m', `CI: bumps version to ${version} [skip ci]`]);
}

run();
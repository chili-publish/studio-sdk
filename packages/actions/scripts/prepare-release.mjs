import fs from 'fs-extra';
import path from 'path';
import findRoot from 'find-root';

async function main() {
    // Find the root of the repository and change the working directory
    const root = findRoot(process.cwd());
    process.chdir(root);

    console.log('Preparing release...');
    console.log(`Working directory: ${root}`);

    // Read package.json
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'));
    const apiVersion = packageJson.apiVersion;
    const sdkVersion = packageJson.version;
    const prId = process.env.CI_PR_ID;

    const isPR = prId !== undefined;

    // Read studio-engine.json
    const studioEngineJson = JSON.parse(await fs.readFile('../sdk/editor-engine.json', 'utf-8'));
    const engineVersion = studioEngineJson.current;

    console.log(`API version: ${apiVersion}`);
    console.log(`SDK version: ${sdkVersion}`);
    console.log(`Engine version: ${engineVersion}`);

    if (isPR) {
        console.log(`PR id: ${prId}`);
    }

    // Define the destination directories
    const apiDestDir = path.join('cdn', 'actions', 'api', apiVersion);
    const sdkDestDir = path.join('cdn', 'actions', 'sdk', sdkVersion);
    const engineDestDir = path.join('cdn', 'actions', 'engine', engineVersion);
    const latestDestDir = path.join('cdn', 'actions', 'latest');
    const prDestDir = isPR ? path.join('cdn', 'actions', 'pr', prId) : undefined;

    // Copy all the files in packages/actions/out/ to the destination directories
    await fs.copy('out', apiDestDir);
    await fs.copy('out', sdkDestDir);
    await fs.copy('out', engineDestDir);
    await fs.copy('out', latestDestDir);
    if (prDestDir) {
        await fs.copy('out', prDestDir);
    }

    console.log('Files copied successfully');
}

main();

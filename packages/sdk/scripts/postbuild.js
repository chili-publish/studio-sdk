// Temporary script to preserver the previous behavior for sub-path imports from integrators
// Should be removed in V2 of SDK
const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, '../lib');
const sdkDir = path.join(libDir, 'sdk');
const connectorTypesDir = path.join(libDir, 'connector-types');

// Function to move files from src to dest
function moveFiles(src, dest) {
    if (!fs.existsSync(src)) return;

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);

    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            moveFiles(srcPath, destPath);
        } else {
            fs.renameSync(srcPath, destPath);
        }
    }
}

// Move files from lib/sdk to lib
if (fs.existsSync(sdkDir)) {
    moveFiles(sdkDir, libDir);
    fs.rmSync(sdkDir, { recursive: true, force: true });
}

// Move connector-types one level up
if (fs.existsSync(connectorTypesDir)) {
    const parentDir = path.join(libDir, '..');
    const newConnectorTypesDir = path.join(parentDir, 'connector-types');

    moveFiles(connectorTypesDir, newConnectorTypesDir);
    fs.rmSync(connectorTypesDir, { recursive: true, force: true });
}

console.log('Post-build file reorganization completed successfully!'); 
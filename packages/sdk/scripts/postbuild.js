// Temporary script to preserver the previous behavior for sub-path imports from integrators
// Should be removed in V2 of SDK
const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, '../lib');
const sdkDir = path.join(libDir, 'sdk');
const connectorTypesDir = path.join(libDir, 'connector-types');

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

// Flatten declaration files emitted by vite-plugin-dts
if (fs.existsSync(sdkDir)) {
    moveFiles(sdkDir, libDir);
    fs.rmSync(sdkDir, { recursive: true, force: true });
}

// Declaration files in lib/ reference ../../../connector-types/src
if (fs.existsSync(connectorTypesDir)) {
    const connectorTypesOutputDir = path.join(libDir, '..', 'connector-types');

    moveFiles(connectorTypesDir, connectorTypesOutputDir);
    fs.rmSync(connectorTypesDir, { recursive: true, force: true });
}

console.log('Post-build file reorganization completed successfully!');

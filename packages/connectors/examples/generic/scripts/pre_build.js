// copy all contents of sdk/types to build/types
const fs = require('fs');
const path = require('path');

const typesPath = path.resolve(__dirname, '..', 'sdk', 'types');
const outputTypesPath = path.resolve(__dirname, '..', 'build', 'types');

fs.mkdirSync(outputTypesPath, { recursive: true });

fs.readdirSync(typesPath).forEach((file) => {

    fs.copyFileSync(path.resolve(typesPath, file), path.resolve(outputTypesPath, file));
    }
);

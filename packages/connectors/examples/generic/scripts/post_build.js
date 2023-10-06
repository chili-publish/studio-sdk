// read connector.template.json and replace [[VERSION]] with content of build/index.js
const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, '..', 'connector.template.json');
const outputJsonPath = path.resolve(__dirname, '..', 'build', 'connector.json');
const connectorPath = path.resolve(__dirname, '..', 'build', 'index.js');
const connector = require(connectorPath);

// read template and replace [[VERSION]] with content of build/index.js
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
template.script = fs.readFileSync(connectorPath, 'utf8');

// if template.script starts with export class, remove the export
if (template.script.startsWith('export class')) {
    template.script = template.script.replace('export class', 'class');
}

fs.writeFileSync(outputJsonPath, JSON.stringify(template, null, 2));
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const NEXT_DIR = path.resolve(__dirname, '../packages/sdk/src/next');
const INDEX_FILE = path.resolve(NEXT_DIR, 'index.ts');

// RegEx patterns to match different export styles
const exportTypeRegex = /export\s+type\s+(?:{([^}]*)}\s+from\s+['"]([^'"]+)['"]|(\w+)\s+from\s+['"]([^'"]+)['"])/g;
const exportDirectRegex = /export\s+(?:{([^}]*)}\s+from\s+['"]([^'"]+)['"]|(\w+)\s+from\s+['"]([^'"]+)['"])/g;

async function scanFiles() {
  // Get all .ts files in the directory recursively
  async function getFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getFiles(res);
      } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts') && entry.name !== 'index.ts') {
        return res;
      } else {
        return [];
      }
    }));
    return files.flat().filter(Boolean);
  }

  const files = await getFiles(NEXT_DIR);
  const exports = new Map();

  // Process each file to find exports
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const relativePath = path.relative(NEXT_DIR, file).replace(/\.ts$/, '');
    const importPath = './' + relativePath.replace(/\\/g, '/');

    // Extract direct exports
    let match;
    while ((match = exportDirectRegex.exec(content)) !== null) {
      if (match[1]) { // Named exports: export { X, Y } from './module'
        const namedExports = match[1].split(',').map(e => e.trim());
        const source = match[2];
        namedExports.forEach(exp => {
          // Handle "export { X as Y }" pattern
          const parts = exp.split(/\s+as\s+/);
          const name = parts.length > 1 ? parts[1] : parts[0];
          exports.set(name, { type: false, name, source: importPath });
        });
      } else if (match[3]) { // Default export: export X from './module'
        const name = match[3];
        const source = match[4];
        exports.set(name, { type: false, name, source: importPath });
      }
    }

    // Extract type exports
    exportTypeRegex.lastIndex = 0; // Reset regex index
    while ((match = exportTypeRegex.exec(content)) !== null) {
      if (match[1]) { // Named type exports: export type { X, Y } from './module'
        const namedExports = match[1].split(',').map(e => e.trim());
        const source = match[2];
        namedExports.forEach(exp => {
          // Handle "export type { X as Y }" pattern
          const parts = exp.split(/\s+as\s+/);
          const name = parts.length > 1 ? parts[1] : parts[0];
          exports.set(name, { type: true, name, source: importPath });
        });
      } else if (match[3]) { // Default type export: export type X from './module'
        const name = match[3];
        const source = match[4];
        exports.set(name, { type: true, name, source: importPath });
      }
    }
  }

  return Array.from(exports.values());
}

async function updateIndexFile(exports) {
  const indexContent = await readFile(INDEX_FILE, 'utf8');
  
  // Group exports by source file
  const groupedExports = exports.reduce((acc, exp) => {
    if (!acc[exp.source]) {
      acc[exp.source] = { types: [], values: [] };
    }
    
    if (exp.type) {
      acc[exp.source].types.push(exp.name);
    } else {
      acc[exp.source].values.push(exp.name);
    }
    
    return acc;
  }, {});

  // Generate the new export statements
  let newExports = '';
  for (const [source, { types, values }] of Object.entries(groupedExports)) {
    if (values.length) {
      newExports += `export { ${values.join(', ')} } from '${source}';\n`;
    }
    if (types.length) {
      newExports += `export type { ${types.join(', ')} } from '${source}';\n`;
    }
  }

  // Write the updated content back to index.ts
  await writeFile(INDEX_FILE, newExports);
  console.log('Successfully updated exports in index.ts');
}

// Main execution
async function main() {
  try {
    const exports = await scanFiles();
    await updateIndexFile(exports);
  } catch (error) {
    console.error('Error updating exports:', error);
  }
}

main();

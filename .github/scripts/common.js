const glob = require('glob');
const fs = require('fs');

// function to get the path of the first package.json file found in all parent folders
function getPackageJsonPath() {

    // get current working directory
    let cwd = process.cwd();

    // while we have not reached the root folder
    while (cwd !== '/') {

        // get all package.json files in current folder
        const packageJsonFiles = glob.sync('package.json', { cwd });

        // if we found a package.json file
        if (packageJsonFiles.length > 0) {

            // return the path to the first one
            return `${cwd}/${packageJsonFiles[0]}`;
        }

        // move up one folder
        cwd = `${cwd}/..`;
    }

    // if we reach the root folder, return null
    return null;
}

function getRootPackageVersion() {

    // read repository root package.json
    const packageJsonPath = getPackageJsonPath();

    if (!packageJsonPath) {
        console.error('Could not find package.json file in repository root');
        process.exit(1);
    }

    console.info(`Found package.json file in ${packageJsonPath}`);

    // read file and parse to json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // read version property
    const version = packageJson.version;
    return version;
}

// export function so they can be imported using requires('common.js')
module.exports = {
    getRootPackageVersion,
};
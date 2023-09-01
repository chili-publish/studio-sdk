/* eslint-disable no-console */
const fs = require('fs');
const glob = require('glob');

// List of allowed licenses
const allowedLicenses = ['MIT', 'BSD', 'APACHE-2.0'];

// Function to read package.json and get dependencies
function getDependencies(packageJsonPath) {
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath));
    // add ...packageData.devDependencies to check dev dependencies
    return { ...packageData.dependencies };
}

// Function to get license from a package in node_modules
function getLicense(dependency) {
    const packageJsonPaths = glob.sync(`**/node_modules/${dependency}/package.json`, { ignore: "**/node_modules/**/node_modules/**" });

    if (packageJsonPaths.length === 0) {
        return null;
    }

    // Use the first matching package.json file
    const packageData = JSON.parse(fs.readFileSync(packageJsonPaths[0]));

    if (!packageData.license) {
        return null;
    }

    // Handle different license field formats
    if (typeof packageData.license === 'string') {
        return packageData.license;
    } else if (Array.isArray(packageData.license)) {
        return packageData.license;
    } else if (typeof packageData.license === 'object' && packageData.license.type) {
        return packageData.license.type;
    }

    return null;
}

console.log("Checking licenses...");

// Find all package.json files in the project excluding node_modules
glob.glob("**/package.json", { ignore: "**/node_modules/**" }).then(function (files) {

    const allDependencies = new Set();
    const disallowedDependencies = new Set();

    // Get all dependencies
    files.forEach(file => {
        console.log(`Checking ${file}`);
        const dependencies = getDependencies(file);
        Object.keys(dependencies).forEach(dep => allDependencies.add(dep));
    });

    // Check licenses 
    allDependencies.forEach(dependency => {
        const license = getLicense(dependency);
        // check license in a case insensitive way
        if (license && !allowedLicenses.includes(license.toUpperCase())) {
            disallowedDependencies.add(dependency);
        }
    });

    // throw readable error showing all disallowed dependencies    
    if (disallowedDependencies.size > 0) {
        console.log("Disallowed dependencies:");
        disallowedDependencies.forEach(dep => console.log(dep));
        throw new Error(`Disallowed dependencies: ${Array.from(disallowedDependencies).join(", ")}`);
    }
});
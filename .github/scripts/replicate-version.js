const fs = require('fs');

// import glob
const glob = require('glob');

const version = require('./common').getRootPackageVersion();

// find all package.json file in /packages/*/ root folders
const packageJsonFiles = glob.sync('packages/*/package.json');

// update all package.json files with the new version
packageJsonFiles.forEach((file) => {

    // parse as json
    fs.readFile(file, 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            throw err;
        }

        // parse as json
        const json = JSON.parse(data);

        // update version
        json.version = version;

        // write back to file
        fs.writeFile(file, JSON.stringify(json, null, 4), 'utf8', (err) => {
            if (err) {
                console.error(err);
                throw err;
                
            }
            console.log(`Updated ${file} to version ${version}`);
        });
    });
});


const fs = require('fs');

const getCoverageColor = (coverage) => {
    if (coverage < 80) {
        return 'red';
    }
    if (coverage < 90) {
        return 'yellow';
    }

    return 'brightgreen';
};
const createCoverageBadgeURL = (coverage, color) =>
    `https://img.shields.io/badge/coverage-${coverage}${encodeURI('%')}-${color}.svg`;

const coverageFile = fs.readFileSync('coverage/coverage-summary.json', 'utf8');

const parsedCoverageResults = JSON.parse(coverageFile).total;

if (parsedCoverageResults) {
    const keys = ['lines', 'statements', 'functions'];
    const totalPercentage = keys.reduce(
        (acc, key) =>
            parsedCoverageResults[key] && parsedCoverageResults[key].pct ? parsedCoverageResults[key].pct + acc : acc,

        0,
    );
    const sum = (totalPercentage / 3).toFixed(2);
    const coverageColor = getCoverageColor(sum);
    const badge = createCoverageBadgeURL(sum, coverageColor);
    const readMeFile = fs.readFileSync('README.md', 'utf8');

    let lineToChange;

    readMeFile.split(/\r?\n/).forEach((line) => {
        if (line.includes('![Coverage]')) {
            lineToChange = line;
        }
    });
    const updatedReadMeFile = readMeFile.replace(lineToChange, `![Coverage](${badge})`);
    fs.writeFileSync('README.md', updatedReadMeFile);
}

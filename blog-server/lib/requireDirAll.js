const fs = require('fs');

/**
 * @param {string}dirPath
 * @return {Router[]}
 */
function requireDirAll(dirPath) {

    if (!fs.statSync(dirPath).isDirectory()) return [];

    const files = fs.readdirSync(dirPath);
    return files.map(filePath => require(`${dirPath}/${filePath}`));
}

module.exports = requireDirAll;

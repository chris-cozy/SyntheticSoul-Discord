const fs = require('fs');
const path = require('path');

/**
 * Grab file paths or subdir paths in a directory
 * @param {string} directory - Directory path to search
 * @param {boolean} foldersOnly - Determine if only return subdirs
 * @returns Array of file paths or subdir paths
 */
module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    // Create array all files in directory, with filetype included
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        // Create path to current file
        const filePath = path.join(directory, file.name);

        // Add filepaths to array
        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath)
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
}
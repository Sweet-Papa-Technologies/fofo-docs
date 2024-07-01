const { searchFiles } = require('./native');

const directoryPath = './native';
const ignorePatterns = [];

const filePaths = searchFiles(directoryPath, ignorePatterns);

console.log(filePaths);
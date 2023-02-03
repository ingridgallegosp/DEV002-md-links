/* module.exports = () => {
  // ...
}; */

// Node.js file system module 
const fs = require('fs'); 
const path = require('path');

const givenPath = './files/archive.md';
const folderPath = './files';

// Options Validation
// falta
fs.access

// File Existence Validation
const verifyFileExists = (givenPath) =>{
  fs.access(givenPath, fs.constants.F_OK, (err) => {
    console.log(`${givenPath} ${err ? 'does not exist' : 'exists'}`);
  }); 
};
// ---console

// Absolute Path Validation - TESTEADO
const validatePath = (givenPath) => {
  return path.isAbsolute(givenPath);
};

// From Relative Path to Absolute Path - TESTEADO
const toAbsolutePath = (givenPath) => {
  return path.join(__dirname, givenPath);
};

// File Validation - TESTEADO
const pathIsFile = (givenPath) => {
  const stats = fs.statSync(givenPath);
  return stats.isFile();
};

// Directory Validation - TESTEADO
const pathIsDirectory = (givenPath) => {
  const stats = fs.statSync(givenPath);
  return stats.isDirectory();
};

// Looking for File Extension - TESTEADO
const fileExt = (givenPath) => {
  return path.extname(givenPath)
};

// Looking for .md File - TESTEADO
const mdFile = (givenPath) => {
  if(path.extname(givenPath) === ".md"){
    return  true 
  } else {
    return false
  }
};

// Reading File

/* const readFilePath = (path) => {
  fs.readFile(path, 'utf-8', (error, data) => { 
    // encoding utf8 porque es archivo de texto
    if (!error) {
      console.log(data);
    } else {
      console.error(error);
    }
  });
};  */
fs.readFile(givenPath, 'utf8', function(error, data){
    if (error) {
      console.error(error)
    }
    // Display the file content
    console.log(data);
});

// Looking for links in a .md file

/* const regExtLink = '\[.*]\(http[a-zA-Z]://.*\)';
let foundLinks = []; */

/* const getMdFileArray = (givenPath) => {
  let files = [];
  if (isFile(givenPath) && isMdFile(givenPath)) {
      files.push(pathname);
  } else if (isDirectory(givenPath)) {
      const items = readDirectory(givenPath);
      items.map((item) => {
          files = files.concat(getMdFileArray(`${pathname}/${item}`));
      });
  }
  return files;
} */

// Getting directory content
const directoryContent = fs.readdirSync(folderPath);
console.log(directoryContent)

// Validate Link

module.exports = { 
  
  validatePath,
  toAbsolutePath,
  pathIsFile,
  pathIsDirectory,
  mdFile,
};
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
// fs.access

// File Existence Validation - TESTEADO
const verifyPathExists =(givenPath) => {
  return fs.existsSync(givenPath);
};
// console.log(verifyPathExists(givenPath))

/* const verifyFileExists = (givenPath) =>{
  fs.access(givenPath, fs.constants.F_OK, (err) => {
    console.log(`${givenPath} ${err ? 'does not exist' : 'exists'}`);
  }); 
}; */

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

// Looking for File Extension 
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

fs.readFile(givenPath, 'utf8',(error, data) => {
  if (error) {
    console.error(error)
  } else {
  console.log(data);
  }
}); 


/* const readFilePath = (givenPath) => {
  fs.readFile(givenPath, 'utf-8', (error, data) => { 
    if (error) {
    console.error(error)
  }
  // Display the file content
  console.log(data);
  });
}; 
readFilePath(givenPath) */

// Looking for links in a .md file
const regext = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
let foundLinks = [];

/* const getMdFileArray = (givenPath) => {
    let files = [];
    if (pathIsFile(givenPath) && mdFile(givenPath)) {
        files.push(givenPath);
  } 
  return files;
} */

// Getting directory content - TESTEADO
const directoryContent =(folderPath) => fs.readdirSync(folderPath);
//console.log(directoryContent)

// Validate Link


module.exports = { 
  verifyPathExists,
  validatePath,
  toAbsolutePath,
  pathIsFile,
  pathIsDirectory,
  mdFile,

  directoryContent,
};
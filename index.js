// Node.js file system module 
const fs = require('fs'); 
const path = require('path');
const open = require('node:fs/promises');

const givenPath = './files/archive.md';
const folderPath = './files';
const ruta = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos.md';

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
// path.resolve

const pathValidation = (givenPath) => {
  if (validatePath(givenPath)){   
      console.log("La ruta ingresada es absoluta: " + givenPath)
      return givenPath;
  } else {
      console.log("La ruta ingresada es relativa: " + givenPath)
      let absolutePath = toAbsolutePath(givenPath);
      console.log("Ruta resuelta: " + absolutePath);
      return absolutePath;
  }
};
/*  */
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

// Looking for .md File - TESTEADO
// Looking for file extension path.extname(path)
const mdFile = (givenPath) => {
  if(path.extname(givenPath) === ".md"){
    return  true 
  } else {
    return false
  }
};

// Array with .md files
const getMdFileArray = (givenPath) => {
  let files = [];
  if (pathIsFile(givenPath) && mdFile(givenPath)) {
      files.push(givenPath);
} 
return files;
}
console.log(getMdFileArray(ruta))
let arrayWithMdFiles = getMdFileArray(ruta);
// console.log(arrayWithMdFiles);

// Reading File
/* fs.readFile(givenPath, 'utf8',(error, data) => {
  if (error) {
    console.error(error)
    // return;
  } else {
    console.log(data);
  }
}); */

/* const readingfile = (absolutePath) => {
  fs.readFile(absolutePath, 'utf8',(error, data) => {
    if (error) {
      console.error(error)
    }
      console.log(data);
  }
)}; // undefined*/ 

// For each md file in array: Read and get links
const readingFile = (givenPath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(givenPath, 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data);
        }
      });
    });
};  
// console.log(readingFile(givenPath));//pending promise 

// Looking for links in a .md file
const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
// .exec() method executes a search for a match in a specified string 
const getLinks = (givenPath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(givenPath, 'utf8', (error, data) => {
          if(error) {
              console.log("Error: "+ error)
              return reject(error);
          } else {
              //return resolve(data.match(regex));
              return resolve(regex.exec(data)); 
          }
      });
  });
}
// console.log(getLinks(givenPath));

/* const getLinks = (givenPath) => { 
  return new Promise((resolve, reject) => {
    const links = [];
    readingFile(givenPath)
      .then((data) => {
        let match = regex.exec(data);
        while (match !== null) {
          links.push({
            
            file: givenPath,
          });
          match = regex.exec(data);
        }
        resolve(links);
      })
    .catch((error) => reject(error));
  });
};
console.log(getLinks(ruta)); //pending promise  */


// Ask (with fetch or axios) if href works



// Getting directory content - TESTEADO
const directoryContent =(folderPath) => fs.readdirSync(folderPath);
//console.log(directoryContent)



module.exports = { 
  verifyPathExists,
  validatePath,
  toAbsolutePath,
  pathValidation,
  pathIsFile,
  pathIsDirectory,
  mdFile,
  readingFile,
  getMdFileArray,
  getLinks,
  directoryContent,
};
// Node.js file system module 
const fs = require('fs'); 
const path = require('path');
//const axios = require('axios');

const givenPath = './files/archive.md';
const folderPath = './files';
const rutaPrueba = 'C:/Users/INGRID/Desktop/Laboratoria/PROYECTO4-MDLINKS/DEV002-md-links/files/resumenProyecto/archivos.md';
const hrefPrueba =  'https://es.wikipedia.org/wiki/Markdown';

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
//path.resolve('../', '/../', '../')
// '/home' on Linux
// '/Users' on OSX
// 'C:\\Users' on Windows

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

// Looking for .md File with file extension path.extname(path) - TESTEADO 
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
/* let arrayWithMdFiles = getMdFileArray(rutaPrueba);
console.log(arrayWithMdFiles); */

// Reading File
/* fs.readFile(givenPath, 'utf8',(error, data) => {
  if (error) {
    console.error(error)
    // return;
  } else {
    console.log(data);
  }
}); */

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
/* readingFile(givenPath)
.then((data)=>{
  console.log(data)
})
.catch((error) => {
    console.log(error)
}); */ // leer archivo

// Looking for links in a .md file
// .exec() method executes a search for a match in a specified string

const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
const getLinks = (givenPath) => { 
  return new Promise((resolve, reject) => {
    const links = [];
    readingFile(givenPath)
      .then((data) => {
        let match = regex.exec(data);
        while (match !== null) {
          links.push({
            href: match[2],
            text: match[1],
            file: givenPath,
          });
          match = regex.exec(data);
        }
        resolve(links);
      })
    .catch((error) => reject(error));
  });
};
/* getLinks(rutaPrueba)
.then((links)=>{
   console.log(links)
    })
     .catch((error) => {
    console.log(error)
}); */ // muestra los links

// Ask (with fetch or axios) if href works
const axios = require('axios');

axios.get('https://es.wikipedia.org/wiki/Markdowns')
  .then(response => {
    console.log(response.config.url);
    console.log(response.status);
    console.log(response.statusText);
  })
  .catch(error => {
    //console.log(error);
    console.log(error.response.status);
    console.log(error.response.statusText);
  });


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
  
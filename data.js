// Node.js file system module 
const fs = require('fs'); 
const path = require('path');
const axios = require('axios');
const open = require('node:fs/promises');
const { resolve } = require('path');

// const givenPath = './files/archive.md';
// folderPath = './files';
// const rutaPrueba = './files/archive.md';

// Options Validation
// falta
// fs.access

// File Existence Validation - TESTEADO
const verifyPathExists =(givenPath) => {
    return fs.existsSync(givenPath)
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
    // eslint-disable-next-line no-undef
    return path.join(__dirname, givenPath);
};
// path.resolve
//path.resolve('../', '/../', '../')
// '/home' on Linux
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
                        // content: data
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
const validateLinks = (url) => {
    axios.get(url)
        .then(response => {
            //console.log(response);
            console.log(response.config.url);
            console.log('stats: ', response.status);
            console.log('OK: ', response.statusText);
        })
        .catch(error => {
            //console.log(error);
            console.log(error.config.url);
            console.log('stats: ', error.response.status);
            console.log('OK: ', error.response.statusText);
        });
};
// console.log(validateLinks('https://es.wikipedia.org/wiki/Markdown'));

// valida link o array de links
/* const validar = (links) => {
    return new Promise((resolve, reject) =>{

    })
}; */


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
    validateLinks,
};
  
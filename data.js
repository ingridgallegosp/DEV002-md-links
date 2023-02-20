// Node.js file system module 
const fs = require('fs'); 
const path = require('path');
const axios = require('axios');

// File Existence Validation - TESTEADO
const verifyPathExists =(givenPath) => {
    return fs.existsSync(givenPath)
};

// Absolute Path Validation - TESTEADO
const validatePath = (givenPath) => {
    return path.isAbsolute(givenPath);
};

// From Relative Path to Absolute Path - TESTEADO
const toAbsolutePath = (givenPath) => {
    // eslint-disable-next-line no-undef
    return path.join(__dirname, givenPath);
};

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

// File Validation - TESTEADO
const pathIsFile = (givenPath) => {
    const stats = fs.statSync(givenPath);
    return stats.isFile();
};

// Looking for .md File with file extension path.extname(path) - TESTEADO 
const mdFile = (givenPath) => {
    if(path.extname(givenPath) === ".md"){
        return  true 
    } else {
        return false
    }
};

// Array with .md files - TESTEADO
const getMdFileArray = (givenPath) => {
    let files = [];
    if (pathIsFile(givenPath) && mdFile(givenPath)) {
        files.push(givenPath);
    } 
    return files;
}

// Reading file 
const readingFile = (givenPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(givenPath, 'utf8', (error, data) => {
            if (error) {
                console.log(error)
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
}); */

// Looking for links in a .md file
// .exec() method executes a search for a match in a specified string
const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;

const getLinks = (givenPath) => { 
    return new Promise((resolve, reject) => {
        let links = [];
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
const validateLinks = (linksArray) => {
    const validateLinksPromise = new Promise((resolve, reject) => {
        const arrLinksStatus = linksArray.map((element) => {
            return axios
                .get(element.href)
                .then(response => {
                    return {
                        ...element,
                        statusCode: response.status,
                        msg: response.statusText,
                    };
                })
                .catch(error => {
                    return {
                        ...element,
                        statusCode: error.response.status,
                        msg: 'FAIL'
                        // msg: error.response.statusText,
                    };
                });
        });
        if (arrLinksStatus) {
            const linksObjects = Promise.allSettled(arrLinksStatus).then((linksArray) =>
                linksArray.map((element) => {
                    return {
                        href: element.value.href,
                        text: element.value.text,
                        file: element.value.file,
                        statusCode: element.value.statusCode,
                        msg:element.value.msg
                    };
                })
            );
            resolve(linksObjects);
        }
    });
    return validateLinksPromise;
}// promise pending

// --stats - TESTEADO
const statsLinks = (arrayObj) => {
    const extraerElements = arrayObj.map((element) => element.href);//entro a array y obtengo los href  
    const eliminarRepetidos = [...new Set (extraerElements)] //elimina links repetidos
    return {
        total: arrayObj.length,
        unique: eliminarRepetidos.length //new set es objeto
    }
};

// --stats --validate - TESTEADO
const brokenLinks = (arrayObj) =>{
    const extraerElements = arrayObj.map((element) => element.href); 
    const eliminarRepetidos = [...new Set (extraerElements)]; 
    console.log(eliminarRepetidos)
    //validar arrayObj
    const brokenLinks = arrayObj.filter((element) => element.statusCode >= '400');//filtro los que fallaron
    return {
        total:  arrayObj.length, 
        unique: eliminarRepetidos.length,
        broken: brokenLinks.length,
    } 
};

// Directory Validation - TESTEADO
const pathIsDirectory = (givenPath) => {
    const stats = fs.statSync(givenPath);
    return stats.isDirectory();
};

// Getting directory content 
const directoryContent = (folderPath) => fs.readdirSync(folderPath);

// Recursive function - TESTEADO
function readDirectory(dir) {
    let allFiles = [];
    fs.readdirSync(dir).forEach(fileName => {
        const filePath = path.join(dir, fileName);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isFile()) {
            allFiles.push(filePath)
        } else if (fileStat.isDirectory()) {
            let savePaths = readDirectory(filePath);
            allFiles.push(...savePaths)
        }
    });
    return allFiles;
}

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
    validateLinks,
    statsLinks,
    brokenLinks,
    directoryContent,
    readDirectory,
};  
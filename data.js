// Node.js file system module 
const fs = require('fs'); 
const path = require('path');
const axios = require('axios');

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

// Array with .md files - TESTEADO
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
// funcion documentacion
/*  axios.get(url)
        .then(response => {
            //console.log(response);
            console.log('stats: ', response.status);
            console.log('OK: ', response.statusText); 
        })
        .catch(error => {
            console.log('stats: ', error.response.status);
            console.log('OK: ', error.response.statusText);
        });
 */

//valida link uno por uno--OK
/* const validateLink = (url) => {
    axios.get(url)
        .then(response => {
            const objResolve = {
                //...element,
                status: response.status,
                ok: response.statusText,
            };
            console.log(objResolve);
        })
        .catch(error => {
            //console.log(error)
            const objResolveFail = {
                //...element,
                status: error.response.status,
                ok: 'FAIL',
            };
            console.log(objResolveFail);
        });
};  */
//console.log(validateLink('https://nodejs.org/0'));

//valida array de links

/* const validateLinks = (linksArray) => {
    const arrLinksStatus = linksArray.map((element) => {
        axios.get(element.href) //link.href
            .then(response => {
                return{
                    ...element,
                    statusCode: response.status,
                    msg: response.statusText,
                };
                //console.log(objResolve);
            })
            .catch(error => {
                return  {
                    ...element,
                    statusCode: error.response.status,
                    msg: 'FAIL'
                    // ok: error.response.statusText,
                };
                //console.log(objResolveFail);
            });
    });
}; // undefined  */
const validateLinks = (linksArray) => {
    const validateLinksPromise = new Promise((resolve, reject) => {
        const arrLinksStatus = linksArray.map((element) => {
            return axios
                .get(element.href) //link.href
                .then(response => {
                    return {
                        ...element,
                        statusCode: response.status,
                        msg: response.statusText,
                    };
                    //console.log(objResolve);
                })
                .catch(error => {
                    return {
                        ...element,
                        statusCode: error.response.status,
                        msg: 'FAIL'
                        // ok: error.response.statusText,
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
}
// promise pending


// funcion prueba - valida link o array de links-- no funciona
/* const url = 'https://es.wikipedia.org/wiki/Markdown';
const requestAxios = axios.get(url);
const validar = requestAxios.then((resolve) => {resolve.status}).catch((error) => error)
validar.then(console.log)
console.log(validar) //undefined */ 

// --stats - TESTEADO
const statsLinks = (arrayObj) => {
    const extraerElements = arrayObj.map((element) => element.href);//entro a array y obtengo los href  
    const eliminarRepetidos = new Set (extraerElements) //elimina links repetidos
    return {
        total: arrayObj.length,
        unique: eliminarRepetidos.size //new set es objeto
    }
};


const arrayObj = [
    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md'
    },
    {
        href: 'https://es.wikipedia.org/wiki/Markdowns',
        text: 'Markdown',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
    },
    {
        href: 'https://nodejs.org',
        text: 'Node.js',
        file: 'c:\\Users\\INGRID\\Desktop\\Laboratoria\\PROYECTO4-MDLINKS\\DEV002-md-links\\files\\archive.md',
    }
]

// --stats --validate - TESTEADO
const brokenLinks = (arrayObj) =>{
    const extraerElements = arrayObj.map((element) => element.href);//entro a array y obtengo los href  
    const eliminarRepetidos = new Set (extraerElements); //elimina links repetidos
    //validar arrayObj
    const brokenLinks = arrayObj.filter((element) => element.statusCode >= '400');//filtro los que fallaron
    return{
        total:  arrayObj.length, 
        unique: eliminarRepetidos.size,
        broken: brokenLinks.length,
    } 
};

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
    statsLinks,
    brokenLinks,
};  
const { 
    verifyPathExists,
    pathValidation,
    getMdFileArray,
    getLinks,
    readDirectory,
    pathIsDirectory,
    pathIsFile,
    mdFile,} = require('./data.js');

const mdLinks = (givenPath, options) =>{
    return new Promise((resolve, reject)=>{
        // Evaluar si la ruta existe
        if(verifyPathExists(givenPath)){
            //chequear si es ruta absoluta y/o cambiar de ruta relativa a absoluta
            let abPath = pathValidation(givenPath)
            //chequear si es archivo y si es archivo md 
            if(pathIsFile(abPath)){
                let arrayWithMdFiles = getMdFileArray(abPath);
                //si no hay archivos
                if (!arrayWithMdFiles || arrayWithMdFiles.length === 0){
                    reject('No hay archivos extension .md')
                } else if (arrayWithMdFiles){
                    // console.log(arrayWithMdFiles)
                    // for each md file: read and get links -- se puede usar .map o .forEach
                    arrayWithMdFiles.forEach((element) => { 
                        getLinks(element)
                            .then(links => {
                                resolve(links);
                            })
                            .catch((error) => {
                                console.log(error)
                            });   
                    });
                }  
            } if(pathIsDirectory(abPath)) {
                //si no es archivo entonces es directorio - leer directorio
                let arrayDir = readDirectory(abPath)
                //filtrar archivos md
                let arrayWithMdFilesDir = arrayDir.filter((element) => mdFile(element));
                //si no hay archivos
                if (!arrayWithMdFilesDir || arrayWithMdFilesDir.length === ''){
                    reject('Archivos extension .md NO encontrados')
                } else if (arrayWithMdFilesDir){
                    console.log(arrayWithMdFilesDir)
                    // for each md file: read and get links
                    arrayWithMdFilesDir.map((element) => {
                        getLinks(element)
                            .then(links => {
                                resolve(links);
                            })
                            .catch((error) => {
                                console.log(error)
                            });    
                    });
                }              
            }  
        } else {
        // Si la ruta no existe, rechaza la promesa
            reject('La ruta NO existe');
        }
    });
};

/* mdLinks('./files/archive.md')
    .then((response)=>{
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    });  */  //pending  

//.log(mdLinks('./files/archive.md'))//pending

module.exports = { mdLinks };
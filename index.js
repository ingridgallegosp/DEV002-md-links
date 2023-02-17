const axios = require('axios');

const { 
    verifyPathExists,
    pathValidation,
    getMdFileArray,
    getLinks,
    readDirectory} = require('./data.js');

const mdLinks = (givenPath, options) =>{
    return new Promise((resolve, reject)=>{
        //Evaluar si ruta existe
        // si la ruta existe:
        if(verifyPathExists(givenPath)){
            //chequear si es ruta absoluta
            //cambiar de ruta relativa a absoluta
            let abPath = pathValidation(givenPath)
            //console.log(abPath)
            //chequear si es archivo y si es archivo md 
            if(getMdFileArray(abPath)){
                let arrayWithMdFiles = getMdFileArray(abPath);
                // console.log(arrayWithMdFiles);
                //si no hay archivos
                if (!arrayWithMdFiles || arrayWithMdFiles.length === ''){
                    reject('No hay archivos extension .md')
                } else if (arrayWithMdFiles){
                    // for each md file: read and get links -- se puede usar .map o .forEach
                    let linksArray = arrayWithMdFiles.forEach((element) => { 
                        getLinks(element)
                            .then(links => {
                                resolve(links);
                                //console.log(links)
                                if(links.length===0){
                                    console.log('No contiene links')
                                }
                            })
                            .catch((error) => {
                                //console.log(error)
                            });   
                    });
                }  
            } else {
                //si no es archivo entonces es directorio
                if(readDirectory(givenPath)){
                    let arrayWithMdFiles = readDirectory(givenPath);
                    return arrayWithMdFiles
                }
            }  
        } else {
        // Si la ruta no existe, rechaza la promesa
            reject('La ruta no existe');
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
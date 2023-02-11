// import axios from 'axios';

const { 
    verifyPathExists,
    pathValidation,
    getMdFileArray,
    getLinks } = require('./index.js');

const mdLinks = (ruta, options) =>{
    return new Promise((resolve, reject)=>{
        //Evaluar si ruta existe
        // si la ruta existe:
        if(verifyPathExists(ruta)){
            //chequear si es ruta absoluta
            //cambiar de ruta relativa a absoluta
            let rutaAb = pathValidation(ruta)
            console.log(rutaAb)
            //chequear si es archivo y si es archivo md //si es directorio filtrar .md-recursividad luego
                if(getMdFileArray(rutaAb)){
                    let arrayWithMdFiles = getMdFileArray(rutaAb);
                    // console.log(arrayWithMdFiles);
                    //si no hay archivos
                    if (!arrayWithMdFiles){
                        reject('No hay archivos extension .md')
                    } else {
                        // for each md file: read and get links
                        arrayWithMdFiles.forEach((element) => {
                            getLinks(element)
                            .then((links)=>{
                                resolve(links);
                                console.log(links)
                                })
                            .catch((error) => {
                                console.log(error)
                            });  
                        });
                        //si validate true
                        //hago consulta con fetch o axios si el href funciona--AXIOS
                        //if(options == validate:true ){

                        //}
                    }
                } 
        } else {
        // Si la ruta no existe, rechaza la promesa
            reject('La ruta no existe');
        }
    });
};

mdLinks('./files/archive.md')
.then(()=>{
    console.log()
})
.catch((error) => {
    console.log(error)
});
 
  
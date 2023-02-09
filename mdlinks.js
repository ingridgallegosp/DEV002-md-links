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
                    if (arrayWithMdFiles === 0){
                        reject('No hay archivos .md')
                    } else{
                        console.log('archivos encontrados')
                                            // for each md file: read and get links
                                            let recorrerPath = arrayWithMdFiles.map((element, index) => {
                                                let links = []
                                                do { getLinks(element)
                                                //console.log(getLinks(element))
                                                }
                                                while (index >0) {
                                                    return links
                                                }
                                            });
                                            console.log(recorrerPath); 
                        
                    } 
                }

                
                
            resolve  //muestro href, ruta y texto
        } else {
        // Si la ruta no existe, rechaza la promesa
            reject('La ruta no existe');
        }
    })
};

 
  //si validate true
  //leer archivo y obtengo links
  //hago consulta con fetch o axios si el href funciona--AXIOS
  // 
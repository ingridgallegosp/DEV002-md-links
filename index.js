const { 
  verifyPathExists,
  pathValidation,
  getMdFileArray,
  getLinks } = require('./data.js');

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
                      let mdArray = arrayWithMdFiles.forEach((element) => {
                          getLinks(element)
                          .then((links)=>{
                              resolve(links);
                              console.log(links)
                              })
                          .catch((error) => {
                              console.log(error)
                          });  
                      });
                      //si no hay opciones muestro el array anterior
                      if(!options){
                          //resolve(mdArray);
                      //si validate false
                      //
                      } else if(options.validate === false ){
                          resolve(mdArray);
                      //si validate true
                      //hago consulta con fetch o axios si el href funciona--AXIOS
                      } else if (options.validate === true ) {
                          console.log('en proceso')
                      }
                  }
              } 
      } else {
      // Si la ruta no existe, rechaza la promesa
          reject('La ruta no existe');
      }
  });
};

/* mdLinks('./files/archive.md')
.then(()=>{
  console.log()
})
.catch((error) => {
  console.log(error)
});
 */
module.exports = { mdLinks };
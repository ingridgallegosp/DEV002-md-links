/* module.exports = () => {
  // ...
}; */

// Node.js file system module 
const fs = require('fs'); 

// Path
const path = require('path');
const givenPath = './files/archive.md';

// Validar si la ruta existe
const verifyFileExists = (path) =>{
  fs.access(path, fs.constants.F_OK, (err) => {
    console.log(`${path} ${err ? 'does not exist' : 'exists'}`);
  }); 
};
verifyFileExists(givenPath);//exists

/*// Validar si la ruta existe fs.existsSync() method
const verifyFileExists = fs.existsSync(givenPath);
console.log("givenPath exists:", verifyFileExists);
 */

// Validar si es ruta absoluta
const validatePath = path.isAbsolute(givenPath);
console.log('absolute path:', validatePath);


// Si es ruta relativa transformar a ruta absoluta
const absolutePath = path.join(__dirname, givenPath); 
// path.join metodo para concatenar ruta relativa
// __dirname palabra reservada deNodeJS para ruta absoluta
console.log('absolutePath is '+ absolutePath);

// Consultar si es archivo
const isFile = (path) => {
  fs.stat(path, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('is file: ' , stats.isFile()); 
});
};
isFile(absolutePath);

// Consultar si es directorio
const isDirectory = (path) => {
  fs.stat(path, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } 
  console.log('is directory: ' , stats.isDirectory()); 
});
};
isDirectory(absolutePath);


// Consultar extension del archivo
const fileExtens = path.extname(absolutePath); 
console.log(fileExtens);

// Leer un archivo
const readFilePath = (path) => {
  fs.readFile(path, 'utf8', (err, data) => { 
    // encoding utf8 porque es archivo de texto
    if (err) {
      console.error(err);
      return;
    }
  console.log(data);
  });
};
readFilePath(absolutePath);

// Buscar links en el archivo .md
//reg ex?
const regExtLink = '\[.*]\(http[a-zA-Z]://.*\)';
let foundLinks = [];



// Obtener/listar contenido del directorio
const folderPath = './files';

const folderContent = fs.readdirSync(folderPath);
console.log(folderContent);

  
module.exports = { validatePath };
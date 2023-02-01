/* module.exports = () => {
  // ...
}; */

// Node.js file system module 
const fs = require('fs'); 

// Path
const path = require('path');
let givenPath = './files/archive.md';

// Validar si la ruta existe
const verifyFileExists = fs.access(givenPath, fs.constants.F_OK, (err) => {
  console.log(`${givenPath} ${err ? 'does not exist' : 'exists'}`);
}); //exists

/*// Validar si la ruta existe fs.existsSync() method
const verifyFileExists = fs.existsSync(givenPath);
console.log("givenPath exists:", verifyFileExists);
 */

// Validar si es ruta absoluta
const validatePath = path.isAbsolute(givenPath);
console.log('absolute path:', validatePath); //false

// Si es ruta relativa transformar a ruta absoluta
const absolutePath = path.join(__dirname, givenPath); 
// path.join metodo para concatenar ruta relativa
// __dirname palabra reservada deNodeJS para ruta absoluta
console.log('absolutePath is '+ absolutePath);

// Consultar si es archivo o directorio
fs.stat(absolutePath, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Is file: ' , stats.isFile()); 
  console.log('iEs directory: ' , stats.isDirectory()); 
});

// Consultar extension del archivo
const fileExtens = path.extname(absolutePath); 
console.log(fileExtens);

// Leer un archivo --verificar console log
const readAbsolutePath = fs.readFile(absolutePath, 'utf8', (err, data) => { 
  // encoding utf8 porque es archivo de texto
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Buscar links en el archivo .md
//reg ex?
/* const regExtLink = '\[.*]\(http[a-zA-Z]://.*\)';
let foundLinks = [];
console.log(foundLinks);
const searchLinks = (text) => text.filter((text) => text.includes(regExtLink));
const textoEncontrado = readAbsolutePath;
console.log('hooooola' + textoEncontrado);
// console.log(searchLinks(textoEncontrado)); */

// Obtener/listar contenido del directorio
const folderPath = './files';

const folderContent = fs.readdirSync(folderPath);
console.log(folderContent);

  

module.exports = {  };